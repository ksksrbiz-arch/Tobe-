type RateLimitState = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Map<string, RateLimitState>;

type GlobalWithRateLimitStore = typeof globalThis & {
  __tobeRateLimitStore?: RateLimitStore;
};

export function getClientIp(request: Request) {
  const netlifyIp = request.headers.get("x-nf-client-connection-ip");
  if (netlifyIp) return netlifyIp.trim();

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return "unknown";
}

function getRateLimitStore() {
  const globalWithStore = globalThis as GlobalWithRateLimitStore;
  if (!globalWithStore.__tobeRateLimitStore) {
    globalWithStore.__tobeRateLimitStore = new Map<string, RateLimitState>();
  }
  return globalWithStore.__tobeRateLimitStore;
}

function cleanupExpiredEntries(store: RateLimitStore, now: number) {
  for (const [key, state] of store.entries()) {
    if (state.resetAt <= now) store.delete(key);
  }
}

export function checkRateLimit({
  key,
  maxRequests,
  windowMs,
}: {
  key: string;
  maxRequests: number;
  windowMs: number;
}) {
  const now = Date.now();
  const store = getRateLimitStore();
  if (store.size > 5000) cleanupExpiredEntries(store, now);

  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;
  store.set(key, existing);

  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  if (existing.count > maxRequests) {
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - existing.count),
    retryAfterSeconds,
  };
}

export async function fetchWithTimeout(
  input: URL | RequestInfo,
  init: RequestInit = {},
  timeoutMs = 8000,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("upstream_timeout"), timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Upstream request timed out.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
