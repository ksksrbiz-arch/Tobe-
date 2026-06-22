"use client";

import React from "react";

/**
 * <FlippingBook /> — an open storybook whose pages riffle past in 3D, each
 * page flashing a tiny "adventure" glimpsed in the brand palette (a summit, a
 * sail, a rocket, the deep woods…). Pure CSS keeps it dependency-free; the
 * flip + fade keyframe (`leafTurn`, in globals.css) loops seamlessly because
 * each leaf is invisible at the wrap point.
 *
 * Honors `prefers-reduced-motion`: the riffle stops and a single page rests
 * open so the artwork is still there to enjoy.
 */

interface FlippingBookProps {
  /** Width of the whole open spread, in px. */
  size?: number;
  className?: string;
}

const PURPLE = "#6B1C6F";
const DEEP = "#4A1350";
const GOLD = "#F1BB1A";
const GOLD_SOFT = "#F5CC45";
const LILAC = "#C9A4CE";
const CREAM = "#FFFDF9";

type SceneName =
  | "summit"
  | "sail"
  | "liftoff"
  | "woods"
  | "keep"
  | "skyward"
  | "deep"
  | "sands";

const SCENES: { name: SceneName; caption: string }[] = [
  { name: "summit", caption: "The Summit" },
  { name: "sail", caption: "Set Sail" },
  { name: "liftoff", caption: "Liftoff" },
  { name: "woods", caption: "The Deep Woods" },
  { name: "keep", caption: "The Old Keep" },
  { name: "skyward", caption: "Skyward" },
  { name: "deep", caption: "The Deep Blue" },
  { name: "sands", caption: "The Sands" },
];

/**
 * Draws one adventure inside the page's 100×134 viewBox. `uid` keeps gradient
 * / clip ids unique across the many faces sharing the document.
 */
function Scene({ name, caption, uid }: { name: SceneName; caption: string; uid: string }) {
  const clip = `clip-${uid}`;
  const sky = `sky-${uid}`;
  // Art panel: x 8 → 92, y 10 → 92 (rounded, clipped).
  return (
    <svg
      viewBox="0 0 100 134"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <rect x="8" y="10" width="84" height="82" rx="7" />
        </clipPath>
        {skyGradient(name, sky)}
      </defs>

      {/* Paper */}
      <rect x="0" y="0" width="100" height="134" rx="3" fill={CREAM} />
      <rect x="0" y="0" width="100" height="134" rx="3" fill={`url(#paper-${uid})`} />
      <defs>
        <linearGradient id={`paper-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="1" stopColor="#F3E6CF" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Art panel background sky */}
      <g clipPath={`url(#${clip})`}>
        <rect x="8" y="10" width="84" height="82" fill={`url(#${sky})`} />
        {renderScene(name)}
      </g>

      {/* Panel frame */}
      <rect
        x="8"
        y="10"
        width="84"
        height="82"
        rx="7"
        fill="none"
        stroke={PURPLE}
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />

      {/* Caption */}
      <text
        x="50"
        y="106"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="9"
        fill={PURPLE}
      >
        {caption}
      </text>

      {/* Ruled lines */}
      <line x1="22" y1="116" x2="78" y2="116" stroke={PURPLE} strokeWidth="1" strokeOpacity="0.18" />
      <line x1="26" y1="124" x2="74" y2="124" stroke={PURPLE} strokeWidth="1" strokeOpacity="0.18" />
    </svg>
  );
}

function skyGradient(name: SceneName, id: string) {
  const stops: Record<SceneName, [string, string]> = {
    summit: ["#FFF3D6", "#FCE3C0"],
    sail: ["#FFF1CE", "#FBE2BE"],
    liftoff: ["#E9D6EF", "#C9A4CE"],
    woods: ["#FBF0D8", "#EFE0C2"],
    keep: ["#FBEFD2", "#F3DCC0"],
    skyward: ["#EAF0FA", "#E7DDF0"],
    deep: ["#D8CBE6", "#B79CC9"],
    sands: ["#FFE9B8", "#F8CF8E"],
  };
  const [a, b] = stops[name];
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={a} />
      <stop offset="1" stopColor={b} />
    </linearGradient>
  );
}

/** Scene shapes, drawn within the 8,10 → 92,92 art panel. */
function renderScene(name: SceneName) {
  switch (name) {
    case "summit":
      return (
        <>
          <circle cx="70" cy="30" r="9" fill={GOLD} />
          <circle cx="70" cy="30" r="13" fill={GOLD} opacity="0.25" />
          <path d="M8 92 L34 50 L52 72 L66 56 L92 92 Z" fill={LILAC} opacity="0.7" />
          <path d="M8 92 L40 56 L60 92 Z" fill={PURPLE} />
          <path d="M52 92 L72 60 L92 92 Z" fill={DEEP} />
          <path d="M40 56 L46 64 L34 64 Z" fill={CREAM} opacity="0.95" />
          <path d="M72 60 L78 70 L66 70 Z" fill={CREAM} opacity="0.9" />
        </>
      );
    case "sail":
      return (
        <>
          <circle cx="26" cy="30" r="7" fill={GOLD} />
          <rect x="8" y="60" width="84" height="32" fill={PURPLE} opacity="0.85" />
          <path d="M8 62 Q26 56 44 62 T80 62 T96 62" stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M8 72 Q26 66 44 72 T80 72 T96 72" stroke={GOLD_SOFT} strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M40 62 L62 62 L56 72 L46 72 Z" fill={DEEP} />
          <rect x="50" y="38" width="2" height="22" fill={DEEP} />
          <path d="M52 40 L52 60 L70 58 Z" fill={CREAM} />
          <path d="M50 40 L50 60 L34 58 Z" fill={GOLD_SOFT} />
        </>
      );
    case "liftoff":
      return (
        <>
          {[
            [20, 26],
            [76, 22],
            [60, 40],
            [30, 54],
            [82, 60],
            [16, 70],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.6} fill={GOLD} />
          ))}
          <circle cx="74" cy="68" r="12" fill={GOLD} opacity="0.35" />
          <ellipse cx="74" cy="68" rx="20" ry="5" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.6" />
          <path d="M50 36 Q60 44 58 64 L42 64 Q40 44 50 36 Z" fill={CREAM} />
          <circle cx="50" cy="52" r="4" fill={PURPLE} />
          <path d="M42 60 L36 70 L42 66 Z" fill={PURPLE} />
          <path d="M58 60 L64 70 L58 66 Z" fill={PURPLE} />
          <path d="M46 66 Q50 82 54 66 Z" fill={GOLD} />
        </>
      );
    case "woods":
      return (
        <>
          <circle cx="72" cy="28" r="7" fill={GOLD_SOFT} />
          <path d="M44 92 Q50 64 50 50 Q50 64 56 92 Z" fill={GOLD} opacity="0.55" />
          {[
            [22, 44, PURPLE],
            [34, 50, DEEP],
            [70, 46, PURPLE],
            [82, 52, DEEP],
          ].map(([x, y, c], i) => (
            <g key={i}>
              <path d={`M${x} ${y} L${(x as number) - 8} ${y as number + 18} L${x as number + 8} ${y as number + 18} Z`} fill={c as string} />
              <path d={`M${x} ${(y as number) + 10} L${(x as number) - 10} ${y as number + 32} L${x as number + 10} ${y as number + 32} Z`} fill={c as string} />
            </g>
          ))}
        </>
      );
    case "keep":
      return (
        <>
          <circle cx="74" cy="28" r="8" fill={GOLD} />
          <path d="M8 92 Q50 66 92 92 Z" fill={PURPLE} />
          <rect x="40" y="48" width="20" height="34" fill={CREAM} />
          <rect x="40" y="48" width="20" height="4" fill={DEEP} />
          <path d="M40 48 v-5 h4 v5 M48 48 v-5 h4 v5 M56 48 v-5 h4 v5" fill={DEEP} />
          <rect x="34" y="56" width="8" height="26" fill={GOLD_SOFT} />
          <rect x="58" y="56" width="8" height="26" fill={GOLD_SOFT} />
          <path d="M50 40 L50 32 L60 35 L50 38 Z" fill={GOLD} />
          <rect x="47" y="68" width="6" height="14" rx="3" fill={DEEP} />
        </>
      );
    case "skyward":
      return (
        <>
          <ellipse cx="26" cy="34" rx="12" ry="5" fill={CREAM} opacity="0.85" />
          <ellipse cx="74" cy="48" rx="14" ry="6" fill={CREAM} opacity="0.8" />
          <path d="M50 24 Q66 30 62 52 Q56 64 50 64 Q44 64 38 52 Q34 30 50 24 Z" fill={GOLD} />
          <path d="M50 24 Q56 30 54 60 L46 60 Q44 30 50 24 Z" fill={PURPLE} opacity="0.55" />
          <path d="M44 63 L56 63 L53 70 L47 70 Z" fill={DEEP} />
          <line x1="46" y1="64" x2="47" y2="70" stroke={DEEP} strokeWidth="0.8" />
          <line x1="54" y1="64" x2="53" y2="70" stroke={DEEP} strokeWidth="0.8" />
        </>
      );
    case "deep":
      return (
        <>
          <circle cx="74" cy="28" r="8" fill={CREAM} opacity="0.9" />
          {[
            [24, 22],
            [50, 18],
            [40, 34],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.4} fill={GOLD} />
          ))}
          <rect x="8" y="58" width="84" height="34" fill={PURPLE} opacity="0.8" />
          <path d="M30 78 Q40 60 58 66 Q72 70 78 64 Q70 84 50 84 Q36 84 30 78 Z" fill={DEEP} />
          <path d="M78 64 Q86 60 88 56 Q86 66 80 70 Z" fill={DEEP} />
          <circle cx="40" cy="72" r="1.6" fill={CREAM} />
          <path d="M58 60 Q58 50 62 46" stroke={CREAM} strokeWidth="1.4" fill="none" opacity="0.7" />
          <path d="M62 46 q-3 -2 0 -4 q3 2 0 4" fill={CREAM} opacity="0.7" />
        </>
      );
    case "sands":
      return (
        <>
          <circle cx="50" cy="30" r="10" fill={GOLD} />
          <circle cx="50" cy="30" r="15" fill={GOLD} opacity="0.22" />
          <path d="M18 92 L40 50 L62 92 Z" fill={PURPLE} />
          <path d="M48 92 L66 58 L84 92 Z" fill={DEEP} />
          <path d="M40 50 L44 58 L36 58 Z" fill={GOLD_SOFT} opacity="0.6" />
          <path d="M8 92 Q40 78 92 92 Z" fill={LILAC} opacity="0.7" />
          <path d="M8 92 Q50 84 92 92 Z" fill={GOLD_SOFT} opacity="0.5" />
        </>
      );
  }
}

export default function FlippingBook({ size = 200, className = "" }: FlippingBookProps) {
  // Geometry derived from the spread width.
  const pageW = Math.round(size * 0.47);
  const pageH = Math.round(pageW * 1.34);
  const spread = pageW * 2;
  const leaves = 5;
  const duration = 6; // seconds for a single leaf's full cycle

  // Faces: each leaf shows one adventure as it lifts (front) and another as it
  // settles (back). Walk the scene list so neighbours never repeat.
  const leafData = Array.from({ length: leaves }, (_, i) => ({
    front: SCENES[(i * 2) % SCENES.length],
    back: SCENES[(i * 2 + 1) % SCENES.length],
    delay: (duration / leaves) * i,
    rest: i === 0,
  }));

  return (
    <div
      className={`flip-book-stage ${className}`}
      style={{ width: spread, height: pageH + Math.round(size * 0.12) }}
      role="img"
      aria-label="An open book of adventures with pages turning"
    >
      {/* Warm halo behind the book */}
      <span
        className="flip-book__halo"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(241,187,26,0.45) 0%, rgba(241,187,26,0.12) 38%, transparent 70%)",
        }}
      />

      <div className="flip-book" style={{ width: spread, height: pageH }}>
        {/* Drop shadow under the book */}
        <span
          className="flip-book__shadow"
          style={{ width: spread * 0.86, height: pageH * 0.16 }}
        />

        {/* Static left page (where leaves come to rest) */}
        <BasePage side="left" width={pageW} height={pageH} />
        {/* Static right page (beneath the riffling stack) */}
        <BasePage side="right" width={pageW} height={pageH} left={pageW} />

        {/* Spine / gutter */}
        <span
          className="flip-book__spine"
          style={{ left: pageW - 2, width: 4, height: pageH }}
        />

        {/* Riffling leaves, hinged at the spine */}
        {leafData.map((leaf, i) => (
          <div
            key={i}
            className={`flip-book__leaf${leaf.rest ? " flip-book__leaf--rest" : ""}`}
            style={{
              left: pageW,
              width: pageW,
              height: pageH,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <div className="flip-book__face flip-book__face--front">
              <Scene name={leaf.front.name} caption={leaf.front.caption} uid={`f${i}`} />
              <span className="flip-book__curl" />
            </div>
            <div className="flip-book__face flip-book__face--back">
              <Scene name={leaf.back.name} caption={leaf.back.caption} uid={`b${i}`} />
              <span className="flip-book__curl flip-book__curl--back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A resting page of the open book, with a faint sky + ruled lines. */
function BasePage({
  side,
  width,
  height,
  left = 0,
}: {
  side: "left" | "right";
  width: number;
  height: number;
  left?: number;
}) {
  // The left page rests showing the first adventure; the right shows the next.
  const scene = side === "left" ? SCENES[1] : SCENES[2];
  return (
    <div
      className={`flip-book__base flip-book__base--${side}`}
      style={{ left, width, height }}
    >
      <Scene name={scene.name} caption={scene.caption} uid={`base-${side}`} />
    </div>
  );
}
