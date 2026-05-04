"use client";

import React from "react";

/**
 * A site-wide ambient layer that adds the "cozy bookstore" texture:
 *  - a warm vignette that gently breathes
 *  - drifting paper-grain noise overlay
 *  - a few slow-floating book pages in the background
 *  - dust motes catching the afternoon light
 *
 * It is rendered via a fixed, pointer-events-none container and respects
 * `prefers-reduced-motion` (the keyframes auto-shorten via globals.css).
 */
export default function CozyAmbience() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {/* Warm vignette that softly pulses, like a reading lamp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(241,187,26,0.14), transparent 70%), radial-gradient(ellipse 70% 60% at 50% 100%, rgba(107,28,111,0.12), transparent 70%), radial-gradient(ellipse 40% 40% at 15% 40%, rgba(241,187,26,0.07), transparent 70%), radial-gradient(ellipse 40% 40% at 85% 60%, rgba(139,46,144,0.08), transparent 70%)",
          animation: "lampBreath 9s ease-in-out infinite",
          mixBlendMode: "multiply",
        }}
      />

      {/* Paper grain — extremely subtle, gives the page warmth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(107,28,111,0.06) 1px, transparent 1px), radial-gradient(rgba(241,187,26,0.05) 1px, transparent 1px)",
          backgroundSize: "3px 3px, 5px 5px",
          backgroundPosition: "0 0, 1px 2px",
          opacity: 0.55,
          mixBlendMode: "multiply",
        }}
      />

      {/* Floating pages drifting in the background */}
      {[
        { left: "8%", top: "22%", size: 38, delay: "0s", dur: "16s", rot: -8 },
        { left: "18%", top: "78%", size: 28, delay: "3s", dur: "20s", rot: 12 },
        { left: "82%", top: "30%", size: 34, delay: "1.5s", dur: "18s", rot: -6 },
        { left: "92%", top: "70%", size: 24, delay: "4.5s", dur: "22s", rot: 16 },
        { left: "48%", top: "12%", size: 22, delay: "6s", dur: "24s", rot: 4 },
      ].map((p, i) => (
        <svg
          key={i}
          width={p.size}
          height={p.size * 1.3}
          viewBox="0 0 40 52"
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            opacity: 0.18,
            animation: `pageDrift ${p.dur} ease-in-out ${p.delay} infinite`,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <path
            d="M2 4 Q4 1 8 2 L32 4 Q38 5 38 10 L36 46 Q35 50 30 50 L8 48 Q3 47 3 42 Z"
            fill="#FFFDF9"
            stroke="#6B1C6F"
            strokeWidth="0.8"
          />
          <line x1="8" y1="14" x2="32" y2="14" stroke="#6B1C6F" strokeWidth="0.6" opacity="0.5" />
          <line x1="8" y1="20" x2="32" y2="20" stroke="#6B1C6F" strokeWidth="0.6" opacity="0.5" />
          <line x1="8" y1="26" x2="28" y2="26" stroke="#6B1C6F" strokeWidth="0.6" opacity="0.5" />
          <line x1="8" y1="32" x2="32" y2="32" stroke="#6B1C6F" strokeWidth="0.6" opacity="0.5" />
        </svg>
      ))}

      {/* Fireflies — warm pulsing lights drifting upward, magical evening feel */}
      {Array.from({ length: 9 }).map((_, i) => {
        const left = (i * 41 + 13) % 100;
        const top = 60 + ((i * 17) % 35);
        const delay = (i * 1.7) % 8;
        const dur = 12 + (i % 6) * 2;
        const size = i % 3 === 0 ? 4 : 3;
        return (
          <span
            key={`firefly-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background:
                "radial-gradient(circle, rgba(255,235,150,1) 0%, rgba(241,187,26,0.85) 45%, rgba(241,187,26,0) 75%)",
              animation: `fireflyDrift ${dur}s ease-in-out ${delay}s infinite, fireflyPulse ${
                2 + (i % 3) * 0.6
              }s ease-in-out infinite`,
            }}
          />
        );
      })}

      {/* Twinkling stars — tiny constellation feel scattered across the upper viewport */}
      {Array.from({ length: 14 }).map((_, i) => {
        const left = (i * 71 + 5) % 100;
        const top = (i * 23 + 4) % 55;
        const delay = (i * 0.9) % 6;
        const dur = 3.5 + (i % 4);
        const size = i % 4 === 0 ? 9 : i % 2 === 0 ? 7 : 5;
        return (
          <svg
            key={`star-${i}`}
            className="absolute"
            width={size}
            height={size}
            viewBox="0 0 10 10"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `starTwinkle ${dur}s ease-in-out ${delay}s infinite`,
              filter: "drop-shadow(0 0 3px rgba(241,187,26,0.7))",
            }}
          >
            <path
              d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z"
              fill={i % 3 === 0 ? "#F1BB1A" : i % 2 === 0 ? "#FCE8A6" : "#8B2E90"}
              opacity="0.9"
            />
          </svg>
        );
      })}

      {/* Dust motes catching light — very subtle */}
      {Array.from({ length: 18 }).map((_, i) => {
        const left = (i * 53 + 7) % 100;
        const top = (i * 37 + 11) % 100;
        const delay = (i * 0.6) % 6;
        const dur = 12 + (i % 8);
        const size = i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5;
        return (
          <span
            key={`mote-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background:
                i % 3 === 0
                  ? "rgba(241,187,26,0.55)"
                  : i % 2 === 0
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(107,28,111,0.35)",
              boxShadow:
                i % 3 === 0
                  ? "0 0 6px rgba(241,187,26,0.7)"
                  : "0 0 4px rgba(255,255,255,0.5)",
              animation: `dustDrift ${dur}s ease-in-out ${delay}s infinite`,
              opacity: 0.5,
            }}
          />
        );
      })}
    </div>
  );
}
