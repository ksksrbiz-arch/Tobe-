import { NextResponse } from "next/server";
import { checkRateLimit, fetchWithTimeout, getClientIp } from "@/lib/server/functionHardening";

export const runtime = "nodejs";
// Cache the upstream Google Places response for 1 hour at the route level so we
// don't burn API quota on every page load.
export const revalidate = 3600;

type GoogleReview = {
  rating: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
  relativePublishTimeDescription?: string;
  publishTime?: string;
};

type GooglePlace = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

// Curated, verbatim Google reviews used when the live Places API isn't
// configured (or hasn't returned review text yet). Angel West's review is
// trimmed to its praise per the store's request; the two 5-star reviews are
// unedited.
const CURATED_REVIEWS = [
  {
    rating: 5,
    text:
      "They have great resources for local authors. With unbeatable deals. The store selection is quite thorough with many fantastic local and major titles. The staff was very friendly and knowledgeable. Rocky and Bulwinkle (rescue rehab squirrels) were an added bonus!",
    author: "Ava Altair",
    photoUri: undefined,
    relativeTime: "a year ago",
    publishTime: "",
  },
  {
    rating: 5,
    text:
      "Very nice and well managed book store. Good trade in policy and a great selection of quality books. Owner is very friendly and professional. Well worth the drive from Vancouver.",
    author: "David Sasseen",
    photoUri: undefined,
    relativeTime: "a year ago",
    publishTime: "",
  },
  {
    rating: 4,
    text:
      "Very organized with a very large selection. Books cost half the MSRP. They take books in for trade.",
    author: "Angel West",
    photoUri: undefined,
    relativeTime: "a year ago",
    publishTime: "",
  },
];

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `google-reviews:${ip}`,
    maxRequests: 90,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many review requests. Please wait a moment and retry." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

  // Graceful fallback: when the integration isn't configured yet, return the
  // baseline rating + count from the Google Business listing so the UI still
  // shows something credible. Numbers come from the Google Knowledge Panel
  // (4.6 stars, 112 reviews as of 2026-04 — refresh periodically or replace
  // with live data once the env vars are set).
  if (!apiKey || !placeId) {
    return NextResponse.json({
      configured: false,
      placeName: "Clackamas Book Exchange",
      rating: 4.6,
      userRatingCount: 112,
      googleMapsUri:
        "https://www.google.com/maps/search/?api=1&query=Clackamas+Book+Exchange+Milwaukie+OR",
      reviews: CURATED_REVIEWS,
    });
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(
    placeId,
  )}?languageCode=en`;

  let place: GooglePlace;
  try {
    const res = await fetchWithTimeout(
      url,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: 3600 },
      },
      8000,
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: "Couldn't load reviews right now." },
        { status: 502 },
      );
    }
    place = (await res.json()) as GooglePlace;
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach Google." },
      { status: 502 },
    );
  }

  const reviews = (place.reviews ?? []).map((r) => ({
    rating: r.rating ?? 5,
    text: r.text?.text ?? r.originalText?.text ?? "",
    author: r.authorAttribution?.displayName ?? "Google reviewer",
    photoUri: r.authorAttribution?.photoUri,
    relativeTime: r.relativePublishTimeDescription ?? "",
    publishTime: r.publishTime ?? "",
  }));

  return NextResponse.json({
    configured: true,
    placeName: place.displayName?.text ?? "Clackamas Book Exchange",
    rating: place.rating ?? null,
    userRatingCount: place.userRatingCount ?? null,
    googleMapsUri: place.googleMapsUri ?? null,
    // Fall back to the curated reviews if Google returns ratings but no review
    // text (e.g. when the field mask or place has none surfaced).
    reviews: reviews.length > 0 ? reviews : CURATED_REVIEWS,
  });
}
