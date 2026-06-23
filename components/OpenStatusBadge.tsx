"use client";

import React, { useEffect, useState } from "react";
import { getStoreStatus, type StoreStatus } from "@/lib/storeHours";

/**
 * Live "Open now / Closed" badge for the Visit page, with a countdown to the
 * next open/close. Hours logic lives in lib/storeHours (store timezone).
 *
 * To avoid a hydration mismatch, a neutral placeholder is rendered on the first
 * paint (server + initial client render). The live status is applied after
 * mount and refreshed every minute so the countdown stays accurate.
 */
export default function OpenStatusBadge({ className = "" }: { className?: string }) {
  // null until mounted → render a neutral, non-color-coded placeholder that
  // matches the server markup, then swap in the live status after mount.
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStoreStatus());
    queueMicrotask(update);
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const open = status?.open ?? false;
  const label = status?.label ?? "Mon–Sat · 10am–5pm";
  const dotColor = status && open ? "#16a34a" : "#9CA3AF";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold sm:text-sm ${className}`}
      style={{
        borderColor: status && open ? "rgba(34,197,94,0.30)" : "rgba(107,28,111,0.20)",
        background: status && open ? "rgba(34,197,94,0.10)" : "rgba(255,255,255,0.75)",
        color: status && open ? "#15803d" : "#6B1C6F",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 rounded-full"
        style={{
          background: dotColor,
          boxShadow: status && open ? "0 0 0 3px rgba(34,197,94,0.18)" : "none",
        }}
      />
      {label}
    </span>
  );
}
