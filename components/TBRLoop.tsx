"use client";

/**
 * TBRLoop.tsx
 * Animated 26-second loop ported from scenes.jsx (design file).
 * Shows 5 scenes: TBR Wordmark → Swap → Read → Repeat → Visit Us.
 */

import React from "react";
import { Stage, Sprite, useSprite, useTime, Easing, clamp } from "./TBRLoopEngine";

// ─── Design tokens ────────────────────────────────────────────────────────────

const PURPLE = "#6B1C6F";
const PURPLE_LIGHT = "#8B2E90";
const PURPLE_DARK = "#4A1350";
const GOLD = "#F1BB1A";
const GOLD_LIGHT = "#F5CC45";
const PAPER = "#FFFDF9";
const PAPER_2 = "#FDF8F0";
const INK = "#1F1A2E";
const INK_SOFT = "#4B5563";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

// ─── Shared primitives ────────────────────────────────────────────────────────

function PaperBackground({ vignette = true }: { vignette?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse at 0% 0%, rgba(241,187,26,0.10) 0%, transparent 45%),
          radial-gradient(ellipse at 100% 100%, rgba(107,28,111,0.10) 0%, transparent 50%),
          linear-gradient(180deg, #FFFDF9 0%, #FDF8F0 100%)
        `,
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "multiply",
          opacity: 0.5,
        }}
      >
        <filter id="tbr-grainf">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} />
          <feColorMatrix values="0 0 0 0 0.42  0 0 0 0 0.11  0 0 0 0 0.43  0 0 0 0.018 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#tbr-grainf)" />
      </svg>
      {vignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(74,19,80,0.10) 100%)",
          }}
        />
      )}
    </div>
  );
}

function DustMotes({ count = 14, seed = 1 }: { count?: number; seed?: number }) {
  const t = useTime();
  const motes = React.useMemo(() => {
    const arr: {
      x: number; y: number; r: number; dx: number; dy: number;
      ph: number; sp: number; col: string; op: number;
    }[] = [];
    // Simple LCG – computed inline to avoid closure mutation that triggers react-hooks/immutability
    const lcg = (n: number) => (n * 9301 + 49297) % 233280;
    const vals: number[] = [];
    let cur = seed * 9301 + 49297;
    for (let i = 0; i < count * 7; i++) {
      cur = lcg(cur);
      vals.push(cur / 233280);
    }
    let vi = 0;
    const rnd = () => vals[vi++] ?? 0;
    for (let i = 0; i < count; i++) {
      arr.push({
        x: rnd() * 1080,
        y: rnd() * 1080,
        r: 1.2 + rnd() * 2.4,
        dx: (rnd() - 0.5) * 12,
        dy: 6 + rnd() * 18,
        ph: rnd() * Math.PI * 2,
        sp: 0.4 + rnd() * 0.8,
        col: rnd() > 0.6 ? GOLD : PURPLE,
        op: 0.18 + rnd() * 0.35,
      });
    }
    return arr;
  }, [count, seed]);

  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1080 1080"
    >
      {motes.map((m, i) => {
        const dx = Math.sin(t * m.sp + m.ph) * m.dx;
        const dy = (t * m.dy * 4) % 1100;
        const cx = m.x + dx;
        const cy = (m.y + dy) % 1080;
        return <circle key={i} cx={cx} cy={cy} r={m.r} fill={m.col} opacity={m.op} />;
      })}
    </svg>
  );
}

function DashedArcs({ progress = 1 }: { progress?: number }) {
  const len = 600;
  const dash = len;
  const off = len * (1 - progress);
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1080 1080"
    >
      <g fill="none" strokeLinecap="round">
        <path
          d="M 60 540 A 480 480 0 0 1 540 60"
          stroke={PURPLE}
          strokeWidth="1.5"
          opacity="0.35"
          style={{ strokeDasharray: `${dash} ${dash}`, strokeDashoffset: off }}
        />
        <path
          d="M 1020 540 A 480 480 0 0 0 540 60"
          stroke={GOLD}
          strokeWidth="1.5"
          opacity="0.5"
          style={{ strokeDasharray: `${dash} ${dash}`, strokeDashoffset: off }}
        />
        <path
          d="M 60 540 A 480 480 0 0 0 540 1020"
          stroke={GOLD}
          strokeWidth="1.5"
          opacity="0.45"
          style={{ strokeDasharray: `${dash} ${dash}`, strokeDashoffset: off }}
        />
        <path
          d="M 1020 540 A 480 480 0 0 1 540 1020"
          stroke={PURPLE}
          strokeWidth="1.5"
          opacity="0.35"
          style={{ strokeDasharray: `${dash} ${dash}`, strokeDashoffset: off }}
        />
      </g>
    </svg>
  );
}

function Sparkle({
  x,
  y,
  size = 28,
  color = GOLD,
  delay = 0,
  dur = 0.9,
}: {
  x: number; y: number; size?: number; color?: string; delay?: number; dur?: number;
}) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / dur, 0, 1);
  const grow = Easing.easeOutBack(t);
  const fade =
    t < 0.5
      ? Easing.easeOutQuad(t * 2)
      : 1 - Easing.easeInQuad((t - 0.5) * 2);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%,-50%) scale(${grow}) rotate(${t * 90}deg)`,
        opacity: clamp(fade, 0, 1),
        fontFamily: SERIF,
        fontSize: size,
        color,
        textShadow: `0 0 18px ${color}55`,
        lineHeight: 1,
      }}
    >
      ✦
    </div>
  );
}

function BookLogo({ size = 200 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * (110 / 120)}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 35 L58 30 L58 95 L22 100 Z" fill={GOLD} stroke={PURPLE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M98 35 L62 30 L62 95 L98 100 Z" fill={GOLD_LIGHT} stroke={PURPLE} strokeWidth="2" strokeLinejoin="round" />
      <rect x="57" y="28" width="6" height="69" fill={PURPLE} rx="1" />
      {[48, 56, 64, 72].map((y, i) => (
        <line key={"l" + i} x1="30" y1={y} x2="54" y2={y - 3} stroke={PURPLE} strokeWidth="1" strokeOpacity="0.4" />
      ))}
      {[48, 56, 64, 72].map((y, i) => (
        <line key={"r" + i} x1="90" y1={y} x2="66" y2={y - 3} stroke={PURPLE} strokeWidth="1" strokeOpacity="0.4" />
      ))}
      <path d="M35 108 Q45 102 55 108 Q65 114 75 108 Q85 102 90 106" stroke={PURPLE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M38 115 Q48 109 58 115 Q68 121 78 115 Q84 111 88 113" stroke={GOLD} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M8 75 A30 30 0 0 1 38 45" stroke={PURPLE} strokeWidth="1" strokeDasharray="3 3" fill="none" strokeOpacity="0.4" />
      <path d="M112 75 A30 30 0 0 0 82 45" stroke={GOLD} strokeWidth="1" strokeDasharray="3 3" fill="none" strokeOpacity="0.5" />
      <path d="M20 100 L58 95 L62 95 L100 100" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Eyebrow({
  children,
  x,
  y,
  delay = 0,
}: {
  children: React.ReactNode; x: number; y: number; delay?: number;
}) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / 0.5, 0, 1);
  const ease = Easing.easeOutBack(t);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, ${(1 - ease) * 8}px)`,
        opacity: t,
        fontFamily: SANS,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.30em",
        textTransform: "uppercase",
        color: PURPLE,
        background: "rgba(241,187,26,0.20)",
        padding: "8px 18px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        zIndex: 20,
      }}
    >
      {children}
    </div>
  );
}

function CaptionText({
  x,
  y,
  children,
  delay = 0,
}: {
  x: number; y: number; children: React.ReactNode; delay?: number;
}) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / 0.5, 0, 1);
  const ease = Easing.easeOutCubic(t);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, ${(1 - ease) * 12}px)`,
        opacity: t,
        fontFamily: SANS,
        fontSize: 30,
        color: INK_SOFT,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

function Reveal({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / 0.6, 0, 1);
  const ease = Easing.easeOutCubic(t);
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - ease) * 14}px)`,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

function BottomPill({
  x,
  y,
  children,
  delay = 0,
}: {
  x: number; y: number; children: React.ReactNode; delay?: number;
}) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / 0.6, 0, 1);
  const ease = Easing.easeOutBack(t);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, ${(1 - ease) * 14}px)`,
        opacity: t,
        fontFamily: SANS,
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: PAPER,
        background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_LIGHT})`,
        padding: "14px 32px",
        borderRadius: 999,
        boxShadow: "0 20px 40px rgba(107,28,111,0.30)",
      }}
    >
      {children}
    </div>
  );
}

// ─── SCENE 1 — TBR Wordmark ───────────────────────────────────────────────────

function Scene1() {
  const { localTime } = useSprite();
  const letters = ["T", "B", "R"];
  return (
    <>
      <Eyebrow x={540} y={300} delay={0.2}>
        Neighborhood bookstore · Milwaukie, OR
      </Eyebrow>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 380,
          display: "flex",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {letters.map((L, i) => {
          const start = 0.4 + i * 0.18;
          const t = clamp((localTime - start) / 0.7, 0, 1);
          const ease = Easing.easeOutBack(t);
          const blur = (1 - t) * 14;
          return (
            <div
              key={i}
              style={{
                fontFamily: SERIF,
                fontSize: 220,
                fontWeight: 800,
                color: PURPLE,
                letterSpacing: "-0.02em",
                transform: `translateY(${(1 - ease) * 40}px) scale(${0.85 + 0.15 * ease})`,
                opacity: t,
                filter: `blur(${blur}px)`,
                lineHeight: 1,
              }}
            >
              {L}
            </div>
          );
        })}
      </div>

      <ExpandedWordmark localTime={localTime} />
    </>
  );
}

function ExpandedWordmark({ localTime }: { localTime: number }) {
  const showFull = localTime > 1.5;
  const t = clamp((localTime - 1.5) / 1.0, 0, 1);
  const ease = Easing.easeOutCubic(t);
  if (!showFull) return null;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 660,
          display: "flex",
          justifyContent: "center",
          fontFamily: SERIF,
          fontWeight: 700,
          opacity: t,
        }}
      >
        <div
          style={{
            fontSize: 84,
            letterSpacing: "-0.01em",
            color: PURPLE,
            transform: `translateY(${(1 - ease) * 16}px)`,
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          To Be{" "}
          <em
            style={{
              fontStyle: "italic",
              background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_LIGHT} 50%, ${GOLD} 120%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Read
          </em>
        </div>
      </div>
      {/* gold underline swash */}
      <div
        style={{
          position: "absolute",
          left: 700,
          top: 740,
          width: clamp((localTime - 2.0) / 0.6, 0, 1) * 200,
          height: 14,
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
          borderRadius: 999,
          opacity: 0.6,
        }}
      />
      <Sparkle x={560} y={640} size={28} color={GOLD} delay={2.2} dur={1.2} />
      <Sparkle x={920} y={690} size={22} color={PURPLE} delay={2.4} dur={1.2} />
    </>
  );
}

// ─── SCENE 2 — SWAP ───────────────────────────────────────────────────────────

function Scene2() {
  const { localTime } = useSprite();
  const enterT = clamp(localTime / 0.9, 0, 1);
  const enterEase = Easing.easeOutBack(enterT);

  const swapStart = 1.8;
  const swapDur = 1.2;
  const swapT = clamp((localTime - swapStart) / swapDur, 0, 1);
  const swapEase = Easing.easeInOutCubic(swapT);

  const xA = 320 + swapEase * 440;
  const xB = 760 - swapEase * 440;
  const arc = Math.sin(swapT * Math.PI) * -120;

  return (
    <>
      <Eyebrow x={540} y={170} delay={0.1}>
        Chapter one
      </Eyebrow>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 280,
          display: "flex",
          justifyContent: "center",
          fontFamily: SERIF,
          fontWeight: 800,
          fontSize: 180,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          opacity: enterT,
          transform: `translateY(${(1 - enterEase) * 30}px)`,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ position: "relative", color: PURPLE, padding: "0 10px", display: "inline-block" }}>
          Swap
          <span
            style={{
              position: "absolute",
              left: 12,
              right: 12,
              bottom: 14,
              height: 24,
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
              borderRadius: 999,
              opacity: clamp((localTime - 0.6) / 0.5, 0, 1) * 0.55,
              zIndex: -1,
            }}
          />
        </span>
      </div>

      <BookCard x={xA} y={760 + arc} title="Bring" rotate={swapEase * -8} />
      <BookCard x={xB} y={760 - arc} title="Take" rotate={swapEase * 8} dark />

      {localTime > 1.5 && <SwapArrows progress={swapT} />}

      <CaptionText x={540} y={970} delay={3.2}>
        Bring books. Earn store credit.
      </CaptionText>
    </>
  );
}

function BookCard({
  x,
  y,
  title,
  rotate = 0,
  dark = false,
}: {
  x: number; y: number; title: string; rotate?: number; dark?: boolean;
}) {
  const w = 200,
    h = 280;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `translate(-50%,-50%) rotate(${rotate}deg)`,
        background: dark ? PURPLE : PAPER,
        border: `3px solid ${dark ? GOLD : PURPLE}`,
        borderRadius: 6,
        boxShadow: "0 24px 60px rgba(107,28,111,0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -3,
          top: 6,
          bottom: 6,
          width: 8,
          background: dark ? GOLD : PURPLE,
          borderRadius: 4,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 100 - i * 16,
              height: 4,
              background: dark ? GOLD : PURPLE,
              opacity: 0.5,
              borderRadius: 2,
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 36,
          fontWeight: 700,
          fontStyle: "italic",
          color: dark ? GOLD : PURPLE,
        }}
      >
        {title}
      </div>
      <div style={{ width: 40, height: 2, background: dark ? GOLD : PURPLE, opacity: 0.6 }} />
    </div>
  );
}

function SwapArrows({ progress }: { progress: number }) {
  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1080 1080"
    >
      <g opacity={Math.sin(progress * Math.PI) * 0.7}>
        <path
          d="M 380 680 Q 540 580 700 680"
          stroke={PURPLE}
          strokeWidth="3"
          strokeDasharray="8 6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 690 670 L 712 682 L 692 698"
          stroke={PURPLE}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 700 840 Q 540 940 380 840"
          stroke={GOLD}
          strokeWidth="3"
          strokeDasharray="8 6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 390 850 L 368 838 L 388 822"
          stroke={GOLD}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// ─── SCENE 3 — READ ───────────────────────────────────────────────────────────

function Scene3() {
  const { localTime } = useSprite();
  const enterT = clamp(localTime / 0.8, 0, 1);
  return (
    <>
      <Eyebrow x={540} y={170} delay={0.1}>
        Chapter two
      </Eyebrow>

      <OpenBook localTime={localTime} />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 740,
          display: "flex",
          justifyContent: "center",
          fontFamily: SERIF,
          fontWeight: 800,
          fontSize: 168,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          opacity: enterT,
          padding: "0 80px",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontStyle: "italic",
            background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_LIGHT} 70%, ${PURPLE} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            whiteSpace: "nowrap",
            padding: "0 0.12em",
          }}
        >
          Read
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 920,
          transform: `translateX(-50%) scaleX(${clamp((localTime - 0.8) / 0.6, 0, 1)})`,
          transformOrigin: "center",
          width: 360,
          height: 16,
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
          borderRadius: 999,
          opacity: 0.55,
        }}
      />

      <CaptionText x={540} y={1000} delay={2.0}>
        Curl up. Get lost. Stay a while.
      </CaptionText>
    </>
  );
}

function OpenBook({ localTime }: { localTime: number }) {
  const pageT = clamp((localTime - 0.4) / 1.6, 0, 1);
  const pageEase = Easing.easeInOutCubic(pageT);
  const pageAngle = pageEase * 180;

  const t2 = clamp((localTime - 1.8) / 1.4, 0, 1);
  const e2 = Easing.easeInOutCubic(t2);
  const angle2 = e2 * 180;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 460,
        transform: "translate(-50%,-50%)",
        width: 720,
        height: 380,
        perspective: 1600,
      }}
    >
      {/* Left page */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 360,
          height: 380,
          background: PAPER,
          borderRadius: "8px 0 0 8px",
          boxShadow: `0 30px 60px rgba(107,28,111,0.25), inset -8px 0 16px rgba(107,28,111,0.06)`,
          border: `1px solid ${PURPLE}22`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          padding: "40px 50px",
          gap: 12,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              width: 200 - (i % 2) * 40,
              height: 6,
              background: PURPLE,
              opacity: 0.18,
              borderRadius: 3,
            }}
          />
        ))}
      </div>

      {/* Right page */}
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 0,
          width: 360,
          height: 380,
          background: PAPER,
          borderRadius: "0 8px 8px 0",
          boxShadow: `0 30px 60px rgba(107,28,111,0.25), inset 8px 0 16px rgba(107,28,111,0.06)`,
          border: `1px solid ${PURPLE}22`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "40px 50px",
          gap: 12,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              width: 200 - ((i + 1) % 2) * 40,
              height: 6,
              background: PURPLE,
              opacity: 0.18,
              borderRadius: 3,
            }}
          />
        ))}
      </div>

      {/* Spine */}
      <div
        style={{
          position: "absolute",
          left: 354,
          top: 0,
          width: 12,
          height: 380,
          background: `linear-gradient(180deg, ${PURPLE_DARK}, ${PURPLE})`,
          borderRadius: 2,
          zIndex: 5,
        }}
      />

      {/* Turning page 1 */}
      {pageT < 1 && (
        <div
          style={{
            position: "absolute",
            left: 360,
            top: 0,
            width: 360,
            height: 380,
            transformOrigin: "left center",
            transform: `rotateY(${-pageAngle}deg)`,
            transformStyle: "preserve-3d",
            zIndex: 4,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: PAPER,
              borderRadius: "0 8px 8px 0",
              border: `1px solid ${PURPLE}22`,
              backfaceVisibility: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: PAPER_2,
              borderRadius: "8px 0 0 8px",
              border: `1px solid ${PURPLE}22`,
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      )}

      {/* Turning page 2 */}
      {t2 > 0 && t2 < 1 && (
        <div
          style={{
            position: "absolute",
            left: 360,
            top: 0,
            width: 360,
            height: 380,
            transformOrigin: "left center",
            transform: `rotateY(${-angle2}deg)`,
            transformStyle: "preserve-3d",
            zIndex: 3,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: PAPER,
              borderRadius: "0 8px 8px 0",
              border: `1px solid ${PURPLE}22`,
              backfaceVisibility: "hidden",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: PAPER_2,
              borderRadius: "8px 0 0 8px",
              border: `1px solid ${PURPLE}22`,
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      )}

      {/* Sparkles */}
      <div style={{ position: "absolute", inset: -60, pointerEvents: "none" }}>
        <Sparkle x={60} y={40} size={24} color={GOLD} delay={1.2} dur={2.5} />
        <Sparkle x={720} y={60} size={20} color={PURPLE} delay={1.5} dur={2.5} />
        <Sparkle x={400} y={-20} size={28} color={GOLD} delay={2.0} dur={2.5} />
      </div>
    </div>
  );
}

// ─── SCENE 4 — REPEAT ────────────────────────────────────────────────────────

function Scene4() {
  const { localTime } = useSprite();
  const enterT = clamp(localTime / 0.8, 0, 1);
  return (
    <>
      <Eyebrow x={540} y={170} delay={0.1}>
        Chapter three
      </Eyebrow>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 290,
          display: "flex",
          justifyContent: "center",
          fontFamily: SERIF,
          fontWeight: 800,
          fontSize: 140,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          opacity: enterT,
          whiteSpace: "nowrap",
          padding: "0 80px",
          boxSizing: "border-box",
        }}
      >
        <span style={{ color: PURPLE }}>Re</span>
        <span
          style={{
            fontStyle: "italic",
            background: `linear-gradient(135deg, ${PURPLE_LIGHT} 0%, ${PURPLE} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            padding: "0 0.12em",
          }}
        >
          peat
        </span>
      </div>

      <LoopWords localTime={localTime} />

      <CaptionText x={540} y={970} delay={3.2}>
        Swap · Read · Repeat.
      </CaptionText>
    </>
  );
}

function LoopWords({ localTime }: { localTime: number }) {
  const t = clamp((localTime - 0.6) / 1.2, 0, 1);
  const ease = Easing.easeOutCubic(t);

  const cx = 540,
    cy = 660,
    r = 180;
  const len = 2 * Math.PI * r;
  const off = len * (1 - ease);
  const rotateLoop = (localTime * 30) % 360;

  const words = ["Swap", "Read", "Repeat"];
  const cycle = clamp((localTime - 1.6) / 2.4, 0, 1);
  const idx = Math.min(words.length - 1, Math.floor(cycle * words.length * 0.999));
  const localCycle = cycle * words.length - idx;
  const wOpacity =
    localCycle < 0.15
      ? localCycle / 0.15
      : localCycle > 0.85
        ? (1 - localCycle) / 0.15
        : 1;

  return (
    <>
      <svg
        style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1080 1080"
      >
        {/* Outer dashed circle */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 30}
          fill="none"
          stroke={GOLD}
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.5"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${rotateLoop}deg)`,
          }}
        />
        {/* Main loop */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={PURPLE}
          strokeWidth="6"
          strokeDasharray={`${len} ${len}`}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px`, transform: "rotate(-90deg)" }}
        />
        {/* Arrowhead */}
        {ease > 0.92 && (
          <g
            transform={`translate(${cx + r}, ${cy}) rotate(90)`}
            opacity={(ease - 0.92) / 0.08}
          >
            <path
              d="M -16 -10 L 0 0 L -16 10"
              fill="none"
              stroke={PURPLE}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
        {/* Inner gold accent */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 18}
          fill="none"
          stroke={GOLD}
          strokeWidth="2"
          strokeDasharray={`${len * 0.85} ${len}`}
          strokeDashoffset={off * 1.1}
          opacity="0.6"
          style={{ transformOrigin: `${cx}px ${cy}px`, transform: "rotate(60deg)" }}
        />
      </svg>

      {/* Cycling word */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: "translate(-50%,-50%)",
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: 72,
          fontStyle: "italic",
          color: PURPLE,
          opacity: wOpacity * ease,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {words[idx]}
      </div>

      {/* Tiny dots */}
      {[0, 1, 2].map((i) => {
        const ang = (i / 3) * Math.PI * 2 + localTime * 0.6;
        const px = cx + Math.cos(ang) * r;
        const py = cy + Math.sin(ang) * r;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              transform: "translate(-50%,-50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: i === 0 ? PURPLE : GOLD,
              boxShadow: `0 0 14px ${i === 0 ? PURPLE : GOLD}`,
              opacity: ease,
            }}
          />
        );
      })}
    </>
  );
}

// ─── SCENE 5 — Visit Us ───────────────────────────────────────────────────────

function Scene5() {
  const { localTime } = useSprite();
  const cardT = clamp(localTime / 0.9, 0, 1);
  const cardEase = Easing.easeOutBack(cardT);
  const logoT = clamp((localTime - 0.4) / 0.8, 0, 1);
  const logoEase = Easing.easeOutBack(logoT);

  return (
    <>
      <Eyebrow x={540} y={70} delay={0.2}>
        Come find us
      </Eyebrow>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 510,
          transform: `translate(-50%,-50%) scale(${0.94 + 0.06 * cardEase})`,
          opacity: cardT,
          width: 820,
          height: 740,
          background: "rgba(255,253,249,0.92)",
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
          borderRadius: 40,
          border: `1px solid ${PURPLE}22`,
          boxShadow: "0 36px 90px rgba(107,28,111,0.22), 0 8px 20px rgba(241,187,26,0.10)",
          padding: "70px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 28,
        }}
      >
        <div
          style={{
            transform: `scale(${0.7 + 0.3 * logoEase}) rotate(${(1 - logoEase) * -8}deg)`,
            opacity: logoT,
          }}
        >
          <BookLogo size={180} />
        </div>

        <Reveal delay={0.6}>
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 92,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: PURPLE,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            To Be{" "}
            <em
              style={{
                fontStyle: "italic",
                background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_LIGHT} 50%, ${GOLD} 120%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Read
            </em>
          </div>
        </Reveal>

        <Reveal delay={0.95}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: GOLD,
              fontFamily: SERIF,
              fontSize: 24,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ width: 100, height: 1, background: `${PURPLE}40` }} />
            <span>✦</span>
            <div style={{ width: 100, height: 1, background: `${PURPLE}40` }} />
          </div>
        </Reveal>

        <Reveal delay={1.1}>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: PURPLE,
              whiteSpace: "nowrap",
            }}
          >
            Swap · Read · Repeat
          </div>
        </Reveal>

        <Reveal delay={1.4}>
          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              color: INK_SOFT,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 600, color: INK, whiteSpace: "nowrap" }}>
              7931 SE King Rd
            </div>
            <div style={{ fontSize: 22, color: INK_SOFT, whiteSpace: "nowrap" }}>
              Milwaukie, OR 97222
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: PURPLE,
                background: "rgba(241,187,26,0.20)",
                padding: "10px 22px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
              Mon–Sat · 10am–5pm
            </div>
          </div>
        </Reveal>
      </div>

      <BottomPill x={540} y={1000} delay={1.6}>
        tobereadbooks.com
      </BottomPill>

      <Sparkle x={170} y={300} size={28} color={GOLD} delay={1.2} dur={3.0} />
      <Sparkle x={920} y={260} size={22} color={PURPLE} delay={1.5} dur={3.0} />
      <Sparkle x={140} y={760} size={24} color={GOLD} delay={1.8} dur={3.0} />
      <Sparkle x={940} y={780} size={20} color={PURPLE} delay={2.0} dur={3.0} />
    </>
  );
}

// ─── Camera (subtle ken burns) ────────────────────────────────────────────────

function Camera({ children }: { children: React.ReactNode }) {
  const t = useTime();
  const scale = 1 + Math.sin(t * 0.18) * 0.012;
  const x = Math.sin(t * 0.12) * 8;
  const y = Math.cos(t * 0.1) * 6;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: "center",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Master timeline component ────────────────────────────────────────────────

function TBRVideo() {
  return (
    <Camera>
      <PaperBackground />
      <DustMotes count={18} seed={3} />
      <DashedArcs progress={1} />

      <Sprite start={0} end={4}>
        <Scene1 />
      </Sprite>
      <Sprite start={4} end={9}>
        <Scene2 />
      </Sprite>
      <Sprite start={9} end={14}>
        <Scene3 />
      </Sprite>
      <Sprite start={14} end={19}>
        <Scene4 />
      </Sprite>
      <Sprite start={19} end={26}>
        <Scene5 />
      </Sprite>
    </Camera>
  );
}

// ─── Public components ────────────────────────────────────────────────────────

/** Full-page version (used by /loop route). */
export default function TBRLoop() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Stage width={1080} height={1080} duration={26} background="#FFFDF9" persistKey="tbr-loop">
        <TBRVideo />
      </Stage>
    </div>
  );
}

/** Embedded version: fills its parent container (give the parent a fixed height). */
export function TBRLoopEmbed() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Stage width={1080} height={1080} duration={26} background="#FFFDF9" persistKey="tbr-loop-embed">
        <TBRVideo />
      </Stage>
    </div>
  );
}
