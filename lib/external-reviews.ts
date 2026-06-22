/**
 * External (third-party) reviews — Google + Facebook — for the on-site display
 * module (components/CustomerReviews.tsx) and the Google Places API route
 * (app/api/google-reviews/route.ts).
 *
 * This is distinct from lib/reviews.ts, which powers the first-party
 * "leave a review" system (DB-backed, moderated, with Review schema). These are
 * curated/aggregated reviews from external platforms, shown for social proof —
 * no schema is emitted for them (Google's guidelines discourage marking up
 * third-party reviews collected elsewhere).
 *
 * Google reviews are fetched live when GOOGLE_PLACES_* env vars are set, with
 * the curated set below as a graceful fallback. Facebook has no public reviews
 * API (and scraping is disallowed), so Facebook recommendations are curated
 * here by hand — copy the real text verbatim from the Page's reviews tab.
 */

export type ReviewSource = "google" | "facebook";

export interface ExternalReview {
  /** 1–5. Facebook "recommendations" have no star value; use 5 for a positive recommendation. */
  rating: number;
  text: string;
  author: string;
  /** Optional avatar URL (Google supplies these; usually omitted for Facebook). */
  photoUri?: string;
  /** Human-readable recency, e.g. "a year ago" or "March 2026". */
  relativeTime: string;
  source: ReviewSource;
}

/** Public destinations for "read all reviews" links. */
export const GOOGLE_REVIEWS_URL =
  "https://maps.google.com/?cid=5188254409265281028";
export const FACEBOOK_REVIEWS_URL =
  "https://www.facebook.com/ClackamasBooksExchange/reviews";

/**
 * Curated, verbatim Google reviews used when the live Places API isn't
 * configured (or returns ratings without review text). Angel West's review is
 * trimmed to its praise per the store's request; the two 5-star reviews are
 * unedited.
 */
export const CURATED_GOOGLE_REVIEWS: ExternalReview[] = [
  {
    rating: 5,
    text:
      "They have great resources for local authors. With unbeatable deals. The store selection is quite thorough with many fantastic local and major titles. The staff was very friendly and knowledgeable. Rocky and Bulwinkle (rescue rehab squirrels) were an added bonus!",
    author: "Ava Altair",
    relativeTime: "a year ago",
    source: "google",
  },
  {
    rating: 5,
    text:
      "Very nice and well managed book store. Good trade in policy and a great selection of quality books. Owner is very friendly and professional. Well worth the drive from Vancouver.",
    author: "David Sasseen",
    relativeTime: "a year ago",
    source: "google",
  },
  {
    rating: 4,
    text:
      "Very organized with a very large selection. Books cost half the MSRP. They take books in for trade.",
    author: "Angel West",
    relativeTime: "a year ago",
    source: "google",
  },
];

/**
 * Curated Facebook recommendations, transcribed verbatim from
 * https://www.facebook.com/ClackamasBooksExchange/reviews
 *
 * Add entries as `{ rating: 5, text: "…", author: "…", relativeTime: "…",
 * source: "facebook" }`. Keep the text as written by the reviewer.
 */
export const FACEBOOK_REVIEWS: ExternalReview[] = [
  {
    rating: 5,
    text:
      "Totally love this bookstore — every time I leave I come up with at least several books.",
    author: "Megan Stover",
    relativeTime: "",
    source: "facebook",
  },
  {
    rating: 5,
    text:
      "The owner Jessica is extremely welcoming and friendly and her love of books is obvious. There is something so wonderful about a used bookstore!",
    author: "Christina Solheim",
    relativeTime: "a year ago",
    source: "facebook",
  },
];
