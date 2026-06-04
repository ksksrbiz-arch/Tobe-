"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, X } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Limited-time banner showing off a rare batch of Stephen King book club
 * edition hardcovers that just arrived in the store.
 *
 * It is meant to run for a short window only: once `EXPIRES_AT` passes the
 * banner removes itself automatically (renders nothing). It can also be
 * dismissed by the visitor, which is remembered in localStorage.
 *
 * Posted 2026-06-04 — set to disappear after the next 3 days.
 */
const EXPIRES_AT = new Date("2026-06-08T00:00:00").getTime();
const DISMISS_KEY = "tbr-stephen-king-banner-dismissed";

type KingBook = {
  title: string;
  year: string;
  cover: string;
};

const BOOKS: KingBook[] = [
  { title: "The Dead Zone", year: "1979", cover: "/images/king/the-dead-zone.jpg" },
  { title: "Christine", year: "1983", cover: "/images/king/christine.jpg" },
  { title: "Cujo", year: "1981", cover: "/images/king/cujo.jpg" },
  { title: "Firestarter", year: "1980", cover: "/images/king/firestarter.jpg" },
];

export default function StephenKingBanner() {
  // `visible` starts `null` (undecided) so nothing renders on the server or
  // the first client paint — that avoids a hydration mismatch, since the
  // decision depends on the current time and localStorage, neither of which
  // exist during SSR.
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    // Run the time/storage checks off the render path (a helper, not a direct
    // synchronous setState in the effect body) and decide visibility once.
    const evaluate = () => {
      if (Date.now() >= EXPIRES_AT) {
        setVisible(false);
        return;
      }
      try {
        setVisible(window.localStorage.getItem(DISMISS_KEY) !== "1");
      } catch {
        // Storage blocked (private mode, etc.) — show the banner anyway.
        setVisible(true);
      }
    };
    evaluate();
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Best-effort only.
    }
  };

  if (!visible) return null;

  return (
    <section
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-label="Rare Stephen King hardcovers just arrived"
      style={{
        background:
          "radial-gradient(ellipse at 50% -10%, rgba(241,187,26,0.10) 0%, transparent 55%), linear-gradient(165deg, #2a0930 0%, #1c0a24 50%, #120816 100%)",
      }}
    >
      {/* Dismiss */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss Stephen King banner"
        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}
      >
        <X size={15} />
      </button>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left: pitch */}
        <Reveal>
          <div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{
                background: "rgba(241,187,26,0.12)",
                color: "#F1BB1A",
                border: "1px solid rgba(241,187,26,0.25)",
              }}
            >
              <Sparkles size={11} />
              Just Shelved · Rare Find
            </span>

            <h2
              className="mt-5 font-bold leading-[1.08]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                color: "white",
              }}
            >
              Vintage Stephen King hardcovers
            </h2>

            <p className="mt-4 max-w-md text-[15px] leading-7" style={{ color: "rgba(255,255,255,0.62)" }}>
              Hard-to-find book club edition hardcovers of four King classics —
              now in store. Once they&apos;re gone, they&apos;re gone.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#visit"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform duration-200 hover:scale-[1.03]"
                style={{
                  background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                  color: "#1c0a24",
                  boxShadow: "0 10px 28px rgba(241,187,26,0.28)",
                }}
              >
                Come grab them in store
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                Here for a few days only
              </span>
            </div>
          </div>
        </Reveal>

        {/* Right: the four real covers, like a little shelf */}
        <Reveal delay={120}>
          <ul className="grid grid-cols-4 gap-3 sm:gap-4">
            {BOOKS.map((book) => (
              <li key={book.title} className="group flex flex-col">
                <div
                  className="relative aspect-[2/3] w-full overflow-hidden rounded-md transition-transform duration-300 group-hover:-translate-y-1.5"
                  style={{
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.12) inset, 0 18px 34px rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Image
                    src={book.cover}
                    alt={`${book.title} by Stephen King — ${book.year} book club edition cover`}
                    fill
                    sizes="(min-width: 1280px) 160px, (min-width: 1024px) 14vw, (min-width: 640px) 21vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <p
                  className="mt-2.5 truncate text-[11px] font-semibold leading-tight sm:text-xs"
                  style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.92)" }}
                  title={book.title}
                >
                  {book.title}
                </p>
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(241,187,26,0.85)" }}
                >
                  {book.year} · Book Club Ed.
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
