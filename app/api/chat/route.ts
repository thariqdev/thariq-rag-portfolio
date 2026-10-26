import { answerQuestion } from "../../../lib/answer";
import { checkRateLimit } from "../../../lib/rateLimit";

// The slowest case is about 30 seconds (search 8s, then Groq 10s, then Gemini 12s). Say so explicitly,
// so the hosting platform does not cut the request off earlier.
export const maxDuration = 30;

const MAX_QUESTION_CHARS = 500; // one question is a sentence or two; the chat box allows 250
const MAX_BODY_BYTES = 4000; // a 500-character question is about 2 KB, even with accents and emoji

export async function POST(request: Request) {
  // 1. Too many questions from one visitor (or from everyone together)?
  const visitor = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const limit = checkRateLimit(visitor);
  if (!limit.ok) {
    return Response.json(
      { error: "You are asking too fast. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 2. Reject huge requests before reading them.
  const tooBig = () => Response.json({ error: "That message is too long." }, { status: 413 });
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return tooBig();
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return tooBig();

  // 3. Read and check the question.
  let body: { question?: unknown } | null = null;
  try {
    body = JSON.parse(raw);
  } catch {}
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  if (!question) return Response.json({ error: "Please send a question." }, { status: 400 });
  if (question.length > MAX_QUESTION_CHARS) {
    return Response.json({ error: `Please keep your question under ${MAX_QUESTION_CHARS} characters.` }, { status: 400 });
  }

  const result = await answerQuestion(question);
  if ("error" in result) return Response.json({ error: result.error }, { status: result.status });
  return Response.json(result);
}
