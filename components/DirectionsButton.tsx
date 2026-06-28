import React from "react";
import { Navigation } from "lucide-react";

/**
 * Prominent "Get Directions" CTA that deep-links into Google Maps directions to
 * the store, with the destination pre-filled. Opens in a new tab.
 */

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=7931%20SE%20King%20Rd%20Unit%201%20Portland%20OR%2097222";

export default function DirectionsButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get driving directions to To Be Read, 7931 SE King Rd, Unit 1, Portland, OR 97222 (opens in a new tab)"
      className={`btn-primary active:scale-95 ${className}`}
    >
      <Navigation size={16} aria-hidden="true" />
      Get Directions
    </a>
  );
}
