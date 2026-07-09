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

export interface StoreClosure {
  /** Local calendar date the shop is closed, YYYY-MM-DD (America/Los_Angeles). */
  date: string;
}

/**
 * One-off dates the shop is closed outside its regular Mon–Sat hours (e.g. a
 * holiday or private event). Add an entry here and both the live Open/Closed
 * badges (OpenStatus, OpenStatusBadge) and the homepage <ClosureBanner> pick
 * it up automatically — each entry expires itself the day after, so there's
 * nothing to remove later.
 */
const CLOSURES: StoreClosure[] = [{ date: "2026-07-08" }];

function formatDuration(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/** Local calendar date (YYYY-MM-DD) for a UTC instant, in the store's timezone. */
function localDateString(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: STORE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * The upcoming/current one-off closure whose banner window hasn't passed —
 * visible any time through the closure date itself, gone the next calendar
 * day (i.e. by the following morning). Deterministic given `now`.
 */
export function getActiveClosure(now: Date = new Date()): StoreClosure | null {
  const today = localDateString(now);
  return CLOSURES.find((c) => today <= c.date) ?? null;
}

/**
 * Closures that haven't passed yet, for the site-wide BookStore JSON-LD's
 * `specialOpeningHoursSpecification` — so Google Search/Maps knows the shop
 * is closed that day instead of relying only on the regular weekly hours.
 */
export function getUpcomingClosures(now: Date = new Date()): StoreClosure[] {
  const today = localDateString(now);
  return CLOSURES.filter((c) => today <= c.date);
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

  // A one-off closure overrides the regular hours for the whole day, however
  // it lands on the calendar — reuses the same Sat/Sun → Mon rollover as the
  // regular-hours path below so reopening always lands on a real open day.
  if (CLOSURES.some((c) => c.date === localDateString(now))) {
    const opensNextDay = weekday === "Sat" ? "Mon" : "tomorrow";
    return { open: false, label: `Closed today · opens ${opensNextDay} 10 AM` };
  }

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
