// Server Component: purely presentational, so it renders to HTML with no
// hydration of its own — only its <Reveal> children are client islands.
//
// The cards are derived from lib/events.ts — the single source of truth the
// /events page and Event structured data also use — so the homepage can never
// drift from the real cadence (which is exactly what used to happen when this
// list was hand-maintained). Each distinct recurring happening shows once with
// its canonical recurrence label and description.
import React from "react";
import Link from "next/link";
import { Calendar, Sparkles, Coffee, BookHeart, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { getUpcomingEvents } from "@/lib/events";

// Per-recurring-event presentation (icon + brand accent), keyed by slug. New
// rules fall back to a sensible default so nothing breaks if lib/events.ts
// gains an event before this map is updated.
const EVENT_DISPLAY: Record<string, { icon: typeof BookHeart; accent: string }> = {
  "staff-picks-saturday": { icon: BookHeart, accent: "var(--purple)" },
  "cozy-reading-hour": { icon: Coffee, accent: "var(--gold)" },
};
const DEFAULT_DISPLAY = { icon: Sparkles, accent: "var(--gold-light)" };

export default function EventsSection() {
  // Collapse the expanded occurrences down to the distinct recurring events,
  // preserving the order of their next occurrence.
  const seen = new Set<string>();
  const events = getUpcomingEvents(12)
    .filter((ev) => {
      if (seen.has(ev.slug)) return false;
      seen.add(ev.slug);
      return true;
    })
    .map((ev) => {
      const display = EVENT_DISPLAY[ev.slug] ?? DEFAULT_DISPLAY;
      return {
        icon: display.icon,
        accent: display.accent,
        when: ev.recurrence,
        title: ev.title,
        desc: ev.description,
      };
    });

  return (
    <section
      className="relative overflow-hidden px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--purple) 8%, transparent), transparent 38%), linear-gradient(180deg, var(--paper) 0%, #FFFEFB 100%)",
      }}
      id="events"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-14 text-center">
          <span
            className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "color-mix(in srgb, var(--gold) 18%, transparent)", color: "var(--purple)" }}
          >
            <Calendar size={12} />
            On the calendar
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--purple)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Events &amp; <span className="underline-accent">happenings</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            We host small, cozy moments throughout the year — here&apos;s what&apos;s on right now.
          </p>
          <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {events.map((ev, i) => (
            <Reveal key={ev.title} delay={i * 80}>
              <article
                className="group relative h-full overflow-hidden rounded-2xl border bg-white p-6 card-cozy"
                style={{
                  borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 transition-all group-hover:h-1.5"
                  style={{ background: ev.accent }}
                />
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:rotate-[-6deg] group-hover:scale-110"
                  style={{ background: ev.accent + "20", color: ev.accent }}
                >
                  <ev.icon size={22} />
                </div>
                <p
                  className="mb-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: ev.accent }}
                >
                  {ev.when}
                </p>
                <h3
                  className="mb-2 text-lg font-bold leading-tight"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
                >
                  {ev.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                  {ev.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <Link
            href="/events"
            className="btn-primary"
          >
            See all upcoming events
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
