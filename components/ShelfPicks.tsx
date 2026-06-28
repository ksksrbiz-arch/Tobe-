"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import DustMotes from "./DustMotes";
import Tilt from "./Tilt";
import { getMotionSafeScrollBehavior } from "@/lib/motion";

interface Pick {
  id: string;
  /** The short label printed up the spine. */
  spine: string;
  /** Mood title shown on the pulled card. */
  title: string;
  /** A cozy, hand-sell blurb. */
  blurb: string;
  /** A tiny "shelf tag" line. */
  tag: string;
  /** Spine cloth colours (top → bottom of the gradient). */
  from: string;
  to: string;
  /** Foil/lettering colour for the spine. */
  foil: string;
}

// Reading *moods* rather than specific titles — evergreen, and they hand the
// visitor straight to the live AI Matchmaker for a real recommendation.
const PICKS: Pick[] = [
  {
    id: "cozy",
    spine: "Cozy & Comforting",
    title: "Cozy & Comforting",
    blurb:
      "Soft-spoken stories, a cup of something warm, and a happy ending you can lean on. The literary equivalent of a worn armchair by the window.",
    tag: "Rainy-Sunday shelf",
    from: "#7a2a7f",
    to: "#4a1350",
    foil: "#F5CC45",
  },
  {
    id: "thrill",
    spine: "Edge of Your Seat",
    title: "Edge of Your Seat",
    blurb:
      "Twisty thrillers and mysteries that vanish whole evenings. You'll say one more chapter and mean it about as much as you usually do.",
    tag: "Just-one-more-chapter shelf",
    from: "#8c1d2b",
    to: "#4a0f17",
    foil: "#F1BB1A",
  },
  {
    id: "wonder",
    spine: "Worlds & Wonder",
    title: "Worlds & Wonder",
    blurb:
      "Fantasy and science fiction that fold a whole universe between two covers. Pack light — the maps are usually in the front.",
    tag: "Far-away-places shelf",
    from: "#23386b",
    to: "#101d3a",
    foil: "#F5CC45",
  },
  {
    id: "true",
    spine: "True Stories",
    title: "True Stories",
    blurb:
      "Memoir, history, and the kind of nonfiction that makes you grab someone's arm and read a paragraph aloud. Real life, beautifully told.",
    tag: "Tell-me-everything shelf",
    from: "#2f5d43",
    to: "#16301f",
    foil: "#F1BB1A",
  },
  {
    id: "little",
    spine: "Little Readers",
    title: "Little Readers",
    blurb:
      "Picture books, first chapter books, and read-alouds worn soft at the corners. The section where the best dog in the neighbourhood is usually napping.",
    tag: "Story-time shelf",
    from: "#e0a311",
    to: "#a06b06",
    foil: "#4a1350",
  },
  {
    id: "quiet",
    spine: "Poetry & Quiet",
    title: "Poetry & Quiet",
    blurb:
      "Slim volumes of poems and slow, luminous prose for when you want fewer words doing more work. Best read one page at a time.",
    tag: "Take-your-time shelf",
    from: "#3a6a73",
    to: "#1b343a",
    foil: "#F5CC45",
  },
];

export default function ShelfPicks() {
  const [activeId, setActiveId] = useState<string>(PICKS[0].id);
  const firedSparkle = useRef(false);

  const active = PICKS.find((p) => p.id === activeId) ?? PICKS[0];

  const sparkle = useCallback((target: HTMLElement) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (firedSparkle.current) return;
    firedSparkle.current = true;
    window.setTimeout(() => {
      firedSparkle.current = false;
    }, 350);

    const rect = target.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };
    void import("canvas-confetti")
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 14,
          spread: 52,
          startVelocity: 22,
          gravity: 0.9,
          scalar: 0.8,
          ticks: 90,
          origin,
          colors: ["#F1BB1A", "#F5CC45", "#8B2E90", "#FCE8A6"],
          disableForReducedMotion: true,
        });
      })
      .catch(() => {
        /* sparkle is pure decoration — ignore load failures */
      });
  }, []);

  const choose = useCallback(
    (id: string, el: HTMLElement) => {
      setActiveId(id);
      sparkle(el);
    },
    [sparkle],
  );

  const scrollToMatchmaker = useCallback(() => {
    const el = document.querySelector("#next-read");
    if (el) el.scrollIntoView({ behavior: getMotionSafeScrollBehavior(), block: "start" });
  }, []);

  return (
    <section
      aria-labelledby="shelf-picks-heading"
      className="relative overflow-hidden px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, rgba(253,248,240,0.70) 0%, rgba(248,242,255,0.92) 100%)",
      }}
    >
      <DustMotes />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <span
            className="eyebrow-glow inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            Staff Shelf
          </span>
          <h2
            id="shelf-picks-heading"
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
            }}
          >
            Pull a spine, find your <span className="underline-accent">vibe</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6" style={{ color: "#6B7280" }}>
            Not sure what you&apos;re in the mood for? Tap a book on the shelf and we&apos;ll point
            you toward the right corner of the shop.
          </p>
          <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
        </Reveal>

        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* The shelf */}
          <Reveal>
            <div className="shelf" role="group" aria-label="Reading-mood shelf">
              <div
                className="shelf__books"
                role="listbox"
                aria-label="Pick a reading mood"
                aria-activedescendant={`spine-${active.id}`}
              >
                {PICKS.map((pick, i) => {
                  const isActive = pick.id === active.id;
                  return (
                    <button
                      key={pick.id}
                      id={`spine-${pick.id}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={(e) => choose(pick.id, e.currentTarget)}
                      className={`spine ${isActive ? "spine--active" : ""}`}
                      style={
                        {
                          background: `linear-gradient(165deg, ${pick.from} 0%, ${pick.to} 100%)`,
                          color: pick.foil,
                          ["--spine-tilt" as string]: `${(i % 2 === 0 ? -1 : 1) * (1.5 + (i % 3))}deg`,
                        } as React.CSSProperties
                      }
                    >
                      <span className="spine__head" aria-hidden="true" />
                      <span className="spine__label">{pick.spine}</span>
                      <span className="spine__foot" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
              <div className="shelf__board" aria-hidden="true" />
            </div>
          </Reveal>

          {/* The pulled card */}
          <Reveal delay={120}>
            <Tilt className="shelf-card-tilt" max={6} scale={1.015}>
              <div
                aria-live="polite"
                className="shelf-card relative flex h-full flex-col rounded-[28px] border p-7 sm:p-8"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(253,248,240,0.97) 100%)",
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow:
                    "0 30px 70px rgba(107,28,111,0.14), 0 10px 24px rgba(241,187,26,0.08)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: `linear-gradient(165deg, ${active.from} 0%, ${active.to} 100%)`,
                    boxShadow: "0 8px 20px rgba(107,28,111,0.22)",
                  }}
                >
                  <Sparkles size={22} style={{ color: active.foil }} className="mm-sparkle" />
                </span>

                <span
                  className="text-[11px] font-bold uppercase tracking-[0.24em]"
                  style={{ color: "#F1BB1A" }}
                >
                  {active.tag}
                </span>
                <h3
                  className="mt-2 text-2xl font-bold"
                  style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
                  key={active.id /* re-trigger the ink-settle on each change */}
                >
                  <span className="animate-ink-settle inline-block">{active.title}</span>
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "#4B5563" }}>
                  {active.blurb}
                </p>

                <button
                  type="button"
                  onClick={scrollToMatchmaker}
                  className="btn-primary group mt-6 w-fit active:scale-95"
                >
                  Get matched to a title
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>

                <p className="mt-4 text-xs" style={{ color: "#6B7280" }}>
                  Prefer to browse in person?{" "}
                  <Link href="/visit" className="font-semibold underline" style={{ color: "#6B1C6F" }}>
                    Plan a visit
                  </Link>
                  .
                </p>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
