import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import AddToCalendarButton from "@/components/AddToCalendarButton";
import JsonLd from "@/components/JsonLd";
import FAQSection, { type Faq } from "@/components/FAQSection";
import { SITE_URL, breadcrumbList } from "@/lib/seo";
import { getUpcomingEvents, type EventOccurrence } from "@/lib/events";
import { Calendar, Clock, MapPin } from "lucide-react";

// Visible events FAQ — also emits FAQPage structured data via <FAQSection>.
const eventsFaqs: Faq[] = [
  {
    q: "Are your events free?",
    a: "Yes — our events are free and open to the community. Just come by.",
  },
  {
    q: "Do I need to register or RSVP?",
    a: "Most events are casual and drop-in, so no sign-up is needed. If a particular event asks you to reserve a spot, we'll say so in its details.",
  },
  {
    q: "Where do events take place?",
    a: "At the shop — 7931 SE King Rd, Unit 1, Portland, OR 97222, with free on-site parking — unless an event says otherwise.",
  },
  {
    q: "How do I hear about new events?",
    a: "Check this page, follow us on Instagram (@toberead_clackamas), or stop in and ask — we post upcoming happenings here and in the shop.",
  },
];

// Statically prerendered, but revalidated daily so the upcoming-event dates
// and their Event structured data stay fresh as occurrences pass.
export const revalidate = 86400;

const LA_TZ = "America/Los_Angeles";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: LA_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

function formatTimeRange(startIso: string, endIso: string): string {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: LA_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${fmt.format(new Date(startIso))} – ${fmt.format(new Date(endIso))}`;
}

/** Build one schema.org Event object for a concrete occurrence. */
function eventJsonLd(ev: EventOccurrence): Record<string, unknown> {
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

export default function EventsPage() {
  const events = getUpcomingEvents(8);

  return (
    <main
      id="main"
      className="min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* Breadcrumb structured data */}
      <JsonLd data={breadcrumbList([{ name: "Events", path: "/events" }])} />
      {/* One Event entity per upcoming occurrence */}
      {events.map((ev) => (
        <JsonLd key={ev.id} data={eventJsonLd(ev)} />
      ))}

      <Navbar />
      <PageHero
        title="Events & Happenings"
        subtitle="Cozy, low-key gatherings at our Milwaukie shop — free and open to every reader."
        badge="Events"
        imageUrl="/images/shelves/store-front-adult-fiction.jpg"
        scrollTargetId="events-list"
      />

      <section
        id="events-list"
        className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(107,28,111,0.08), transparent 38%), linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              <Calendar size={12} />
              On the calendar
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
              }}
            >
              What&apos;s <span className="underline-accent">coming up</span>
            </h2>
            <p
              className="mx-auto max-w-xl text-sm leading-relaxed"
              style={{ color: "#6B7280" }}
            >
              Drop in to read, browse fresh staff picks, or trade your books for
              extra credit. No tickets, no fuss.
            </p>
            <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
          </Reveal>

          {events.length === 0 ? (
            <Reveal>
              <p
                className="rounded-2xl border bg-white p-8 text-center text-sm"
                style={{
                  borderColor: "rgba(107,28,111,0.10)",
                  color: "#4B5563",
                }}
              >
                No events are on the calendar right now — check back soon, or
                follow us on social for the latest.
              </p>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {events.map((ev, i) => (
                <Reveal key={ev.id} delay={(i % 2) * 80}>
                  <article
                    className="group relative h-full overflow-hidden rounded-2xl border bg-white p-6 card-cozy"
                    style={{
                      borderColor: "rgba(107,28,111,0.10)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 transition-all group-hover:h-1.5"
                      style={{ background: "#6B1C6F" }}
                    />
                    <p
                      className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: "#8B2E90" }}
                    >
                      <Calendar size={12} />
                      {ev.recurrence}
                    </p>
                    <h3
                      className="mb-2 text-xl font-bold leading-tight"
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: "#6B1C6F",
                      }}
                    >
                      {ev.title}
                    </h3>
                    <div
                      className="mb-3 flex flex-col gap-1 text-sm font-semibold"
                      style={{ color: "#374151" }}
                    >
                      <span className="flex items-center gap-2">
                        <Calendar size={14} style={{ color: "#F1BB1A" }} />
                        {formatDate(ev.startDate)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={14} style={{ color: "#F1BB1A" }} />
                        {formatTimeRange(ev.startDate, ev.endDate)}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#4B5563" }}
                    >
                      {ev.description}
                    </p>
                    <div className="mt-4">
                      <AddToCalendarButton
                        event={{
                          id: ev.id,
                          title: ev.title,
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
          )}

          {/* CTA */}
          <Reveal>
            <div
              className="mt-12 flex flex-col items-stretch gap-4 rounded-2xl p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
              style={{
                background: "linear-gradient(135deg, #6B1C6F 0%, #4A1350 100%)",
                color: "white",
                boxShadow: "0 18px 40px rgba(107,28,111,0.20)",
              }}
            >
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <MapPin
                  size={22}
                  style={{ color: "#F1BB1A" }}
                  className="flex-shrink-0"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold leading-snug">
                    7931 SE King Rd, Unit 1, Portland, OR 97222
                  </p>
                  <p className="text-xs opacity-80">
                    Open Mon–Sat · 10am – 5pm · Free parking
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/visit"
                  className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-[0.98] sm:w-auto"
                  style={{ background: "#F1BB1A", color: "#1a1a1a" }}
                >
                  Plan your visit
                </Link>
                <Link
                  href="/#next-read"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                >
                  Find your next read
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection
        faqs={eventsFaqs}
        eyebrow="Events FAQ"
        titleLead="Event"
        titleAccent="questions"
        intro="The practical details for joining us at the shop."
        id="events-faq"
      />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
