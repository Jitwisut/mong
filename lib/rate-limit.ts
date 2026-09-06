import "server-only";

interface Attempt {
  count: number;
  firstAttemptAt: number;
}

type GlobalWithRateLimit = typeof globalThis & {
  __kornCoinsRateLimit?: Map<string, Attempt>;
};

const globalForRateLimit = globalThis as GlobalWithRateLimit;

// เก็บในหน่วยความจำของ process เดียว เพียงพอสำหรับร้านที่รันอินสแตนซ์เดียว
// ถ้าขยายเป็นหลายอินสแตนซ์เมื่อไหร่ ต้องย้ายไปเก็บที่ Redis หรือฐานข้อมูลแทน
const attempts = globalForRateLimit.__kornCoinsRateLimit ?? new Map<string, Attempt>();
globalForRateLimit.__kornCoinsRateLimit = attempts;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = attempts.get(key);

  if (!existing || now - existing.firstAttemptAt > windowMs) {
    attempts.set(key, { count: 1, firstAttemptAt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.firstAttemptAt + windowMs - now) / 1000)),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function clearRateLimit(key: string) {
  attempts.delete(key);
}

export function readClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp?.trim() || "unknown";
}
