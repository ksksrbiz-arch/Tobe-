"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, BookMarked, Sparkles, X } from "lucide-react";
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
  emoji: string;
  year: string;
  blurb: string;
};

const BOOKS: KingBook[] = [
  { title: "The Dead Zone", emoji: "🔮", year: "1979", blurb: "A touch that sees what's coming" },
  { title: "Christine", emoji: "🚗", year: "1983", blurb: "The car with a jealous streak" },
  { title: "Cujo", emoji: "🐶", year: "1981", blurb: "Man's best friend, turned" },
  { title: "Firestarter", emoji: "🔥", year: "1980", blurb: "A little girl, a big spark" },
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
    <>
      <style>{`
        @keyframes kingFlicker {
          0%, 100% { opacity: 0.85; }
          45%      { opacity: 1; }
          50%      { opacity: 0.7; }
          55%      { opacity: 1; }
        }
        @keyframes kingFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-king-animated="true"] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section
        className="relative overflow-hidden px-4 py-10 sm:py-14 sm:px-6 lg:px-8"
        aria-label="Rare Stephen King hardcovers just arrived"
        style={{
          background:
            "radial-gradient(ellipse at 18% 20%, rgba(241,187,26,0.16) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(178,34,34,0.30) 0%, transparent 52%), linear-gradient(150deg, #15090f 0%, #1d0b12 45%, #0f0a14 100%)",
        }}
      >
        {/* Dismiss */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss Stephen King banner"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
        >
          <X size={15} />
        </button>

        {/* Soft vignette */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Left: pitch */}
            <Reveal>
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em]"
                    style={{
                      background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                      color: "#15090f",
                    }}
                  >
                    <Sparkles size={10} />
                    Rare Arrival
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em]"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}
                  >
                    Limited time · in store now
                  </span>
                </div>

                <h2
                  className="font-black leading-[1.05]"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                    color: "white",
                  }}
                >
                  Vintage{" "}
                  <span
                    style={{ color: "#F1BB1A", animation: "kingFlicker 4s ease-in-out infinite" }}
                    data-king-animated="true"
                  >
                    Stephen King
                  </span>{" "}
                  hardcovers
                </h2>

                <p
                  className="mt-3 text-sm font-bold uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,120,120,0.9)" }}
                >
                  Hard-to-find book club editions
                </p>

                <p className="mt-4 max-w-md text-sm leading-7" style={{ color: "rgba(255,255,255,0.66)" }}>
                  We just shelved a haunted little stack of rare King — original
                  book club edition hardcovers of <em>The Dead Zone</em>,{" "}
                  <em>Christine</em>, <em>Cujo</em>, and <em>Firestarter</em>.
                  Once they&apos;re gone, they&apos;re gone.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="#visit"
                    className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold shadow-xl transition-all duration-300 hover:scale-[1.04]"
                    style={{
                      background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                      color: "#15090f",
                      boxShadow: "0 0 26px rgba(241,187,26,0.35), 0 8px 22px rgba(0,0,0,0.4)",
                    }}
                  >
                    Come grab them in store
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    <BookMarked size={13} />
                    Here for a few days only
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Right: the four books */}
            <Reveal delay={120}>
              <ul className="grid grid-cols-2 gap-3 sm:gap-4">
                {BOOKS.map((book, i) => (
                  <li
                    key={book.title}
                    className="relative overflow-hidden rounded-[20px] p-4 sm:p-5"
                    data-king-animated="true"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(0,0,0,0.45) 100%)",
                      border: "1px solid rgba(241,187,26,0.18)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                      animation: "kingFloat 6s ease-in-out infinite",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    <span className="block text-3xl sm:text-4xl" aria-hidden="true">
                      {book.emoji}
                    </span>
                    <p
                      className="mt-3 text-sm font-bold leading-snug sm:text-base"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "white" }}
                    >
                      {book.title}
                    </p>
                    <p
                      className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: "#F1BB1A" }}
                    >
                      {book.year} · BCE
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {book.blurb}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
