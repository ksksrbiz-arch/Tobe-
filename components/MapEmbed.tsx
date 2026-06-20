"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";

// Click-to-load facade for the Google Maps embed. The third-party iframe (and
// its requests/cookies) only loads when a visitor actually wants the map,
// keeping it off the /visit page's initial load — a real win for mobile
// performance and Best Practices, with no loss of function.

const MAP_SRC =
  "https://www.google.com/maps?q=7931+SE+King+Rd,+Milwaukie,+OR+97222&output=embed";
const MAP_TITLE =
  "Map to To Be Read — 7931 SE King Rd, Ste 1, Milwaukie, OR 97222";

export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={MAP_TITLE}
        src={MAP_SRC}
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[360px] w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label="Load the interactive map of To Be Read"
      className="group flex h-[360px] w-full flex-col items-center justify-center gap-3 transition-colors"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, rgba(241,187,26,0.12), transparent 60%), linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
      }}
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition-transform group-hover:scale-110"
        style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
      >
        <MapPin size={24} className="text-white" />
      </span>
      <span className="text-sm font-semibold" style={{ color: "#6B1C6F" }}>
        7931 SE King Rd, Ste 1 · Milwaukie, OR
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
