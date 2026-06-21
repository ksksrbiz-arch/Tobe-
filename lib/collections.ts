/**
 * Topic-cluster collections for The Reading Room.
 *
 * Collections are themed HUB pages that group posts by their tags, consolidating
 * ranking authority and adding indexable surfaces with internal linking. Each
 * collection is defined declaratively (slug, title, description, and a `match`
 * predicate over a post's tags); helpers below compute post membership from the
 * live post registry via `@/lib/blog`.
 */
import { getAllPosts, type BlogPost } from "@/lib/blog";

export type Collection = {
  /** URL slug under /reading-room/collections/ — unique, kebab-case. */
  slug: string;
  /** <title> and H1 for the hub. */
  title: string;
  /** Meta description and card blurb. */
  description: string;
  /** True when a post belongs in this collection, based on its tags. */
  match: (post: BlogPost) => boolean;
};

/** A collection paired with its computed post count. */
export type CollectionWithCount = Collection & { count: number };

const COLLECTIONS: Collection[] = [
  {
    slug: "local-guides",
    title: "Local Guides",
    description:
      "Bookish guides to Milwaukie and the Portland area — where to go, what to do, and how To Be Read fits in.",
    match: (post) =>
      post.tags.includes("Local guide") || post.tags.includes("Visit"),
  },
  {
    slug: "gift-guides",
    title: "Gift Guides",
    description:
      "Curated book gift ideas for every reader on your list, hand-picked from the shelves of To Be Read.",
    match: (post) => post.tags.includes("Gift guide"),
  },
  {
    slug: "genre-guides",
    title: "Genre Guides",
    description:
      "Deep dives into the genres we love — what to read, where to start, and what to pick up next.",
    match: (post) => post.tags.includes("Genre guide"),
  },
  {
    slug: "read-alikes",
    title: "Read-Alikes",
    description:
      "Loved a book? Find your next one. Hand-matched read-alikes for favorite titles and authors.",
    match: (post) => post.tags.includes("Read-alikes"),
  },
  {
    slug: "reading-life",
    title: "Reading Life",
    description:
      "Notes on the reading life — habits, shelves, TBR piles, and the joys of a well-worn used book.",
    match: (post) => post.tags.includes("Reading life"),
  },
  {
    slug: "trade-and-selling",
    title: "Trade & Selling",
    description:
      "How to trade in and sell your used books at To Be Read — tips, what we take, and how to get the most.",
    match: (post) => post.tags.includes("Trade"),
  },
];

/** All collections that contain at least one post, with computed post counts. */
export function getCollections(): CollectionWithCount[] {
  const posts = getAllPosts();
  return COLLECTIONS.map((collection) => ({
    ...collection,
    count: posts.filter((post) => collection.match(post)).length,
  })).filter((collection) => collection.count > 0);
}

/** Resolve a collection by slug, or undefined if unknown. */
export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}

/** Slugs of non-empty collections, for generateStaticParams. */
export function getCollectionSlugs(): string[] {
  return getCollections().map((collection) => collection.slug);
}

/** Posts belonging to a collection, newest first. Empty for unknown slugs. */
export function getCollectionPosts(slug: string): BlogPost[] {
  const collection = getCollection(slug);
  if (!collection) return [];
  return getAllPosts().filter((post) => collection.match(post));
}
