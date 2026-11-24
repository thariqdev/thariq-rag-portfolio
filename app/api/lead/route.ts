import { createRateLimiter } from "../../../lib/rateLimit";

// "Hire me" form. Checks the lead, then forwards it to an n8n webhook. The webhook address is a
// server-only env var, so it never reaches the browser.
const checkLeadLimit = createRateLimiter(10 * 60_000, 3, 30); // 3 messages per visitor per 10 minutes

const MAX_BODY_BYTES = 8000;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 2000;
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fail = (error: string, status: number) => Response.json({ error }, { status });

export async function POST(request: Request) {
  // 1. Too many messages from one visitor?
  const visitor = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const limit = checkLeadLimit(visitor);
  if (!limit.ok) {
    return Response.json(
      { error: "You have sent a few messages already. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 2. Reject huge requests, then read the body.
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return fail("That message is too long.", 413);
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail("That message is too long.", 413);
  let body: Record<string, unknown> | null = null;
  try {
    body = JSON.parse(raw);
  } catch {}
  if (!body || typeof body !== "object") return fail("Please fill in the form and try again.", 400);

  // 3. Honeypot: real visitors never see this field. If it has text, a bot filled it in.
  // Answer "success" so the bot learns nothing, and send nothing on.
  if (typeof body.website === "string" && body.website.trim() !== "") return Response.json({ ok: true });

  // 4. Validate. The server checks again even though the form already did.
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!name || name.length > MAX_NAME) return fail(`Please enter your name (up to ${MAX_NAME} characters).`, 400);
  if (!EMAIL_FORMAT.test(email) || email.length > MAX_EMAIL) return fail("Please enter a valid email address.", 400);
  if (message.length < MIN_MESSAGE || message.length > MAX_MESSAGE) {
    return fail(`Please write a message between ${MIN_MESSAGE} and ${MAX_MESSAGE} characters.`, 400);
  }

  // 5. Forward to n8n. Any problem is logged here (without the address) and the visitor gets a friendly message.
  const webhook = process.env.N8N_WEBHOOK_URL;
  const unavailable = () => fail("Sorry, your message could not be sent right now. Please email me directly instead.", 502);
  if (!webhook) {
    console.error("[lead] N8N_WEBHOOK_URL is not set");
    return unavailable();
  }
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[lead] n8n answered with status ${res.status}`);
      return unavailable();
    }
  } catch (err) {
    console.error("[lead] could not reach n8n:", err instanceof Error ? err.name : "unknown error");
    return unavailable();
  }
  return Response.json({ ok: true });
}
