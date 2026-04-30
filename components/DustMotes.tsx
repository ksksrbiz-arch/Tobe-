"use client";

import React, { useEffect, useState } from "react";

interface Mote {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  isGold: boolean;
}

const MOTE_COUNT = 18;

export default function DustMotes() {
  const [motes, setMotes] = useState<Mote[]>([]);

  useEffect(() => {
    setMotes(
      Array.from({ length: MOTE_COUNT }, (_, i) => ({
        id: i,
        left: `${4 + Math.random() * 92}%`,
        top: `${4 + Math.random() * 92}%`,
        size: 1.5 + Math.random() * 3.5,
        duration: 9 + Math.random() * 14,
        delay: Math.random() * 8,
        opacity: 0.08 + Math.random() * 0.20,
        isGold: i % 3 !== 0,
      }))
    );
  }, []);

  if (motes.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {motes.map((mote) => (
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
