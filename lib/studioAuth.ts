// Lightweight password gate for the staff photo-intake studio (/studio).
//
// Deliberately separate from the next-auth email magic-link flow: Jess wants a
// single shared password, no inbox round-trip. Security model:
//   - The password lives only in the STUDIO_PASSWORD env var, compared
//     server-side with a timing-safe check (never sent to or stored on client).
//   - On success we set a signed, HttpOnly, Secure cookie containing an expiry
//     and a random nonce, HMAC-signed with AUTH_SECRET. The browser can't forge
//     it, and we verify the signature + expiry on every protected request.

import { createHmac, timingSafeEqual, randomUUID } from "crypto";
import { cookies } from "next/headers";

export const STUDIO_COOKIE = "tbr_studio";
const TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function secret(): string {
  return process.env.AUTH_SECRET ?? "";
}

/** Both the shared password and a signing secret must be present. */
export function isStudioConfigured(): boolean {
  return Boolean(process.env.STUDIO_PASSWORD && secret());
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Constant-time comparison of a submitted password against STUDIO_PASSWORD. */
export function passwordMatches(input: string): boolean {
  const expected = process.env.STUDIO_PASSWORD ?? "";
  if (!expected) return false;
  return safeEqual(input, expected);
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Mint a fresh signed session token: `<expiryMs>.<nonce>.<signature>`. */
export function createSessionToken(): string {
  const payload = `${Date.now() + TTL_MS}.${randomUUID()}`;
  return `${payload}.${sign(payload)}`;
}

/** Verify a token's signature and expiry. */
export function verifyToken(token: string | undefined | null): boolean {
  if (!token || !secret()) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [exp, nonce, sig] = parts;
  if (!safeEqual(sig, sign(`${exp}.${nonce}`))) return false;
  const expMs = Number(exp);
  return Number.isFinite(expMs) && Date.now() < expMs;
}

/** Read the studio cookie from the incoming request and verify it. */
export async function isStudioAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(STUDIO_COOKIE)?.value);
}

export const STUDIO_COOKIE_MAX_AGE = TTL_MS / 1000;
