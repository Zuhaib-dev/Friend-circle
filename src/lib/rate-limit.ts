/**
 * Simple in-memory rate limiter for Next.js API routes.
 *
 * Uses a Map with automatic stale-entry cleanup on every call.
 * For serverless (Netlify Functions), the Map lives only as long as the
 * warm container — still effective against burst / scripted attacks and
 * degrades gracefully (never blocks a legitimate one-off request).
 */

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Map<string, RateLimitEntry>>();

function getBucket(name: string): Map<string, RateLimitEntry> {
  let bucket = buckets.get(name);
  if (!bucket) {
    bucket = new Map();
    buckets.set(name, bucket);
  }
  return bucket;
}

/**
 * Create a named rate-limiter.
 *
 * @param name     Unique limiter name (e.g. "verify-otp")
 * @param options  { limit: max requests, windowMs: window in milliseconds }
 */
export function rateLimit(name: string, options: { limit: number; windowMs: number }) {
  const bucket = getBucket(name);

  return {
    /**
     * Check whether `token` (usually an IP) is within the limit.
     *
     * @returns `{ success, remaining }` — success is false when blocked.
     */
    check(token: string): { success: boolean; remaining: number } {
      const now = Date.now();

      // Lazy cleanup — remove stale entries every call (Map is small)
      if (bucket.size > 10_000) {
        for (const [key, entry] of bucket) {
          if (now > entry.resetAt) bucket.delete(key);
        }
      }

      const entry = bucket.get(token);

      if (!entry || now > entry.resetAt) {
        bucket.set(token, { count: 1, resetAt: now + options.windowMs });
        return { success: true, remaining: options.limit - 1 };
      }

      if (entry.count >= options.limit) {
        return { success: false, remaining: 0 };
      }

      entry.count++;
      return { success: true, remaining: options.limit - entry.count };
    },
  };
}

/**
 * Extract a reasonable client identifier from request headers.
 * Falls back to "unknown" which still provides per-container throttling.
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
