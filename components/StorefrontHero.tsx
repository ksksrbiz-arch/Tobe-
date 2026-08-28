/**
 * StorefrontHero — the hero illustration of the real shop at 7931 (Clackamas
 * Book Exchange, mid-rebrand to "To Be Read"), drawn as a single inline SVG.
 *
 * The real building is a very wide, very short strip-mall unit, so rather than
 * squeezing the whole facade into this near-square frame it is composed as a
 * cropped "hero shot": the fascia sign, the address numerals, the narrow
 * off-centre door with its SUITE 1 placard, the hanging oval window sign, a
 * handful of big storefront panes, the low brick wainscot, and the book carts
 * the shop actually sets out on the sidewalk. Glass stays the dominant surface,
 * with the dark board-and-batten fascia a thin band above it, as in the photos.
 *
 * This replaces the WebGL MagicBook3D scene that used to fill the hero window:
 * no three.js boot, no canvas, so it paints instantly and identically for every
 * visitor (Lighthouse included) instead of only after hydration.
 *
 * All motion is compositor-only — opacity and transform exclusively, never
 * box-shadow, background-position, filter or geometry attributes — and lives in
 * the .storefront-* classes in app/globals.css. Reduced-motion users are covered
 * by the global reduced-motion safety net in that same file, so nothing here
 * needs its own guard.
 */

const BRICK_ROWS = 6;
const BRICK_W = 21;
const BRICK_H = 5;

/** Slight per-brick colour jitter, deterministic so SSR and client agree. */
const BRICK_TONES = ["#A2564A", "#964C40", "#AC6053", "#8E4539", "#A85C4E", "#9B5044"];

function brickTone(row: number, col: number) {
  return BRICK_TONES[(row * 7 + col * 3) % BRICK_TONES.length];
}

export default function StorefrontHero({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 336"
      className={`storefront-hero ${className}`}
      role="img"
      aria-label="Illustration of the To Be Read storefront at 7931 — the Clackamas Book Exchange building, with wide glass windows glowing warm over a red brick base, a hanging oval shop sign, and carts of books out on the sidewalk"
    >
      <defs>
        {/* ---------- sky, sun, foliage ---------- */}
        <linearGradient id="sf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FA9CF" />
          <stop offset="55%" stopColor="#A6CDE3" />
          <stop offset="100%" stopColor="#E4EFF1" />
        </linearGradient>
        <radialGradient id="sf-sunglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8E2" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#FCE8A6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FCE8A6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-canopy" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#5C8B4F" />
          <stop offset="100%" stopColor="#33573A" />
        </linearGradient>
        <linearGradient id="sf-canopy2" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#6E9A57" />
          <stop offset="100%" stopColor="#3D6440" />
        </linearGradient>

        {/* ---------- building shell ---------- */}
        <linearGradient id="sf-fascia" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor="#343843" />
          <stop offset="60%" stopColor="#252932" />
          <stop offset="100%" stopColor="#1B1E26" />
        </linearGradient>
        <linearGradient id="sf-coping" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A505E" />
          <stop offset="100%" stopColor="#2A2E38" />
        </linearGradient>
        <linearGradient id="sf-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="70%" stopColor="#EDE4D5" />
          <stop offset="100%" stopColor="#CFC3B1" />
        </linearGradient>
        <linearGradient id="sf-mullion" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="55%" stopColor="#EFE7DA" />
          <stop offset="100%" stopColor="#C7BCAB" />
        </linearGradient>
        <linearGradient id="sf-signface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="60%" stopColor="#FDF8F0" />
          <stop offset="100%" stopColor="#EDE2CE" />
        </linearGradient>

        {/* ---------- glass ---------- */}
        <linearGradient id="sf-glass" x1="0.1" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#9FC2D6" />
          <stop offset="35%" stopColor="#7BA1BB" />
          <stop offset="72%" stopColor="#4E718C" />
          <stop offset="100%" stopColor="#3B5A73" />
        </linearGradient>
        <linearGradient id="sf-interior" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1BB1A" stopOpacity="0.06" />
          <stop offset="45%" stopColor="#F1BB1A" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#FCE8A6" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="sf-ceiling" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF6DC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFF6DC" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sf-reflect" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sf-sheenband" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* ---------- door / brick / ground ---------- */}
        <linearGradient id="sf-doorglass" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#6F93AB" />
          <stop offset="60%" stopColor="#40607A" />
          <stop offset="100%" stopColor="#2C4459" />
        </linearGradient>
        <linearGradient id="sf-brick" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B06453" />
          <stop offset="100%" stopColor="#7E4234" />
        </linearGradient>
        <linearGradient id="sf-walk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CFC9BE" />
          <stop offset="100%" stopColor="#B0AAA0" />
        </linearGradient>
        <linearGradient id="sf-asphalt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B5D63" />
          <stop offset="100%" stopColor="#43454B" />
        </linearGradient>
        <radialGradient id="sf-vignette" cx="50%" cy="46%" r="72%">
          <stop offset="60%" stopColor="#3A0F40" stopOpacity="0" />
          <stop offset="100%" stopColor="#3A0F40" stopOpacity="0.34" />
        </radialGradient>

        <clipPath id="sf-frame-clip">
          <rect x="0" y="0" width="400" height="336" rx="6" />
        </clipPath>
        <clipPath id="sf-bay-left">
          <rect x="4" y="128" width="114" height="150" />
        </clipPath>
        <clipPath id="sf-bay-right">
          <rect x="180" y="128" width="216" height="150" />
        </clipPath>
      </defs>

      <g clipPath="url(#sf-frame-clip)">
        {/* ══════════ sky ══════════ */}
        <rect x="0" y="0" width="400" height="70" fill="url(#sf-sky)" />
        <circle cx="338" cy="14" r="52" fill="url(#sf-sunglow)" className="storefront-sun" />
        <circle cx="338" cy="14" r="13" fill="#FFF9E6" opacity="0.9" className="storefront-sun" />

        <g className="storefront-cloud storefront-cloud--a" opacity="0.85">
          <ellipse cx="74" cy="16" rx="30" ry="8" fill="#FFFDF9" />
          <ellipse cx="96" cy="11" rx="18" ry="9" fill="#FFFDF9" />
          <ellipse cx="56" cy="12" rx="14" ry="7" fill="#FFFDF9" />
        </g>
        <g className="storefront-cloud storefront-cloud--b" opacity="0.6">
          <ellipse cx="216" cy="9" rx="24" ry="6.5" fill="#FFFDF9" />
          <ellipse cx="232" cy="6" rx="13" ry="6" fill="#FFFDF9" />
        </g>

        {/* ══════════ trees above the roofline ══════════ */}
        <g className="storefront-tree storefront-tree--left" style={{ transformOrigin: "44px 66px" }}>
          <rect x="41" y="40" width="6" height="26" fill="#4A3527" />
          <ellipse cx="44" cy="36" rx="30" ry="21" fill="url(#sf-canopy)" />
          <ellipse cx="24" cy="44" rx="18" ry="13" fill="url(#sf-canopy2)" />
          <ellipse cx="62" cy="45" rx="17" ry="12" fill="url(#sf-canopy2)" opacity="0.9" />
        </g>
        <g className="storefront-tree storefront-tree--right" style={{ transformOrigin: "302px 66px" }}>
          <rect x="299" y="42" width="5" height="24" fill="#4A3527" />
          <ellipse cx="302" cy="40" rx="24" ry="17" fill="url(#sf-canopy2)" />
          <ellipse cx="284" cy="48" rx="14" ry="10" fill="url(#sf-canopy)" />
        </g>
        <ellipse cx="378" cy="50" rx="26" ry="16" fill="url(#sf-canopy)" opacity="0.75" />
        <ellipse cx="140" cy="54" rx="22" ry="12" fill="url(#sf-canopy2)" opacity="0.55" />

        {/* falling leaves — outer <g> holds the static position, the class rides
            on the inner <path> so the SVG transform never fights the CSS one */}
        {[
          { x: 60, y: 30, d: "0s", c: "#D9A63C" },
          { x: 158, y: 20, d: "2.6s", c: "#C4703A" },
          { x: 296, y: 34, d: "5.1s", c: "#E0B94C" },
          { x: 366, y: 24, d: "1.4s", c: "#B9612F" },
        ].map((leaf) => (
          <g key={leaf.x} transform={`translate(${leaf.x},${leaf.y})`}>
            <path
              className="storefront-leaf"
              d="M0 0 Q3.4 -5.2 6.8 0 Q3.4 5.2 0 0 Z"
              fill={leaf.c}
              opacity="0.85"
              style={{ animationDelay: leaf.d }}
            />
          </g>
        ))}

        {/* ══════════ fascia band (thin, dark, carries the signage) ══════════ */}
        <rect x="0" y="58" width="400" height="7" fill="url(#sf-coping)" />
        <rect x="0" y="65" width="400" height="55" fill="url(#sf-fascia)" />
        {/* board-and-batten vertical seams */}
        {Array.from({ length: 25 }, (_, i) => (
          <rect key={i} x={i * 16 + 5} y="65" width="1.4" height="55" fill="#141721" opacity="0.55" />
        ))}
        <rect x="0" y="65" width="400" height="2" fill="#0F1219" opacity="0.7" />
        <rect x="0" y="112" width="400" height="8" fill="#12151C" opacity="0.55" />

        {/* address numerals, left of the sign */}
        <text
          x="16"
          y="103"
          fontFamily="var(--font-serif)"
          fontSize="30"
          fontWeight="700"
          fill="#F0E9DA"
          letterSpacing="2.5"
          opacity="0.95"
        >
          7931
        </text>

        {/* fascia sign — the new brand */}
        <g>
          <rect x="128" y="70" width="248" height="40" rx="3" fill="#0E1118" opacity="0.45" transform="translate(2,3)" />
          <rect x="128" y="70" width="248" height="40" rx="3" fill="url(#sf-signface)" stroke="#B9AE9A" strokeWidth="1" />
          <rect x="132" y="74" width="240" height="32" rx="1.5" fill="none" stroke="#E1D6C1" strokeWidth="0.8" />
          {/* little book-stack mark */}
          <g>
            <rect x="141" y="94" width="24" height="5" rx="1" fill="#6B1C6F" />
            <rect x="143" y="88.4" width="21" height="5" rx="1" fill="#F1BB1A" />
            <rect x="145" y="82.8" width="18" height="5" rx="1" fill="#8B2E90" />
            <rect x="146" y="78" width="14" height="4.4" rx="1" fill="#3A0F40" />
          </g>
          <text
            x="272"
            y="98"
            textAnchor="middle"
            fontFamily="var(--font-serif)"
            fontSize="27"
            fontWeight="700"
            fill="#3A0F40"
            letterSpacing="0.6"
          >
            To Be Read
          </text>
        </g>

        {/* ══════════ header beam / soffit above the glass ══════════ */}
        <rect x="0" y="120" width="400" height="9" fill="url(#sf-beam)" />
        <rect x="0" y="129" width="400" height="2" fill="#9C917F" opacity="0.7" />
        {/* soffit downlights */}
        {[62, 218, 330].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="130" rx="11" ry="3.2" fill="#FCE8A6" opacity="0.85" />
            <ellipse
              cx={cx}
              cy="137"
              rx="18"
              ry="9"
              fill="#FCE8A6"
              opacity="0.28"
              className="storefront-glow"
              style={{ animationDelay: `${cx / 260}s` }}
            />
          </g>
        ))}

        {/* ══════════ storefront glass — the dominant surface ══════════ */}
        <rect x="0" y="128" width="400" height="152" fill="#22262F" />

        {/* ---------- LEFT BAY ---------- */}
        <g clipPath="url(#sf-bay-left)">
          <rect x="4" y="128" width="114" height="150" fill="url(#sf-glass)" />
          {/* interior warm light */}
          <rect
            x="4"
            y="128"
            width="114"
            height="150"
            fill="url(#sf-interior)"
            className="storefront-glow"
          />
          <rect x="4" y="128" width="114" height="26" fill="url(#sf-ceiling)" />
          {/* ceiling strip lights */}
          <rect x="18" y="136" width="42" height="3" rx="1.5" fill="#FFF6DC" opacity="0.8" />
          <rect x="70" y="140" width="36" height="2.6" rx="1.3" fill="#FFF6DC" opacity="0.6" />
          {/* bookshelf silhouettes */}
          <g opacity="0.62">
            <rect x="8" y="182" width="48" height="72" fill="#3A0F40" opacity="0.55" />
            <rect x="62" y="192" width="52" height="62" fill="#3A0F40" opacity="0.45" />
            {[190, 206, 222, 238].map((y, r) => (
              <g key={y}>
                <rect x="8" y={y + 10} width="48" height="2" fill="#2B0B30" opacity="0.7" />
                {Array.from({ length: 11 }, (_, i) => (
                  <rect
                    key={i}
                    x={10 + i * 4.2}
                    y={y + (i % 3)}
                    width="3.2"
                    height={10 - (i % 3)}
                    fill={["#8B2E90", "#F1BB1A", "#6B1C6F", "#C4703A", "#FDF8F0"][(i + r) % 5]}
                    opacity="0.8"
                  />
                ))}
              </g>
            ))}
            {[202, 220, 238].map((y, r) => (
              <g key={y}>
                {Array.from({ length: 11 }, (_, i) => (
                  <rect
                    key={i}
                    x={64 + i * 4.4}
                    y={y + (i % 2)}
                    width="3.4"
                    height={11 - (i % 2)}
                    fill={["#6B1C6F", "#FCE8A6", "#8B2E90", "#A2564A"][(i + r) % 4]}
                    opacity="0.7"
                  />
                ))}
              </g>
            ))}
          </g>
          {/* a browsing figure, barely there */}
          <g opacity="0.35" fill="#2B0B30">
            <circle cx="92" cy="188" r="6" />
            <path d="M82 226 Q82 198 92 198 Q102 198 102 226 Z" />
          </g>
          {/* reflections */}
          <path d="M4 128 L58 128 L18 278 L4 278 Z" fill="url(#sf-reflect)" />
          <path d="M74 128 L92 128 L52 278 L34 278 Z" fill="#FFFFFF" opacity="0.07" />
          <rect
            x="-60"
            y="128"
            width="42"
            height="150"
            fill="url(#sf-sheenband)"
            className="storefront-sheen"
            transform="skewX(-14)"
          />
        </g>

        {/* OPEN sign in the glass beside the door */}
        <g className="storefront-open-sign" style={{ transformOrigin: "94px 222px" }}>
          <rect x="72" y="212" width="44" height="20" rx="3" fill="#0F3524" stroke="#2E7D52" strokeWidth="1" />
          <text
            x="94"
            y="226.5"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.8"
            fill="#6FE8A6"
          >
            OPEN
          </text>
        </g>

        {/* ---------- RIGHT BAY ---------- */}
        <g clipPath="url(#sf-bay-right)">
          <rect x="180" y="128" width="216" height="150" fill="url(#sf-glass)" />
          <rect
            x="180"
            y="128"
            width="216"
            height="150"
            fill="url(#sf-interior)"
            className="storefront-glow"
            style={{ animationDelay: "1.3s" }}
          />
          <rect x="180" y="128" width="216" height="26" fill="url(#sf-ceiling)" />
          <rect x="196" y="136" width="60" height="3" rx="1.5" fill="#FFF6DC" opacity="0.8" />
          <rect x="272" y="139" width="54" height="2.8" rx="1.4" fill="#FFF6DC" opacity="0.65" />
          <rect x="336" y="136" width="48" height="3" rx="1.5" fill="#FFF6DC" opacity="0.7" />
          {/* bookshelf silhouettes across the bay */}
          <g opacity="0.6">
            <rect x="184" y="176" width="208" height="80" fill="#3A0F40" opacity="0.42" />
            {[184, 202, 220, 238].map((y, r) => (
              <g key={y}>
                <rect x="184" y={y + 12} width="208" height="2.2" fill="#2B0B30" opacity="0.65" />
                {Array.from({ length: 46 }, (_, i) => (
                  <rect
                    key={i}
                    x={186 + i * 4.5}
                    y={y + (i % 3)}
                    width="3.4"
                    height={12 - (i % 3)}
                    fill={
                      ["#8B2E90", "#F1BB1A", "#6B1C6F", "#C4703A", "#FDF8F0", "#3E6B45"][(i + r * 2) % 6]
                    }
                    opacity="0.78"
                  />
                ))}
              </g>
            ))}
          </g>
          {/* a reading lamp glow deep in the room */}
          <ellipse cx="352" cy="196" rx="26" ry="20" fill="#F1BB1A" opacity="0.22" className="storefront-glow" style={{ animationDelay: "2.4s" }} />
          {/* reflections: sky at the top, sweep across */}
          <path d="M180 128 L268 128 L206 278 L180 278 Z" fill="url(#sf-reflect)" />
          <path d="M298 128 L318 128 L256 278 L236 278 Z" fill="#FFFFFF" opacity="0.06" />
          <rect
            x="120"
            y="128"
            width="56"
            height="150"
            fill="url(#sf-sheenband)"
            className="storefront-sheen"
            transform="skewX(-14)"
            style={{ animationDelay: "2.6s" }}
          />
        </g>

        {/* ---------- hanging oval sign (inside the right-hand glass) ----------
            Outer <g> carries the static placement; the animated class sits on
            the inner <g>, which only ever rotates. */}
        <line x1="234" y1="130" x2="238" y2="146" stroke="#C7BCAB" strokeWidth="1.2" opacity="0.8" />
        <line x1="278" y1="130" x2="274" y2="146" stroke="#C7BCAB" strokeWidth="1.2" opacity="0.8" />
        <g transform="translate(256,146)">
          <g className="storefront-oval-sign">
            <rect x="-24" y="-2" width="48" height="4" rx="2" fill="#B9AE9A" />
            <ellipse cx="0" cy="47" rx="46" ry="41" fill="#0E1118" opacity="0.28" transform="translate(2,3)" />
            <ellipse cx="0" cy="47" rx="46" ry="41" fill="url(#sf-signface)" stroke="#6B1C6F" strokeWidth="2" />
            <ellipse cx="0" cy="47" rx="41" ry="36" fill="none" stroke="#F1BB1A" strokeWidth="1" opacity="0.8" />
            <text
              x="0"
              y="26"
              textAnchor="middle"
              fontFamily="var(--font-serif)"
              fontSize="12"
              fontWeight="700"
              fill="#6B1C6F"
              letterSpacing="0.4"
            >
              CLACKAMAS
            </text>
            {/* book stack */}
            <g>
              <rect x="-19" y="34" width="38" height="6" rx="1.4" fill="#8B2E90" />
              <rect x="-16" y="41" width="33" height="6" rx="1.4" fill="#F1BB1A" />
              <rect x="-18" y="48" width="35" height="6" rx="1.4" fill="#C4703A" />
              <rect x="-13" y="55" width="27" height="5" rx="1.4" fill="#3E6B45" />
            </g>
            <rect x="-38" y="63" width="76" height="1" fill="#C7BCAB" />
            <text
              x="0"
              y="76"
              textAnchor="middle"
              fontFamily="var(--font-serif)"
              fontSize="10.5"
              fontWeight="700"
              fill="#6B1C6F"
              letterSpacing="0.3"
            >
              BOOK EXCHANGE
            </text>
          </g>
        </g>

        {/* ---------- window framing: slim white mullions ---------- */}
        {/* verticals */}
        {[0, 56, 114].map((x) => (
          <rect key={`l${x}`} x={x} y="128" width="5" height="150" fill="url(#sf-mullion)" />
        ))}
        {[176, 230, 284, 338, 391].map((x) => (
          <rect key={`r${x}`} x={x} y="128" width="5" height="150" fill="url(#sf-mullion)" />
        ))}
        {/* lower rail */}
        <rect x="0" y="252" width="118" height="5" fill="url(#sf-mullion)" />
        <rect x="176" y="252" width="220" height="5" fill="url(#sf-mullion)" />
        {/* sill */}
        <rect x="0" y="272" width="118" height="7" fill="url(#sf-mullion)" />
        <rect x="176" y="272" width="220" height="7" fill="url(#sf-mullion)" />

        {/* ══════════ brick wainscot ══════════ */}
        <rect x="0" y="279" width="400" height="30" fill="url(#sf-brick)" />
        <g>
          {Array.from({ length: BRICK_ROWS }, (_, row) => (
            <g key={row} transform={`translate(${row % 2 === 0 ? -4 : -14}, ${279 + row * BRICK_H})`}>
              {Array.from({ length: 21 }, (_, col) => (
                <rect
                  key={col}
                  x={col * BRICK_W}
                  y={0.7}
                  width={BRICK_W - 1.6}
                  height={BRICK_H - 1.4}
                  rx="0.6"
                  fill={brickTone(row, col)}
                />
              ))}
            </g>
          ))}
        </g>
        <rect x="0" y="279" width="400" height="2.4" fill="#C9B7A6" opacity="0.75" />
        <rect x="0" y="303" width="400" height="6" fill="#000000" opacity="0.16" />

        {/* ══════════ door recess (narrow, left of centre) ══════════ */}
        <rect x="118" y="120" width="60" height="190" fill="#1E212A" />
        {Array.from({ length: 4 }, (_, i) => (
          <rect key={i} x={124 + i * 15} y="120" width="1.4" height="190" fill="#12151C" opacity="0.7" />
        ))}
        <rect x="118" y="120" width="60" height="4" fill="#0F1219" opacity="0.6" />
        {/* A-REBS COMM. plate */}
        <rect x="126" y="132" width="44" height="10" rx="1.2" fill="#F0EADC" />
        <text
          x="148"
          y="139.6"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="5.6"
          fontWeight="700"
          fill="#2B2E36"
          letterSpacing="0.2"
        >
          A-REBS COMM.
        </text>
        {/* SUITE 1 placard */}
        <rect x="133" y="148" width="30" height="11" rx="1.2" fill="#FDF8F0" stroke="#C7BCAB" strokeWidth="0.6" />
        <text
          x="148"
          y="156.4"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="6.4"
          fontWeight="700"
          fill="#3A0F40"
          letterSpacing="0.4"
        >
          SUITE 1
        </text>
        {/* the door itself */}
        <rect x="126" y="164" width="44" height="146" fill="#15181F" />
        <rect x="128" y="166" width="40" height="142" fill="#2A2E38" />
        <rect x="131" y="172" width="34" height="86" rx="1.5" fill="url(#sf-doorglass)" />
        <path d="M131 172 L148 172 L131 226 Z" fill="#FFFFFF" opacity="0.12" />
        <rect x="134" y="180" width="18" height="12" rx="1" fill="#FDF8F0" opacity="0.85" />
        <rect x="131" y="264" width="34" height="40" rx="1.5" fill="#20242D" />
        <rect x="163" y="212" width="2.6" height="22" rx="1.3" fill="#D8B354" />
        <rect x="126" y="306" width="44" height="4" fill="#8E8578" />

        {/* ══════════ sidewalk + parking lot ══════════ */}
        <rect x="0" y="309" width="400" height="16" fill="url(#sf-walk)" />
        <rect x="0" y="309" width="400" height="1.5" fill="#E4DED2" opacity="0.7" />
        <rect x="0" y="322" width="400" height="3" fill="#8E8578" opacity="0.6" />
        <rect x="0" y="325" width="400" height="11" fill="url(#sf-asphalt)" />
        <rect x="46" y="325" width="26" height="11" fill="#E8E3D6" opacity="0.45" transform="skewX(-8)" />
        <rect x="256" y="325" width="26" height="11" fill="#E8E3D6" opacity="0.45" transform="skewX(-8)" />

        {/* contact shadows along the walk */}
        <ellipse cx="60" cy="311" rx="42" ry="4" fill="#2B0B30" opacity="0.18" />
        <ellipse cx="212" cy="311" rx="34" ry="4" fill="#2B0B30" opacity="0.16" />
        <ellipse cx="336" cy="311" rx="48" ry="4.5" fill="#2B0B30" opacity="0.18" />

        {/* ══════════ sidewalk book carts + crates ══════════ */}
        {/* left cart */}
        <g>
          <rect x="24" y="266" width="66" height="4" rx="1" fill="#3B3F48" />
          <rect x="24" y="284" width="66" height="4" rx="1" fill="#3B3F48" />
          <rect x="26" y="266" width="3" height="42" fill="#33373F" />
          <rect x="85" y="266" width="3" height="42" fill="#33373F" />
          {[
            { x: 30, w: 6, h: 16, c: "#8B2E90" },
            { x: 37, w: 5, h: 18, c: "#F1BB1A" },
            { x: 43, w: 7, h: 15, c: "#C4703A" },
            { x: 51, w: 5, h: 17, c: "#FDF8F0" },
            { x: 57, w: 6, h: 14, c: "#3E6B45" },
            { x: 64, w: 5, h: 18, c: "#6B1C6F" },
            { x: 70, w: 7, h: 16, c: "#A2564A" },
            { x: 78, w: 5, h: 15, c: "#FCE8A6" },
          ].map((b) => (
            <rect key={b.x} x={b.x} y={266 - b.h} width={b.w} height={b.h} rx="0.8" fill={b.c} />
          ))}
          {[
            { x: 30, w: 6, h: 14, c: "#F1BB1A" },
            { x: 37, w: 6, h: 15, c: "#6B1C6F" },
            { x: 44, w: 5, h: 13, c: "#FDF8F0" },
            { x: 50, w: 7, h: 15, c: "#8B2E90" },
            { x: 58, w: 5, h: 14, c: "#C4703A" },
            { x: 64, w: 6, h: 16, c: "#3E6B45" },
            { x: 71, w: 6, h: 13, c: "#FCE8A6" },
            { x: 78, w: 5, h: 15, c: "#A2564A" },
          ].map((b) => (
            <rect key={`b${b.x}`} x={b.x} y={284 - b.h} width={b.w} height={b.h} rx="0.8" fill={b.c} />
          ))}
          <circle cx="32" cy="308" r="3.4" fill="#1C1F26" />
          <circle cx="82" cy="308" r="3.4" fill="#1C1F26" />
        </g>

        {/* centre cart, tucked right of the door */}
        <g>
          <rect x="186" y="274" width="52" height="3.4" rx="1" fill="#3B3F48" />
          <rect x="186" y="290" width="52" height="3.4" rx="1" fill="#3B3F48" />
          <rect x="188" y="274" width="2.6" height="34" fill="#33373F" />
          <rect x="234" y="274" width="2.6" height="34" fill="#33373F" />
          {[
            { x: 192, w: 5, h: 14, c: "#6B1C6F" },
            { x: 198, w: 6, h: 12, c: "#F1BB1A" },
            { x: 205, w: 5, h: 15, c: "#FDF8F0" },
            { x: 211, w: 6, h: 13, c: "#C4703A" },
            { x: 218, w: 5, h: 14, c: "#8B2E90" },
            { x: 224, w: 6, h: 12, c: "#3E6B45" },
          ].map((b) => (
            <rect key={b.x} x={b.x} y={274 - b.h} width={b.w} height={b.h} rx="0.8" fill={b.c} />
          ))}
          {[
            { x: 192, w: 6, h: 12, c: "#FCE8A6" },
            { x: 199, w: 5, h: 13, c: "#8B2E90" },
            { x: 205, w: 6, h: 11, c: "#A2564A" },
            { x: 212, w: 5, h: 13, c: "#F1BB1A" },
            { x: 218, w: 6, h: 12, c: "#6B1C6F" },
            { x: 225, w: 5, h: 13, c: "#FDF8F0" },
          ].map((b) => (
            <rect key={`c${b.x}`} x={b.x} y={290 - b.h} width={b.w} height={b.h} rx="0.8" fill={b.c} />
          ))}
          <circle cx="192" cy="308" r="3" fill="#1C1F26" />
          <circle cx="232" cy="308" r="3" fill="#1C1F26" />
        </g>

        {/* trestle table with cardboard crates of books */}
        <g>
          <rect x="292" y="286" width="92" height="4" rx="1" fill="#6A5238" />
          <rect x="296" y="290" width="4" height="19" fill="#5A4632" />
          <rect x="376" y="290" width="4" height="19" fill="#5A4632" />
          {/* crates */}
          <g>
            <rect x="298" y="266" width="30" height="20" rx="1" fill="#C99A63" />
            <rect x="298" y="266" width="30" height="4" fill="#B4854F" />
            {[300, 306, 312, 318, 324].map((x, i) => (
              <rect key={x} x={x} y={258 + (i % 2) * 2} width="5" height={10 - (i % 2) * 2} rx="0.7" fill={["#8B2E90", "#F1BB1A", "#FDF8F0", "#C4703A", "#6B1C6F"][i]} />
            ))}
          </g>
          <g>
            <rect x="332" y="262" width="34" height="24" rx="1" fill="#D2A56C" />
            <rect x="332" y="262" width="34" height="4" fill="#BC8E56" />
            {[334, 340, 346, 352, 358, 364].map((x, i) => (
              <rect key={x} x={x} y={252 + (i % 3)} width="5" height={11 - (i % 3)} rx="0.7" fill={["#3E6B45", "#FCE8A6", "#6B1C6F", "#A2564A", "#8B2E90", "#F1BB1A"][i]} />
            ))}
          </g>
          {/* a crate on the ground */}
          <rect x="366" y="292" width="26" height="17" rx="1" fill="#C99A63" />
          <rect x="366" y="292" width="26" height="3.4" fill="#B4854F" />
          {[369, 375, 381, 386].map((x, i) => (
            <rect key={x} x={x} y={284 + (i % 2)} width="4.6" height={9 - (i % 2)} rx="0.7" fill={["#F1BB1A", "#6B1C6F", "#FDF8F0", "#C4703A"][i]} />
          ))}
        </g>

        {/* small bench under the right-hand window, as in the sunny photo */}
        <g opacity="0.95">
          <rect x="252" y="288" width="34" height="3.4" rx="1" fill="#4A3527" />
          <rect x="254" y="291" width="2.6" height="18" fill="#3B2B20" />
          <rect x="281" y="291" width="2.6" height="18" fill="#3B2B20" />
          <rect x="252" y="278" width="34" height="3" rx="1" fill="#4A3527" />
        </g>

        {/* warm dust motes rising through the sunlight */}
        {[
          { x: 104, y: 300, d: "0s" },
          { x: 246, y: 296, d: "1.9s" },
          { x: 318, y: 302, d: "3.6s" },
          { x: 176, y: 294, d: "5.0s" },
        ].map((m) => (
          <circle
            key={m.x}
            className="storefront-mote"
            cx={m.x}
            cy={m.y}
            r="1.6"
            fill="#FCE8A6"
            opacity="0.8"
            style={{ animationDelay: m.d }}
          />
        ))}

        {/* unifying vignette */}
        <rect x="0" y="0" width="400" height="336" fill="url(#sf-vignette)" />
      </g>
    </svg>
  );
}
