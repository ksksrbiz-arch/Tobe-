"use client";

import React from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  imageUrl: string;
}

export default function PageHero({ title, subtitle, badge, imageUrl }: PageHeroProps) {
  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        height: "40vh",
        minHeight: "280px",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Purple gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(107,28,111,0.85) 0%, rgba(107,28,111,0.65) 50%, rgba(107,28,111,0.8) 100%)",
        }}
      />
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
        {badge && (
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: "#F1BB1A", color: "#1a1a1a" }}
          >
            {badge}
          </span>
        )}
        <h1
          className="font-bold mb-3 text-white"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p className="text-white/85" style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
