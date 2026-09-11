// Lightweight in-memory sliding-window rate limiter.
//
// This is intentionally simple: it protects a personal portfolio's chat
// endpoint from casual abuse (someone hammering the button, a stray bot)
// without needing an external store. It resets on cold start / redeploy and
// is per-instance, not global — that's an accepted tradeoff for a low-traffic
// personal site. If traffic grows, swap this for Upstash Redis (see README).

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 20;

// Periodically forget old IPs so the map doesn't grow forever on a
// long-lived warm instance.
const MAX_TRACKED_KEYS = 5000;

export function checkRateLimit(key: string): {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
} {
  const now = Date.now();
  let bucket = buckets.get(key);

  if (!bucket) {
    if (buckets.size >= MAX_TRACKED_KEYS) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey) buckets.delete(oldestKey);
    }
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }

  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);

  if (bucket.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = bucket.timestamps[0];
    return {
      allowed: false,
      remaining: 0,
      resetInMs: WINDOW_MS - (now - oldest),
    };
  }

  bucket.timestamps.push(now);
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - bucket.timestamps.length,
    resetInMs: WINDOW_MS,
  };
}

export function getClientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
