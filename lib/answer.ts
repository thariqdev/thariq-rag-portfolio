import { retrieve } from "./retrieve";

const GEMINI_MODEL = "gemini-3.8-flash"; // Flash model from Google's docs (checked 2026-10-25)
const GROQ_MODEL = "openai/gpt-oss-20b"; // primary: fast, and available on our Groq key
const TIMEOUT_MS = 15000; // give each provider 15 seconds, then move on
const MIN_SCORE = 0.6; // below this, we skip the LLM. Easy to change.
const TOP_K = 6; // how many chunks go into the prompt (was 4)
const NO_ANSWER = "I don't have that in my documents.";

// Rules for the LLM. The key one: answer only from the context.
const SYSTEM_INSTRUCTION = `You are the assistant on Thariq's portfolio site.
Answer only from the context below.
Speak about Thariq in the third person ("Thariq has...", not "I have...").
If the context does not contain the answer, say "I don't know".
Never invent facts.`;

export type AnswerResult =
  | { answer: string; model: "groq" | "gemini" | "none"; sources: { source: string; score: number }[] }
  | { error: string; status: number };

// Each provider returns the answer text, or throws an Error whose message holds the HTTP status.
async function askGemini(prompt: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY! },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}`);

  // Join the text parts of the reply (some parts carry hidden thinking data, no text).
  const data = await res.json();
  const parts: { text?: string }[] = data.candidates?.[0]?.content?.parts ?? [];
  return parts.map((p) => p.text ?? "").join("").trim();
}

async function askGroq(prompt: string): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        { role: "user", content: prompt },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}`);

  const data = await res.json();
  return (data.choices?.[0]?.message?.content ?? "").trim();
}

export async function answerQuestion(question: string): Promise<AnswerResult> {
  try {
    const retrieveStart = Date.now();
    const chunks = await retrieve(question, TOP_K); // retrieve logs its own embed and score times
    console.log(`[timing] retrieve total: ${Date.now() - retrieveStart}ms`);
    const sources = chunks.map((c) => ({ source: c.source, score: c.score }));

    // Weak match: do not even ask the LLM.
    if (chunks[0].score < MIN_SCORE) return { answer: NO_ANSWER, model: "none", sources };

    // The LLM only sees the retrieved chunks, never the whole CV.
    const context = chunks.map((c) => `[${c.source}]\n${c.text}`).join("\n\n---\n\n");
    const prompt = `Context:\n${context}\n\nQuestion: ${question}`;

    // Try Groq first (faster). If it fails (429, 5xx, timeout), fall back to Gemini.
    // Both get the same prompt and the same retrieved context.
    const providers = [
      { name: "groq" as const, ask: askGroq },
      { name: "gemini" as const, ask: askGemini },
    ];

    let busy = false;
    for (const { name, ask } of providers) {
      const llmStart = Date.now();
      try {
        const answer = await ask(prompt);
        console.log(`[timing] llm (${name}): ${Date.now() - llmStart}ms`);
        return { answer: answer || NO_ANSWER, model: name, sources };
      } catch (err) {
        console.error(`[timing] llm (${name}) FAILED after ${Date.now() - llmStart}ms:`, String(err)); // shows the real reason
        if (String(err).includes("429")) busy = true;
      }
    }
    return {
      error: busy ? "The assistant is busy right now. Please try again in a minute." : "The assistant had a problem. Please try again.",
      status: 502,
    };
  } catch {
    return { error: "Something went wrong. Please try again.", status: 500 };
  }
}
