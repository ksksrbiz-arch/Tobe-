"use client";

import React, { useState } from "react";
import { BookOpen, Music4, Smile, Sparkles, Baby } from "lucide-react";
import Reveal from "./Reveal";

const authors = [
  "Bo Mandoe",
  "J.M. Fickling",
  "G.T. Diehl",
  "Dan Asher",
  "Brian Landsberger",
  "Jessica Seiders",
  "Dare Edwards",
  "Kait Rowland",
  "Jesus Cervantes",
  "Marie Luce",
];

const cozyHighlights = [
  {
    icon: Baby,
    title: "A groundbreaking kids' room",
    text: "Built to spark young imaginations — low shelves, big windows, and just the right amount of mischief.",
  },
  {
    icon: Music4,
    title: "Live band, once a month",
    text: "Real instruments, real neighbors, and the rhythm of the place humming late into the evening.",
  },
  {
    icon: Smile,
    title: "Friendly, knowing staff",
    text: "We actually read the books. Tell us a vibe and we'll point you to your next favorite.",
  },
];

/**
 * Whimsical author spotlight — Lemmy the Leprechaun (from "Enchanted Bookstore")
 * and the local anthology "Beowolfs of the Webs."
 * Includes a tiny clover easter egg that reveals a quiet "Lemmy was here." note.
 */
export default function LemmyFeatureSection() {
  const [foundClover, setFoundClover] = useState(false);

  return (
    <section
      id="featured-author"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 12% 10%, rgba(241,187,26,0.16), transparent 35%), radial-gradient(circle at 88% 90%, rgba(107,28,111,0.18), transparent 38%), linear-gradient(180deg, #FDF8F0 0%, #FFF7EC 60%, #F5EAFB 100%)",
      }}
    >
      {/* Gentle floating ornaments */}
      <span
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(241,187,26,0.22)" }}
      />
      <span
        aria-hidden="true"
        className="animate-float pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(107,28,111,0.18)" }}
      />

      {/* Dashed arcs, similar to the hero decoration */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-10 hidden opacity-30 md:block"
        width="180"
        height="180"
        viewBox="0 0 180 180"
      >
        <path
          d="M10 90 A80 80 0 0 1 170 90"
          stroke="#6B1C6F"
          strokeWidth="1.4"
          strokeDasharray="4 8"
          fill="none"
        />
        <path
          d="M30 90 A60 60 0 0 1 150 90"
          stroke="#F1BB1A"
          strokeWidth="1.4"
          strokeDasharray="4 8"
          fill="none"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]"
            style={{ background: "rgba(241,187,26,0.20)", color: "#6B1C6F" }}
          >
            <Sparkles size={12} />
            A whisper from the shelves
          </span>
          <h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5.2vw, 3rem)",
              lineHeight: 1.05,
            }}
          >
            Lemmy left a hint or two —{" "}
            <span className="underline-accent">we left a whole shelf.</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-balance text-base leading-7"
            style={{ color: "#4B5563" }}
          >
            There&apos;s a little mischief in the air, and if you listen closely, you just might hear
            the soft footfall of <strong style={{ color: "#6B1C6F" }}>Lemmy the Leprechaun</strong> —
            the bright-hearted wanderer who first stepped onto the page in our own story inside{" "}
            <em>Enchanted Bookstore</em>. With a wink, a story, and maybe a secret or two tucked
            beneath his cap, Lemmy reminds us that the best places are full of wonder, warmth, and
            the occasional hidden treasure.
          </p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: prose + featured title card */}
          <Reveal>
            <div className="flex h-full flex-col gap-6">
              <div
                className="rounded-[28px] border p-7 backdrop-blur"
                style={{
                  background: "rgba(255,255,255,0.86)",
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow: "0 22px 50px rgba(107,28,111,0.10)",
                }}
              >
                <p className="text-sm leading-7" style={{ color: "#4B5563" }}>
                  That spirit feels right at home here.
                </p>
                <p className="mt-4 text-sm leading-7" style={{ color: "#4B5563" }}>
                  Lemmy first wandered onto the page in our own story inside{" "}
                  <strong style={{ color: "#6B1C6F" }}>Enchanted Bookstore</strong> — a small bit of
                  shop lore made literal. We&apos;re also proud to celebrate the local storytellers
                  in the marvelous anthology{" "}
                  <strong style={{ color: "#6B1C6F" }}>Beowolfs of the Webs</strong>: a collection
                  that invites curious readers to look twice, smile knowingly, and catch a few
                  clever hat tips along the way.
                </p>
                <p className="mt-4 text-sm leading-7" style={{ color: "#4B5563" }}>
                  And if you&apos;re new here, all the better — we love meeting new faces. Around
                  here, every visit feels a bit like the start of a story, and every reader might
                  just stumble onto something unexpected.
                </p>
                <p
                  className="mt-5 inline-flex items-center gap-2 text-sm italic"
                  style={{ color: "#6B1C6F" }}
                >
                  <Sparkles size={14} />
                  So come by, follow the hints, and see what treasures you discover. Lemmy would
                  approve.
                </p>
              </div>

              {/* Featured title card */}
              <div
                className="cozy-lift relative overflow-hidden rounded-[28px] border p-7"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(107,28,111,0.97) 0%, rgba(74,19,80,0.97) 100%)",
                  borderColor: "rgba(241,187,26,0.20)",
                  boxShadow: "0 28px 64px rgba(107,28,111,0.22)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="animate-float-slow pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl"
                  style={{ background: "rgba(241,187,26,0.30)" }}
                />
                <div className="relative">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em]"
                    style={{ background: "rgba(241,187,26,0.20)", color: "#F1BB1A" }}
                  >
                    <BookOpen size={11} />
                    Featured title
                  </span>
                  <h3
                    className="mt-4 text-3xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.1 }}
                  >
                    Beowolfs of the Webs
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    A marvelous local anthology full of clever hat tips and easter eggs — the kind
                    of collection that rewards a slow second read. (Lemmy himself lives next door,
                    in our story inside <em>Enchanted Bookstore</em>.)
                  </p>

                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/60">
                      Stories by
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/85">{authors.join(" · ")}</p>
                  </div>

                  <div
                    className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-[11px] uppercase tracking-[0.22em] text-white/60"
                    style={{ borderColor: "rgba(255,255,255,0.14)" }}
                  >
                    <span>
                      ISBN <span className="text-white/85">9798988122944</span>
                    </span>
                    <span>Local authors</span>
                    <span>Ask a bookseller</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: whimsy + cozy highlights */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-6">
              <div
                className="relative overflow-hidden rounded-[28px] border p-7"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(253,248,240,0.96) 100%)",
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow: "0 22px 50px rgba(107,28,111,0.10)",
                }}
              >
                {/* Whimsical Lemmy vignette */}
                <div className="flex items-start gap-5">
                  <div
                    aria-hidden="true"
                    className="relative flex h-20 w-20 flex-none items-center justify-center rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(241,187,26,0.20) 0%, rgba(107,28,111,0.16) 100%)",
                    }}
                  >
                    {/* Hat + clover SVG */}
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                      className="animate-float-slow"
                    >
                      {/* Hat brim */}
                      <rect x="6" y="36" width="44" height="6" rx="2" fill="#4A1350" />
                      {/* Hat top */}
                      <rect x="14" y="14" width="28" height="22" rx="3" fill="#6B1C6F" />
                      {/* Hat band */}
                      <rect x="14" y="30" width="28" height="6" fill="#1F1A2E" />
                      {/* Buckle */}
                      <rect
                        x="25"
                        y="30"
                        width="6"
                        height="6"
                        fill="none"
                        stroke="#F1BB1A"
                        strokeWidth="1.6"
                      />
                      {/* Clover */}
                      <g transform="translate(34 8)">
                        <circle cx="0" cy="-3" r="3" fill="#F1BB1A" />
                        <circle cx="3" cy="0" r="3" fill="#F5CC45" />
                        <circle cx="0" cy="3" r="3" fill="#F1BB1A" />
                        <circle cx="-3" cy="0" r="3" fill="#F5CC45" />
                        <line x1="0" y1="0" x2="-2" y2="6" stroke="#4A1350" strokeWidth="1" />
                      </g>
                    </svg>
                  </div>

                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.28em]"
                      style={{ color: "#6B1C6F" }}
                    >
                      Cozy legend
                    </p>
                    <h3
                      className="mt-1 text-xl font-bold"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "#6B1C6F",
                      }}
                    >
                      A shop that hums a little louder than most.
                    </h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "#4B5563" }}>
                      Whether you come in chasing a whisper of magic, a good story, or just a good
                      recommendation — you&apos;ll find a warm welcome waiting.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  {cozyHighlights.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl p-4 transition-colors"
                      style={{ background: "rgba(241,187,26,0.08)" }}
                    >
                      <div
                        className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(107,28,111,0.12) 0%, rgba(241,187,26,0.18) 100%)",
                        }}
                      >
                        <item.icon size={18} style={{ color: "#6B1C6F" }} />
                      </div>
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "#6B1C6F", fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-5" style={{ color: "#4B5563" }}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Easter egg: the four-leaf clover */}
                <button
                  type="button"
                  onClick={() => setFoundClover(true)}
                  aria-label="A tiny clover hides in the corner"
                  className="absolute bottom-3 right-3 rounded-full p-1.5 transition-transform hover:scale-125 focus-visible:scale-125"
                  style={{
                    color: foundClover ? "#F1BB1A" : "rgba(107,28,111,0.35)",
                    animation: foundClover ? "wiggle 1.4s ease-in-out infinite" : "twinkle 4s ease-in-out infinite",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2c1.5 1.5 3 3 3 5s-1.5 3-3 3-3-1-3-3 1.5-3.5 3-5zm0 11c-1.5-1.5-3-3-5-3s-3 1.5-3 3 1 3 3 3 3.5-1.5 5-3zm0 0c1.5-1.5 3-3 5-3s3 1.5 3 3-1 3-3 3-3.5-1.5-5-3zm0 0c1.5 1.5 3 3 3 5s-1.5 3-3 3-3-1-3-3 1.5-3.5 3-5z" />
                  </svg>
                </button>

                {foundClover && (
                  <div
                    className="absolute bottom-12 right-3 rounded-xl border px-3 py-2 text-[11px] font-medium shadow-lg fade-in"
                    role="status"
                    style={{
                      background: "rgba(255,255,255,0.96)",
                      borderColor: "rgba(241,187,26,0.45)",
                      color: "#6B1C6F",
                    }}
                  >
                    ✦ Lemmy was here. Ask us about him in store.
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
