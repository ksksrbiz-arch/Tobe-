"use client";

import React from "react";

const MOTE_COUNT = 18;

const MOTES = Array.from({ length: MOTE_COUNT }, (_, i) => {
  const r1 = (i * 9301 + 49297) % 233280;
  const r2 = (i * 233280 + 9301) % 49297;
  const r3 = (i * 49297 + 233280) % 9301;
  return {
    id: i,
    left: `${4 + (r1 / 233280) * 92}%`,
    top: `${4 + (r2 / 49297) * 92}%`,
    size: 1.5 + (r3 / 9301) * 3.5,
    duration: 9 + ((i * 7) % 14),
    delay: (i * 0.43) % 8,
    opacity: 0.08 + ((i * 11) % 100) / 500,
    isGold: i % 3 !== 0,
  };
});

export default function DustMotes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {MOTES.map((mote) => (
        <span
          key={mote.id}
          className="absolute rounded-full animate-float"
          style={{
            left: mote.left,
            top: mote.top,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            background: mote.isGold ? "#F1BB1A" : "#8B2E90",
            opacity: mote.opacity,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
            filter: "blur(0.6px)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
