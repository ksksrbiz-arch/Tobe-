import { neon } from "@neondatabase/serverless";
import { getConnectionString } from "@netlify/database";

// The Netlify Database product injects its connection string as `NETLIFY_DB_URL`
// at runtime, only inside an actual Netlify Function/Edge Function invocation —
// `getConnectionString()` throws outside that context (e.g. during `next build`,
// which evaluates routes statically, or local `next dev` without `netlify dev`).
// `DATABASE_URL` is the manual fallback for those cases.
function resolveConnectionString(): string {
  try {
    return getConnectionString();
  } catch {
    // Not running inside a Netlify Function — fall through to DATABASE_URL.
  }
  const fallback = process.env.DATABASE_URL;
  if (!fallback) {
    throw new Error(
      "No database connection available. Run via `netlify dev`, or set DATABASE_URL for local development.",
    );
  }
  return fallback;
}

// Resolved lazily, on first query, rather than at module load — see the
// `next build` note above. Cached after that so every subsequent query on the
// same warm instance reuses one client instead of re-resolving each time.
let client: ReturnType<typeof neon> | undefined;
function getClient(): ReturnType<typeof neon> {
  if (!client) client = neon(resolveConnectionString());
  return client;
}

export const sql: ReturnType<typeof neon> = ((
  ...args: Parameters<ReturnType<typeof neon>>
) => getClient()(...args)) as ReturnType<typeof neon>;

export interface RecentArrival {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
  added_at: string;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  title: string;
  body: string;
  status: ReviewStatus;
  ip_hash: string | null;
  created_at: string;
  approved_at: string | null;
}
