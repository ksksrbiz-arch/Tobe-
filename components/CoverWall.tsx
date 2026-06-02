"use client";

import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

interface Arrival {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
}

function Cover({ book }: { book: Arrival }) {
  const credit = book.list_price > 0 ? `$${(book.list_price * 0.25).toFixed(2)} credit` : "";
  return (
    <div className="group relative mb-3 break-inside-avoid overflow-hidden rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl">
      {book.cover_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.cover_url}
          alt={book.title}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className="flex aspect-[2/3] w-full items-center justify-center"
          style={{ background: "rgba(107,28,111,0.06)" }}
        >
          <BookOpen size={28} style={{ color: "rgba(107,28,111,0.25)" }} />
        </div>
      )}
      {/* Hover overlay with title/author */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(to top, rgba(42,9,48,0.92) 0%, rgba(42,9,48,0.40) 55%, transparent 100%)" }}
      >
        <p className="text-xs font-bold leading-tight text-white">{book.title}</p>
        {book.author && <p className="mt-0.5 text-[10px] text-white/75">{book.author}</p>}
        {credit && <p className="mt-1 text-[10px] font-semibold" style={{ color: "#F1BB1A" }}>{credit}</p>}
      </div>
    </div>
  );
}

export default function CoverWall({ limit }: { limit?: number }) {
  const [books, setBooks] = useState<Arrival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/recent-arrivals", { cache: "no-store" });
        const data = (await res.json()) as { arrivals: Arrival[] };
        if (!cancelled) setBooks(data.arrivals ?? []);
      } catch {
        if (!cancelled) setBooks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="columns-3 gap-3 sm:columns-4 md:columns-5 lg:columns-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="mb-3 aspect-[2/3] w-full animate-pulse rounded-xl"
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
          The wall is being restocked — check back soon!
        </p>
      </div>
    );
  }

  const shown = limit ? books.slice(0, limit) : books;

  return (
    <div className="columns-3 gap-3 sm:columns-4 md:columns-5 lg:columns-6">
      {shown.map((book) => (
        <Cover key={book.id} book={book} />
      ))}
    </div>
  );
}
