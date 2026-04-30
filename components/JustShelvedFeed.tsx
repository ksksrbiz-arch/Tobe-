"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sparkles, BookOpen } from "lucide-react";
import { supabase, type RecentArrival } from "@/lib/supabase";

const NEW_ITEM_HIGHLIGHT_DURATION_MS = 8_000;

function BookCard({ book, isNew }: { book: RecentArrival; isNew: boolean }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-2xl"
      style={{
        background: "white",
        borderColor: "rgba(107,28,111,0.10)",
        boxShadow: "0 8px 24px rgba(107,28,111,0.08)",
        animation: isNew ? "fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both" : undefined,
      }}
    >
      {isNew && (
        <span
          className="absolute left-2 top-2 z-10 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
          style={{ background: "#F1BB1A", color: "#1a1a1a" }}
        >
          Just in!
        </span>
      )}
      <div className="aspect-[2/3] w-full overflow-hidden bg-gradient-to-b" style={{ background: "rgba(107,28,111,0.06)" }}>
        {book.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover_url}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen size={32} style={{ color: "rgba(107,28,111,0.25)" }} />
          </div>
        )}
      </div>
      <div className="p-3">
        <p
          className="line-clamp-2 text-xs font-bold leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
        >
          {book.title}
        </p>
        <p className="mt-0.5 truncate text-[10px]" style={{ color: "#6B7280" }}>
          {book.author}
        </p>
        {book.list_price > 0 && (
          <p className="mt-1 text-[10px] font-semibold" style={{ color: "#F1BB1A" }}>
            Credit: ${(book.list_price * 0.25).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default function JustShelvedFeed() {
  const [books, setBooks] = useState<RecentArrival[]>([]);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const newIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Initial fetch of the last 20 arrivals
    async function fetchInitial() {
      const { data, error } = await supabase
        .from("recent_arrivals")
        .select("*")
        .order("added_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setBooks(data as RecentArrival[]);
      }
      setLoading(false);
    }
    fetchInitial();

    // Subscribe to realtime inserts
    const channel = supabase
      .channel("recent_arrivals_feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "recent_arrivals" },
        (payload) => {
          const newBook = payload.new as RecentArrival;
          setBooks((prev) => [newBook, ...prev.slice(0, 19)]);
          const next = new Set(newIdsRef.current).add(newBook.id);
          newIdsRef.current = next;
          setNewIds(new Set(next));
          // Remove "new" highlight after the configured duration
          setTimeout(() => {
            newIdsRef.current.delete(newBook.id);
            setNewIds(new Set(newIdsRef.current));
          }, NEW_ITEM_HIGHLIGHT_DURATION_MS);
        },
      )
      .subscribe((status) => {
        setConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  return (
    <div>
      {/* Live status pill */}
      <div className="mb-4 flex items-center gap-2">
        <span
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
          style={{
            background: connected ? "rgba(34,197,94,0.12)" : "rgba(107,28,111,0.08)",
            color: connected ? "#16a34a" : "#6B7280",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: connected ? "#22c55e" : "#9CA3AF",
              boxShadow: connected ? "0 0 6px rgba(34,197,94,0.7)" : undefined,
            }}
          />
          {connected ? "Live" : "Loading…"}
        </span>
        <span className="text-xs" style={{ color: "#9CA3AF" }}>
          Updates in real time as books arrive
        </span>
      </div>

      {/* Masonry-style grid */}
      <div className="columns-3 gap-3 sm:columns-4 md:columns-5 lg:columns-6">
        {books.map((book) => (
          <div key={book.id} className="mb-3 break-inside-avoid">
            <BookCard book={book} isNew={newIds.has(book.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact section wrapper for homepage embedding
export function JustShelvedSection() {
  return (
    <section
      id="just-shelved"
      className="px-4 py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 10% 80%, rgba(241,187,26,0.08), transparent 40%), linear-gradient(180deg, #FFFDF9 0%, #FDF8F0 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            <Sparkles size={12} />
            Just Shelved
          </span>
          <h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
            }}
          >
            Fresh arrivals at the <span className="underline-accent">trade desk</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
            Watch books arrive in real time as our staff processes today&apos;s trades.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
        </div>
        <JustShelvedFeed />
      </div>
    </section>
  );
}
