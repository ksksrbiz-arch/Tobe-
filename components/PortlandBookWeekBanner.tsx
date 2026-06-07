"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Gift, Sparkles, X, Zap } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Portland Book Week sale banner — runs June 5–13, 2026.
 *
 * Auto-removes itself once EXPIRES_AT passes (June 13 midnight Pacific).
 * Visitors can also dismiss it for the session via localStorage.
 *
 * Sale details:
 *   • Spend $100 in-store → receive $100 in store credit
 *   • No limit on how much credit you can earn
 *   • Credit expires December 31, 2026
 */
const EXPIRES_AT = new Date("2026-06-14T07:00:00Z").getTime();
const DISMISS_KEY = "tbr-portland-book-week-banner-dismissed";

// Sale end date for live countdown
const SALE_END = new Date("2026-06-13T23:59:59-07:00").getTime();

// Book spine decorations that float in the background
const BOOK_SPINES = [
  { title: "Portland", color: "#F1BB1A" },
  { title: "Book Week", color: "#a78bfa" },
  { title: "2026", color: "#f43f5e" },
  { title: "Read More", color: "#F1BB1A" },
  { title: "TBR", color: "#34d399" },
  { title: "In-Store", color: "#F5CC45" },
  { title: "$100 Credit", color: "#a78bfa" },
  { title: "June 5–13", color: "#f43f5e" },
];

const SPINE_CONFIGS = BOOK_SPINES.map((_, i) => ({
  left: `${4 + (i * 11.8) % 88}%`,
  top: `${8 + (i * 17.3) % 80}%`,
  duration: 7 + ((i * 1.9) % 5),
  delay: (i * 0.95) % 7,
  rotate: -15 + ((i * 23) % 50),
}));

// How many days remain (clamped 0–8)
function getDaysRemaining() {
  const diff = SALE_END - Date.now();
  return Math.max(0, Math.min(8, Math.ceil(diff / (1000 * 60 * 60 * 24))));
}

// Live countdown string: HH:MM:SS
function formatCountdown(ms: number) {
  if (ms <= 0) return "00:00:00";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

// Urgency color: red when 2 days or fewer remain
function urgencyColor(days: number) {
  if (days <= 2) return "#f43f5e";
  if (days <= 4) return "#fb923c";
  return "#F1BB1A";
}

const FloatingSpine = React.memo(function FloatingSpine({
  title,
  color,
  left,
  top,
  duration,
  delay,
  rotate,
}: {
  title: string;
  color: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
  rotate: number;
}) {
  return (
    <span
      className="pointer-events-none absolute select-none opacity-0"
      style={{
        left,
        top,
        color,
        fontSize: "9px",
        fontWeight: 900,
        letterSpacing: "0.26em",
        textTransform: "uppercase",
        transform: `rotate(${rotate}deg)`,
        animation: `pbwFloat ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        writingMode: Math.abs(rotate) > 20 ? "vertical-rl" : "horizontal-tb",
      }}
    >
      {title}
    </span>
  );
});

export default function PortlandBookWeekBanner() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState("");
  const [daysLeft, setDaysLeft] = useState(8);
  const [creditAmount, setCreditAmount] = useState(0);
  const [spendInput, setSpendInput] = useState("100");
  const [pulseCard, setPulseCard] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Visibility / expiry check
    if (Date.now() >= EXPIRES_AT) {
      setVisible(false);
      return;
    }
    try {
      setVisible(window.localStorage.getItem(DISMISS_KEY) !== "1");
    } catch {
      setVisible(true);
    }

    // Countdown ticker
    const tick = () => {
      const remaining = SALE_END - Date.now();
      setCountdown(formatCountdown(remaining));
      setDaysLeft(getDaysRemaining());
    };
    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Animate credit amount when spend changes
  useEffect(() => {
    const spend = parseFloat(spendInput.replace(/[^0-9.]/g, "")) || 0;
    const target = Math.floor(spend / 100) * 100;

    // Animate from current to target
    const start = creditAmount;
    const diff = target - start;
    if (diff === 0) return;
    const steps = 20;
    let step = 0;
    const anim = setInterval(() => {
      step++;
      setCreditAmount(Math.round(start + (diff * step) / steps));
      if (step >= steps) clearInterval(anim);
    }, 16);

    // Pulse the card
    if (pulseTimeout.current) clearTimeout(pulseTimeout.current);
    setPulseCard(true);
    pulseTimeout.current = setTimeout(() => setPulseCard(false), 600);

    return () => clearInterval(anim);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spendInput]);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // best-effort
    }
  };

  if (!visible) return null;

  const uc = urgencyColor(daysLeft);
  const urgentMode = daysLeft <= 2;

  return (
    <>
      <style>{`
        @keyframes pbwFloat {
          0%   { opacity: 0;    transform: translateY(14px) scale(0.9); }
          20%  { opacity: 0.14; }
          60%  { opacity: 0.18; transform: translateY(-8px) scale(1); }
          100% { opacity: 0;    transform: translateY(-20px) scale(0.88); }
        }
        @keyframes pbwShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pbwPulseGold {
          0%, 100% { box-shadow: 0 0 22px rgba(241,187,26,0.25); }
          50%      { box-shadow: 0 0 48px rgba(241,187,26,0.55); }
        }
        @keyframes pbwPulseRed {
          0%, 100% { box-shadow: 0 0 22px rgba(244,63,94,0.3); }
          50%      { box-shadow: 0 0 48px rgba(244,63,94,0.6); }
        }
        @keyframes pbwBounceIn {
          0%   { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes pbwDigitFlip {
          0%   { transform: translateY(0);   opacity: 1; }
          45%  { transform: translateY(-8px); opacity: 0; }
          50%  { transform: translateY(8px);  opacity: 0; }
          100% { transform: translateY(0);   opacity: 1; }
        }
        @keyframes pbwOrbit {
          0%   { transform: rotate(0deg)   translateX(28px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
        }
        @keyframes pbwCardPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.025); }
          100% { transform: scale(1); }
        }
        @keyframes pbwUrgentPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.65; }
        }
        .pbw-card-pop { animation: pbwCardPop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          [data-pbw-animated] { animation: none !important; transition: none !important; }
        }
      `}</style>

      <section
        className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
        aria-label="Portland Book Week — in-store sale June 5–13, 2026"
        style={{
          background:
            "radial-gradient(ellipse at 25% -5%, rgba(107,28,111,0.28) 0%, transparent 52%), " +
            "radial-gradient(ellipse at 82% 110%, rgba(241,187,26,0.16) 0%, transparent 45%), " +
            "radial-gradient(ellipse at 55% 55%, rgba(241,187,26,0.04) 0%, transparent 60%), " +
            "linear-gradient(160deg, #1a0826 0%, #22093a 50%, #160e2a 100%)",
        }}
      >
        {/* Dismiss */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss Portland Book Week banner"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}
        >
          <X size={14} />
        </button>

        {/* Scanline texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.55) 3px, rgba(255,255,255,0.55) 4px)",
          }}
          aria-hidden="true"
        />

        {/* Floating book spines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {BOOK_SPINES.map((spine, i) => (
            <FloatingSpine key={spine.title} {...spine} {...SPINE_CONFIGS[i]} />
          ))}
        </div>

        {/* Orbiting accent orb */}
        <div
          className="pointer-events-none absolute right-12 top-10 h-16 w-16 opacity-[0.12]"
          data-pbw-animated
          style={{
            background: "conic-gradient(from 0deg, #F1BB1A, transparent 60%, #6B1C6F)",
            borderRadius: "50%",
            animation: "pbwOrbit 14s linear infinite",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start lg:justify-between">

            {/* ── LEFT: Copy ── */}
            <Reveal className="flex-1">
              {/* Badge row */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em]"
                  data-pbw-animated
                  style={{
                    background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                    color: "#1a0826",
                    animation: urgentMode
                      ? "pbwPulseRed 1.8s ease-in-out infinite"
                      : "pbwPulseGold 3s ease-in-out infinite",
                  }}
                >
                  <Sparkles size={10} />
                  Portland Book Week
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em]"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                >
                  June 5–13 · In-Store Only
                </span>
                {urgentMode && (
                  <span
                    className="rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.22em]"
                    data-pbw-animated
                    style={{
                      background: "rgba(244,63,94,0.18)",
                      color: "#f43f5e",
                      border: "1px solid rgba(244,63,94,0.35)",
                      animation: "pbwUrgentPulse 1.2s ease-in-out infinite",
                    }}
                  >
                    Ends Soon
                  </span>
                )}
              </div>

              {/* Headline */}
              <h2
                className="font-black leading-[1.06]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.9rem, 4.6vw, 3rem)",
                  color: "white",
                }}
              >
                Spend{" "}
                <span
                  data-pbw-animated
                  style={{
                    background: "linear-gradient(90deg, #F1BB1A, #F5CC45, #F1BB1A, #F5CC45)",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "pbwShimmer 3s linear infinite",
                  }}
                >
                  $100
                </span>
                {", "}get{" "}
                <span
                  data-pbw-animated
                  style={{
                    background: "linear-gradient(90deg, #F5CC45, #F1BB1A, #F5CC45, #F1BB1A)",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "pbwShimmer 3s linear infinite 0.5s",
                  }}
                >
                  $100 back
                </span>
              </h2>

              <p
                className="mt-3 max-w-lg text-[15px] leading-7"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                Every $100 you spend in-store during Portland Book Week earns you{" "}
                <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>
                  $100 in store credit
                </span>
                . Stack it as high as you like — there&apos;s no cap. Credit is valid through{" "}
                <span style={{ color: "#F1BB1A", fontWeight: 600 }}>December 31, 2026</span>.
              </p>

              {/* Info pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { label: "No spending cap", icon: Zap },
                  { label: "In-store only", icon: BookOpen },
                  { label: "Credit valid thru Dec 31, 2026", icon: Gift },
                ].map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                    style={{
                      background: "rgba(107,28,111,0.3)",
                      color: "rgba(255,255,255,0.72)",
                      border: "1px solid rgba(107,28,111,0.5)",
                    }}
                  >
                    <Icon size={9} style={{ color: "#F1BB1A" }} />
                    {label}
                  </span>
                ))}
              </div>

              {/* ── CREDIT CALCULATOR ── */}
              <div
                className="mt-6 max-w-sm rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(241,187,26,0.18)",
                }}
              >
                <p
                  className="mb-3 text-[10px] font-black uppercase tracking-[0.28em]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Credit calculator
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label
                      className="mb-1 block text-[9px] uppercase tracking-[0.22em]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                      htmlFor="pbw-spend"
                    >
                      You spend
                    </label>
                    <div
                      className="flex items-center rounded-xl px-3 py-2"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <span style={{ color: "#F1BB1A", fontWeight: 700, marginRight: 4, fontSize: 14 }}>$</span>
                      <input
                        id="pbw-spend"
                        type="number"
                        min={0}
                        step={100}
                        value={spendInput}
                        onChange={(e) => setSpendInput(e.target.value)}
                        className="w-full bg-transparent text-sm font-bold outline-none"
                        style={{ color: "white" }}
                      />
                    </div>
                  </div>

                  <ArrowRight size={16} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0, marginTop: 16 }} />

                  <div className="flex-1">
                    <p
                      className="mb-1 text-[9px] uppercase tracking-[0.22em]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      You earn
                    </p>
                    <div
                      className="rounded-xl px-3 py-2"
                      style={{
                        background: creditAmount > 0 ? "rgba(241,187,26,0.1)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${creditAmount > 0 ? "rgba(241,187,26,0.3)" : "rgba(255,255,255,0.08)"}`,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span
                        className="text-sm font-black"
                        data-pbw-animated
                        style={{
                          color: creditAmount > 0 ? "#F1BB1A" : "rgba(255,255,255,0.25)",
                          fontFamily: "var(--font-serif)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        ${creditAmount.toLocaleString()}
                      </span>
                      <span
                        className="block text-[8px] uppercase tracking-[0.2em]"
                        style={{ color: "rgba(255,255,255,0.3)", marginTop: 2 }}
                      >
                        store credit
                      </span>
                    </div>
                  </div>
                </div>
                {creditAmount >= 500 && (
                  <p
                    className="mt-2 text-[10px]"
                    data-pbw-animated
                    style={{
                      color: "rgba(241,187,26,0.75)",
                      animation: "pbwBounceIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
                    }}
                  >
                    🎉 That&apos;s ${creditAmount.toLocaleString()} in credit — big reader energy.
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href="#visit"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 hover:scale-[1.04]"
                  style={{
                    background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                    color: "#1a0826",
                    boxShadow: "0 12px 32px rgba(241,187,26,0.32)",
                  }}
                >
                  Plan your visit
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Sale ends June 13 · While you shop
                </span>
              </div>
            </Reveal>

            {/* ── RIGHT: Offer card + countdown ── */}
            <Reveal delay={100} className="w-full lg:w-auto lg:flex-shrink-0">
              <div className="flex flex-col gap-4 lg:w-[300px]">

                {/* Countdown timer */}
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${urgentMode ? "rgba(244,63,94,0.3)" : "rgba(241,187,26,0.18)"}`,
                    transition: "border-color 0.4s ease",
                  }}
                >
                  <div
                    className="px-4 py-3"
                    style={{
                      background: urgentMode
                        ? "rgba(244,63,94,0.08)"
                        : "rgba(241,187,26,0.06)",
                      transition: "background 0.4s ease",
                    }}
                  >
                    <p
                      className="mb-2 text-[10px] font-black uppercase tracking-[0.28em]"
                      style={{ color: urgentMode ? "#f43f5e" : "rgba(255,255,255,0.4)", transition: "color 0.4s ease" }}
                    >
                      {urgentMode ? "⚡ Ending soon" : "Sale ends in"}
                    </p>

                    {/* Day dots */}
                    <div className="mb-3 flex gap-1.5">
                      {Array.from({ length: 9 }, (_, i) => (
                        <div
                          key={i}
                          className="h-1.5 flex-1 rounded-full transition-all duration-500"
                          style={{
                            background: i < daysLeft
                              ? `linear-gradient(90deg, ${uc}, ${uc}dd)`
                              : "rgba(255,255,255,0.1)",
                            boxShadow: i < daysLeft ? `0 0 6px ${uc}66` : "none",
                          }}
                        />
                      ))}
                    </div>

                    {/* HH:MM:SS countdown */}
                    <div
                      className="flex items-end justify-center gap-1 font-black"
                      style={{ fontFamily: "var(--font-serif)", color: uc, transition: "color 0.4s ease" }}
                    >
                      {countdown.split("").map((char, i) => (
                        <span
                          key={i}
                          data-pbw-animated
                          style={{
                            fontSize: char === ":" ? "clamp(1.2rem,3vw,1.6rem)" : "clamp(1.4rem,3.5vw,1.9rem)",
                            lineHeight: 1,
                            opacity: char === ":" ? 0.5 : 1,
                            display: "inline-block",
                            minWidth: char === ":" ? "auto" : "1ch",
                            textAlign: "center",
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>

                    <p
                      className="mt-1.5 text-center text-[9px] uppercase tracking-[0.24em]"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
                    </p>
                  </div>
                </div>

                {/* Offer card */}
                <div
                  className={`relative overflow-hidden rounded-[24px]${pulseCard ? " pbw-card-pop" : ""}`}
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(0,0,0,0.45) 100%)",
                    border: "1px solid rgba(241,187,26,0.22)",
                    boxShadow:
                      "0 0 60px rgba(241,187,26,0.1), 0 32px 70px rgba(0,0,0,0.55)",
                  }}
                >
                  <div
                    className="h-[3px] w-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, #F1BB1A, transparent)",
                    }}
                  />

                  <div className="p-6">
                    {/* Card header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl"
                        style={{ background: "rgba(241,187,26,0.12)" }}
                      >
                        <BookOpen size={19} style={{ color: "#F1BB1A" }} />
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.28em]"
                        data-pbw-animated
                        style={{
                          background: "rgba(241,187,26,0.1)",
                          color: "#F1BB1A",
                          border: "1px solid rgba(241,187,26,0.22)",
                          animation: "pbwPulseGold 2.5s ease-in-out infinite",
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: "#F1BB1A" }}
                        />
                        Live now
                      </span>
                    </div>

                    <p
                      className="text-[10px] font-black uppercase tracking-[0.28em]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      The deal
                    </p>

                    {/* Big ratio */}
                    <div className="my-4 flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div
                          className="text-[2rem] font-black leading-none"
                          style={{ color: "#F1BB1A", fontFamily: "var(--font-serif)" }}
                        >
                          $100
                        </div>
                        <div
                          className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em]"
                          style={{ color: "rgba(255,255,255,0.38)" }}
                        >
                          Spent
                        </div>
                      </div>

                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full"
                        style={{
                          background: "rgba(241,187,26,0.1)",
                          border: "1px solid rgba(241,187,26,0.2)",
                          color: "rgba(255,255,255,0.4)",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        →
                      </div>

                      <div className="text-center">
                        <div
                          className="text-[2rem] font-black leading-none"
                          style={{ color: "#F1BB1A", fontFamily: "var(--font-serif)" }}
                        >
                          $100
                        </div>
                        <div
                          className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em]"
                          style={{ color: "rgba(255,255,255,0.38)" }}
                        >
                          Credit
                        </div>
                      </div>
                    </div>

                    <div
                      className="h-px w-full"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    />

                    {/* Details rows */}
                    <div className="mt-4 space-y-2.5">
                      {[
                        ["Sale window", "June 5 – 13"],
                        ["Credit valid", "Thru Dec 31, 2026"],
                        ["Spending cap", "None"],
                        ["Earning cap", "Unlimited"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between">
                          <span
                            className="text-[10px] uppercase tracking-[0.2em]"
                            style={{ color: "rgba(255,255,255,0.35)" }}
                          >
                            {label}
                          </span>
                          <span
                            className="text-[11px] font-bold"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="h-[3px] w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(241,187,26,0.5), transparent)",
                    }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
