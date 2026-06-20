import type { ComponentType } from "react";

/**
 * The Reading Room — a lightweight, dependency-free blog.
 *
 * Each post lives in `content/reading-room/<file>.tsx` and exports:
 *   - `meta`:    a BlogMeta object (the data the hub/SEO needs)
 *   - default:   a `Body` component rendering the article HTML
 *
 * Posts are registered in the `registry` array below. This keeps content
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
import { meta as secretHistoryMeta, default as SecretHistoryBody } from "@/content/reading-room/books-like-the-secret-history";
import { meta as cozyMeta, default as CozyBody } from "@/content/reading-room/cozy-mystery-starter-shelf";
import { meta as tradePortlandMeta, default as TradePortlandBody } from "@/content/reading-room/where-to-trade-used-books-portland";
import { meta as tbrHabitMeta, default as TbrHabitBody } from "@/content/reading-room/build-your-tbr-reading-habit";
import { meta as crawdadsMeta, default as CrawdadsBody } from "@/content/reading-room/books-like-where-the-crawdads-sing";
import { meta as fantasyMeta, default as FantasyBody } from "@/content/reading-room/fantasy-books-for-beginners";
import { meta as giftsMeta, default as GiftsBody } from "@/content/reading-room/gifts-for-book-lovers";
import { meta as cryMeta, default as CryBody } from "@/content/reading-room/literary-fiction-that-makes-you-cry";
import { meta as phmMeta, default as PhmBody } from "@/content/reading-room/books-like-project-hail-mary";
import { meta as romanceMeta, default as RomanceBody } from "@/content/reading-room/romance-for-people-who-dont-read-romance";
import { meta as memoirMeta, default as MemoirBody } from "@/content/reading-room/best-memoirs-to-start-with";
import { meta as shortMeta, default as ShortBody } from "@/content/reading-room/short-books-for-a-weekend";
import { meta as duneMeta, default as DuneBody } from "@/content/reading-room/books-like-dune";
import { meta as thrillerMeta, default as ThrillerBody } from "@/content/reading-room/best-thriller-books";
import { meta as classicsMeta, default as ClassicsBody } from "@/content/reading-room/classic-novels-everyone-should-read";
import { meta as kidsMeta, default as KidsBody } from "@/content/reading-room/best-chapter-books-for-kids";
import { meta as romantasyMeta, default as RomantasyBody } from "@/content/reading-room/best-romantasy-books";
import { meta as fourthWingMeta, default as FourthWingBody } from "@/content/reading-room/books-like-fourth-wing";
import { meta as classicRomanceMeta, default as ClassicRomanceBody } from "@/content/reading-room/best-classic-romance-novels";
import { meta as classicFantasyMeta, default as ClassicFantasyBody } from "@/content/reading-room/classic-fantasy-novels";

const registry: BlogPost[] = [
  { ...tradeInMeta, Body: TradeInBody },
  { ...visitMeta, Body: VisitBody },
  { ...secretHistoryMeta, Body: SecretHistoryBody },
  { ...cozyMeta, Body: CozyBody },
  { ...tradePortlandMeta, Body: TradePortlandBody },
  { ...tbrHabitMeta, Body: TbrHabitBody },
  { ...crawdadsMeta, Body: CrawdadsBody },
  { ...fantasyMeta, Body: FantasyBody },
  { ...giftsMeta, Body: GiftsBody },
  { ...cryMeta, Body: CryBody },
  { ...phmMeta, Body: PhmBody },
  { ...romanceMeta, Body: RomanceBody },
  { ...memoirMeta, Body: MemoirBody },
  { ...shortMeta, Body: ShortBody },
  { ...duneMeta, Body: DuneBody },
  { ...thrillerMeta, Body: ThrillerBody },
  { ...classicsMeta, Body: ClassicsBody },
  { ...kidsMeta, Body: KidsBody },
  { ...romantasyMeta, Body: RomantasyBody },
  { ...fourthWingMeta, Body: FourthWingBody },
  { ...classicRomanceMeta, Body: ClassicRomanceBody },
  { ...classicFantasyMeta, Body: ClassicFantasyBody },
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
