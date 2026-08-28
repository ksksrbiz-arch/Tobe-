"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react";
import DustMotes from "./DustMotes";
import OpenStatus from "./OpenStatus";
import StorefrontHero from "./StorefrontHero";
import { getMotionSafeScrollBehavior } from "@/lib/motion";

export default function HeroSection() {
  // Defer mounting of decorative, animation-heavy layers until after the
  // first paint so the LCP (hero headline) is not delayed by their style
  // recalculation and ongoing compositing work. Skip them entirely when the
  // user has opted into reduced motion — these layers exist purely for
  // ambient animation (blurred floats, twinkling stars, dust motes) and add
  // continuous compositing work that is wasted for those users.
  const [decorReady, setDecorReady] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    // The ambient decor (blurred floats, dust motes, twinkles) can come in at
    // idle — it's just CSS compositing.
    let idleHandle = -1;
    let idleTimer = -1;
    const startDecor = () => {
      if (!reduce) setDecorReady(true);
    };
    if (typeof w.requestIdleCallback === "function") {
      idleHandle = w.requestIdleCallback(startDecor);
    } else {
      idleTimer = window.setTimeout(startDecor, 200);
    }

    return () => {
      if (idleHandle !== -1 && typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idleHandle);
      if (idleTimer !== -1) window.clearTimeout(idleTimer);
    };
  }, []);

  const handleVisit = () => {
    const el = document.querySelector("#visit");
    if (el) el.scrollIntoView({ behavior: getMotionSafeScrollBehavior() });
  };

  const handleShop = () => {
    const el = document.querySelector("#shop");
    if (el) el.scrollIntoView({ behavior: getMotionSafeScrollBehavior() });
  };

  const handleCelebrate = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#6B1C6F", "#F1BB1A", "#ffffff", "#8B2E90", "#F5CC45"],
      });
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      className="viewport-min-height paper-warm relative flex items-center justify-center overflow-hidden px-4 pb-12 pt-[calc(var(--header-offset,_6.75rem)+2rem)] sm:pb-14 sm:pt-[calc(var(--header-offset,_6.75rem)+3rem)]"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, rgba(241,187,26,0.22), transparent 32%), radial-gradient(circle at 82% 22%, rgba(107,28,111,0.20), transparent 30%), radial-gradient(circle at 50% 90%, rgba(241,187,26,0.10), transparent 50%), linear-gradient(135deg, #FDF8F0 0%, #FFF7EC 36%, #F7F0FF 100%)",
      }}
    >
      {/* Background ornaments */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(107,28,111,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(107,28,111,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.85), transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.85), transparent 70%)",
          }}
        />
        {decorReady && (
          <>
            <div
              className="animate-float absolute left-[6%] top-[18%] h-72 w-72 rounded-full blur-3xl"
              style={{ background: "rgba(241,187,26,0.30)" }}
            />
            <div
              className="animate-float-slow absolute bottom-[14%] right-[6%] h-80 w-80 rounded-full blur-3xl"
              style={{ background: "rgba(107,28,111,0.20)" }}
            />
            <div
              className="animate-float absolute left-[40%] top-[6%] h-32 w-32 rounded-full blur-2xl"
              style={{ background: "rgba(139,46,144,0.18)", animationDelay: "1.4s" }}
            />
            {/* Warm extra glow that slowly breathes */}
            <div
              className="animate-candle-glow absolute left-[24%] bottom-[22%] h-56 w-56 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(241,187,26,0.16)" }}
            />

            {/* Decorative dashed arcs */}
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2 opacity-25"
              width="240"
              height="360"
              viewBox="0 0 220 320"
              aria-hidden="true"
            >
              <path d="M0 160 A160 160 0 0 1 160 0" stroke="#6B1C6F" strokeWidth="1.6" strokeDasharray="6 10" fill="none" />
              <path d="M0 210 A190 190 0 0 1 190 15" stroke="#F1BB1A" strokeWidth="1.6" strokeDasharray="6 10" fill="none" />
              <path d="M0 260 A220 220 0 0 1 220 30" stroke="#8B2E90" strokeWidth="1" strokeDasharray="3 8" fill="none" opacity="0.5" />
            </svg>
            <svg
              className="absolute right-0 top-1/2 -translate-y-1/2 opacity-25"
              width="240"
              height="360"
              viewBox="0 0 220 320"
              aria-hidden="true"
            >
              <path d="M220 160 A160 160 0 0 0 60 0" stroke="#6B1C6F" strokeWidth="1.6" strokeDasharray="6 10" fill="none" />
              <path d="M220 210 A190 190 0 0 0 30 15" stroke="#F1BB1A" strokeWidth="1.6" strokeDasharray="6 10" fill="none" />
              <path d="M220 260 A220 220 0 0 0 0 30" stroke="#8B2E90" strokeWidth="1" strokeDasharray="3 8" fill="none" opacity="0.5" />
            </svg>

            {/* Floating sparkles */}
            <Sparkles
              aria-hidden="true"
              size={22}
              className="animate-float absolute left-[14%] top-[28%]"
              style={{ color: "#F1BB1A", animationDelay: "0.6s" }}
            />
            <Star
              aria-hidden="true"
              size={16}
              fill="#6B1C6F"
              className="animate-float-slow absolute right-[18%] top-[26%]"
              style={{ color: "#6B1C6F", animationDelay: "1s" }}
            />
            <Sparkles
              aria-hidden="true"
              size={18}
              className="animate-float absolute right-[12%] bottom-[28%]"
              style={{ color: "#8B2E90", animationDelay: "1.8s" }}
            />

            {/* Ambient dust motes */}
            <DustMotes />
          </>
        )}
      </div>

      {/* Hero card */}
      <div
        className="card-cozy relative z-10 mx-auto max-w-4xl rounded-[28px] border px-5 py-10 text-center shadow-[0_40px_120px_rgba(107,28,111,0.18)] sm:rounded-[34px] sm:px-6 sm:py-12 md:rounded-[40px] md:px-12 md:py-14"
        style={{
          background: "rgba(255,255,255,0.94)",
          borderColor: "rgba(107,28,111,0.10)",
        }}
      >
        {/* Eyebrow */}
        <div
          className="fade-in-up eyebrow-glow mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em]"
          style={{
            borderColor: "rgba(107,28,111,0.16)",
            color: "#6B1C6F",
            background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(247,240,255,0.7))",
            boxShadow: "0 2px 10px rgba(107,28,111,0.08)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse-glow" style={{ background: "#F1BB1A" }} />
          Neighborhood bookstore · Milwaukie, OR
        </div>

        {/* Logo — a hand-built illustration of the actual shop (matched against
            real photos: dark board-and-batten siding, the "Clackamas Book
            Exchange" oval window sign, red brick, book carts out front),
            staged inside the same gilt "portal" frame. Pure inline SVG + CSS,
            so — unlike the old WebGL scene — it renders immediately and
            identically for every visitor (Lighthouse included) instead of
            only booting after interaction. */}
        <div className="fade-in-up mb-6 flex justify-center" style={{ animationDelay: "100ms" }}>
          <div className="hero-portal">
            {/* Breathing gold/plum aura pooled behind the whole frame. Deferred
                past first paint (decorReady) so its large blur never competes
                with the hero headline's LCP paint. */}
            {decorReady && <div className="hero-portal__aura" aria-hidden="true" />}

            <div className={`hero-portal__frame${decorReady ? " hero-portal__frame--live" : ""}`}>
              <div className="hero-portal__window">
                <div className="hero-portal__illustration">
                  <StorefrontHero />
                </div>

                {/* Inner vignette (static, cheap) sits above the illustration. */}
                <div className="hero-portal__vignette" aria-hidden="true" />
              </div>

              {/* Gilt corner filigree on the mat. */}
              {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                <svg
                  key={pos}
                  className={`hero-portal__corner hero-portal__corner--${pos}`}
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 29 L1 10 Q1 1 10 1 L29 1"
                    stroke="#F1BB1A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path d="M7 23 Q7 7 23 7" stroke="rgba(107,28,111,0.5)" strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="7" cy="23" r="1.7" fill="#F1BB1A" />
                  <circle cx="1" cy="1" r="1.3" fill="rgba(107,28,111,0.4)" />
                </svg>
              ))}
            </div>

            {/* Gilt wax-seal medallion. Its wiggle + rotating gleam only kick in
                once decor is ready, keeping the load path still. */}
            <span className={`hero-portal__seal${decorReady ? " hero-portal__seal--live animate-wiggle" : ""}`}>
              <span className="hero-portal__seal-face">
                <span className="hero-portal__seal-inner">
                  Est.
                  <strong>1981</strong>
                </span>
              </span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="animate-ink-settle display-shadow mb-2 font-bold"
          style={{
            fontFamily: "var(--font-serif)",
            color: "#6B1C6F",
            fontSize: "clamp(3rem, 9vw, 6rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
          }}
        >
          To Be{" "}
          <span
            className="text-gradient"
            style={{
              fontStyle: "italic",
              paddingRight: "0.06em",
              textShadow: "0 6px 26px rgba(241,187,26,0.28)",
            }}
          >
            Read
          </span>
        </h1>

        {/* Hairline flourish under the title, echoing the portal's gilt
            corners so the wordmark feels bound into the same design system. */}
        <div
          className="fade-in-up mx-auto mb-4 flex items-center justify-center gap-3"
          style={{ animationDelay: "160ms" }}
        >
          <span className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, rgba(241,187,26,0.6))" }} />
          <Star aria-hidden="true" size={11} fill="#F1BB1A" style={{ color: "#F1BB1A" }} />
          <span className="h-px w-10" style={{ background: "linear-gradient(90deg, rgba(241,187,26,0.6), transparent)" }} />
        </div>

        <p
          className="fade-in-up mb-6"
          style={{
            color: "#4B5563",
            fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
            fontWeight: 500,
            letterSpacing: "0.01em",
            animationDelay: "260ms",
          }}
        >
          Clackamas Book Exchange · Your next chapter starts here.
        </p>

        {/* Rebrand pill */}
        <button
          type="button"
          onClick={handleCelebrate}
          className="touch-target fade-in-up btn-shine pressable animate-pulse-glow mb-7 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold shadow-md"
          style={{
            background: "#6B1C6F",
            color: "#F1BB1A",
            borderColor: "#F1BB1A",
            animationDelay: "340ms",
          }}
          aria-label="Becoming TBR in 2026 — click for celebration"
        >
          <Sparkles size={14} />
          Becoming TBR in 2026
          <Sparkles size={14} />
        </button>

        {/* Subcopy */}
        <p
          className="fade-in-up mx-auto mb-9 max-w-2xl text-balance"
          style={{
            color: "#6B7280",
            fontSize: "clamp(0.98rem, 2vw, 1.08rem)",
            lineHeight: 1.75,
            animationDelay: "420ms",
          }}
        >
          45 years of stories, fresh energy under new ownership, and a homepage that finally feels a little
          closer to wandering the shelves in person.
        </p>

        {/* CTAs */}
        <div
          className="fade-in-up flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: "500ms" }}
        >
          <button
            type="button"
            onClick={handleVisit}
            className="touch-target btn-warm pressable group flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-semibold text-white shadow-[0_18px_44px_rgba(107,28,111,0.30)] sm:w-auto"
            style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
          >
            Plan Your Visit
            <ArrowRight size={18} className="icon-nudge" />
          </button>
          <button
            type="button"
            onClick={handleShop}
            className="touch-target btn-shine pressable group flex w-full items-center justify-center gap-2 rounded-2xl border-2 px-8 py-4 text-base font-semibold shadow-md sm:w-auto"
            style={{
              backgroundColor: "#F1BB1A",
              color: "#1a1a1a",
              borderColor: "#F1BB1A",
            }}
          >
            Browse Highlights
            <ShoppingBag size={18} className="icon-bob" />
          </button>
        </div>

        {/* Live open/closed status */}
        <div
          className="fade-in-up mt-6 flex justify-center"
          style={{ animationDelay: "560ms" }}
        >
          <OpenStatus />
        </div>

        {/* Quick facts row */}
        <div
          className="fade-in-up mt-9 grid grid-cols-1 gap-3 border-t pt-6 text-center sm:grid-cols-3 sm:gap-6 sm:text-left"
          style={{ borderColor: "rgba(107,28,111,0.10)", animationDelay: "600ms" }}
        >
          {[
            { num: "45+", label: "Years serving readers" },
            { num: "1000s", label: "Used titles in stock" },
            { num: "Mon–Sat", label: "10am – 5pm" },
          ].map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "#6B1C6F",
                  fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                }}
              >
                {item.num}
              </div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider sm:text-xs" style={{ color: "#6B7280" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-70 sm:flex">
        <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: "#6B1C6F" }}>
          Scroll to explore
        </span>
        <span
          className="block h-9 w-[2px] rounded-full"
          style={{ background: "linear-gradient(to bottom, #6B1C6F, transparent)" }}
        />
      </div>
    </section>
  );
}
