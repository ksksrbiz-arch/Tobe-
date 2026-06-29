/**
 * Centralized domain type barrel for To Be Read (TBR).
 *
 * Re-exports every public type, interface, and shared constant from the
 * domain modules under lib/. Use this as a single import entry point:
 *
 *   import type { Review, BlogPost, SpecialEvent } from "@/lib/types";
 *
 * Existing imports from source modules (e.g. `from "@/lib/db"`) continue
 * to work unchanged — this file is purely additive.
 */

// ── Database / core entities ─────────────────────────────────────────────────
export type { RecentArrival, WishlistItem, ReviewStatus, Review } from "./db";

// ── First-party reviews ──────────────────────────────────────────────────────
export type { ReviewAggregate, NewReview } from "./reviews";
export { REVIEW_LIMITS } from "./reviews";

// ── Blog / Reading Room ──────────────────────────────────────────────────────
export type { BlogMeta, BlogPost } from "./blog";

// ── In-store events ──────────────────────────────────────────────────────────
export type { EventOccurrence, SpecialEvent } from "./events";

// ── Reading Room collections ─────────────────────────────────────────────────
export type { Collection, CollectionWithCount } from "./collections";

// ── Client-side reading list ─────────────────────────────────────────────────
export type { SavedPick } from "./readingList";

// ── Store hours ───────────────────────────────────────────────────────────────
export type { StoreStatus } from "./storeHours";

// ── External (third-party) reviews ───────────────────────────────────────────
export type { ReviewSource, ExternalReview } from "./external-reviews";
export {
  GOOGLE_REVIEWS_URL,
  FACEBOOK_REVIEWS_URL,
  CURATED_GOOGLE_REVIEWS,
  FACEBOOK_REVIEWS,
} from "./external-reviews";
