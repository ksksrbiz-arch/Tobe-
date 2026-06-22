"use client";

import React from "react";

/**
 * <FlippingBook /> — a magical leather-bound tome for the hero. Gilded pages
 * riffle past the spine in 3D, and every page is a vivid pop-up diorama: a
 * full-colour adventure backdrop with a foreground subject that stands off the
 * page (translated forward in Z) so it parallaxes as the leaf turns. Gold
 * embers drift up from the open spread. Pure CSS — no dependencies.
 *
 * Performance: all animation is transform/opacity only, gated behind the
 * `--live` class. The hero mounts the book static and flips `live` on only
 * after first paint (never under reduced motion), so the LCP headline is never
 * blocked and steady-state work stays on the GPU.
 */

interface FlippingBookProps {
  /** Width of the open spread, in px. */
  size?: number;
  className?: string;
  /** When true the book comes alive (riffle, embers, sheen, breathing). */
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

/** The page surface: paper + clipped backdrop art + frame + caption. */
function SceneBg({ name, caption, uid }: { name: SceneName; caption: string; uid: string }) {
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

      {/* Paper */}
      <rect x="0" y="0" width="100" height="136" fill={CREAM} />
      <rect x="0" y="0" width="100" height="136" fill={`url(#paper-${uid})`} />

      {/* Backdrop art, clipped to the panel */}
      <g clipPath={`url(#${clip})`}>{renderBg(name, uid)}</g>

      {/* Gold-cornered frame */}
      <rect x="8" y="10" width="84" height="84" rx="7" fill="none" stroke={PURPLE} strokeOpacity="0.4" strokeWidth="1.6" />
      <rect x="8" y="10" width="84" height="84" rx="7" fill="none" stroke={GOLD} strokeOpacity="0.55" strokeWidth="0.8" />

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

/** The pop-up subject — transparent, may rise above the page edge. */
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

/** Backdrops — drawn inside the 8,10 → 92,94 panel, clipped. */
function renderBg(name: SceneName, uid: string) {
  switch (name) {
    case "dragon":
      return (
        <>
          <defs>
            <linearGradient id={`dsky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3A2A6B" />
              <stop offset="0.55" stopColor="#C84C8C" />
              <stop offset="1" stopColor="#FBB36A" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="84" height="84" fill={`url(#dsky-${uid})`} />
          <circle cx="68" cy="30" r="11" fill="#FFE6A8" />
          <circle cx="68" cy="30" r="15" fill="#FFE6A8" opacity="0.25" />
          {[[20, 24], [34, 20], [80, 26], [26, 40]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.9} fill="#FFF4D0" />
          ))}
          <path d="M8 78 L24 54 L40 70 L56 52 L72 72 L92 56 L92 94 L8 94 Z" fill="#2C7A7B" />
          <path d="M8 94 L8 74 L28 60 L48 78 L70 62 L92 80 L92 94 Z" fill="#173B4A" />
        </>
      );
    case "rocket":
      return (
        <>
          <defs>
            <linearGradient id={`rsky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#140A38" />
              <stop offset="1" stopColor="#3C1E73" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="84" height="84" fill={`url(#rsky-${uid})`} />
          <ellipse cx="30" cy="40" rx="22" ry="14" fill="#7A3FA0" opacity="0.45" />
          <ellipse cx="66" cy="64" rx="20" ry="12" fill="#C04BA0" opacity="0.4" />
          {[[18, 22, 1.1], [40, 18, 0.8], [78, 24, 1], [30, 70, 0.9], [84, 70, 1.1], [54, 40, 0.7]].map(
            ([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#FFF4D0" />,
          )}
          <circle cx="76" cy="34" r="9" fill="#F2A65A" />
          <ellipse cx="76" cy="34" rx="16" ry="4.5" fill="none" stroke="#FFD18A" strokeWidth="1.6" />
        </>
      );
    case "pirate":
      return (
        <>
          <defs>
            <linearGradient id={`psky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8FE0FB" />
              <stop offset="1" stopColor="#D6F4FF" />
            </linearGradient>
            <linearGradient id={`psea-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1FB6C9" />
              <stop offset="1" stopColor="#0E7C9E" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="84" height="84" fill={`url(#psky-${uid})`} />
          <circle cx="26" cy="28" r="8" fill="#FFE082" />
          <ellipse cx="46" cy="26" rx="12" ry="5" fill="#FFFFFF" opacity="0.85" />
          <ellipse cx="74" cy="34" rx="10" ry="4" fill="#FFFFFF" opacity="0.8" />
          <rect x="8" y="60" width="84" height="34" fill={`url(#psea-${uid})`} />
          <path d="M8 62 Q26 57 44 62 T80 62 T96 62" stroke="#7FE3D6" strokeWidth="1.4" fill="none" opacity="0.7" />
          <path d="M8 72 Q26 67 44 72 T80 72 T96 72" stroke="#7FE3D6" strokeWidth="1.4" fill="none" opacity="0.5" />
          <path d="M76 60 Q82 54 88 60 L88 64 Q82 62 76 64 Z" fill="#3FA34D" />
          <rect x="81" y="56" width="2" height="6" fill="#8B5A2B" />
        </>
      );
    case "jungle":
      return (
        <>
          <defs>
            <linearGradient id={`jsky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#CFF3C0" />
              <stop offset="1" stopColor="#8FD66B" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="84" height="84" fill={`url(#jsky-${uid})`} />
          <circle cx="72" cy="28" r="7" fill="#FFE9A8" />
          <path d="M40 94 L40 56 L60 56 L60 94 Z" fill="#B79B6E" />
          <path d="M38 56 L50 44 L62 56 Z" fill="#9E8B6B" />
          <path d="M42 64 h16 M42 72 h16 M42 80 h16" stroke="#7A6B50" strokeWidth="1.2" />
          <path d="M8 94 Q22 66 36 94 Z" fill="#2E7D32" />
          <path d="M64 94 Q80 64 94 94 Z" fill="#2E7D32" />
          <path d="M8 94 Q18 76 30 94 Z" fill="#3FA34D" />
          <path d="M70 94 Q82 74 94 94 Z" fill="#3FA34D" />
        </>
      );
    case "balloon":
      return (
        <>
          <defs>
            <linearGradient id={`bsky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5AC8FA" />
              <stop offset="1" stopColor="#BFEBFF" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="84" height="84" fill={`url(#bsky-${uid})`} />
          <ellipse cx="28" cy="30" rx="13" ry="5" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="74" cy="44" rx="11" ry="4.5" fill="#FFFFFF" opacity="0.85" />
          <path d="M8 94 L8 82 Q30 76 52 82 T92 80 L92 94 Z" fill="#6FBF4A" />
          <path d="M8 94 L8 88 Q34 84 60 88 T92 88 L92 94 Z" fill="#4E9E33" />
          <path d="M30 84 l8 0 M52 86 l10 0 M70 84 l8 0" stroke="#E8C84A" strokeWidth="1.2" opacity="0.7" />
        </>
      );
    case "reef":
      return (
        <>
          <defs>
            <linearGradient id={`fsea-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1FB6C9" />
              <stop offset="0.6" stopColor="#0E7C9E" />
              <stop offset="1" stopColor="#0A5E7C" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="84" height="84" fill={`url(#fsea-${uid})`} />
          <path d="M30 10 L24 50 M52 10 L50 44 M74 10 L80 52" stroke="#9FE8F0" strokeWidth="3" opacity="0.18" />
          <path d="M8 94 Q50 82 92 94 Z" fill="#EAD9A0" />
          <path d="M16 94 q2 -14 6 -14 q4 0 6 14 Z" fill="#FF6F91" />
          <path d="M70 94 q3 -16 7 -16 q4 0 7 16 Z" fill="#7B61FF" />
          <path d="M40 94 q2 -10 5 -10 q3 0 5 10 Z" fill="#FFB85C" />
          {[[30, 40], [60, 30], [50, 60]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.4} fill="#CFFFF6" opacity="0.7" />
          ))}
        </>
      );
    case "aurora":
      return (
        <>
          <defs>
            <linearGradient id={`asky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0B1E3B" />
              <stop offset="1" stopColor="#13315C" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="84" height="84" fill={`url(#asky-${uid})`} />
          <path d="M10 40 Q34 18 50 38 T90 34" stroke="#3DF5C0" strokeWidth="5" fill="none" opacity="0.45" />
          <path d="M12 50 Q36 30 54 48 T92 44" stroke="#7AE0FF" strokeWidth="4" fill="none" opacity="0.4" />
          <path d="M14 60 Q40 42 58 58 T90 56" stroke="#A06BFF" strokeWidth="3.5" fill="none" opacity="0.35" />
          {[[22, 26, 1], [46, 22, 0.8], [78, 28, 1], [62, 18, 0.8]].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#FFF4D0" />
          ))}
          <path d="M8 94 L8 78 L30 66 L52 80 L74 66 L92 80 L92 94 Z" fill="#C7D7E8" />
          <path d="M8 94 L8 86 L34 74 L60 88 L92 78 L92 94 Z" fill="#9FB3CC" />
        </>
      );
    case "desert":
      return (
        <>
          <defs>
            <linearGradient id={`xsky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFC36B" />
              <stop offset="1" stopColor="#FF7E5F" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="84" height="84" fill={`url(#xsky-${uid})`} />
          <circle cx="50" cy="36" r="13" fill="#FFE08A" />
          <circle cx="50" cy="36" r="18" fill="#FFE08A" opacity="0.3" />
          <path d="M58 94 L74 60 L92 94 Z" fill="#C99A5B" />
          <path d="M8 94 Q40 76 92 94 Z" fill="#E0A94E" />
          <path d="M8 94 Q44 84 92 94 Z" fill="#F2C46B" />
        </>
      );
  }
}

/** Pop-up subjects — drawn in the same 100×136 space, may exceed the panel. */
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

/** Renders the clipped page + the pop-up subject for one page. */
function PageContent({
  scene,
  uid,
  sheen,
  dur,
  delay,
}: {
  scene: { name: SceneName; caption: string };
  uid: string;
  sheen?: boolean;
  dur?: number;
  delay?: number;
}) {
  return (
    <>
      <div className="flip-book__bg">
        <SceneBg name={scene.name} caption={scene.caption} uid={uid} />
        <span className="flip-book__curl" />
        {sheen && (
          <span
            className="flip-book__sheen"
            style={{ "--dur": `${dur}s`, "--delay": `${delay}s` } as CSSVars}
          />
        )}
      </div>
      <div className="flip-book__pop">
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

export default function FlippingBook({ size = 210, className = "", live = true }: FlippingBookProps) {
  const pageW = Math.round(size * 0.46);
  const pageH = Math.round(pageW * 1.36);
  const spread = pageW * 2;
  const coverPad = Math.round(size * 0.035);
  const edgeW = Math.max(5, Math.round(size * 0.03));
  const stageW = spread + coverPad * 2 + edgeW * 2;
  const stageH = pageH + coverPad * 2 + Math.round(size * 0.16);

  const leaves = 4;
  const duration = 6; // seconds per leaf cycle

  // Each leaf shows one adventure lifting (front) and another settling (back).
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
      aria-label="An open book of adventures with its pages turning"
    >
      <span
        className="flip-book__halo"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(241,187,26,0.5) 0%, rgba(241,187,26,0.14) 38%, transparent 70%)",
        }}
      />

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

        {/* Resting spread */}
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

        {/* Riffling leaves */}
        {leafData.map((leaf, i) => (
          <div
            key={i}
            className="flip-book__leaf"
            style={
              { left: pageW, width: pageW, height: pageH, "--dur": `${duration}s`, "--delay": `${leaf.delay}s` } as CSSVars
            }
          >
            <div className="flip-book__face flip-book__face--front">
              <PageContent scene={leaf.front} uid={`f${i}`} sheen dur={duration} delay={leaf.delay} />
            </div>
            <div className="flip-book__face flip-book__face--back">
              <PageContent scene={leaf.back} uid={`b${i}`} />
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
  );
}

/** A resting page of the open book — a pop-up diorama. */
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
  // Left rests on a dusk peak; the more-visible right page is the starry sky.
  const scene = side === "left" ? SCENES[0] : SCENES[1];
  return (
    <div className={`flip-book__base flip-book__base--${side}`} style={{ left, width, height }}>
      <PageContent scene={scene} uid={`base-${side}`} />
    </div>
  );
}
