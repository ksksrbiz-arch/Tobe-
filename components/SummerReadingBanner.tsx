// Server Component: a date-gated promotional banner for the current featured
// seasonal program (e.g. Summer Reading Programs). It renders nothing once the
// program's window has passed, so it self-retires without a code change. Visuals
// echo the in-store flyer — a sunny gradient, twinkling stars, and one card per
// program — while keeping the site's purple/gold brand for the CTAs.
//
// Performance: entrance motion is CSS-only (the `.stagger` utility), so the
// banner ships no hydration of its own beyond the optional Add-to-calendar
// islands. On the homepage those are turned off (showAddToCalendar={false}) to
// keep above-the-fold JavaScript minimal; the full version lives on the Events
// and dedicated Summer Reading pages.
import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, MapPin, Sparkles, Star, ArrowRight, Trophy } from "lucide-react";
import JsonLd from "./JsonLd";
import AddToCalendarButton from "./AddToCalendarButton";
import { getFeaturedProgram, specialEventJsonLd } from "@/lib/events";

// Per-program icon, falling back to a book.
const PROGRAM_ICONS: Record<string, typeof BookOpen> = {
  "summer-reading-circle": BookOpen,
  "summer-reading-challenge": Trophy,
};

// Decorative stars echoing the flyer. Positions + sizes are fixed; each twinkles
// on its own offset so the set shimmers rather than blinking in unison.
const STARS = [
  { top: "16%", left: "6%", size: 26, delay: "0s", opacity: 0.75 },
  { top: "46%", left: "11%", size: 15, delay: "0.9s", opacity: 0.6 },
  { top: "12%", right: "7%", size: 30, delay: "0.4s", opacity: 0.75 },
  { bottom: "16%", right: "13%", size: 18, delay: "1.3s", opacity: 0.55 },
  { bottom: "22%", left: "44%", size: 13, delay: "0.6s", opacity: 0.5 },
];

interface SummerReadingBannerProps {
  /** Emit Event structured data alongside the visual. Default true. Set false
   *  when another element on the same page already emits these Event nodes. */
  withJsonLd?: boolean;
  /** Show the per-program Add-to-calendar buttons (client islands). Default
   *  true; pass false on the homepage to trim above-the-fold JavaScript. */
  showAddToCalendar?: boolean;
}

export default function SummerReadingBanner({
  withJsonLd = true,
  showAddToCalendar = true,
}: SummerReadingBannerProps) {
  const featured = getFeaturedProgram();
  // No active seasonal program → render nothing (the banner retires itself).
  if (!featured) return null;

  const { program, events } = featured;
  const dateLabel = events[0]?.dateLabel ?? "";
  const season = events[0]?.season ?? "";

  return (
    <section
      id="summer-reading"
      aria-labelledby="summer-reading-heading"
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 18% 18%, #FCE08A 0%, transparent 42%)," +
          "radial-gradient(circle at 85% 12%, #FBBF5A 0%, transparent 40%)," +
          "radial-gradient(circle at 50% 120%, rgba(176,22,104,0.18) 0%, transparent 55%)," +
          "linear-gradient(135deg, #FBD24E 0%, #F7A93B 52%, #F0823B 100%)",
      }}
    >
      {withJsonLd &&
        events.map((ev) => (
          <JsonLd key={ev.slug} data={specialEventJsonLd(ev)} />
        ))}

      {/* Soft top sheen for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)" }}
      />

      {/* Twinkling stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <Star
            key={i}
            size={s.size}
            className="animate-twinkle absolute"
            style={{
              top: s.top,
              bottom: s.bottom,
              left: s.left,
              right: s.right,
              color: "#FFFFFF",
              fill: "#FFFFFF",
              opacity: s.opacity,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      <div className="stagger relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <span
            className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm"
            style={{ background: "rgba(255,255,255,0.9)", color: "var(--purple)" }}
          >
            <Sparkles size={12} />
            New · {season}
          </span>

          {/* White plaque title, like the flyer's headline block. */}
          <h2
            id="summer-reading-heading"
            className="mx-auto inline-block rounded-[22px] px-6 py-3 font-bold leading-tight shadow-md"
            style={{
              fontFamily: "var(--font-serif)",
              background: "rgba(255,255,255,0.93)",
              color: "#B11668",
              fontSize: "clamp(1.9rem, 5vw, 3.1rem)",
            }}
          >
            {program}
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed sm:text-lg"
            style={{ color: "#5A2A12" }}
          >
            Two free summer reading programs for youth — keep the pages turning
            all season long.
          </p>
          <p
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-1 text-sm font-bold"
            style={{ color: "#7A3A18" }}
          >
            <Calendar size={15} />
            {dateLabel}
          </p>
        </div>

        {/* Program cards */}
        <div className="stagger mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {events.map((ev) => {
            const Icon = PROGRAM_ICONS[ev.slug] ?? BookOpen;
            return (
              <article
                key={ev.slug}
                className="cozy-lift relative flex h-full flex-col overflow-hidden rounded-[22px] p-6 text-white"
                style={{
                  background: `linear-gradient(160deg, ${ev.accent} 0%, ${ev.accent}DD 100%)`,
                  boxShadow: "0 18px 40px rgba(90,40,10,0.22)",
                }}
              >
                {/* Inner top-left highlight for a glossy, dimensional feel */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full"
                  style={{ background: "rgba(255,255,255,0.16)" }}
                />
                <div className="relative mb-3 flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                    <Icon size={19} />
                  </span>
                  {ev.audience && (
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                      {ev.audience}
                    </span>
                  )}
                </div>
                <h3
                  className="relative text-2xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {ev.title}
                </h3>
                <p className="relative mt-1 text-sm font-semibold text-white/80">
                  {ev.tagline}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-white/90">
                  {ev.description}
                </p>
                {showAddToCalendar && (
                  <div className="relative mt-5 [&_button]:!border-white/40 [&_button]:!bg-white/15 [&_button]:!text-white">
                    <AddToCalendarButton
                      event={{
                        id: `${ev.slug}-2026`,
                        title: `${ev.title} · To Be Read`,
                        description: ev.description,
                        startDate: ev.startDate,
                        endDate: ev.endDate,
                      }}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* CTA row — back to brand colors. */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/events/summer-reading"
            className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold shadow-md transition-transform hover:scale-105 active:scale-[0.98] sm:w-auto"
            style={{ background: "var(--purple)", color: "#FFFFFF" }}
          >
            See event details
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/visit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/85 px-6 py-3 text-sm font-bold transition-transform hover:scale-105 active:scale-[0.98] sm:w-auto"
            style={{ color: "var(--purple)" }}
          >
            <MapPin size={16} />
            Plan your visit
          </Link>
        </div>
      </div>
    </section>
  );
}
