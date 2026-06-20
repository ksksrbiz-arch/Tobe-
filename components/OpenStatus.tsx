"use client";

import React, { useEffect, useState } from "react";

/**
 * Live "Open now / Closed" badge, computed from the store's real hours
 * (Mon–Sat 10am–5pm, closed Sunday) in the store's timezone — so it's correct
 * regardless of the visitor's location.
 *
 * Renders a neutral hours label on the server and during hydration, then swaps
 * in the live status after mount (deferred via queueMicrotask to avoid the
 * react-hooks/set-state-in-effect cascading-render path).
 */

const TIME_ZONE = "America/Los_Angeles";
const OPEN_MIN = 10 * 60; // 10:00
const CLOSE_MIN = 17 * 60; // 17:00

type Status = { open: boolean; label: string };

function computeStatus(now: Date): Status {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const minutes = (hour % 24) * 60 + minute;
  const isSunday = weekday === "Sun";

  if (!isSunday && minutes >= OPEN_MIN && minutes < CLOSE_MIN) {
    return { open: true, label: "Open now · closes 5 PM" };
  }
  if (!isSunday && minutes < OPEN_MIN) {
    return { open: false, label: "Closed · opens 10 AM today" };
  }
  // After close today, or any time Sunday: opens next business day.
  const next = weekday === "Sat" || weekday === "Sun" ? "Monday" : "tomorrow";
  return { open: false, label: `Closed · opens 10 AM ${next}` };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(computeStatus(new Date()));
    // Defer the first update out of the effect body (lint-safe), then refresh
    // every minute so the badge flips at opening/closing time without a reload.
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
