"use client";

import React from "react";

type Variant = "book" | "sparkle" | "bookmark";

interface SectionDividerProps {
  /**
   * Chooses the central ornament glyph.
   *  - `book`     → open book with sparkles (default)
   *  - `sparkle`  → four-point star burst
   *  - `bookmark` → ribbon bookmark
   */
  variant?: Variant;
  /**
   * Optional short label displayed beside the ornament.
   * Keep this 1–3 words for best results.
   */
  label?: string;
  /**
   * If `true`, the divider sits on the warm paper tone instead of the
   * default off-white. Use this when placing the divider between sections
   * whose backgrounds use the `#FDF8F0` paper colour.
   */
  muted?: boolean;
  className?: string;
}

/**
 * A small, decorative divider used between top-level homepage sections to
 * give the long scroll some visual rhythm. The ornament gently glows and
 * the hairline shimmers across — both animations respect
 * `prefers-reduced-motion` (defined globally in `globals.css`).
 *
 * It is purely decorative and is marked `aria-hidden` so screen readers
 * skip it.
 */
export default function SectionDivider({
  variant = "book",
  label,
  muted = false,
  className = "",
}: SectionDividerProps) {
  const bg = muted ? "#FDF8F0" : "#FFFDF9";

  return (
    <div
      aria-hidden="true"
      className={`relative px-4 py-8 sm:py-10 ${className}`}
      style={{ background: bg }}
    >
      <div className="relative mx-auto flex max-w-3xl items-center gap-4">
        {/* Left hairline */}
        <span
          className="section-divider-line section-divider-line--left h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(107,28,111,0.18) 40%, rgba(241,187,26,0.45) 100%)",
          }}
        />

        {/* Ornament */}
        <span className="section-divider-ornament relative flex items-center gap-2">
          {/* Soft halo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(241,187,26,0.35) 0%, rgba(241,187,26,0.10) 45%, transparent 75%)",
              filter: "blur(8px)",
              animation: "candleGlow 5.5s ease-in-out infinite",
            }}
          />

          <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center">
            {variant === "book" && <BookOrnament />}
            {variant === "sparkle" && <SparkleOrnament />}
            {variant === "bookmark" && <BookmarkOrnament />}
          </span>

          {label ? (
            <span
              className="relative z-10 hidden text-[10px] font-bold uppercase tracking-[0.32em] sm:inline-block"
              style={{ color: "#6B1C6F" }}
            >
              {label}
            </span>
          ) : null}
        </span>

        {/* Right hairline */}
        <span
          className="section-divider-line section-divider-line--right h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, rgba(241,187,26,0.45) 0%, rgba(107,28,111,0.18) 60%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

function BookOrnament() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 1px 2px rgba(107,28,111,0.18))" }}
    >
      {/* Open book */}
      <path
        d="M6 12 Q12 10 20 12 Q28 10 34 12 L34 30 Q28 28 20 30 Q12 28 6 30 Z"
        fill="#FFFDF9"
        stroke="#6B1C6F"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M20 12 V30"
        stroke="#6B1C6F"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M10 16 Q15 15 19 16 M10 20 Q15 19 19 20 M10 24 Q15 23 19 24"
        stroke="#6B1C6F"
        strokeWidth="0.7"
        opacity="0.55"
        fill="none"
      />
      <path
        d="M21 16 Q25 15 30 16 M21 20 Q25 19 30 20 M21 24 Q25 23 30 24"
        stroke="#6B1C6F"
        strokeWidth="0.7"
        opacity="0.55"
        fill="none"
      />
      {/* Sparkles */}
      <path
        d="M33 6 L34 9 L37 10 L34 11 L33 14 L32 11 L29 10 L32 9 Z"
        fill="#F1BB1A"
        opacity="0.95"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M5 4 L5.6 5.6 L7 6 L5.6 6.4 L5 8 L4.4 6.4 L3 6 L4.4 5.6 Z"
        fill="#F1BB1A"
        opacity="0.75"
      >
        <animate
          attributeName="opacity"
          values="0.2;0.9;0.2"
          dur="3s"
          begin="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

function SparkleOrnament() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 6px rgba(241,187,26,0.6))" }}
    >
      <path
        d="M20 4 L23 17 L36 20 L23 23 L20 36 L17 23 L4 20 L17 17 Z"
        fill="#F1BB1A"
        stroke="#6B1C6F"
        strokeWidth="0.9"
        strokeLinejoin="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="22s"
          repeatCount="indefinite"
        />
      </path>
      <circle cx="20" cy="20" r="2.2" fill="#6B1C6F" />
    </svg>
  );
}

function BookmarkOrnament() {
  return (
    <svg
      width="28"
      height="34"
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 4px rgba(107,28,111,0.22))" }}
    >
      <path
        d="M4 2 H24 V30 L14 24 L4 30 Z"
        fill="#6B1C6F"
        stroke="#4A1350"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M9 10 H19 M9 14 H19 M9 18 H16"
        stroke="#F1BB1A"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
