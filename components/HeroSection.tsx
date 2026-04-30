"use client";

import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import BookLogo from "./BookLogo";

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(241,187,26,0.18), transparent 32%), radial-gradient(circle at 80% 18%, rgba(107,28,111,0.16), transparent 26%), linear-gradient(135deg, #FDF8F0 0%, #FFF7EC 36%, #F7F0FF 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(107,28,111,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(107,28,111,0.04) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.75), transparent)",
          }}
        />
        <div
          className="absolute left-8 top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(241,187,26,0.18)" }}
        />
        <div
          className="absolute bottom-20 right-8 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(107,28,111,0.14)" }}
        />
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 opacity-15" width="220" height="320" viewBox="0 0 220 320">
          <path d="M0 160 A160 160 0 0 1 160 0" stroke="#6B1C6F" strokeWidth="2" strokeDasharray="8 10" fill="none" />
          <path d="M0 210 A190 190 0 0 1 190 15" stroke="#F1BB1A" strokeWidth="2" strokeDasharray="8 10" fill="none" />
        </svg>
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15" width="220" height="320" viewBox="0 0 220 320">
          <path d="M220 160 A160 160 0 0 0 60 0" stroke="#6B1C6F" strokeWidth="2" strokeDasharray="8 10" fill="none" />
          <path d="M220 210 A190 190 0 0 0 30 15" stroke="#F1BB1A" strokeWidth="2" strokeDasharray="8 10" fill="none" />
        </svg>
      </div>

      <div
        className="relative z-10 mx-auto max-w-4xl rounded-[36px] border px-6 py-10 text-center shadow-[0_30px_100px_rgba(107,28,111,0.16)] backdrop-blur md:px-10"
        style={{
          background: "rgba(255,255,255,0.72)",
          borderColor: "rgba(107,28,111,0.08)",
        }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]" style={{ borderColor: "rgba(107,28,111,0.10)", color: "#6B1C6F", background: "rgba(255,255,255,0.74)" }}>
          Neighborhood bookstore • Milwaukie, OR
        </div>

        <div className="mb-6 flex justify-center">
          <BookLogo size={160} showText={false} className="drop-shadow-lg" />
        </div>

        <h1
          className="font-bold mb-3"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#6B1C6F",
            fontSize: "clamp(2.8rem, 8vw, 5.4rem)",
            lineHeight: 1.04,
          }}
        >
          To Be Read
        </h1>

        <p
          className="mb-6"
          style={{
            color: "#4B5563",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 500,
          }}
        >
          Clackamas Book Exchange • Your Next Chapter Starts Here
        </p>

        <button
          onClick={onConfetti}
          className="mb-6 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:scale-105"
          style={{
            background: "#6B1C6F",
            color: "#F1BB1A",
            borderColor: "#F1BB1A",
          }}
          aria-label="Rebrand announcement - click for celebration"
        >
          ✨ Changing to TBR in 2026!
        </button>

        <p
          className="mx-auto mb-8 max-w-2xl"
          style={{
            color: "#6B7280",
            fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            lineHeight: 1.7,
          }}
        >
          45 years of stories, fresh energy under new ownership, and a homepage that now feels a little closer to wandering the shelves in person.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={handleVisit}
            className="flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: "#6B1C6F" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4A1350"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#6B1C6F"; }}
          >
            Plan Your Visit
            <ArrowRight size={18} />
          </button>
          <button
            onClick={handleShop}
            className="flex items-center gap-2 rounded-xl border-2 px-8 py-3.5 text-base font-semibold shadow-md transition-all hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "#F1BB1A",
              color: "#1a1a1a",
              borderColor: "#F1BB1A",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e0a900"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F1BB1A"; }}
          >
            Browse Highlights
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-50">
        <span className="text-xs uppercase tracking-[0.26em]" style={{ color: "#6B1C6F" }}>
          Scroll to explore
        </span>
        <div className="h-8 w-0.5 rounded-full" style={{ background: "linear-gradient(to bottom, #6B1C6F, transparent)" }} />
      </div>
    </section>
  );
}
