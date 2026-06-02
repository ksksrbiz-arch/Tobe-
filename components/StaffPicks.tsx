"use client";

import React, { useEffect, useState } from "react";
import { Star, BookOpen } from "lucide-react";
import Reveal from "./Reveal";

interface Pick {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  list_price: number;
  pick_note: string;
}

function PickCard({ pick }: { pick: Pick }) {
  return (
    <div
      className="card-cozy flex h-full flex-col overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: "rgba(107,28,111,0.10)", boxShadow: "0 10px 28px rgba(107,28,111,0.08)" }}
    >
      <div className="flex gap-4 p-4">
        <div className="relative flex-shrink-0">
          {pick.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pick.cover_url}
              alt={pick.title}
              className="h-28 w-20 rounded-lg object-cover shadow-md"
            />
          ) : (
            <div
              className="flex h-28 w-20 items-center justify-center rounded-lg"
              style={{ background: "rgba(107,28,111,0.06)" }}
            >
              <BookOpen size={24} style={{ color: "rgba(107,28,111,0.3)" }} />
            </div>
          )}
          <span
            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full shadow-md"
            style={{ background: "#F1BB1A" }}
          >
            <Star size={14} fill="#6B1C6F" style={{ color: "#6B1C6F" }} />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
          >
            {pick.title}
          </h3>
          {pick.author && (
            <p className="mt-0.5 text-xs" style={{ color: "#6B7280" }}>
              {pick.author}
            </p>
          )}
          {pick.pick_note && (
            <p className="mt-2 text-sm italic leading-relaxed" style={{ color: "#4B5563" }}>
              “{pick.pick_note}”
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StaffPicks() {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/staff-picks", { cache: "no-store" });
        const data = (await res.json()) as { picks: Pick[] };
        if (!cancelled) setPicks(data.picks ?? []);
      } catch {
        if (!cancelled) setPicks([]);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Hide the whole section until there's at least one pick.
  if (!loaded || picks.length === 0) return null;

  return (
    <section
      id="staff-picks"
      className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 90% 0%, rgba(241,187,26,0.10), transparent 42%), linear-gradient(180deg, #FFFDF9 0%, #FDF8F0 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            <Star size={12} />
            Staff Picks
          </span>
          <h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
            }}
          >
            Books we&apos;re <span className="underline-accent">loving</span> right now
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6" style={{ color: "#6B7280" }}>
            Hand-picked favorites from behind the counter — ask us about any of them when you visit.
          </p>
          <div className="accent-bar mx-auto mt-4 h-1 w-16 rounded-full" />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick, i) => (
            <Reveal key={pick.id} delay={i * 70}>
              <PickCard pick={pick} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
