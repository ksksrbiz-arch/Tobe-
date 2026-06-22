"use client";

import React from "react";

/**
 * <FlippingBook /> — a magical leather-bound tome for the hero. Gilded pages
 * riffle past the spine in 3D, each leaf flashing a tiny adventure (a summit, a
 * sail, a rocket, the deep woods…), a light sheen sweeps across as it turns,
 * and gold embers drift up out of the open spread. Pure CSS — no dependencies.
 *
 * Performance: every animation is transform/opacity only, and all of them are
 * gated behind the `--live` class. The hero mounts the book static and flips
 * `live` on only after first paint (and never under reduced motion), so the
 * LCP headline is never blocked and the steady-state work stays on the GPU.
 */

interface FlippingBookProps {
  /** Width of the open spread, in px. */
  size?: number;
  className?: string;
  /** When true the book comes alive (riffle, embers, sheen, breathing). */
  live?: boolean;
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

// Allow CSS custom properties in inline styles without fighting the types.
type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

/** Draws one adventure inside the page's 100×136 viewBox. */
function Scene({ name, caption, uid }: { name: SceneName; caption: string; uid: string }) {
  const clip = `clip-${uid}`;
  const sky = `sky-${uid}`;
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
        {skyGradient(name, sky)}
        <linearGradient id={`paper-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#F2E4CB" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Paper */}
      <rect x="0" y="0" width="100" height="136" fill={CREAM} />
      <rect x="0" y="0" width="100" height="136" fill={`url(#paper-${uid})`} />

      {/* Art panel */}
      <g clipPath={`url(#${clip})`}>
        <rect x="8" y="10" width="84" height="84" fill={`url(#${sky})`} />
        {renderScene(name)}
      </g>
      <rect
        x="8"
        y="10"
        width="84"
        height="84"
        rx="7"
        fill="none"
        stroke={PURPLE}
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />

      {/* Caption + ruled lines */}
      <text
        x="50"
        y="109"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="9"
        fill={PURPLE}
      >
        {caption}
      </text>
      <line x1="22" y1="118" x2="78" y2="118" stroke={PURPLE} strokeWidth="1" strokeOpacity="0.18" />
      <line x1="26" y1="126" x2="74" y2="126" stroke={PURPLE} strokeWidth="1" strokeOpacity="0.18" />
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

/** Scene shapes, drawn within the 8,10 → 92,94 art panel. */
function renderScene(name: SceneName) {
  switch (name) {
    case "summit":
      return (
        <>
          <circle cx="70" cy="30" r="9" fill={GOLD} />
          <circle cx="70" cy="30" r="13" fill={GOLD} opacity="0.25" />
          <path d="M8 94 L34 50 L52 74 L66 56 L92 94 Z" fill={LILAC} opacity="0.7" />
          <path d="M8 94 L40 56 L60 94 Z" fill={PURPLE} />
          <path d="M52 94 L72 60 L92 94 Z" fill={DEEP} />
          <path d="M40 56 L46 64 L34 64 Z" fill={CREAM} opacity="0.95" />
          <path d="M72 60 L78 70 L66 70 Z" fill={CREAM} opacity="0.9" />
        </>
      );
    case "sail":
      return (
        <>
          <circle cx="26" cy="30" r="7" fill={GOLD} />
          <rect x="8" y="62" width="84" height="32" fill={PURPLE} opacity="0.85" />
          <path d="M8 64 Q26 58 44 64 T80 64 T96 64" stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M8 74 Q26 68 44 74 T80 74 T96 74" stroke={GOLD_SOFT} strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M40 64 L62 64 L56 74 L46 74 Z" fill={DEEP} />
          <rect x="50" y="40" width="2" height="22" fill={DEEP} />
          <path d="M52 42 L52 62 L70 60 Z" fill={CREAM} />
          <path d="M50 42 L50 62 L34 60 Z" fill={GOLD_SOFT} />
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
          <path d="M50 38 Q60 46 58 66 L42 66 Q40 46 50 38 Z" fill={CREAM} />
          <circle cx="50" cy="54" r="4" fill={PURPLE} />
          <path d="M42 62 L36 72 L42 68 Z" fill={PURPLE} />
          <path d="M58 62 L64 72 L58 68 Z" fill={PURPLE} />
          <path d="M46 68 Q50 84 54 68 Z" fill={GOLD} />
        </>
      );
    case "woods":
      return (
        <>
          <circle cx="72" cy="28" r="7" fill={GOLD_SOFT} />
          <path d="M44 94 Q50 66 50 52 Q50 66 56 94 Z" fill={GOLD} opacity="0.55" />
          {([
            [22, 46, PURPLE],
            [34, 52, DEEP],
            [70, 48, PURPLE],
            [82, 54, DEEP],
          ] as [number, number, string][]).map(([x, y, c], i) => (
            <g key={i}>
              <path d={`M${x} ${y} L${x - 8} ${y + 18} L${x + 8} ${y + 18} Z`} fill={c} />
              <path d={`M${x} ${y + 10} L${x - 10} ${y + 32} L${x + 10} ${y + 32} Z`} fill={c} />
            </g>
          ))}
        </>
      );
    case "keep":
      return (
        <>
          <circle cx="74" cy="28" r="8" fill={GOLD} />
          <path d="M8 94 Q50 68 92 94 Z" fill={PURPLE} />
          <rect x="40" y="50" width="20" height="34" fill={CREAM} />
          <rect x="40" y="50" width="20" height="4" fill={DEEP} />
          <path d="M40 50 v-5 h4 v5 M48 50 v-5 h4 v5 M56 50 v-5 h4 v5" fill={DEEP} />
          <rect x="34" y="58" width="8" height="26" fill={GOLD_SOFT} />
          <rect x="58" y="58" width="8" height="26" fill={GOLD_SOFT} />
          <path d="M50 42 L50 34 L60 37 L50 40 Z" fill={GOLD} />
          <rect x="47" y="70" width="6" height="14" rx="3" fill={DEEP} />
        </>
      );
    case "skyward":
      return (
        <>
          <ellipse cx="26" cy="34" rx="12" ry="5" fill={CREAM} opacity="0.85" />
          <ellipse cx="74" cy="50" rx="14" ry="6" fill={CREAM} opacity="0.8" />
          <path d="M50 26 Q66 32 62 54 Q56 66 50 66 Q44 66 38 54 Q34 32 50 26 Z" fill={GOLD} />
          <path d="M50 26 Q56 32 54 62 L46 62 Q44 32 50 26 Z" fill={PURPLE} opacity="0.55" />
          <path d="M44 65 L56 65 L53 72 L47 72 Z" fill={DEEP} />
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
          <rect x="8" y="60" width="84" height="34" fill={PURPLE} opacity="0.8" />
          <path d="M30 80 Q40 62 58 68 Q72 72 78 66 Q70 86 50 86 Q36 86 30 80 Z" fill={DEEP} />
          <path d="M78 66 Q86 62 88 58 Q86 68 80 72 Z" fill={DEEP} />
          <circle cx="40" cy="74" r="1.6" fill={CREAM} />
          <path d="M58 62 Q58 52 62 48" stroke={CREAM} strokeWidth="1.4" fill="none" opacity="0.7" />
        </>
      );
    case "sands":
      return (
        <>
          <circle cx="50" cy="30" r="10" fill={GOLD} />
          <circle cx="50" cy="30" r="15" fill={GOLD} opacity="0.22" />
          <path d="M18 94 L40 52 L62 94 Z" fill={PURPLE} />
          <path d="M48 94 L66 60 L84 94 Z" fill={DEEP} />
          <path d="M40 52 L44 60 L36 60 Z" fill={GOLD_SOFT} opacity="0.6" />
          <path d="M8 94 Q40 80 92 94 Z" fill={LILAC} opacity="0.7" />
          <path d="M8 94 Q50 86 92 94 Z" fill={GOLD_SOFT} opacity="0.5" />
        </>
      );
  }
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

export default function FlippingBook({ size = 210, className = "", live = true }: FlippingBookProps) {
  // Geometry derived from the spread width.
  const pageW = Math.round(size * 0.46);
  const pageH = Math.round(pageW * 1.36);
  const spread = pageW * 2;
  const coverPad = Math.round(size * 0.035);
  const edgeW = Math.max(5, Math.round(size * 0.03));
  const stageW = spread + coverPad * 2 + edgeW * 2;
  const stageH = pageH + coverPad * 2 + Math.round(size * 0.16);

  const leaves = 5;
  const duration = 6; // seconds per leaf cycle

  // Each leaf shows one adventure as it lifts (front) and another as it settles
  // (back); offset the walk so a leaf's two faces are never the same scene.
  const leafData = Array.from({ length: leaves }, (_, i) => ({
    front: SCENES[(i * 2 + 3) % SCENES.length],
    back: SCENES[(i * 2 + 4) % SCENES.length],
    delay: (duration / leaves) * i,
  }));

  // Rising embers — deterministic so SSR and client agree (no hydration drift).
  const embers = [
    { left: 30, drift: 10, size: 6, delay: 0, dur: 5.2 },
    { left: 46, drift: -8, size: 5, delay: 1.1, dur: 6.0 },
    { left: 58, drift: 12, size: 7, delay: 2.0, dur: 5.6 },
    { left: 40, drift: -12, size: 4, delay: 3.0, dur: 6.4 },
    { left: 64, drift: 6, size: 5, delay: 3.8, dur: 5.0 },
    { left: 52, drift: -6, size: 6, delay: 4.6, dur: 6.2 },
  ];

  // Twinkling stars over the resting spread.
  const accents = [
    { x: 0.62, y: 0.16, s: 7, delay: 0.2 },
    { x: 0.78, y: 0.26, s: 5, delay: 1.3 },
    { x: 0.7, y: 0.34, s: 6, delay: 2.1 },
    { x: 0.3, y: 0.2, s: 5, delay: 0.9 },
  ];

  return (
    <div
      className={`flip-book-stage ${className}`}
      style={{ width: stageW, height: stageH }}
      role="img"
      aria-label="An open book of adventures with its pages turning"
    >
      {/* Warm halo */}
      <span
        className="flip-book__halo"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(241,187,26,0.5) 0%, rgba(241,187,26,0.14) 38%, transparent 70%)",
        }}
      />

      <div
        className={`flip-book${live ? " flip-book--live" : ""}`}
        style={{ width: spread, height: pageH }}
      >
        {/* Cast shadow */}
        <span className="flip-book__shadow" style={{ width: spread * 0.92, height: pageH * 0.18 }} />

        {/* Ornate cover behind the spread */}
        <span
          className="flip-book__cover"
          style={{ width: spread + coverPad * 2, height: pageH + coverPad * 2 }}
        >
          <Flourish corner="tl" />
          <Flourish corner="tr" />
          <Flourish corner="bl" />
          <Flourish corner="br" />
        </span>

        {/* Gilded fore-edges */}
        <span className="flip-book__edge" style={{ left: -edgeW, width: edgeW, height: Math.round(pageH * 0.96) }} />
        <span className="flip-book__edge" style={{ left: spread, width: edgeW, height: Math.round(pageH * 0.96) }} />

        {/* Resting spread */}
        <BasePage side="left" width={pageW} height={pageH} />
        <BasePage side="right" width={pageW} height={pageH} left={pageW} />

        {/* Spine */}
        <span className="flip-book__spine" style={{ left: pageW - 2, width: 4, height: pageH }} />

        {/* Twinkles over the spread */}
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

        {/* Riffling leaves */}
        {leafData.map((leaf, i) => (
          <div
            key={i}
            className="flip-book__leaf"
            style={
              {
                left: pageW,
                width: pageW,
                height: pageH,
                "--dur": `${duration}s`,
                "--delay": `${leaf.delay}s`,
              } as CSSVars
            }
          >
            <div className="flip-book__face flip-book__face--front">
              <Scene name={leaf.front.name} caption={leaf.front.caption} uid={`f${i}`} />
              <span className="flip-book__curl" />
              <span
                className="flip-book__sheen"
                style={{ "--dur": `${duration}s`, "--delay": `${leaf.delay}s` } as CSSVars}
              />
            </div>
            <div className="flip-book__face flip-book__face--back">
              <Scene name={leaf.back.name} caption={leaf.back.caption} uid={`b${i}`} />
              <span className="flip-book__curl" />
            </div>
          </div>
        ))}

        {/* Lamp highlight + vignette */}
        <span className="flip-book__light" style={{ width: spread, height: pageH }} />

        {/* Rising embers */}
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
  );
}

/** A resting page of the open book. */
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
  // Left rests on a summit; the more-visible right page features the night sky.
  const scene = side === "left" ? SCENES[0] : SCENES[2];
  return (
    <div className={`flip-book__base flip-book__base--${side}`} style={{ left, width, height }}>
      <Scene name={scene.name} caption={scene.caption} uid={`base-${side}`} />
    </div>
  );
}
