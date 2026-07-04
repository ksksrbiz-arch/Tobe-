"use client";

import React, { useEffect, useRef } from "react";

/**
 * <FlippingBook /> — a magical leather-bound tome for the hero, where every
 * page is a true 3D world. The resting spread is a pair of shadow-box
 * dioramas: through a window cut in the paper you look into a recessed scene
 * built from real depth planes (sky, far ground, near ground, each at its own
 * translateZ), while the subject leaps out of the window toward you. Turning
 * leaves carry their own elevated parallax layers, so each world visibly
 * separates in depth as the page lifts and settles. The whole tome gently
 * tilts to follow the reader's cursor, which makes the planes parallax like a
 * real pop-up theatre. Gold embers drift up from the open spread. Pure CSS 3D
 * — no WebGL, no dependencies.
 *
 * Performance: all animation is transform/opacity only, gated behind the
 * `--live` class. The hero mounts the book static and flips `live` on only
 * after first paint (never under reduced motion), so the LCP headline is never
 * blocked and steady-state work stays on the GPU. The pointer tilt runs a
 * self-stopping rAF lerp that writes one transform — no per-frame layout.
 */

interface FlippingBookProps {
  /** Width of the open spread, in px. */
  size?: number;
  className?: string;
  /** When true the book comes alive (riffle, embers, sheen, tilt, breathing). */
  live?: boolean;
}

const PURPLE = "#6B1C6F";
const GOLD = "#F1BB1A";
const CREAM = "#FFFDF9";

type SceneName =
  | "dragon"
  | "pirate"
  | "rocket"
  | "jungle"
  | "balloon"
  | "reef"
  | "aurora"
  | "desert";

const SCENES: { name: SceneName; caption: string }[] = [
  { name: "dragon", caption: "Dragon's Peak" },
  { name: "rocket", caption: "To the Stars" },
  { name: "pirate", caption: "Pirate Cove" },
  { name: "jungle", caption: "Hidden Temple" },
  { name: "balloon", caption: "Up & Away" },
  { name: "reef", caption: "The Coral Deep" },
  { name: "aurora", caption: "Aurora Camp" },
  { name: "desert", caption: "Desert Caravan" },
];

// Allow CSS custom properties in inline styles without fighting the types.
type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

/* ───────── Diorama geometry ─────────
   Page art lives in a 100×136 viewBox; the diorama window is the rounded
   panel at x:8 y:10, 84×84. Depth planes are absolutely positioned against
   that same rect (converted to px) and pushed along Z. */
const PAGE_VB = { w: 100, h: 136 };
const PANEL = { x: 8, y: 10, w: 84, h: 84 };

/* The shadow-box depth stack, in px. Negative = recessed behind the paper
   window, positive = popped out toward the reader. Turning leaves ride at
   +12px (see the leafTurn keyframes), so every leaf plane stays above the
   base pages' pop-outs and the two scenes never interleave. */
const DEPTH = {
  sky: -12,
  far: -8,
  mid: -4,
  basePop: 8,
  leafMid: 5,
  leafPop: 11,
};

/* Recessed planes are oversized so their edges stay hidden behind the window
   frame at the steepest tilt the book reaches (~22° of rotateX + pointer). */
const OVERSIZE = { sky: 0.08, far: 0.05, mid: 0.025 };

function panelRect(pageW: number, pageH: number, over = 0) {
  const sx = pageW / PAGE_VB.w;
  const sy = pageH / PAGE_VB.h;
  const ox = PANEL.w * sx * over;
  const oy = PANEL.h * sy * over;
  return {
    left: PANEL.x * sx - ox,
    top: PANEL.y * sy - oy,
    width: PANEL.w * sx + ox * 2,
    height: PANEL.h * sy + oy * 2,
  };
}

/* ───────── Scene art layers ─────────
   Each world is drawn as three stacked planes in 84×84 panel space —
   sky (deepest), far, mid — plus a pop-up subject in 100×136 page space. */

function renderSky(name: SceneName, uid: string) {
  switch (name) {
    case "dragon":
      return (
        <>
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2A1B5E" />
              <stop offset="0.5" stopColor="#C84C8C" />
              <stop offset="1" stopColor="#FBB36A" />
            </linearGradient>
          </defs>
          <rect width="84" height="84" fill={`url(#g-${uid})`} />
          <circle cx="44" cy="20" r="9" fill="#FFE6A8" />
          <circle cx="44" cy="20" r="14" fill="#FFE6A8" opacity="0.25" />
          {[[12, 12], [26, 8], [68, 10], [74, 22]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.9} fill="#FFF4D0" />
          ))}
        </>
      );
    case "rocket":
      return (
        <>
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0D0630" />
              <stop offset="1" stopColor="#2A1458" />
            </linearGradient>
          </defs>
          <rect width="84" height="84" fill={`url(#g-${uid})`} />
          <ellipse cx="22" cy="30" rx="20" ry="12" fill="#7A3FA0" opacity="0.4" />
          <ellipse cx="60" cy="56" rx="18" ry="10" fill="#C04BA0" opacity="0.35" />
          {[[10, 12, 1.1], [32, 8, 0.8], [70, 14, 1], [22, 60, 0.9], [76, 62, 1.1], [46, 30, 0.7], [58, 44, 0.8]].map(
            ([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#FFF4D0" />,
          )}
        </>
      );
    case "pirate":
      return (
        <>
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8FE0FB" />
              <stop offset="1" stopColor="#D6F4FF" />
            </linearGradient>
          </defs>
          <rect width="84" height="84" fill={`url(#g-${uid})`} />
          <circle cx="16" cy="14" r="7" fill="#FFE082" />
          <ellipse cx="38" cy="16" rx="12" ry="5" fill="#FFFFFF" opacity="0.85" />
          <ellipse cx="66" cy="24" rx="10" ry="4" fill="#FFFFFF" opacity="0.8" />
        </>
      );
    case "jungle":
      return (
        <>
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#CFF3C0" />
              <stop offset="1" stopColor="#8FD66B" />
            </linearGradient>
          </defs>
          <rect width="84" height="84" fill={`url(#g-${uid})`} />
          <circle cx="58" cy="12" r="6" fill="#FFE9A8" />
          <path d="M20 0 L34 0 L14 84 L4 84 Z" fill="#FFFFFF" opacity="0.1" />
          <path d="M48 0 L58 0 L44 84 L34 84 Z" fill="#FFFFFF" opacity="0.08" />
        </>
      );
    case "balloon":
      return (
        <>
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5AC8FA" />
              <stop offset="1" stopColor="#BFEBFF" />
            </linearGradient>
          </defs>
          <rect width="84" height="84" fill={`url(#g-${uid})`} />
          <ellipse cx="20" cy="20" rx="13" ry="5" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="62" cy="32" rx="11" ry="4.5" fill="#FFFFFF" opacity="0.85" />
        </>
      );
    case "reef":
      return (
        <>
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1FB6C9" />
              <stop offset="0.6" stopColor="#0E7C9E" />
              <stop offset="1" stopColor="#0A5E7C" />
            </linearGradient>
          </defs>
          <rect width="84" height="84" fill={`url(#g-${uid})`} />
          <path d="M20 0 L26 0 L14 44 Z" fill="#9FE8F0" opacity="0.14" />
          <path d="M44 0 L49 0 L42 38 Z" fill="#9FE8F0" opacity="0.12" />
          <path d="M66 0 L72 0 L74 46 Z" fill="#9FE8F0" opacity="0.12" />
        </>
      );
    case "aurora":
      return (
        <>
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0B1E3B" />
              <stop offset="1" stopColor="#13315C" />
            </linearGradient>
          </defs>
          <rect width="84" height="84" fill={`url(#g-${uid})`} />
          {[[14, 16, 1], [38, 12, 0.8], [70, 18, 1], [54, 8, 0.8], [26, 26, 0.7]].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#FFF4D0" />
          ))}
        </>
      );
    case "desert":
      return (
        <>
          <defs>
            <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFC36B" />
              <stop offset="1" stopColor="#FF7E5F" />
            </linearGradient>
          </defs>
          <rect width="84" height="84" fill={`url(#g-${uid})`} />
          <circle cx="42" cy="24" r="11" fill="#FFE08A" />
          <circle cx="42" cy="24" r="16" fill="#FFE08A" opacity="0.3" />
        </>
      );
  }
}

// (No gradients here, so no uid needed — extra render args are simply unused.)
function renderFar(name: SceneName) {
  switch (name) {
    case "dragon":
      return (
        <>
          <path d="M0 62 L12 42 L26 56 L42 38 L58 58 L72 44 L84 54 L84 84 L0 84 Z" fill="#2C7A7B" />
          <path
            d="M0 62 L12 42 L26 56 L42 38 L58 58 L72 44 L84 54"
            stroke="#7FE3D6"
            strokeWidth="1"
            fill="none"
            opacity="0.35"
          />
        </>
      );
    case "rocket":
      return (
        <>
          <circle cx="58" cy="26" r="11" fill="#F2A65A" />
          <ellipse
            cx="58"
            cy="26"
            rx="19"
            ry="5"
            fill="none"
            stroke="#FFD18A"
            strokeWidth="1.8"
            transform="rotate(-14 58 26)"
          />
          <circle cx="14" cy="54" r="4.5" fill="#C7D7E8" />
          <circle cx="12.5" cy="52.5" r="1" fill="#9FB3CC" />
          <circle cx="16" cy="55.5" r="0.8" fill="#9FB3CC" />
        </>
      );
    case "pirate":
      return (
        <>
          <ellipse cx="37" cy="50" rx="14" ry="2.4" fill="#EAD9A0" />
          <path d="M26 50 Q36 40 48 50 Z" fill="#3FA34D" />
          <path d="M40 44 q2 -6 5 -8" stroke="#8B5A2B" strokeWidth="1.4" fill="none" />
          <path d="M45 36 q-6 -3 -11 -1 q7 -4 11 1 Z" fill="#2E7D32" />
          <path d="M45 36 q5 -3 10 -1 q-7 -4 -10 1 Z" fill="#2E7D32" />
          <path d="M62 44 L66 38 L66 44 Z" fill="#FFFFFF" opacity="0.9" />
        </>
      );
    case "jungle":
      return (
        <>
          <rect x="18" y="64" width="48" height="20" fill="#B79B6E" />
          <rect x="26" y="52" width="32" height="12" fill="#C4A87E" />
          <path d="M28 52 L42 38 L56 52 Z" fill="#9E8B6B" />
          <rect x="38" y="66" width="8" height="18" fill="#5A4632" />
          <path d="M22 70 h12 M50 70 h12 M22 76 h12 M50 76 h12" stroke="#7A6B50" strokeWidth="1.2" />
        </>
      );
    case "balloon":
      return (
        <>
          <ellipse cx="30" cy="52" rx="16" ry="4" fill="#FFFFFF" opacity="0.7" />
          <ellipse cx="66" cy="48" rx="12" ry="3.5" fill="#FFFFFF" opacity="0.6" />
          <path d="M16 34 q3 -3 6 0 M24 30 q3 -3 6 0" stroke="#4E7A9E" strokeWidth="1.2" fill="none" />
        </>
      );
    case "reef":
      return (
        <>
          {[[18, 28], [26, 32], [34, 27], [44, 33], [54, 28]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} q3 -2 6 0 q-3 2 -6 0 Z`} fill="#9FE8F0" opacity="0.7" />
          ))}
          <path d="M10 84 q-2 -14 2 -22 M74 84 q3 -16 -1 -24" stroke="#155E52" strokeWidth="2.4" fill="none" opacity="0.35" />
        </>
      );
    case "aurora":
      return (
        <>
          <path d="M2 30 Q26 8 42 28 T82 24" stroke="#3DF5C0" strokeWidth="5" fill="none" opacity="0.45" />
          <path d="M4 40 Q28 20 46 38 T84 34" stroke="#7AE0FF" strokeWidth="4" fill="none" opacity="0.4" />
          <path d="M6 50 Q32 32 50 48 T82 46" stroke="#A06BFF" strokeWidth="3.5" fill="none" opacity="0.35" />
        </>
      );
    case "desert":
      return (
        <>
          <path d="M44 58 L62 32 L80 58 Z" fill="#B0793F" />
          <path d="M62 32 L80 58 L62 58 Z" fill="#96602F" />
          <path d="M0 62 Q40 52 84 60 L84 84 L0 84 Z" fill="#C99A5B" />
        </>
      );
  }
}

function renderMid(name: SceneName, uid: string) {
  switch (name) {
    case "dragon":
      return (
        <>
          <path d="M0 84 L0 62 L20 48 L38 66 L60 50 L84 68 L84 84 Z" fill="#173B4A" />
          <rect x="57" y="36" width="6" height="16" fill="#241A38" />
          <path d="M55 36 L60 28 L65 36 Z" fill="#2E2447" />
          <circle cx="60" cy="42" r="2.4" fill="#FFC83D" opacity="0.35" />
          <circle cx="60" cy="42" r="1.1" fill="#FFC83D" />
        </>
      );
    case "rocket":
      return (
        <>
          <path d="M8 14 L26 22" stroke="#BFEFFF" strokeWidth="1.4" opacity="0.8" />
          <circle cx="26" cy="22" r="1.8" fill="#FFFFFF" />
          <circle cx="70" cy="66" r="2" fill="#6B5B8E" />
          <path d="M32 70 l3 -2 l3 2 l-1 3 l-4 0 Z" fill="#6B5B8E" />
          <circle cx="50" cy="76" r="1.3" fill="#6B5B8E" />
        </>
      );
    case "pirate":
      return (
        <>
          <defs>
            <linearGradient id={`sea-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1FB6C9" />
              <stop offset="1" stopColor="#0E7C9E" />
            </linearGradient>
          </defs>
          <rect x="0" y="50" width="84" height="34" fill={`url(#sea-${uid})`} />
          <path d="M0 56 Q18 51 36 56 T72 56 T88 56" stroke="#7FE3D6" strokeWidth="1.4" fill="none" opacity="0.7" />
          <path d="M0 66 Q18 61 36 66 T72 66 T88 66" stroke="#7FE3D6" strokeWidth="1.4" fill="none" opacity="0.5" />
          <path d="M0 76 Q22 72 44 76 T84 76" stroke="#7FE3D6" strokeWidth="1.2" fill="none" opacity="0.35" />
        </>
      );
    case "jungle":
      return (
        <>
          <path d="M0 84 Q10 58 0 40 Q18 60 14 84 Z" fill="#2E7D32" />
          <path d="M84 84 Q70 60 84 44 Q64 64 70 84 Z" fill="#2E7D32" />
          <path d="M0 84 Q14 70 28 84 Z" fill="#3FA34D" />
          <path d="M56 84 Q70 68 84 84 Z" fill="#3FA34D" />
          <path d="M60 0 q-4 12 2 22" stroke="#2E7D32" strokeWidth="1.4" fill="none" />
          <circle cx="61" cy="12" r="1.6" fill="#3FA34D" />
          <circle cx="62.5" cy="20" r="1.6" fill="#3FA34D" />
        </>
      );
    case "balloon":
      return (
        <>
          <path d="M0 84 L0 70 Q22 62 44 70 T84 66 L84 84 Z" fill="#6FBF4A" />
          <path d="M0 84 L0 78 Q30 72 56 78 T84 78 L84 84 Z" fill="#4E9E33" />
          <path d="M22 74 l8 0 M44 76 l10 0 M62 74 l8 0" stroke="#E8C84A" strokeWidth="1.2" opacity="0.7" />
        </>
      );
    case "reef":
      return (
        <>
          <path d="M0 84 Q42 74 84 84 Z" fill="#EAD9A0" />
          <path d="M8 84 q2 -12 5 -12 q3 0 5 12 Z" fill="#FF6F91" />
          <path d="M62 84 q0 -10 -3 -14 M62 84 q1 -12 5 -15" stroke="#7B61FF" strokeWidth="2.5" fill="none" />
          <path d="M32 84 q2 -9 5 -9 q3 0 5 9 Z" fill="#FFB85C" />
          <path d="M22 84 q-1 -8 2 -14 M48 84 q1 -8 -2 -13" stroke="#2E9E86" strokeWidth="1.6" fill="none" />
        </>
      );
    case "aurora":
      return (
        <>
          <path d="M0 84 L0 68 L22 56 L44 70 L66 56 L84 70 L84 84 Z" fill="#C7D7E8" />
          <path d="M0 84 L0 76 L26 64 L52 78 L84 68 L84 84 Z" fill="#9FB3CC" />
        </>
      );
    case "desert":
      return (
        <>
          <path d="M0 84 L0 78 Q34 64 84 80 L84 84 Z" fill="#E0A94E" />
          <path d="M0 84 L0 82 Q44 72 84 82 L84 84 Z" fill="#F2C46B" />
        </>
      );
  }
}

/** The pop-up subject — transparent, may rise above the window edge. */
function ScenePop({ name }: { name: SceneName }) {
  return (
    <svg
      viewBox="0 0 100 136"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      {renderPop(name)}
    </svg>
  );
}

/* A faint ground shadow to anchor a pop-up subject. */
function popShadow(cx: number, cy: number, rx: number) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.26} fill="rgba(20,10,30,0.22)" />;
}

/** Pop-up subjects — drawn in 100×136 page space, may exceed the window. */
function renderPop(name: SceneName) {
  switch (name) {
    case "dragon":
      return (
        <>
          {popShadow(46, 70, 12)}
          <g transform="translate(2 0)">
            <path d="M40 44 Q30 30 22 32 Q30 38 32 46 Q26 44 24 50 Q34 50 40 52 Z" fill="#FF8A3D" />
            <path d="M52 44 Q64 28 74 30 Q66 38 66 46 Q74 44 76 50 Q64 50 56 52 Z" fill="#FF8A3D" />
            <path d="M40 40 Q48 34 56 40 Q60 50 50 58 Q40 50 40 40 Z" fill="#E8472B" />
            <path d="M50 36 Q58 30 62 34 Q60 40 54 40 Z" fill="#E8472B" />
            <circle cx="58" cy="35" r="1.4" fill="#FFE08A" />
            <path d="M62 35 Q70 33 74 30 Q70 36 66 37 Z" fill="#FFC83D" />
            <path d="M62 35 Q71 36 75 34" stroke="#FFC83D" strokeWidth="1.4" fill="none" />
          </g>
        </>
      );
    case "rocket":
      return (
        <>
          <g transform="rotate(14 52 48)">
            <path d="M52 26 Q60 36 58 58 L46 58 Q44 36 52 26 Z" fill="#F5F5FA" />
            <path d="M52 26 Q56 32 55 56 L52 56 Z" fill="#D8DCE8" />
            <circle cx="52" cy="42" r="3.6" fill="#4AB3F4" stroke="#2C6FB0" strokeWidth="1" />
            <path d="M46 54 L40 64 L46 60 Z" fill="#E8472B" />
            <path d="M58 54 L64 64 L58 60 Z" fill="#E8472B" />
            <path d="M48 60 Q52 78 56 60 Q52 66 48 60 Z" fill="#FFB02E" />
            <path d="M49 60 Q52 70 55 60 Q52 64 49 60 Z" fill="#FFE08A" />
          </g>
        </>
      );
    case "pirate":
      return (
        <>
          {popShadow(50, 80, 16)}
          <g transform="translate(0 2)">
            <path d="M34 70 L66 70 L60 80 L40 80 Z" fill="#7A4A2B" />
            <path d="M34 70 L66 70 L65 73 L35 73 Z" fill="#5A3620" />
            <rect x="49" y="44" width="2" height="26" fill="#5A3620" />
            <path d="M51 46 L51 66 L70 64 Z" fill="#E84B3A" />
            <path d="M49 46 L49 66 L32 64 Z" fill="#C0392B" />
            <path d="M51 46 L51 56 L62 55 Z" fill="#FF6B5B" />
            <rect x="48" y="40" width="6" height="4" fill="#1A1A1A" />
          </g>
        </>
      );
    case "jungle":
      return (
        <>
          {popShadow(54, 64, 9)}
          <g transform="translate(0 0)">
            <path d="M48 60 Q44 44 54 42 Q66 42 64 56 Q62 64 54 64 Q49 64 48 60 Z" fill="#1A1A1A" />
            <path d="M64 50 Q78 46 84 42 Q80 52 70 54 Q66 54 64 52 Z" fill="#FF8A00" />
            <path d="M66 49 Q76 47 82 44" stroke="#FFC400" strokeWidth="2" fill="none" />
            <circle cx="60" cy="49" r="2.4" fill="#FFF4D0" />
            <circle cx="60" cy="49" r="1.1" fill="#1A1A1A" />
            <path d="M50 64 l-2 6 M58 64 l2 6" stroke="#E8A33D" strokeWidth="1.6" />
          </g>
        </>
      );
    case "balloon":
      return (
        <>
          <g transform="translate(0 0)">
            <path d="M50 16 Q66 16 66 36 Q66 50 50 60 Q34 50 34 36 Q34 16 50 16 Z" fill="#E8472B" />
            <path d="M44 17 Q40 36 50 60 Q44 40 44 17 Z" fill="#F4A024" />
            <path d="M56 17 Q60 36 50 60 Q56 40 56 17 Z" fill="#3FA34D" />
            <path d="M50 16 Q52 36 50 60 Q48 36 50 16 Z" fill="#FFD23F" opacity="0.85" />
            <path d="M44 58 L46 66 M56 58 L54 66" stroke="#7A4A2B" strokeWidth="1" />
            <rect x="46" y="64" width="8" height="6" rx="1" fill="#8B5A2B" />
          </g>
        </>
      );
    case "reef":
      return (
        <>
          {popShadow(50, 86, 16)}
          <g transform="translate(0 0)">
            <path d="M30 64 Q40 50 60 54 Q76 58 82 52 Q78 76 54 78 Q38 78 30 70 Q28 66 30 64 Z" fill="#4A78B0" />
            <path d="M82 52 Q90 48 92 44 Q90 58 84 60 Z" fill="#4A78B0" />
            <circle cx="42" cy="62" r="2" fill="#FFFFFF" />
            <circle cx="42" cy="62" r="1" fill="#1A2A44" />
            <path d="M40 70 Q50 72 64 70" stroke="#9FC2E8" strokeWidth="1.2" fill="none" opacity="0.8" />
            <path d="M60 52 Q60 42 64 38" stroke="#BFEFFF" strokeWidth="1.6" fill="none" />
            <path d="M64 38 q-3 -3 0 -5 q3 2 0 5" fill="#BFEFFF" />
          </g>
        </>
      );
    case "aurora":
      return (
        <>
          {popShadow(46, 86, 16)}
          <g transform="translate(0 0)">
            <path d="M28 86 L40 64 L52 86 Z" fill="#2E5E3A" />
            <path d="M30 78 L40 60 L50 78 Z" fill="#3C7A4A" />
            <path d="M38 86 L40 72 L42 86 Z" fill="#5A3620" />
            <path d="M56 86 L66 70 L76 86 Z" fill="#E8472B" />
            <path d="M62 86 L66 74 L70 86 Z" fill="#FFB02E" />
            <circle cx="80" cy="84" r="3" fill="#FFB02E" />
            <circle cx="80" cy="84" r="5" fill="#FFB02E" opacity="0.3" />
          </g>
        </>
      );
    case "desert":
      return (
        <>
          {popShadow(50, 86, 18)}
          <g transform="translate(0 0)">
            <path d="M20 70 L22 64 L26 66 L30 84 M30 70 Q40 60 52 66 Q56 68 56 84 L52 84 L52 72 L36 72 L36 84 L32 84 Z" fill="#6B3F2A" />
            <path d="M30 70 q-3 -4 -1 -7 q3 3 1 7 Z" fill="#6B3F2A" />
            <rect x="74" y="64" width="2.5" height="20" fill="#7A4A2B" />
            <path d="M75 64 Q66 58 60 60 Q70 60 75 66 Q80 60 90 60 Q84 58 75 64 Z" fill="#2E7D32" />
            <path d="M75 64 Q72 56 66 54 Q74 58 75 66 Q76 58 84 54 Q78 56 75 64 Z" fill="#3FA34D" />
          </g>
        </>
      );
  }
}

/* ───────── Page plates ───────── */

const CAPTION_PROPS = {
  textAnchor: "middle",
  fontFamily: "Playfair Display, Georgia, serif",
  fontStyle: "italic",
  fontWeight: 600,
  fontSize: 9,
  fill: PURPLE,
} as const;

function CaptionBlock({ caption }: { caption: string }) {
  return (
    <>
      <text x="50" y="109" {...CAPTION_PROPS}>
        {caption}
      </text>
      <line x1="22" y1="118" x2="78" y2="118" stroke={PURPLE} strokeWidth="1" strokeOpacity="0.18" />
      <line x1="26" y1="126" x2="74" y2="126" stroke={PURPLE} strokeWidth="1" strokeOpacity="0.18" />
    </>
  );
}

function FrameRects() {
  return (
    <>
      <rect x="8" y="10" width="84" height="84" rx="7" fill="none" stroke="rgba(46,12,51,0.3)" strokeWidth="2.4" />
      <rect x="8" y="10" width="84" height="84" rx="7" fill="none" stroke={PURPLE} strokeOpacity="0.4" strokeWidth="1.6" />
      <rect x="8" y="10" width="84" height="84" rx="7" fill="none" stroke={GOLD} strokeOpacity="0.55" strokeWidth="0.8" />
    </>
  );
}

/** Paper plate with the diorama window CUT OUT — you see the recessed planes
    through the hole, like a shadow box. */
function WindowPlate({ caption, uid }: { caption: string; uid: string }) {
  // Outer page rect + inner rounded window, filled even-odd so the window is
  // a real hole in the paper.
  const holed = "M0 0 h100 v136 h-100 Z M15 10 h70 a7 7 0 0 1 7 7 v70 a7 7 0 0 1 -7 7 h-70 a7 7 0 0 1 -7 -7 v-70 a7 7 0 0 1 7 -7 Z";
  return (
    <svg
      viewBox="0 0 100 136"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`paper-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#F2E4CB" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path d={holed} fill={CREAM} fillRule="evenodd" />
      <path d={holed} fill={`url(#paper-${uid})`} fillRule="evenodd" />
      <FrameRects />
      <CaptionBlock caption={caption} />
    </svg>
  );
}

/** Paper plate for a turning leaf: sky + far layers flattened onto the page
    (the leaf's depth comes from its separate mid and pop planes). */
function LeafPlate({ scene, uid }: { scene: { name: SceneName; caption: string }; uid: string }) {
  const clip = `clip-${uid}`;
  return (
    <svg
      viewBox="0 0 100 136"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <rect x="8" y="10" width="84" height="84" rx="7" />
        </clipPath>
        <linearGradient id={`paper-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#F2E4CB" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="136" fill={CREAM} />
      <rect x="0" y="0" width="100" height="136" fill={`url(#paper-${uid})`} />
      <g clipPath={`url(#${clip})`}>
        <g transform="translate(8 10)">
          {renderSky(scene.name, `${uid}-s`)}
          {renderFar(scene.name)}
        </g>
      </g>
      <FrameRects />
      <CaptionBlock caption={scene.caption} />
    </svg>
  );
}

/* ───────── Diorama assemblies ───────── */

/** One standalone depth plane, positioned over the window rect. */
function DepthPlane({
  render,
  name,
  uid,
  z,
  over,
  pageW,
  pageH,
}: {
  render: (n: SceneName, u: string) => React.ReactNode;
  name: SceneName;
  uid: string;
  z: number;
  over: number;
  pageW: number;
  pageH: number;
}) {
  const r = panelRect(pageW, pageH, over);
  return (
    <div className="fb-plane" style={{ ...r, transform: `translateZ(${z}px)` }}>
      <svg viewBox="0 0 84 84" width="100%" height="100%" fill="none" preserveAspectRatio="none" aria-hidden="true">
        {render(name, uid)}
      </svg>
    </div>
  );
}

/** A resting-page shadow box: recessed sky/far/mid planes behind a windowed
    paper plate, subject popping out toward the reader. */
function WindowScene({
  scene,
  uid,
  pageW,
  pageH,
}: {
  scene: { name: SceneName; caption: string };
  uid: string;
  pageW: number;
  pageH: number;
}) {
  return (
    <>
      <DepthPlane render={renderSky} name={scene.name} uid={`${uid}-sky`} z={DEPTH.sky} over={OVERSIZE.sky} pageW={pageW} pageH={pageH} />
      <DepthPlane render={renderFar} name={scene.name} uid={`${uid}-far`} z={DEPTH.far} over={OVERSIZE.far} pageW={pageW} pageH={pageH} />
      <DepthPlane render={renderMid} name={scene.name} uid={`${uid}-mid`} z={DEPTH.mid} over={OVERSIZE.mid} pageW={pageW} pageH={pageH} />
      <div className="flip-book__bg">
        <WindowPlate caption={scene.caption} uid={uid} />
      </div>
      <div className="flip-book__pop" style={{ "--pz": `${DEPTH.basePop}px` } as CSSVars}>
        <ScenePop name={scene.name} />
      </div>
    </>
  );
}

/** A turning-leaf diorama: flattened backdrop on the paper, with mid and pop
    planes floating above so the world parallaxes as the leaf turns. */
function LeafScene({
  scene,
  uid,
  pageW,
  pageH,
  sheen,
  dur,
  delay,
}: {
  scene: { name: SceneName; caption: string };
  uid: string;
  pageW: number;
  pageH: number;
  sheen?: boolean;
  dur?: number;
  delay?: number;
}) {
  return (
    <>
      <div className="flip-book__bg">
        <LeafPlate scene={scene} uid={uid} />
        <span className="flip-book__curl" />
        {sheen && (
          <span
            className="flip-book__sheen"
            style={{ "--dur": `${dur}s`, "--delay": `${delay}s` } as CSSVars}
          />
        )}
      </div>
      <DepthPlane render={renderMid} name={scene.name} uid={`${uid}-mid`} z={DEPTH.leafMid} over={0} pageW={pageW} pageH={pageH} />
      <div className="flip-book__pop" style={{ "--pz": `${DEPTH.leafPop}px` } as CSSVars}>
        <ScenePop name={scene.name} />
      </div>
    </>
  );
}

/** A tiny gold corner flourish for the cover. */
function Flourish({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  return (
    <svg
      className={`flip-book__flourish flip-book__flourish--${corner}`}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1 L13 1 M1 1 L1 13 M1 1 Q12 2 11 11 Q10 18 18 18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="5" cy="5" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** The tome leans toward the reader's cursor so the diorama planes parallax.
    Skipped for coarse/no-hover pointers and under reduced motion. The rAF
    loop only runs while the tilt is still converging, then stops. */
function usePointerTilt(ref: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAX_X = 9; // deg of rotateY toward the cursor
    const MAX_Y = 6; // deg of rotateX
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let running = false;

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const step = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      el.style.transform = `rotateX(${curY.toFixed(3)}deg) rotateY(${curX.toFixed(3)}deg)`;
      if (Math.abs(targetX - curX) + Math.abs(targetY - curY) > 0.02) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      targetX = clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 2.2)) * MAX_X;
      targetY = clamp((e.clientY - (r.top + r.height / 2)) / (r.height * 2.2)) * -MAX_Y;
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}

export default function FlippingBook({ size = 210, className = "", live = true }: FlippingBookProps) {
  const pageW = Math.round(size * 0.46);
  const pageH = Math.round(pageW * 1.36);
  const spread = pageW * 2;
  const coverPad = Math.round(size * 0.035);
  const edgeW = Math.max(5, Math.round(size * 0.03));
  const stageW = spread + coverPad * 2 + edgeW * 2;
  const stageH = pageH + coverPad * 2 + Math.round(size * 0.16);

  const tiltRef = useRef<HTMLDivElement>(null);
  usePointerTilt(tiltRef, live);

  // 3 leaves × 2 faces + the 2 resting pages = all 8 worlds, no repeats.
  const leaves = 3;
  const duration = 7; // seconds per leaf cycle

  const leafData = Array.from({ length: leaves }, (_, i) => ({
    front: SCENES[(i * 2 + 2) % SCENES.length],
    back: SCENES[(i * 2 + 3) % SCENES.length],
    delay: (duration / leaves) * i,
  }));

  const embers = [
    { left: 32, drift: 10, size: 6, delay: 0, dur: 5.4 },
    { left: 50, drift: -8, size: 5, delay: 1.4, dur: 6.2 },
    { left: 60, drift: 12, size: 6, delay: 2.8, dur: 5.8 },
    { left: 44, drift: -10, size: 5, delay: 4.0, dur: 6.6 },
  ];

  const accents = [
    { x: 0.6, y: 0.16, s: 7, delay: 0.2 },
    { x: 0.78, y: 0.24, s: 5, delay: 1.3 },
    { x: 0.68, y: 0.34, s: 6, delay: 2.1 },
    { x: 0.3, y: 0.2, s: 5, delay: 0.9 },
  ];

  return (
    <div
      className={`flip-book-stage ${className}`}
      style={{ width: stageW, height: stageH }}
      role="img"
      aria-label="An open pop-up book, each turning page opening onto a tiny three-dimensional world"
    >
      <span
        className="flip-book__halo"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(241,187,26,0.5) 0%, rgba(241,187,26,0.14) 38%, transparent 70%)",
        }}
      />

      <div className="flip-book-tilt" ref={tiltRef}>
        <div className={`flip-book${live ? " flip-book--live" : ""}`} style={{ width: spread, height: pageH }}>
          <span className="flip-book__shadow" style={{ width: spread * 0.92, height: pageH * 0.18 }} />

          <span
            className="flip-book__cover"
            style={{ width: spread + coverPad * 2, height: pageH + coverPad * 2 }}
          >
            <Flourish corner="tl" />
            <Flourish corner="tr" />
            <Flourish corner="bl" />
            <Flourish corner="br" />
          </span>

          <span className="flip-book__edge" style={{ left: -edgeW, width: edgeW, height: Math.round(pageH * 0.96) }} />
          <span className="flip-book__edge" style={{ left: spread, width: edgeW, height: Math.round(pageH * 0.96) }} />

          {/* Resting spread — two shadow-box worlds */}
          <BasePage side="left" width={pageW} height={pageH} />
          <BasePage side="right" width={pageW} height={pageH} left={pageW} />

          <span className="flip-book__spine" style={{ left: pageW - 2, width: 4, height: pageH }} />

          {accents.map((a, i) => (
            <svg
              key={i}
              className="flip-book__accent"
              width={a.s}
              height={a.s}
              viewBox="0 0 10 10"
              style={{ left: spread * a.x, top: pageH * a.y, animationDelay: `${a.delay}s` } as CSSVars}
              aria-hidden="true"
            >
              <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
            </svg>
          ))}

          {/* Riffling leaves, each face its own layered world */}
          {leafData.map((leaf, i) => (
            <div
              key={i}
              className="flip-book__leaf"
              style={
                { left: pageW, width: pageW, height: pageH, "--dur": `${duration}s`, "--delay": `${leaf.delay}s` } as CSSVars
              }
            >
              <div className="flip-book__face flip-book__face--front">
                <LeafScene scene={leaf.front} uid={`f${i}`} pageW={pageW} pageH={pageH} sheen dur={duration} delay={leaf.delay} />
              </div>
              <div className="flip-book__face flip-book__face--back">
                <LeafScene scene={leaf.back} uid={`b${i}`} pageW={pageW} pageH={pageH} />
              </div>
            </div>
          ))}

          <span className="flip-book__light" style={{ width: spread, height: pageH }} />

          <div className="flip-book__embers" style={{ width: spread, height: Math.round(pageH * 0.7) }}>
            {embers.map((e, i) => (
              <span
                key={i}
                className="flip-book__ember"
                style={
                  {
                    left: `${e.left}%`,
                    width: e.size,
                    height: e.size,
                    "--drift": `${e.drift}px`,
                    "--dur": `${e.dur}s`,
                    "--delay": `${e.delay}s`,
                  } as CSSVars
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** A resting page of the open book — a shadow-box diorama. */
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
  // Left rests on Dragon's Peak at dusk; the more-visible right page opens
  // onto the starfield.
  const scene = side === "left" ? SCENES[0] : SCENES[1];
  return (
    <div className={`flip-book__base flip-book__base--${side}`} style={{ left, width, height }}>
      <WindowScene scene={scene} uid={`base-${side}`} pageW={width} pageH={height} />
    </div>
  );
}
