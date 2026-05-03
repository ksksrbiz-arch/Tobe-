import { neon } from "@neondatabase/serverless";

// `NETLIFY_DATABASE_URL` is the env var auto-provisioned by Netlify DB.
// Falls back to `DATABASE_URL` for local dev / non-Netlify Neon projects.
const connectionString =
  process.env.NETLIFY_DATABASE_URL ?? process.env.DATABASE_URL ?? "";

if (!connectionString && process.env.NODE_ENV !== "test") {
  // Don't throw at import time — `next build` evaluates routes statically and
  // would crash. Throw on first use instead.
}

export const sql = connectionString
  ? neon(connectionString)
  : ((async () => {
      throw new Error(
        "NETLIFY_DATABASE_URL is not set. Provision Netlify DB or set DATABASE_URL.",
      );
    }) as unknown as ReturnType<typeof neon>);

export interface RecentArrival {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
  added_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number | null;
  notified: boolean;
  created_at: string;
}
