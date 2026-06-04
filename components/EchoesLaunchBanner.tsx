"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, BookOpen, Zap, Star } from "lucide-react";
import Reveal from "./Reveal";

const GENRES = [
  { label: "Romance", color: "#f43f5e", glow: "rgba(244,63,94,0.35)" },
  { label: "Crime Noir", color: "#38bdf8", glow: "rgba(56,189,248,0.35)" },
  { label: "Paranormal", color: "#a78bfa", glow: "rgba(167,139,250,0.35)" },
];

const FLOATING_WORDS = [
  "Choose",
  "Destiny",
  "Echoes",
  "Fate",
  "Whispers",
  "Arcane",
  "Shadows",
  "Noir",
  "Timeline",
  "Branch",
];

const WORD_CONFIGS = FLOATING_WORDS.map((_, i) => ({
  duration: 6 + ((i * 1.73) % 6),
  delay: (i * 0.83) % 6,
}));

const FEATURE_BULLETS = [
  { icon: Zap, text: "AI-generated branching narratives with real images" },
  { icon: BookOpen, text: "Romance · Crime · Paranormal genres" },
  { icon: Star, text: "Cloud-synced story saves — pick up anywhere" },
];

const SCENE_CONTENT: Record<string, { subtitle: string; title: string; description: string }> = {
  Romance: {
    subtitle: "The Forbidden Garden",
    title: "A Single Rose in the Moonlight",
    description: "Your heart races as familiar eyes meet yours across the candlelit ballroom…",
  },
  "Crime Noir": {
    subtitle: "The Neon Shadows",
    title: "The Last Clue Before Midnight",
    description: "Rain hammers the alley. The envelope in your pocket could end everything…",
  },
  Paranormal: {
    subtitle: "Blood Covenant",
    title: "The Witch's Final Gambit",
    description: "Ancient runes pulse beneath your fingertips as the veil grows thin…",
  },
};
const DEFAULT_SCENE = SCENE_CONTENT.Romance;

const CHOICES = ["Step forward into the light", "Retreat into the shadows"];

const FloatingWord = React.memo(function FloatingWord({
  word,
  style,
  duration,
  delay,
}: {
  word: string;
  style: React.CSSProperties;
  duration: number;
  delay: number;
}) {
  return (
    <span
      className="pointer-events-none absolute select-none text-xs font-bold uppercase tracking-widest opacity-0"
      style={{
        ...style,
        animation: `echoesFloat ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {word}
    </span>
  );
});

export default function EchoesLaunchBanner() {
  const [activeGenre, setActiveGenre] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    const startInterval = () => {
      if (intervalRef.current || document.hidden) return;
      intervalRef.current = setInterval(() => {
        if (document.hidden) return;
        setActiveGenre((g) => (g + 1) % GENRES.length);
      }, 2800);
    };

    const stopInterval = () => {
      if (!intervalRef.current) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopInterval();
      } else {
        startInterval();
      }
    };

    startInterval();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [prefersReducedMotion]);

  const genre = GENRES[activeGenre];
  const scene =
    SCENE_CONTENT[genre.label] ??
    DEFAULT_SCENE;

  return (
    <>
      <style>{`
        @keyframes echoesFloat {
          0%   { opacity: 0; transform: translateY(12px) scale(0.92); }
          20%  { opacity: 0.18; }
          60%  { opacity: 0.22; transform: translateY(-6px) scale(1); }
          100% { opacity: 0; transform: translateY(-18px) scale(0.88); }
        }
        @keyframes echoesPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes echoesShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes echoesOrbit {
          0%   { transform: rotate(0deg)   translateX(22px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(22px) rotate(-360deg); }
        }
        @keyframes echoesGlitch {
          0%, 96%          { clip-path: none; transform: none; }
          97%              { clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%); transform: translateX(4px); }
          98%              { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translateX(-3px); }
          99%              { clip-path: none; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-echoes-animated="true"] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section
        className="relative overflow-hidden px-4 py-12 sm:py-20 sm:px-6 lg:px-8"
        aria-label="Echoes of Choice — new interactive fiction app launch"
      >
        {/* Dark cinematic background */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          data-echoes-animated="true"
          style={{
            background: `radial-gradient(ellipse at 60% 40%, ${genre.glow} 0%, transparent 55%),
                         radial-gradient(ellipse at 15% 70%, rgba(74,19,80,0.45) 0%, transparent 45%),
                         linear-gradient(160deg, #0b0912 0%, #13091a 40%, #0d1120 100%)`,
          }}
          aria-hidden="true"
        />

        {/* Scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)",
          }}
          aria-hidden="true"
        />

        {/* Floating ambient words */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {FLOATING_WORDS.map((w, i) => (
            <FloatingWord
              key={w}
              word={w}
              duration={WORD_CONFIGS[i].duration}
              delay={WORD_CONFIGS[i].delay}
              style={{
                left: `${5 + (i * 9.2) % 88}%`,
                top: `${10 + (i * 14.7) % 78}%`,
                color: i % 3 === 0 ? "#F1BB1A" : i % 3 === 1 ? genre.color : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Corner decorative glyphs */}
        <div
          className="pointer-events-none absolute right-8 top-8 h-24 w-24 opacity-10"
          data-echoes-animated="true"
          style={{
            background: `conic-gradient(from 0deg, ${genre.color}, transparent 60%, ${genre.color})`,
            borderRadius: "50%",
            animation: "echoesOrbit 12s linear infinite",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Left: text content */}
            <div>
              <Reveal>
                {/* NEW badge */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.26em]"
                    style={{
                      background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                      color: "#0b0912",
                    }}
                  >
                    <Sparkles size={10} />
                    Just Launched
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em]"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                  >
                    TBR Interactive
                  </span>
                </div>

                {/* Headline */}
                <h2
                  className="font-black leading-[1.0]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.4rem, 6vw, 4rem)",
                    color: "white",
                    animation: "echoesGlitch 9s ease-in-out infinite",
                  }}
                  data-echoes-animated="true"
                >
                  Echoes of{" "}
                  <span
                    style={{
                      background: `linear-gradient(90deg, ${genre.color}, #F1BB1A, ${genre.color})`,
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "echoesShimmer 3s linear infinite",
                      transition: "all 0.7s ease",
                    }}
                    data-echoes-animated="true"
                  >
                    Choice
                  </span>
                </h2>

                <p
                  className="mt-3 text-sm font-bold uppercase tracking-[0.22em]"
                  style={{ color: genre.color, transition: "color 0.7s ease" }}
                >
                  An AI Interactive Fiction Experience · By TBR
                </p>

                <p
                  className="mt-5 max-w-lg text-sm leading-7"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  Step into branching timelines where every choice rewrites fate. Romance, crime noir,
                  paranormal — AI-generated scenes, images, and soundscapes immerse you in a story
                  that&apos;s uniquely yours. From your favorite local bookstore.
                </p>

                {/* Genre pills */}
                <div className="mt-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Story genre">
                  {GENRES.map((g, i) => (
                    <button
                      key={g.label}
                      onClick={() => setActiveGenre(i)}
                      type="button"
                      role="radio"
                      aria-checked={i === activeGenre}
                      className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                      data-echoes-animated="true"
                      style={{
                        background:
                          i === activeGenre
                            ? g.color
                            : "rgba(255,255,255,0.06)",
                        color: i === activeGenre ? "#0b0912" : "rgba(255,255,255,0.45)",
                        boxShadow:
                          i === activeGenre
                            ? `0 0 18px ${g.glow}`
                            : "none",
                        transform: i === activeGenre ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

                {/* Feature bullets */}
                <ul className="mt-6 space-y-2">
                  {FEATURE_BULLETS.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5">
                      <span
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ background: "rgba(241,187,26,0.14)" }}
                      >
                        <Icon size={11} style={{ color: "#F1BB1A" }} />
                      </span>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://echoes-of-choice-167345356687.us-west2.run.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-black shadow-xl transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
                    aria-label="Play Echoes of Choice in a new tab"
                    data-echoes-animated="true"
                    style={{
                      background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                      boxShadow: `0 0 28px rgba(241,187,26,0.4), 0 8px 24px rgba(0,0,0,0.4)`,
                    }}
                  >
                    Play Echoes of Choice
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.32)" }}
                  >
                    Free · No download required
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right: cinematic card */}
            <Reveal delay={120} className="flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-sm overflow-hidden rounded-[28px]"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.55) 100%)",
                  border: `1px solid ${genre.color}25`,
                  boxShadow: `0 0 60px ${genre.glow}, 0 32px 80px rgba(0,0,0,0.6)`,
                  transition: "all 0.7s ease",
                }}
                data-echoes-animated="true"
              >
                {/* Glowing top accent */}
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${genre.color}, transparent)`,
                    transition: "all 0.7s ease",
                  }}
                />

                <div className="p-7">
                  {/* Mini scene header */}
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.3em]"
                      style={{
                        background: `${genre.color}18`,
                        color: genre.color,
                        border: `1px solid ${genre.color}30`,
                        transition: "all 0.7s ease",
                      }}
                      data-echoes-animated="true"
                    >
                      Neural Canvas
                    </span>
                    <span
                      className="flex h-1.5 w-1.5 rounded-full"
                      style={{
                        background: genre.color,
                        boxShadow: `0 0 8px ${genre.color}`,
                        animation: "echoesPulse 2s ease-in-out infinite",
                      }}
                      data-echoes-animated="true"
                    />
                  </div>

                  {/* Simulated scene image placeholder */}
                  <div
                    className="mb-5 flex h-36 items-center justify-center rounded-[18px] text-center"
                    style={{
                      background: `radial-gradient(ellipse at center, ${genre.glow} 0%, rgba(0,0,0,0.7) 70%)`,
                      border: `1px solid ${genre.color}15`,
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <BookOpen
                        size={28}
                        style={{ color: genre.color, opacity: 0.7 }}
                      />
                      <p
                        className="text-[9px] font-bold uppercase tracking-[0.26em]"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        Scene Loading…
                      </p>
                    </div>
                  </div>

                  {/* Fake scene title */}
                  <p
                    className="mb-2 text-[9px] font-black uppercase tracking-[0.3em]"
                    style={{ color: genre.color, transition: "color 0.7s ease" }}
                  >
                    {scene.subtitle}
                  </p>
                  <p
                    className="text-sm font-bold leading-snug"
                    style={{ color: "white", fontFamily: "var(--font-serif)" }}
                  >
                    {scene.title}
                  </p>
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    {scene.description}
                  </p>

                  {/* Fake choice buttons */}
                  <div className="mt-5 space-y-2">
                    {CHOICES.map((choice, ci) => (
                      <div
                        key={choice}
                        className="flex cursor-default items-center gap-2.5 rounded-[12px] px-4 py-2.5"
                        style={{
                          background:
                            ci === 0
                              ? `${genre.color}18`
                              : "rgba(255,255,255,0.04)",
                          border: `1px solid ${ci === 0 ? `${genre.color}35` : "rgba(255,255,255,0.06)"}`,
                        }}
                      >
                        <span
                          className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[8px] font-black"
                          style={{
                            background: ci === 0 ? genre.color : "rgba(255,255,255,0.08)",
                            color: ci === 0 ? "#0b0912" : "rgba(255,255,255,0.3)",
                            transition: "all 0.7s ease",
                          }}
                          data-echoes-animated="true"
                        >
                          {ci === 0 ? "→" : "↓"}
                        </span>
                        <span
                          className="text-[11px] font-medium"
                          style={{
                            color:
                              ci === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.38)",
                          }}
                        >
                          {choice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom glow line */}
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${genre.color}60, transparent)`,
                    transition: "all 0.7s ease",
                  }}
                  data-echoes-animated="true"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
