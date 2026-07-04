// Server Component: a slim, date-gated alert for a one-off shop closure (e.g.
// a holiday). It renders nothing once the closure date has passed, so it
// retires itself the next morning without a code change. Driven by the same
// CLOSURES list the live Open/Closed status badges read from (lib/storeHours),
// so the two surfaces never contradict each other.
import React from "react";
import { CalendarOff } from "lucide-react";
import { getActiveClosure } from "@/lib/storeHours";
import { STORE_TIMEZONE } from "@/lib/store";

// Anchored at local noon so formatting in STORE_TIMEZONE can never roll the
// result onto the wrong calendar day.
function localNoon(dateStr: string, dayOffset = 0): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + dayOffset, 12));
}

function formatFull(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: STORE_TIMEZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatWeekday(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: STORE_TIMEZONE,
    weekday: "long",
  }).format(date);
}

export default function ClosureBanner() {
  const closure = getActiveClosure();
  if (!closure) return null;

  const closedLabel = formatFull(localNoon(closure.date));
  const reopensLabel = formatWeekday(localNoon(closure.date, 1));

  return (
    <div
      role="status"
      className="relative z-10 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-4 py-3 text-center text-sm font-semibold leading-snug text-white sm:text-base"
      style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #4A1350 100%)" }}
    >
      <CalendarOff size={17} className="shrink-0" aria-hidden="true" />
      <span>
        We&apos;ll be closed {closedLabel}. Back to our regular hours {reopensLabel}.
      </span>
    </div>
  );
}
