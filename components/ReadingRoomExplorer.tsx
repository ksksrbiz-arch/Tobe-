"use client";

import React, { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search, X } from "lucide-react";
import Reveal from "@/components/Reveal";

export interface ExplorerPost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  dateIso: string;
  dateLabel: string;
  readingMinutes: number;
}

/**
 * Client-side instant search + tag filtering for the Reading Room index.
 *
 * The full post list renders on the server (initial state = no query, no tag
 * filter → every post), so crawlers and no-JS visitors still get every article
 * link; the filtering is a progressive enhancement layered on top.
 */
export default function ReadingRoomExplorer({
  posts,
  tags,
}: {
  posts: ExplorerPost[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const searchId = useId();

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesTags =
        activeTags.length === 0 || post.tags.some((t) => activeTags.includes(t));
      if (!matchesTags) return false;
      if (!normalizedQuery) return true;
      const haystack =
        `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [posts, activeTags, normalizedQuery]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const clearAll = () => {
    setQuery("");
    setActiveTags([]);
  };

  const hasFilters = normalizedQuery !== "" || activeTags.length > 0;

  return (
    <div>
      {/* Search box */}
      <div className="relative mb-5">
        <label htmlFor={searchId} className="sr-only">
          Search the Reading Room
        </label>
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--purple)" }}
        />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes by title, topic, or keyword…"
          aria-label="Search the Reading Room by title, topic, or keyword"
          className="w-full rounded-2xl border bg-white/80 py-3.5 pl-11 pr-11 text-sm font-medium shadow-sm transition-shadow focus:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple)]"
          style={{ borderColor: "color-mix(in srgb, var(--purple) 16%, transparent)", color: "var(--ink)" }}
          autoComplete="off"
        />
        {query !== "" && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="touch-target absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1.5 transition-colors hover:bg-[color-mix(in srgb, var(--purple) 8%, transparent)]"
            style={{ color: "var(--purple)" }}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span
          className="mr-1 text-xs font-bold uppercase tracking-wider"
          style={{ color: "var(--purple)" }}
        >
          Filter by topic:
        </span>
        {tags.map((tag) => {
          const active = activeTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              aria-pressed={active}
              aria-label={`Filter by ${tag}`}
              className="rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:scale-[1.03] active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
              style={{
                borderColor: active ? "var(--purple)" : "color-mix(in srgb, var(--purple) 15%, transparent)",
                color: active ? "#FFFFFF" : "var(--purple)",
                background: active ? "var(--purple)" : "color-mix(in srgb, var(--purple) 4%, transparent)",
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Result count + clear */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-sm" style={{ color: "var(--muted)" }}>
          {hasFilters ? (
            <>
              Showing <strong style={{ color: "var(--purple-dark)" }}>{filtered.length}</strong> of{" "}
              {posts.length} notes
            </>
          ) : (
            <>
              <strong style={{ color: "var(--purple-dark)" }}>{posts.length}</strong> notes from the shop
            </>
          )}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide transition-opacity hover:opacity-70"
            style={{ color: "var(--purple)" }}
          >
            <X size={13} aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2">
          {filtered.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 70} className="h-full">
                <Link
                  href={`/reading-room/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border bg-white/70 p-6 shadow-sm transition-[transform,box-shadow] duration-[var(--dur-med)] ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  style={{ borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)" }}
                >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                      style={{ background: "color-mix(in srgb, var(--gold) 16%, transparent)", color: "var(--purple)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2
                  className="mb-2 text-xl font-bold leading-snug"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--purple-dark)" }}
                >
                  {post.title}
                </h2>
                <p className="mb-4 flex-1 text-sm leading-6 text-[var(--ink-soft)]">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-3">
                    <time dateTime={post.dateIso}>{post.dateLabel}</time>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      {post.readingMinutes} min read
                    </span>
                  </span>
                  <span
                    className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--purple)" }}
                  >
                    Read
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="rounded-2xl border border-dashed px-6 py-16 text-center"
          style={{ borderColor: "color-mix(in srgb, var(--purple) 20%, transparent)", background: "rgba(255,255,255,0.5)" }}
        >
          <p className="text-base font-semibold" style={{ color: "var(--purple-dark)" }}>
            No notes match your search.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: "var(--muted)" }}>
            Try a different keyword or topic — or clear the filters to see everything.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="btn-primary mt-5 active:scale-95"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
