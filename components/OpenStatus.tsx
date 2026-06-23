"use client";

import React, { useEffect, useState } from "react";
import { getStoreStatus, type StoreStatus } from "@/lib/storeHours";

/**
 * Live "Open now / Closed" badge with a countdown to the next open/close,
 * computed from the store's real hours in its own timezone (see lib/storeHours).
 *
 * Renders a neutral hours label on the server and during hydration, then swaps
 * in the live status after mount (deferred via queueMicrotask to avoid the
 * react-hooks/set-state-in-effect cascading-render path) and ticks every minute.
 */
export default function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStoreStatus());
    queueMicrotask(update);
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const open = status?.open ?? false;
  // Until mounted, show a neutral, non-color-coded label (matches SSR markup).
  const label = status?.label ?? "Mon–Sat · 10am–5pm";
  const dotColor = status ? (open ? "#16a34a" : "#9CA3AF") : "#9CA3AF";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
      style={{
        background: status && open ? "rgba(34,197,94,0.14)" : "rgba(107,28,111,0.06)",
        color: status && open ? "#15803d" : "#6B1C6F",
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
