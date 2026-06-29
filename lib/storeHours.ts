/**
 * Single source of truth for the shop's opening hours and live status.
 *
 * Hours: Mon–Sat 10:00–17:00, closed Sunday, evaluated in the store's own
 * timezone (America/Los_Angeles) so the result is correct regardless of where
 * the visitor is. When the shop is open — or about to open within the same
 * stretch of the day — the label includes a live countdown.
 */

import { STORE_TIMEZONE } from "@/lib/store";

const OPEN_MIN = 10 * 60; // 10:00
const CLOSE_MIN = 17 * 60; // 17:00

export interface StoreStatus {
  open: boolean;
  label: string;
}

function formatDuration(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: STORE_TIMEZONE,
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
    return { open: true, label: `Open now · closes in ${formatDuration(CLOSE_MIN - minutes)}` };
  }
  if (!isSunday && minutes < OPEN_MIN) {
    return { open: false, label: `Closed · opens in ${formatDuration(OPEN_MIN - minutes)}` };
  }

  // After close today, or any time Sunday: opens the next business day. Closed
  // Sunday, so Saturday/Sunday both roll to Monday. (No countdown here — it
  // would span many hours overnight, where a day label reads cleaner.)
  const opensNextDay = weekday === "Sat" || weekday === "Sun" ? "Mon" : "tomorrow";
  return { open: false, label: `Closed · opens ${opensNextDay} 10 AM` };
}
