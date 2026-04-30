"use client";

import React from "react";
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react";
import BookLogo from "./BookLogo";
import DustMotes from "./DustMotes";

interface HeroSectionProps {
  onConfetti?: () => void;
}

export default function HeroSection({ onConfetti }: HeroSectionProps) {
  const handleVisit = () => {
    const el = document.querySelector("#visit");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleShop = () => {
    const el = document.querySelector("#shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-12 paper-warm"
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
      </div>

      {/* Hero card */}
      <div
        className="card-cozy relative z-10 mx-auto max-w-4xl rounded-[40px] border px-6 py-12 text-center shadow-[0_40px_120px_rgba(107,28,111,0.18)] backdrop-blur-md md:px-12 md:py-14"
        style={{
          background: "rgba(255,255,255,0.76)",
          borderColor: "rgba(107,28,111,0.10)",
        }}
      >
        {/* Eyebrow */}
        <div
          className="fade-in-up mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em]"
          style={{
            borderColor: "rgba(107,28,111,0.14)",
            color: "#6B1C6F",
            background: "rgba(255,255,255,0.78)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse-glow" style={{ background: "#F1BB1A" }} />
          Neighborhood bookstore · Milwaukie, OR
        </div>

        {/* Logo */}
        <div className="fade-in-up mb-6 flex justify-center" style={{ animationDelay: "100ms" }}>
          <div className="relative lamp-glow">
            <BookLogo
              size={170}
              showText={false}
              className="animate-float-slow drop-shadow-[0_18px_28px_rgba(107,28,111,0.18)]"
            />
            <span
              className="absolute -right-3 -top-2 inline-flex h-7 items-center rounded-full px-2.5 text-[10px] font-bold uppercase tracking-widest text-white animate-wiggle"
              style={{ background: "#F1BB1A", color: "#1a1a1a", boxShadow: "0 8px 20px rgba(241,187,26,0.35)" }}
            >
              Est. 1979
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="animate-ink-settle mb-3 font-bold"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#6B1C6F",
            fontSize: "clamp(3rem, 9vw, 6rem)",
            lineHeight: 1.02,
            animationDelay: "180ms",
          }}
        >
          To Be{" "}
          <span className="text-gradient" style={{ fontStyle: "italic" }}>
            Read
          </span>
        </h1>

        <p
          className="fade-in-up mb-6"
          style={{
            color: "#4B5563",
            fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
            fontWeight: 500,
            animationDelay: "260ms",
          }}
        >
          Clackamas Book Exchange · Your next chapter starts here.
        </p>

        {/* Rebrand pill */}
        <button
          onClick={onConfetti}
          className="fade-in-up btn-shine animate-pulse-glow mb-7 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:scale-[1.04]"
          style={{
            background: "#6B1C6F",
            color: "#F1BB1A",
            borderColor: "#F1BB1A",
            animationDelay: "340ms",
          }}
          aria-label="Rebrand announcement - click for celebration"
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
            onClick={handleVisit}
            className="btn-shine flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(107,28,111,0.28)] transition-all hover:scale-105 sm:w-auto"
            style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
          >
            Plan Your Visit
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={handleShop}
            className="btn-shine flex w-full items-center justify-center gap-2 rounded-2xl border-2 px-8 py-4 text-base font-semibold shadow-md transition-all hover:scale-105 sm:w-auto"
            style={{
              backgroundColor: "#F1BB1A",
              color: "#1a1a1a",
              borderColor: "#F1BB1A",
            }}
          >
            Browse Highlights
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Quick facts row */}
        <div
          className="fade-in-up mt-9 grid grid-cols-3 gap-3 border-t pt-6 text-left sm:gap-6"
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
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#6B1C6F",
                  fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                }}
              >
                {item.num}
              </div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider" style={{ color: "#6B7280" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#6B1C6F" }}>
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
