"use client";

import React, { useEffect, useState } from "react";

/**
 * Site-wide ambient layer: warm vignette, paper grain, floating pages,
 * fireflies, and twinkling stars — all deferred to after first paint and
 * skipped entirely for prefers-reduced-motion.
 *
 * Dust motes were removed from this component: DustMotes.tsx renders them
 * per-section already, so a global layer was doubling the node count for zero
 * visual gain. The firefly count is also trimmed from 9 → 6 on mobile.
 */
export default function CozyAmbience() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const handle = w.requestIdleCallback(() => setReady(true));
      return () => w.cancelIdleCallback?.(handle);
    }
    const t = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {/* Warm vignette — softly breathes like a reading lamp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(241,187,26,0.14), transparent 70%), " +
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(107,28,111,0.12), transparent 70%), " +
            "radial-gradient(ellipse 40% 40% at 15% 40%, rgba(241,187,26,0.07), transparent 70%), " +
            "radial-gradient(ellipse 40% 40% at 85% 60%, rgba(139,46,144,0.08), transparent 70%)",
          animation: "lampBreath 9s ease-in-out infinite",
          mixBlendMode: "multiply",
        }}
      />

      {/* Paper grain — extremely subtle warmth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(107,28,111,0.06) 1px, transparent 1px), " +
            "radial-gradient(rgba(241,187,26,0.05) 1px, transparent 1px)",
          backgroundSize: "3px 3px, 5px 5px",
          backgroundPosition: "0 0, 1px 2px",
          opacity: 0.55,
          mixBlendMode: "multiply",
        }}
      />

      {/* Floating pages — trimmed to 3, slower and fainter (ambient dial-back) */}
      {([
        { left: "8%",  top: "22%", size: 34, delay: "0s",   dur: "22s", rot: -8 },
        { left: "84%", top: "34%", size: 30, delay: "2.5s", dur: "26s", rot: -6 },
        { left: "90%", top: "72%", size: 22, delay: "5s",   dur: "30s", rot: 14 },
      ] as const).map((p, i) => (
        <svg
          key={i}
          width={p.size}
          height={p.size * 1.3}
          viewBox="0 0 40 52"
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            opacity: 0.11,
            animation: `pageDrift ${p.dur} ease-in-out ${p.delay} infinite`,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <path
            d="M2 4 Q4 1 8 2 L32 4 Q38 5 38 10 L36 46 Q35 50 30 50 L8 48 Q3 47 3 42 Z"
            fill="#FFFDF9"
            stroke="#6B1C6F"
            strokeWidth="0.8"
          />
          <line x1="8" y1="14" x2="32" y2="14" stroke="#6B1C6F" strokeWidth="0.6" opacity="0.5" />
          <line x1="8" y1="20" x2="32" y2="20" stroke="#6B1C6F" strokeWidth="0.6" opacity="0.5" />
          <line x1="8" y1="26" x2="28" y2="26" stroke="#6B1C6F" strokeWidth="0.6" opacity="0.5" />
          <line x1="8" y1="32" x2="32" y2="32" stroke="#6B1C6F" strokeWidth="0.6" opacity="0.5" />
        </svg>
      ))}

      {/* Fireflies — 4 on desktop, 2 on mobile (ambient dial-back) */}
      {Array.from({ length: 4 }, (_, i) => {
        const left = (i * 41 + 13) % 100;
        const top  = 60 + ((i * 17) % 35);
        const delay = (i * 1.7) % 8;
        const dur  = 15 + (i % 4) * 3;
        const size = i % 3 === 0 ? 4 : 3;
        return (
          <span
            key={`ff-${i}`}
            className={`cozy-firefly absolute rounded-full${i >= 2 ? " hidden sm:block" : ""}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background:
                "radial-gradient(circle, rgba(255,235,150,1) 0%, rgba(241,187,26,0.85) 45%, rgba(241,187,26,0) 75%)",
              animation: `fireflyDrift ${dur}s ease-in-out ${delay}s infinite, fireflyPulse ${2 + (i % 3) * 0.6}s ease-in-out infinite`,
            }}
          />
        );
      })}

      {/* Twinkling stars — 6 desktop, 4 mobile, slower (ambient dial-back) */}
      {Array.from({ length: 6 }, (_, i) => {
        const left  = (i * 71 + 5) % 100;
        const top   = (i * 23 + 4) % 55;
        const delay = (i * 0.9) % 6;
        const dur   = 5 + (i % 4);
        const size  = i % 4 === 0 ? 9 : i % 2 === 0 ? 7 : 5;
        return (
          <svg
            key={`star-${i}`}
            className={`cozy-star absolute${i >= 4 ? " hidden sm:block" : ""}`}
            width={size}
            height={size}
            viewBox="0 0 10 10"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `starTwinkle ${dur}s ease-in-out ${delay}s infinite`,
              filter: "drop-shadow(0 0 3px rgba(241,187,26,0.7))",
            }}
          >
            <path
              d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z"
              fill={i % 3 === 0 ? "#F1BB1A" : i % 2 === 0 ? "#FCE8A6" : "#8B2E90"}
              opacity="0.9"
            />
          </svg>
        );
      })}
    </div>
  );
}
