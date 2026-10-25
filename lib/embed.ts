// Model name from Google's current docs (checked 2026-10-25).
const MODEL = "gemini-embedding-2";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:batchEmbedContents`;

// Turn each text into a vector (a list of numbers).
export async function embedTexts(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing. Check .env.local");

  // One request per text, so we get one separate vector per text.
  const requests = texts.map((text) => ({
    model: `models/${MODEL}`,
    content: { parts: [{ text }] },
  }));

  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({ requests }),
  });
  if (!res.ok) throw new Error(`Embedding failed: ${res.status} ${await res.text()}`);

  const data = (await res.json()) as { embeddings: { values: number[] }[] };
  return data.embeddings.map((e) => e.values);
}
