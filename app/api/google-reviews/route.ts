import { NextResponse } from "next/server";

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

export async function GET() {
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
      reviews: [],
    });
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(
    placeId,
  )}?languageCode=en`;

  let place: GooglePlace;
  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 3600 },
    });
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
    reviews,
  });
}
