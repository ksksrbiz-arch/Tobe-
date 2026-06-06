import React from "react";
import { Star } from "lucide-react";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_LINK,
} from "@/lib/storeInfo";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
            <Star size={size} style={{ color: "#F1BB1A" }} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={size} fill="#F1BB1A" style={{ color: "#F1BB1A" }} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Compact Google-rating social-proof badge. Drop next to CTAs to lend trust.
 * `tone="dark"` adapts the text colors for dark/purple backgrounds.
 */
export default function RatingBadge({
  tone = "light",
  size = 14,
  className = "",
  showLink = true,
}: {
  tone?: "light" | "dark";
  size?: number;
  className?: string;
  showLink?: boolean;
}) {
  const dark = tone === "dark";
  const body = (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${className}`}
      style={{
        borderColor: dark ? "rgba(255,255,255,0.22)" : "rgba(107,28,111,0.14)",
        background: dark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.78)",
        color: dark ? "#FFFFFF" : "#6B1C6F",
      }}
    >
      <Stars rating={GOOGLE_RATING} size={size} />
      <span>
        {GOOGLE_RATING.toFixed(1)}
        <span style={{ opacity: 0.7 }}> · {GOOGLE_REVIEW_COUNT} Google reviews</span>
      </span>
    </span>
  );

  if (!showLink) return body;

  return (
    <a
      href={GOOGLE_REVIEWS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rated ${GOOGLE_RATING} out of 5 from ${GOOGLE_REVIEW_COUNT} Google reviews — read them on Google`}
      className="inline-flex transition-transform hover:scale-[1.03]"
    >
      {body}
    </a>
  );
}
