import React from "react";
import { Navigation } from "lucide-react";

/**
 * Prominent "Get Directions" CTA that deep-links into Google Maps directions to
 * the store, with the destination pre-filled. Opens in a new tab.
 */

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=7931%20SE%20King%20Rd%20Ste%201%20Milwaukie%20OR%2097222";

export default function DirectionsButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-shine inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 active:scale-[0.98] ${className}`}
      style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
    >
      <Navigation size={16} />
      Get Directions
    </a>
  );
}
