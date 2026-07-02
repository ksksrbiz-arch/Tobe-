import { createHash } from "crypto";
import { sql } from "@/lib/db";
import type { Review, ReviewStatus } from "@/lib/db";

// Validation bounds shared by the API route and the client form so the two
// never drift. Keep them small and human — these are short shop reviews.
export const REVIEW_LIMITS = {
  nameMin: 2,
  nameMax: 60,
  titleMax: 120,
  bodyMin: 10,
  bodyMax: 2000,
} as const;

/** Hash a client IP so we can rate-limit / spot abuse without storing raw PII. */
export function hashIp(ip: string): string {
  const salt = process.env.REVIEW_IP_SALT ?? "tbr-reviews";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export interface ReviewAggregate {
  /** Number of approved reviews. */
  count: number;
  /** Mean rating rounded to one decimal, or null when there are none. */
  average: number | null;
}

/**
 * Aggregate over ALL approved reviews, computed in SQL. The display list is
 * capped (newest 60), so deriving the aggregate from it would silently cap
 * reviewCount and skew the average once the shop passes 60 reviews — bad data
 * to publish as schema.org aggregateRating. Never throws.
 */
export async function getApprovedReviewAggregate(): Promise<ReviewAggregate> {
  try {
    const rows = (await sql`
      SELECT COUNT(*)::int AS count, ROUND(AVG(rating)::numeric, 1) AS average
      FROM reviews
      WHERE status = 'approved'
    `) as Array<{ count: number; average: string | number | null }>;
    const row = rows[0];
    if (!row || row.count === 0) return { count: 0, average: null };
    return { count: row.count, average: row.average == null ? null : Number(row.average) };
  } catch {
    return { count: 0, average: null };
  }
}

/**
 * Approved reviews, newest first. Returns [] (never throws) when the database
 * isn't configured or is unreachable, so server-rendered pages degrade to an
 * empty state instead of crashing the build/render.
 */
export async function getApprovedReviews(limit = 60): Promise<Review[]> {
  try {
    const rows = (await sql`
      SELECT id, author_name, rating, title, body, status, ip_hash, created_at, approved_at
      FROM reviews
      WHERE status = 'approved'
      ORDER BY created_at DESC
      LIMIT ${limit}
    `) as Review[];
    return rows;
  } catch {
    return [];
  }
}

/** All reviews matching a status (defaults to pending) — admin moderation queue. */
export async function listReviews(
  status: ReviewStatus | "all" = "pending",
  limit = 200,
): Promise<Review[]> {
  if (status === "all") {
    return (await sql`
      SELECT id, author_name, rating, title, body, status, ip_hash, created_at, approved_at
      FROM reviews
      ORDER BY created_at DESC
      LIMIT ${limit}
    `) as Review[];
  }
  return (await sql`
    SELECT id, author_name, rating, title, body, status, ip_hash, created_at, approved_at
    FROM reviews
    WHERE status = ${status}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `) as Review[];
}

export interface NewReview {
  author_name: string;
  rating: number;
  title: string;
  body: string;
  ip_hash: string | null;
}

/** Insert a new review in the 'pending' state. */
export async function createReview(input: NewReview): Promise<Review> {
  const rows = (await sql`
    INSERT INTO reviews (author_name, rating, title, body, status, ip_hash)
    VALUES (${input.author_name}, ${input.rating}, ${input.title}, ${input.body}, 'pending', ${input.ip_hash})
    RETURNING id, author_name, rating, title, body, status, ip_hash, created_at, approved_at
  `) as Review[];
  return rows[0];
}

/**
 * Move a review to approved/rejected. Approving stamps approved_at; any other
 * transition clears it. Returns the updated row, or null if the id is unknown.
 */
export async function setReviewStatus(
  id: string,
  status: ReviewStatus,
): Promise<Review | null> {
  const approvedAt = status === "approved" ? new Date() : null;
  const rows = (await sql`
    UPDATE reviews
    SET status = ${status}, approved_at = ${approvedAt}
    WHERE id = ${id}
    RETURNING id, author_name, rating, title, body, status, ip_hash, created_at, approved_at
  `) as Review[];
  return rows[0] ?? null;
}
