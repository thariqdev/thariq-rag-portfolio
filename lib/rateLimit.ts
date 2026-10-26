// A small in-memory rate limiter. It keeps the free API quotas from being used up by one visitor or one script.
// Note: on Vercel each server instance has its own memory, so this is a best-effort limit, not a hard one.
const WINDOW_MS = 60_000; // one minute
const PER_VISITOR = 10; // questions one visitor may ask per minute
const PER_SERVER = 60; // questions all visitors together may ask one server per minute

const byVisitor = new Map<string, number[]>();
let all: number[] = [];

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export function checkRateLimit(visitor: string, now = Date.now()): RateLimitResult {
  const cutoff = now - WINDOW_MS;
  all = all.filter((t) => t > cutoff);
  const mine = (byVisitor.get(visitor) ?? []).filter((t) => t > cutoff);

  if (mine.length >= PER_VISITOR || all.length >= PER_SERVER) {
    const oldest = mine.length >= PER_VISITOR ? mine[0] : all[0];
    byVisitor.set(visitor, mine);
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)) };
  }

  mine.push(now);
  all.push(now);
  byVisitor.set(visitor, mine);
  if (byVisitor.size > 5000) byVisitor.clear(); // keeps memory small if someone sends many fake addresses
  return { ok: true };
}
