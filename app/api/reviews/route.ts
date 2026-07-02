import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/server/functionHardening";
import {
  REVIEW_LIMITS,
  createReview,
  getApprovedReviews,
  getApprovedReviewAggregate,
  hashIp,
} from "@/lib/reviews";
import type { ReviewPostRequest } from "@/lib/api-types";

export const runtime = "nodejs";
// Always read live so a freshly approved review shows up immediately for the
// client-side widget; the indexable /reviews page handles its own caching.
export const dynamic = "force-dynamic";

/** Public-safe shape — never leak ip_hash or moderation status to the client. */
function publicReview(r: Awaited<ReturnType<typeof getApprovedReviews>>[number]) {
  return {
    id: r.id,
    author_name: r.author_name,
    rating: r.rating,
    title: r.title,
    body: r.body,
    created_at: r.created_at,
  };
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `reviews-get:${ip}`,
    maxRequests: 90,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const [reviews, agg] = await Promise.all([
    getApprovedReviews(),
    getApprovedReviewAggregate(),
  ]);
  return NextResponse.json({
    reviews: reviews.map(publicReview),
    aggregate: agg,
  });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `reviews-post:${ip}`,
    maxRequests: 3,
    windowMs: 10 * 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "You've submitted a few reviews already — please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  let body: ReviewPostRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill a hidden field. Pretend success and drop it,
  // so bots get no signal about why their spam didn't land.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, pending: true });
  }

  const author_name = (typeof body.author_name === "string" ? body.author_name : "").trim();
  const title = (typeof body.title === "string" ? body.title : "").trim();
  const reviewBody = (typeof body.body === "string" ? body.body : "").trim();
  const rating =
    typeof body.rating === "number"
      ? body.rating
      : Number.parseInt(String(body.rating ?? ""), 10);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Please choose a star rating from 1 to 5." }, { status: 400 });
  }
  if (author_name.length < REVIEW_LIMITS.nameMin || author_name.length > REVIEW_LIMITS.nameMax) {
    return NextResponse.json(
      { error: `Please enter your name (${REVIEW_LIMITS.nameMin}–${REVIEW_LIMITS.nameMax} characters).` },
      { status: 400 },
    );
  }
  if (title.length > REVIEW_LIMITS.titleMax) {
    return NextResponse.json(
      { error: `Title is too long (max ${REVIEW_LIMITS.titleMax} characters).` },
      { status: 400 },
    );
  }
  if (reviewBody.length < REVIEW_LIMITS.bodyMin || reviewBody.length > REVIEW_LIMITS.bodyMax) {
    return NextResponse.json(
      {
        error: `Please write a little more (${REVIEW_LIMITS.bodyMin}–${REVIEW_LIMITS.bodyMax} characters).`,
      },
      { status: 400 },
    );
  }

  try {
    await createReview({
      author_name,
      rating,
      title,
      body: reviewBody,
      ip_hash: ip === "unknown" ? null : hashIp(ip),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Couldn't save your review." },
      { status: 500 },
    );
  }

  // Reviews are held for moderation before appearing publicly.
  return NextResponse.json({ ok: true, pending: true });
}
