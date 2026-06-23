"use client";

import React from "react";
import { CalendarPlus } from "lucide-react";

const STORE_LOCATION = "To Be Read, 7931 SE King Rd, Ste 1, Milwaukie, OR 97222";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  /** ISO-8601 with offset. */
  startDate: string;
  /** ISO-8601 with offset. */
  endDate: string;
}

/** Format a Date as an iCalendar UTC timestamp: 20260627T180000Z. */
function toIcsUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

/** Escape text for an iCalendar property value (RFC 5545 §3.3.11). */
function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function buildIcs(event: CalendarEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//To Be Read//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@tobereadshop.com`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(new Date(event.startDate))}`,
    `DTEND:${toIcsUtc(new Date(event.endDate))}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(STORE_LOCATION)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  // iCalendar requires CRLF line endings.
  return lines.join("\r\n");
}

/**
 * Downloads a single-event .ics file, which every major calendar app (Google,
 * Apple, Outlook) imports natively. Generated entirely client-side, so it needs
 * no server route.
 */
export default function AddToCalendarButton({
  event,
  className = "",
}: {
  event: CalendarEvent;
  className?: string;
}) {
  const handleClick = () => {
    const ics = buildIcs(event);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Revoke on the next tick so the download has a chance to start.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-[1.03] ${className}`}
      style={{
        borderColor: "rgba(107,28,111,0.18)",
        color: "#6B1C6F",
        background: "rgba(107,28,111,0.04)",
      }}
    >
      <CalendarPlus size={13} aria-hidden="true" />
      Add to calendar
    </button>
  );
}
