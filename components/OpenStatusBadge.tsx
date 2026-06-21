"use client";

import React, { useEffect, useState } from "react";

/**
 * Live "Open now / Closed" badge for the Visit page, computed from the store's
 * real hours (Mon–Sat 10:00–17:00, closed Sunday) in America/Los_Angeles — so
 * it's correct regardless of where the visitor is.
 *
 * To avoid a hydration mismatch, a neutral placeholder is rendered on the first
 * paint (server + initial client render). The live status is computed inside
 * useEffect and applied via state only after mount.
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
    return { open: false, label: "Closed · opens at 10 AM" };
  }
  // After close today, or any time Sunday: opens next business day.
  const next = weekday === "Sat" || weekday === "Sun" ? "Mon" : "tomorrow";
  return { open: false, label: `Closed · opens ${next} 10 AM` };
}

export default function OpenStatusBadge({ className = "" }: { className?: string }) {
  // null until mounted → render a neutral, non-color-coded placeholder that
  // matches the server markup, then swap in the live status after mount.
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    // Defer the update out of the effect body so it doesn't run synchronously
    // during the effect (lint-safe; avoids the cascading-render path).
    queueMicrotask(() => setStatus(computeStatus(new Date())));
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
