import type { ComponentType } from "react";

/**
 * The Reading Room — a lightweight, dependency-free blog.
 *
 * Each post lives in `content/reading-room/<file>.tsx` and exports:
 *   - `meta`:    a BlogMeta object (the data the hub/SEO needs)
 *   - default:   a `Body` component rendering the article HTML
 *
 * Posts are registered in the `posts` array below. This keeps content
 * type-safe and statically analyzable (no markdown runtime, no MDX build step)
 * while staying simple enough for staff to copy an existing post as a template.
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
};

export type BlogPost = BlogMeta & { Body: ComponentType };

import { meta as tradeInMeta, default as TradeInBody } from "@/content/reading-room/how-trade-in-credit-works";
import { meta as visitMeta, default as VisitBody } from "@/content/reading-room/used-bookstore-milwaukie-portland";

const registry: BlogPost[] = [
  { ...tradeInMeta, Body: TradeInBody },
  { ...visitMeta, Body: VisitBody },
];

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
