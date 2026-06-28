"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, BookOpen, Radio } from "lucide-react";
import JsonLd from "@/components/JsonLd";

interface RecentArrival {
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

function formatLabel(format?: string) {
  if (!format) return "";
  return format
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function seriesLabel(book: RecentArrival) {
  if (!book.series) return "";
  return book.series_number
    ? `${book.series} #${book.series_number}`
    : book.series;
}

// Short, human-readable genre tag derived from the internal category slug so
// the cover can carry a clean label (e.g. "thriller_psychological" → "Thriller").
function genreLabel(category?: string) {
  if (!category) return "";
  if (category.startsWith("thriller")) return "Thriller";
  if (category === "literary_classic") return "Classic";
  if (category === "literary_nonfiction") return "Nonfiction";
  if (category.startsWith("literary")) return "Fiction";
  if (category.startsWith("romance")) return "Romance";
  if (category.startsWith("fantasy")) return "Fantasy";
  if (category.startsWith("historical")) return "Historical";
  if (category === "science_fiction") return "Sci-Fi";
  const first = category.split("_")[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

const POLL_INTERVAL_MS = 15_000;
const NEW_ITEM_HIGHLIGHT_DURATION_MS = 8_000;

// Memoized: the feed re-renders on every 15s poll and whenever the "Just in"
// highlight set changes, but a card only needs to re-render when its own `book`
// or `isNew` flag changes. Wrapping in React.memo skips re-rendering (and
// re-decoding cover images for) the many unchanged cards in the grid.
const BookCard = React.memo(function BookCard({
  book,
  isNew,
}: {
  book: RecentArrival;
  isNew: boolean;
}) {
  const [coverFailed, setCoverFailed] = useState(false);
  const showCover = Boolean(book.cover_url) && !coverFailed;
  const genre = genreLabel(book.category);
  const credit = book.list_price > 0 ? book.list_price * 0.25 : 0;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border card-cozy"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #fdf8f0 100%)",
        borderColor: "rgba(107,28,111,0.10)",
        boxShadow: "var(--shadow-sm)",
        animation: isNew ? "fadeInUp 0.6s var(--ease-out) both" : undefined,
      }}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden" style={{ background: "rgba(107,28,111,0.06)" }}>
        {showCover ? (
          <Image
            src={book.cover_url}
            alt={`${book.title} cover`}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            loading="lazy"
            onError={() => setCoverFailed(true)}
          />
        ) : (
          // Graceful fallback: a styled spine showing the title so a missing
          // cover still reads as a book rather than a broken image.
          <div
            className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center"
            style={{ background: "linear-gradient(155deg, #6B1C6F 0%, #4A1350 100%)" }}
          >
            <BookOpen size={26} style={{ color: "rgba(241,187,26,0.85)" }} />
            <p
              className="line-clamp-4 text-[11px] font-bold leading-tight text-white/95"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {book.title}
            </p>
          </div>
        )}

        {/* Bottom scrim so overlaid chips stay legible on any cover */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(180deg, transparent, rgba(31,26,46,0.55))" }}
        />

        {isNew && (
          <span
            className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm"
            style={{ background: "#F1BB1A", color: "#1a1a1a" }}
          >
            <Sparkles size={9} /> Just in
          </span>
        )}

        {genre && (
          <span
            className="absolute bottom-2 left-2 z-10 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm"
            style={{ background: "rgba(107,28,111,0.78)" }}
          >
            {genre}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p
          className="line-clamp-2 text-xs font-bold leading-tight"
          style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
        >
          {book.title}
        </p>
        <p className="mt-0.5 truncate text-[10px]" style={{ color: "#6B7280" }}>
          {book.author}
          {book.co_author ? ` & ${book.co_author}` : ""}
        </p>
        {seriesLabel(book) && (
          <p className="mt-0.5 truncate text-[9px] italic" style={{ color: "rgba(107,28,111,0.75)" }}>
            {seriesLabel(book)}
          </p>
        )}
        {(book.pub_year || book.format) && (
          <p className="mt-0.5 truncate text-[9px]" style={{ color: "#6B7280" }}>
            {[formatLabel(book.format), book.pub_year].filter(Boolean).join(" • ")}
          </p>
        )}

        {credit > 0 && (
          <span
            className="mt-2 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{ background: "rgba(241,187,26,0.18)", color: "#9A6B00" }}
            title="Estimated store credit toward your next trade"
          >
            ${credit.toFixed(2)} credit
          </span>
        )}
      </div>
    </article>
  );
});

export default function JustShelvedFeed() {
  const [books, setBooks] = useState<RecentArrival[]>([]);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const newIdsRef = useRef<Set<string>>(new Set());

  const fetchArrivals = useCallback(async (markNew: boolean) => {
    try {
      const res = await fetch("/api/recent-arrivals");
      if (!res.ok) {
        setLive(false);
        return;
      }
      const payload = (await res.json()) as { arrivals: RecentArrival[] };
      const arrivals = payload.arrivals ?? [];
      setLive(true);

      if (markNew && knownIdsRef.current.size > 0) {
        for (const a of arrivals) {
          if (!knownIdsRef.current.has(a.id)) {
            newIdsRef.current.add(a.id);
            const id = a.id;
            setTimeout(() => {
              newIdsRef.current.delete(id);
              setNewIds(new Set(newIdsRef.current));
            }, NEW_ITEM_HIGHLIGHT_DURATION_MS);
          }
        }
        setNewIds(new Set(newIdsRef.current));
      }
      knownIdsRef.current = new Set(arrivals.map((a) => a.id));
      setBooks(arrivals);
    } catch {
      setLive(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await fetchArrivals(false);
      if (!cancelled) setLoading(false);
    })();
    const interval = setInterval(() => {
      if (!cancelled) void fetchArrivals(true);
    }, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [fetchArrivals]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] w-full animate-pulse rounded-2xl"
            style={{ background: "rgba(107,28,111,0.07)" }}
          />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 text-center"
        style={{ borderColor: "rgba(107,28,111,0.15)" }}
      >
        <BookOpen size={36} style={{ color: "rgba(107,28,111,0.30)" }} />
        <p className="mt-4 text-sm font-medium" style={{ color: "#6B7280" }}>
          No arrivals yet — check back soon!
        </p>
      </div>
    );
  }

  // Structured data so individual arrivals can surface in search. Rendered only
  // below (where books.length > 0 is guaranteed), so the ItemList is never empty.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Just Shelved at To Be Read",
    itemListElement: books.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Book",
        name: b.title,
        author: { "@type": "Person", name: b.author },
        ...(b.cover_url ? { image: b.cover_url } : {}),
      },
    })),
  };

  return (
    <div>
      <JsonLd data={itemList} />
      <div className="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
          style={{
            background: live ? "rgba(34,197,94,0.12)" : "rgba(107,28,111,0.08)",
            color: live ? "#16a34a" : "#6B7280",
          }}
        >
          <span
            className="relative flex h-2 w-2"
            aria-hidden="true"
          >
            {live && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: "#22c55e" }}
              />
            )}
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: live ? "#22c55e" : "#9CA3AF" }}
            />
          </span>
          {live ? "Live feed" : "Connecting…"}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
          style={{ background: "rgba(107,28,111,0.06)", color: "#6B1C6F" }}
        >
          <BookOpen size={12} />
          {books.length} on the shelf
        </span>
        <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#6B7280" }}>
          <Radio size={12} /> Refreshes every 15s
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} isNew={newIds.has(book.id)} />
        ))}
      </div>
    </div>
  );
}

export function JustShelvedSection() {
  return (
    <section
      id="just-shelved"
      className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 10% 80%, rgba(241,187,26,0.08), transparent 40%), radial-gradient(circle at 90% 10%, rgba(107,28,111,0.06), transparent 42%), linear-gradient(180deg, #FFFDF9 0%, #FDF8F0 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span
            className="eyebrow-glow inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            <Sparkles size={12} />
            Just Shelved
          </span>
          <h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
            }}
          >
            Fresh arrivals at the <span className="underline-accent">trade desk</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
            Every title here is on our shelves right now — newly traded in and ready to take home.
            Bring books of your own and earn store credit toward whatever catches your eye.
          </p>
          <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
        </div>
        <JustShelvedFeed />
      </div>
    </section>
  );
}
