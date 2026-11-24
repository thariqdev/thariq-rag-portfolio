// A small in-memory rate limiter. It keeps the free API quotas from being used up by one visitor or one script.
// Note: on Vercel each server instance has its own memory, so this is a best-effort limit, not a hard one.
export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

// Each limiter has its own memory, so the chat and the contact form do not use up each other's allowance.
export function createRateLimiter(windowMs: number, perVisitor: number, perServer: number) {
  const byVisitor = new Map<string, number[]>();
  let all: number[] = [];

  return function check(visitor: string, now = Date.now()): RateLimitResult {
    const cutoff = now - windowMs;
    all = all.filter((t) => t > cutoff);
    const mine = (byVisitor.get(visitor) ?? []).filter((t) => t > cutoff);

    if (mine.length >= perVisitor || all.length >= perServer) {
      const oldest = mine.length >= perVisitor ? mine[0] : all[0];
      byVisitor.set(visitor, mine);
      return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)) };
    }

    mine.push(now);
    all.push(now);
    byVisitor.set(visitor, mine);
    if (byVisitor.size > 5000) byVisitor.clear(); // keeps memory small if someone sends many fake addresses
    return { ok: true };
  };
}

// The chat: 10 questions per visitor per minute, 60 per server per minute.
export const checkRateLimit = createRateLimiter(60_000, 10, 60);
