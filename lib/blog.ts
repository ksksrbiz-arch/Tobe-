import type { ComponentType } from "react";

/**
 * The Reading Room — a lightweight, dependency-free blog.
 *
 * Each post lives in `content/reading-room/<file>.tsx` and exports:
 *   - `meta`:    a BlogMeta object (the data the hub/SEO needs)
 *   - default:   a `Body` component rendering the article HTML
 *
 * Posts are AUTO-DISCOVERED: `scripts/generate-blog-registry.mjs` scans
 * `content/reading-room/*.tsx` and emits `lib/blog.generated.ts` (run by the
 * `predev` / `prebuild` npm hooks, or `npm run gen:blog`). Adding a post is just
 * dropping a new `.tsx` file in that folder — no central edit, so parallel
 * branches never collide on a shared registry. The generated file is gitignored
 * since it's a pure build artifact derived from the post files.
 */

export type BlogMeta = {
  /** URL slug under /reading-room/ — must be unique and kebab-case. */
  slug: string;
  /** <title> and H1 for the post. */
  title: string;
  /** Meta description (~150–160 chars). */
  description: string;
  /** Card blurb on the hub listing. */
  excerpt: string;
  /** Published date, ISO `YYYY-MM-DD`. */
  date: string;
  /** Last-updated date, ISO `YYYY-MM-DD`. Defaults to `date`. */
  updated?: string;
  author: string;
  tags: string[];
  /** Estimated read time in minutes, shown on the card. */
  readingMinutes: number;
  /**
   * Books named in a "best of" / "books like X" list post, in the order they
   * appear. When present, the post page emits an ItemList/Book JSON-LD block
   * alongside the BlogPosting schema, so AI answer engines and rich results
   * can read the recommendations as structured items rather than plain prose.
   * Titles/authors must match what's already written in the article body —
   * this is a structured mirror of the visible content, not new copy.
   */
  items?: Array<{ name: string; author?: string }>;
};

export type BlogPost = BlogMeta & { Body: ComponentType };

// The post registry is auto-generated from content/reading-room/*.tsx —
// see scripts/generate-blog-registry.mjs and the header comment above.
import { registry } from "./blog.generated";

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...registry].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Look up a single post by slug, or undefined if it doesn't exist. */
export function getPost(slug: string): BlogPost | undefined {
  return registry.find((p) => p.slug === slug);
}

/** Slugs for generateStaticParams. */
export function getAllSlugs(): string[] {
  return registry.map((p) => p.slug);
}

/** Human-readable date, e.g. "June 19, 2026". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Tags ─────────────────────────────────────────────────────────────────────

/** Convert a human tag ("Cozy mystery") to a URL slug ("cozy-mystery"). */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** All distinct tags across posts, alphabetised. */
export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const post of registry) for (const tag of post.tags) set.add(tag);
  return [...set].sort((a, b) => a.localeCompare(b));
}

/** Tag slugs for generateStaticParams. */
export function getAllTagSlugs(): string[] {
  return getAllTags().map(tagToSlug);
}

/** Resolve a tag slug back to its display label, or undefined if unknown. */
export function getTagBySlug(slug: string): string | undefined {
  return getAllTags().find((tag) => tagToSlug(tag) === slug);
}

/** Posts carrying a given tag (by display label), newest first. */
export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

/**
 * Related posts for internal linking: ranked by number of shared tags, then by
 * recency. Excludes the post itself. Falls back to recent posts when nothing
 * shares a tag, so the "keep reading" slot is never empty.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  const tags = new Set(current.tags);

  const scored = getAllPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((t) => tags.has(t)).length,
    }))
    .sort((a, b) => (b.shared - a.shared) || (a.post.date < b.post.date ? 1 : -1));

  return scored.slice(0, limit).map((s) => s.post);
}
