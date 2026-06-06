"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { isOpenNow, GOOGLE_MAPS_LINK, type OpenStatus } from "@/lib/storeInfo";

/**
 * Live "Open now / Closed" pill. Computed after mount so the server-rendered
 * markup never disagrees with the client's clock (no hydration mismatch).
 * Links straight to directions to turn the signal into an action.
 */
export default function OpenStatusPill({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    setStatus(isOpenNow());
    // Re-check every minute so the label flips at open/close without a reload.
    const id = window.setInterval(() => setStatus(isOpenNow()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Reserve nothing until we know — avoids a flash of the wrong state.
  if (!status) return null;

  return (
    <a
      href={GOOGLE_MAPS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-transform hover:scale-[1.03] ${className}`}
      style={{
        borderColor: status.open ? "rgba(34,197,94,0.30)" : "rgba(107,28,111,0.18)",
        background: status.open ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.78)",
        color: status.open ? "#15803d" : "#6B1C6F",
      }}
    >
      <span
        className={`h-2 w-2 rounded-full ${status.open ? "animate-pulse-glow" : ""}`}
        style={{ background: status.open ? "#22c55e" : "#6B1C6F" }}
      />
      <Clock size={13} />
      {status.label}
    </a>
  );
}
