// Server Component: a date-gated promotional banner for the current featured
// seasonal program (e.g. Summer Reading Programs). It renders nothing once the
// program's window has passed, so it self-retires without a code change. Visuals
// echo the in-store flyer — a sunny gradient, twinkling stars, and one card per
// program — while keeping the site's purple/gold brand for the CTAs.
//
// Purely presentational save for the <AddToCalendarButton> client islands and
// <JsonLd> (a tiny script tag), so it ships almost no client JavaScript.
import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, MapPin, Sparkles, Star, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import JsonLd from "./JsonLd";
import AddToCalendarButton from "./AddToCalendarButton";
import { getFeaturedProgram, type SpecialEvent } from "@/lib/events";
import { SITE_URL } from "@/lib/seo";

/** One schema.org Event for a seasonal program occurrence. */
function specialEventJsonLd(ev: SpecialEvent): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.title,
    description: ev.description,
    startDate: ev.startDate,
    endDate: ev.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    ...(ev.audience ? { audience: { "@type": "Audience", audienceType: ev.audience } } : {}),
    location: { "@id": `${SITE_URL}/#bookstore` },
    organizer: { "@id": `${SITE_URL}/#bookstore` },
    image: `${SITE_URL}/opengraph-image`,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/events`,
    },
  };
}

interface SummerReadingBannerProps {
  /** Emit Event structured data alongside the visual. Default true. Set false
   *  when another element on the same page already emits these Event nodes. */
  withJsonLd?: boolean;
}

export default function SummerReadingBanner({
  withJsonLd = true,
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
          "linear-gradient(135deg, #FBD24E 0%, #F7A93B 52%, #F0823B 100%)",
      }}
    >
      {withJsonLd &&
        events.map((ev) => (
          <JsonLd key={ev.slug} data={specialEventJsonLd(ev)} />
        ))}

      {/* Decorative stars echoing the flyer — hidden from assistive tech. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Star
          size={26}
          className="absolute left-[6%] top-[18%] opacity-70"
          style={{ color: "#FFFFFF", fill: "#FFFFFF" }}
        />
        <Star
          size={16}
          className="absolute left-[12%] top-[44%] opacity-60"
          style={{ color: "#FFFFFF", fill: "#FFFFFF" }}
        />
        <Star
          size={30}
          className="absolute right-[7%] top-[14%] opacity-70"
          style={{ color: "#FFFFFF", fill: "#FFFFFF" }}
        />
        <Star
          size={18}
          className="absolute right-[14%] bottom-[16%] opacity-55"
          style={{ color: "#FFFFFF", fill: "#FFFFFF" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal className="text-center">
          <span
            className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
            style={{ background: "rgba(255,255,255,0.85)", color: "#6B1C6F" }}
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
              background: "rgba(255,255,255,0.92)",
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
            We&apos;re offering two free summer reading programs for youth —
            keep the pages turning all season long.
          </p>
          <p
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold"
            style={{ color: "#7A3A18" }}
          >
            <Calendar size={15} />
            {dateLabel}
          </p>
        </Reveal>

        {/* Program cards */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {events.map((ev, i) => (
            <Reveal key={ev.slug} delay={i * 90}>
              <article
                className="flex h-full flex-col rounded-[22px] p-6 text-white shadow-lg"
                style={{
                  background: `linear-gradient(160deg, ${ev.accent} 0%, ${ev.accent}E0 100%)`,
                  boxShadow: "0 18px 40px rgba(90,40,10,0.22)",
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                    <BookOpen size={18} />
                  </span>
                  {ev.audience && (
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                      {ev.audience}
                    </span>
                  )}
                </div>
                <h3
                  className="text-2xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {ev.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-white/80">
                  {ev.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  {ev.description}
                </p>
                <div className="mt-5 [&_button]:!border-white/40 [&_button]:!bg-white/15 [&_button]:!text-white">
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
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA row — back to brand colors. */}
        <Reveal delay={140}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/events#summer-reading"
              className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-[0.98] sm:w-auto"
              style={{ background: "#6B1C6F", color: "#FFFFFF" }}
            >
              See event details
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/visit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/85 px-6 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-[0.98] sm:w-auto"
              style={{ color: "#6B1C6F" }}
            >
              <MapPin size={16} />
              Plan your visit
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
