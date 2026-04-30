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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FDF8F0 0%, #ffffff 50%, #f3e8ff10 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full opacity-5"
          style={{ background: "#6B1C6F" }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full opacity-5"
          style={{ background: "#F1BB1A" }}
        />
        {/* Dashed semi-circle left */}
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10" width="200" height="300" viewBox="0 0 200 300">
          <path d="M0 150 A150 150 0 0 1 150 0" stroke="#6B1C6F" strokeWidth="2" strokeDasharray="8 8" fill="none" />
          <path d="M0 200 A180 180 0 0 1 180 20" stroke="#F1BB1A" strokeWidth="2" strokeDasharray="8 8" fill="none" />
        </svg>
        {/* Dashed semi-circle right */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10" width="200" height="300" viewBox="0 0 200 300">
          <path d="M200 150 A150 150 0 0 0 50 0" stroke="#6B1C6F" strokeWidth="2" strokeDasharray="8 8" fill="none" />
          <path d="M200 200 A180 180 0 0 0 20 20" stroke="#F1BB1A" strokeWidth="2" strokeDasharray="8 8" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <BookLogo size={160} showText={false} className="drop-shadow-lg" />
        </div>

        {/* Main title */}
        <h1
          className="font-bold mb-3"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#6B1C6F",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            lineHeight: 1.1,
          }}
        >
          To Be Read
        </h1>

        {/* Tagline */}
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

        {/* Rebrand Banner */}
        <button
          onClick={onConfetti}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 transition-all hover:scale-105 shadow-md cursor-pointer border-2"
          style={{
            background: "#6B1C6F",
            color: "#F1BB1A",
            borderColor: "#F1BB1A",
          }}
          aria-label="Rebrand announcement - click for celebration"
        >
          ✨ Changing to TBR in 2026!
        </button>

        {/* Subtext */}
        <p
          className="mb-8"
          style={{
            color: "#6B7280",
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
          }}
        >
          45 years of stories • New owners since June 7, 2024
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleVisit}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: "#6B1C6F" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4A1350"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#6B1C6F"; }}
          >
            Visit Us
            <ArrowRight size={18} />
          </button>
          <button
            onClick={handleShop}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg border-2"
            style={{
              backgroundColor: "#F1BB1A",
              color: "#1a1a1a",
              borderColor: "#F1BB1A",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e0a900"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F1BB1A"; }}
          >
            Shop Online
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs" style={{ color: "#6B1C6F" }}>Scroll to explore</span>
        <div className="w-0.5 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #6B1C6F, transparent)" }} />
      </div>
    </section>
  );
}
