"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";

// Click-to-load facade for a Google Maps embed. The third-party iframe (and its
// requests/cookies) only loads when a visitor actually wants the map, keeping it
// off the initial page load — a real win for mobile performance and Best
// Practices, with no loss of function.
//
// `fill` makes it stretch to an absolutely-positioned parent (used by the map
// card in VisitSection); otherwise it renders at a fixed height.

const DEFAULT_SRC =
  "https://www.google.com/maps?q=7931+SE+King+Rd,+Milwaukie,+OR+97222&output=embed";
const DEFAULT_TITLE =
  "Map to To Be Read — 7931 SE King Rd, Ste 1, Milwaukie, OR 97222";
const DEFAULT_LABEL = "7931 SE King Rd, Ste 1 · Milwaukie, OR";

export default function MapEmbed({
  src = DEFAULT_SRC,
  title = DEFAULT_TITLE,
  label = DEFAULT_LABEL,
  fill = false,
}: {
  src?: string;
  title?: string;
  label?: string;
  fill?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const box = fill ? "absolute inset-0 h-full w-full" : "h-[360px] w-full";

  if (loaded) {
    return (
      <iframe
        title={title}
        src={src}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className={`${box} border-0`}
        style={{ border: 0 }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label="Load the interactive map of To Be Read"
      className={`group flex ${box} flex-col items-center justify-center gap-3 transition-colors`}
      style={
        fill
          ? undefined
          : {
              background:
                "radial-gradient(ellipse at 50% 35%, rgba(241,187,26,0.12), transparent 60%), linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
            }
      }
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition-transform group-hover:scale-110"
        style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
      >
        <MapPin size={24} className="text-white" />
      </span>
      <span className="px-4 text-center text-sm font-semibold" style={{ color: "#6B1C6F" }}>
        {label}
      </span>
      <span
        className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors group-hover:brightness-95"
        style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
      >
        Show interactive map
      </span>
    </button>
  );
}
