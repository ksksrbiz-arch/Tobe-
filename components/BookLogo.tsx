import React from "react";

interface BookLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function BookLogo({ className = "", size = 120, showText = true }: BookLogoProps) {
  return (
    <svg
      width={size}
      height={showText ? size * 1.1 : size * 0.85}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="To Be Read book logo"
      role="img"
    >
      {/* TBR text above */}
      {showText && (
        <text
          x="60"
          y="18"
          textAnchor="middle"
          fontFamily="Playfair Display, Georgia, serif"
          fontWeight="700"
          fontSize="13"
          fill="#6B1C6F"
          letterSpacing="0.5"
        >
          To Be Read
        </text>
      )}

      {/* Left page (slightly angled) */}
      <path
        d="M22 35 L58 30 L58 95 L22 100 Z"
        fill="#F1BB1A"
        stroke="#6B1C6F"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Right page (slightly angled) */}
      <path
        d="M98 35 L62 30 L62 95 L98 100 Z"
        fill="#F5CC45"
        stroke="#6B1C6F"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Spine */}
      <rect x="57" y="28" width="6" height="69" fill="#6B1C6F" rx="1" />

      {/* Left page lines */}
      <line x1="30" y1="48" x2="54" y2="45" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="30" y1="56" x2="54" y2="53" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="30" y1="64" x2="54" y2="61" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="30" y1="72" x2="54" y2="69" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.4" />

      {/* Right page lines */}
      <line x1="90" y1="48" x2="66" y2="45" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="90" y1="56" x2="66" y2="53" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="90" y1="64" x2="66" y2="61" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="90" y1="72" x2="66" y2="69" stroke="#6B1C6F" strokeWidth="1" strokeOpacity="0.4" />

      {/* Decorative swirls underneath */}
      <path
        d="M35 108 Q45 102 55 108 Q65 114 75 108 Q85 102 90 106"
        stroke="#6B1C6F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M38 115 Q48 109 58 115 Q68 121 78 115 Q84 111 88 113"
        stroke="#F1BB1A"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Subtle dashed semi-circles as accents */}
      <path
        d="M8 75 A30 30 0 0 1 38 45"
        stroke="#6B1C6F"
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
        strokeOpacity="0.4"
      />
      <path
        d="M112 75 A30 30 0 0 0 82 45"
        stroke="#F1BB1A"
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
        strokeOpacity="0.5"
      />

      {/* Bottom cover line */}
      <path
        d="M20 100 L58 95 L62 95 L100 100"
        stroke="#6B1C6F"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
