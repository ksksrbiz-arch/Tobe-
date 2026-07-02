/**
 * Shared API request/response types — machine-checked contract between
 * the API routes (app/api/) and the client components that call them.
 *
 * Import in API routes to keep type definitions DRY.
 * Import in client components to get typed API responses.
 */

// ── /api/recommend ───────────────────────────────────────────────────────────

/** A single book recommendation as returned by the LLM. */
export interface Recommendation {
  title: string;
  author: string;
  description: string;
  reason: string;
}

/** A book entry from the inventory (recent_arrivals table or seed data). */
export interface InventoryBook {
  title: string;
  author: string;
  cover_url: string;
}

/**
 * A matched, enriched recommendation cross-referenced against live inventory
 * and optionally grounded with DuckDuckGo.
 */
export interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  reason: string;
  cover_url?: string;
  /** PangoBooks search link; not emitted by the route — populated client-side when present. */
  pango_url?: string;
  in_stock: boolean;
  source_url?: string;
  source_name?: string;
}

/** Response body for POST /api/recommend. */
export interface RecommendResponse {
  recommendations: BookRecommendation[];
  /** Present on error responses. */
  error?: string;
}

// ── /api/credit-estimate ─────────────────────────────────────────────────────

/** Raw Google Books volume shape used for the credit-estimate lookup. */
export type GoogleBooksVolume = {
  volumeInfo?: {
    title?: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
  };
  saleInfo?: {
    listPrice?: { amount?: number };
    retailPrice?: { amount?: number };
  };
};

/** Successful response body for GET /api/credit-estimate. */
export interface CreditEstimateResponse {
  isbn: string;
  title: string;
  author: string;
  coverUrl: string | null;
  listPrice: number;
  creditRate: number;
  credit: number;
}

// ── /api/reviews ─────────────────────────────────────────────────────────────

/**
 * Public-safe review shape returned by GET /api/reviews.
 * Intentionally omits ip_hash, status, and approved_at from the DB row.
 */
export interface PublicReview {
  id: string;
  author_name: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
}

/** Aggregate rating summary returned alongside reviews. */
export interface ReviewsAggregate {
  count: number;
  average: number | null;
}

/** Response body for GET /api/reviews. */
export interface ReviewsGetResponse {
  reviews: PublicReview[];
  aggregate: ReviewsAggregate;
}

/** Request body for POST /api/reviews. */
export interface ReviewPostRequest {
  author_name?: unknown;
  rating?: unknown;
  title?: unknown;
  body?: unknown;
  /** Honeypot field — must be empty string for real users. */
  website?: unknown;
}

/** Response body for POST /api/reviews (pending moderation). */
export interface ReviewPostResponse {
  ok: boolean;
  pending: boolean;
}

// ── /api/recent-arrivals ─────────────────────────────────────────────────────

/**
 * A single book arrival as returned by GET /api/recent-arrivals.
 * Extends the core DB fields with optional metadata columns.
 */
export interface RecentArrival {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
  added_at: string;
  co_author?: string;
  series?: string;
  series_number?: string;
  format?: string;
  publisher?: string;
  pub_year?: number;
  category?: string;
  subcategory?: string;
}

/** Response body for GET /api/recent-arrivals. */
export interface RecentArrivalsResponse {
  arrivals: RecentArrival[];
}

// ── /api/tiktok-latest ───────────────────────────────────────────────────────

/** A single TikTok video entry parsed from the RSS feed. */
export interface TikTokVideo {
  videoId: string;
  username: string;
}

/** Response body for GET /api/tiktok-latest. */
export type TikTokLatestResponse =
  | { configured: false }
  | { configured: true; videos: TikTokVideo[]; error?: "feed-unavailable" | "feed-error" };

// ── /api/book-search ─────────────────────────────────────────────────────────

/**
 * Raw Google Books volume shape used by the book-search route.
 * Includes industryIdentifiers for ISBN resolution.
 */
export interface GoogleVolume {
  volumeInfo?: {
    title?: string;
    authors?: string[];
    industryIdentifiers?: Array<{ type?: string; identifier?: string }>;
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
  };
  saleInfo?: { listPrice?: { amount?: number } };
}

/** A resolved book with a confirmed ISBN, returned by GET /api/book-search. */
export interface ResolvedBook {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number | null;
}

/** Successful response body for GET /api/book-search. */
export interface BookSearchResponse {
  book: ResolvedBook;
}

// ── /api/newsletter ──────────────────────────────────────────────────────────

/** Request body for POST /api/newsletter. */
export interface NewsletterRequest {
  email: string;
}

/** Response body for POST /api/newsletter. */
export interface NewsletterResponse {
  ok: boolean;
  /** Present when Resend is not yet configured (dev/staging). */
  note?: "not_configured";
}
