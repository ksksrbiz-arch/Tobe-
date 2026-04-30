"use client";

import React from "react";

interface AnimatedBookLogoProps {
  size?: number;
  className?: string;
  /** When true the book stays open with pages fanned. */
  open?: boolean;
}

/**
 * A re-imagined version of <BookLogo /> for big moments — the loading screen,
 * splash hero, etc. The pages animate open from the spine and a soft halo
 * pulses behind it. Uses pure CSS so it works without framer-motion.
 */
export default function AnimatedBookLogo({
  size = 160,
  className = "",
  open = true,
}: AnimatedBookLogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Warm halo */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(241,187,26,0.45) 0%, rgba(241,187,26,0.12) 35%, transparent 70%)",
          filter: "blur(8px)",
          animation: "candleGlow 3.6s ease-in-out infinite",
        }}
      />

      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
        style={{ overflow: "visible" }}
      >
        {/* Soft underglow */}
        <ellipse cx="100" cy="170" rx="62" ry="6" fill="rgba(107,28,111,0.18)" />

        {/* Spine */}
        <rect
          x="96"
          y="50"
          width="8"
          height="100"
          rx="2"
          fill="#4A1350"
          style={{
            transformOrigin: "100px 100px",
            animation: "spineRise 1.1s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        />

        {/* Left page group — opens from the spine */}
        <g
          style={{
            transformOrigin: "100px 100px",
            transform: open ? "rotateY(0deg)" : "rotateY(80deg)",
            animation: "openLeft 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both",
          }}
        >
          <path
            d="M100 50 L40 58 L40 142 L100 150 Z"
            fill="#F1BB1A"
            stroke="#6B1C6F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <line x1="50" y1="78" x2="92" y2="74" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="50" y1="90" x2="92" y2="86" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="50" y1="102" x2="92" y2="98" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="50" y1="114" x2="92" y2="110" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="50" y1="126" x2="92" y2="122" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
        </g>

        {/* Right page group */}
        <g
          style={{
            transformOrigin: "100px 100px",
            transform: open ? "rotateY(0deg)" : "rotateY(-80deg)",
            animation: "openRight 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both",
          }}
        >
          <path
            d="M100 50 L160 58 L160 142 L100 150 Z"
            fill="#F5CC45"
            stroke="#6B1C6F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <line x1="150" y1="78" x2="108" y2="74" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="150" y1="90" x2="108" y2="86" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="150" y1="102" x2="108" y2="98" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="150" y1="114" x2="108" y2="110" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="150" y1="126" x2="108" y2="122" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.45" />
        </g>

        {/* Floating page (turns over the open book) */}
        <g
          style={{
            transformOrigin: "100px 100px",
            animation: "pageFlip 3.2s cubic-bezier(0.45, 0.05, 0.35, 1) 0.9s infinite",
            opacity: 0.85,
          }}
        >
          <path
            d="M100 50 L100 150 L52 144 L52 56 Z"
            fill="#FFFDF9"
            stroke="#6B1C6F"
            strokeWidth="1.8"
            strokeOpacity="0.85"
            strokeLinejoin="round"
          />
          <line x1="60" y1="74" x2="94" y2="72" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.35" />
          <line x1="60" y1="86" x2="94" y2="84" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.35" />
          <line x1="60" y1="98" x2="94" y2="96" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.35" />
          <line x1="60" y1="110" x2="94" y2="108" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.35" />
        </g>

        {/* Sparkles around the book */}
        <g style={{ animation: "twinkle 2.4s ease-in-out infinite" }}>
          <path
            d="M30 38 L33 44 L39 47 L33 50 L30 56 L27 50 L21 47 L27 44 Z"
            fill="#F1BB1A"
            opacity="0.8"
          />
        </g>
        <g style={{ animation: "twinkle 2.4s ease-in-out 0.6s infinite" }}>
          <path
            d="M170 36 L172 41 L177 43 L172 45 L170 50 L168 45 L163 43 L168 41 Z"
            fill="#6B1C6F"
            opacity="0.7"
          />
        </g>
        <g style={{ animation: "twinkle 2.4s ease-in-out 1.1s infinite" }}>
          <path
            d="M174 162 L176 166 L180 168 L176 170 L174 174 L172 170 L168 168 L172 166 Z"
            fill="#F1BB1A"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}
