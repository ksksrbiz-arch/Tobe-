import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import AddToCalendarButton from "@/components/AddToCalendarButton";
import JsonLd from "@/components/JsonLd";
import FAQSection, { type Faq } from "@/components/FAQSection";
import { breadcrumbList } from "@/lib/seo";
import {
  getProgramEvents,
  getActiveSpecialEvents,
  specialEventJsonLd,
} from "@/lib/events";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

const PROGRAM = "Summer Reading Programs";

export const metadata: Metadata = {
  title: "Summer Reading Programs for Kids & Teens — Milwaukie, OR",
  description:
    "Free Summer Reading Programs for youth at To Be Read in Milwaukie, OR (Jul 1 – Aug 21, 2026): join the drop-in Summer Reading Circle or take the Summer Reading Challenge. No registration — all readers welcome.",
  keywords: [
    "summer reading program Milwaukie OR",
    "summer reading challenge Portland",
    "free kids summer reading Oregon",
    "youth reading program Clackamas",
    "summer reading circle bookstore",
    "summer reading 2026 Milwaukie",
    "kids events Milwaukie Oregon",
    "teen reading program Portland",
  ],
  alternates: { canonical: "/events/summer-reading" },
  openGraph: {
    title: "Summer Reading Programs · To Be Read",
    description:
      "Two free summer reading programs for youth in Milwaukie, OR — the Summer Reading Circle and the Summer Reading Challenge. July 1 – August 21, 2026.",
    url: "/events/summer-reading",
    type: "website",
    images: ["/events/summer-reading/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/events/summer-reading/opengraph-image"],
  },
};

// Prerendered, revalidated daily so the "upcoming vs. on now" copy and the
// Event structured data stay accurate as the season progresses.
export const revalidate = 86400;

const programFaqs: Faq[] = [
  {
    q: "Who can join the summer reading programs?",
    a: "Both programs are designed for youth — kids and teens. Younger readers are welcome to take part with a grown-up. Everyone's reading level is welcome; the goal is simply to keep reading fun over the summer.",
  },
  {
    q: "Do the summer reading programs cost anything?",
    a: "No — both the Summer Reading Circle and the Summer Reading Challenge are completely free and open to the community.",
  },
  {
    q: "Do I need to register or sign up in advance?",
    a: "No registration required. Just stop by the shop during the program window (July 1 – August 21, 2026). For the Challenge, pick up a reading tracker at the counter and you're in.",
  },
  {
    q: "What is the difference between the Reading Circle and the Reading Challenge?",
    a: "The Summer Reading Circle is a relaxed, drop-in reading group where kids gather to share books and discover new favorites. The Summer Reading Challenge is a self-paced goal: track the books you finish over the summer and earn rewards along the way. You're welcome to do both.",
  },
  {
    q: "Where do the programs take place?",
    a: "At To Be Read, 7931 SE King Rd, Unit 1, Portland, OR 97222 (the Milwaukie / Southeast Portland area), with free on-site parking.",
  },
  {
    q: "How do I earn rewards in the Summer Reading Challenge?",
    a: "Set a reading goal, log each book you finish on your tracker, and bring it in — readers earn small rewards as they hit milestones through the summer.",
  },
];

const icons = { "summer-reading-circle": BookOpen, "summer-reading-challenge": Trophy } as const;

const howToJoin = [
  {
    icon: MapPin,
    title: "Stop by the shop",
    desc: "Visit us during the program window — Mon–Sat, 10am–5pm. No appointment needed.",
  },
  {
    icon: BookOpen,
    title: "Pick your program",
    desc: "Join the drop-in Reading Circle, grab a Challenge tracker, or do both.",
  },
  {
    icon: Trophy,
    title: "Read all summer",
    desc: "Share what you're reading, log your books, and earn rewards as you go.",
  },
];

export default function SummerReadingPage() {
  const events = getProgramEvents(PROGRAM);
  const isActive = getActiveSpecialEvents().some((ev) => ev.program === PROGRAM);
  const dateLabel = events[0]?.dateLabel ?? "";

  return (
    <main
      id="main"
      className="min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* Structured data: breadcrumb + one Event per program */}
      <JsonLd
        data={breadcrumbList([
          { name: "Events", path: "/events" },
          { name: PROGRAM, path: "/events/summer-reading" },
        ])}
      />
      {isActive &&
        events.map((ev) => (
          <JsonLd key={ev.slug} data={specialEventJsonLd(ev)} />
        ))}

      <Navbar />
      <PageHero
        title="Summer Reading Programs"
        subtitle="Two free programs to keep kids and teens reading all summer — at our Milwaukie shop."
        badge="Summer 2026"
        imageUrl="/images/shelves/store-front-adult-fiction.jpg"
        scrollTargetId="programs"
      />

      <section
        id="programs"
        className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(241,187,26,0.12), transparent 38%), linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center">
            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              <Sparkles size={12} />
              {isActive ? "On now" : "Coming soon"} · {dateLabel}
            </span>
            <h1
              className="mb-3 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
              }}
            >
              Free summer reading for{" "}
              <span className="underline-accent">young readers</span>
            </h1>
            <p
              className="mx-auto max-w-2xl text-sm leading-relaxed sm:text-base"
              style={{ color: "#4B5563" }}
            >
              We&apos;re offering two free summer reading programs for youth.
              Beat the summer slump, discover new favorites, and earn rewards —
              all at To Be Read in Milwaukie, Oregon. No registration required.
            </p>
            <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {events.map((ev, i) => {
              const Icon = icons[ev.slug as keyof typeof icons] ?? BookOpen;
              return (
                <Reveal key={ev.slug} delay={i * 90}>
                  <article
                    className="flex h-full flex-col rounded-2xl p-6 text-white shadow-lg"
                    style={{
                      background: `linear-gradient(160deg, ${ev.accent} 0%, ${ev.accent}E0 100%)`,
                      boxShadow: "0 18px 40px rgba(90,40,10,0.18)",
                    }}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                        <Icon size={20} />
                      </span>
                      {ev.audience && (
                        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                          {ev.audience}
                        </span>
                      )}
                    </div>
                    <h2
                      className="text-2xl font-bold leading-tight"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {ev.title}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-white/80">
                      {ev.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/90">
                      {ev.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white/85">
                      <Calendar size={13} />
                      {ev.dateLabel}
                    </div>
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
              );
            })}
          </div>

          {/* How to join */}
          <Reveal className="mt-16 mb-8 text-center">
            <h2
              className="mb-2 font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              }}
            >
              How to <span className="underline-accent">join</span>
            </h2>
            <p className="mx-auto max-w-xl text-sm" style={{ color: "#6B7280" }}>
              It&apos;s casual and free — here&apos;s all there is to it.
            </p>
          </Reveal>
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {howToJoin.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <li
                  className="flex h-full flex-col rounded-2xl border bg-white p-6"
                  style={{
                    borderColor: "rgba(107,28,111,0.10)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(107,28,111,0.08)", color: "#6B1C6F" }}
                  >
                    <step.icon size={20} />
                  </div>
                  <h3
                    className="mb-1 flex items-center gap-2 text-lg font-bold"
                    style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#F1BB1A" }}
                    >
                      {i + 1}.
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {step.desc}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          {/* Detail strip — what's included */}
          <Reveal>
            <div
              className="mt-10 rounded-2xl border p-6 sm:p-7"
              style={{
                borderColor: "rgba(107,28,111,0.10)",
                background:
                  "linear-gradient(135deg, rgba(107,28,111,0.05) 0%, rgba(241,187,26,0.08) 100%)",
              }}
            >
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Free and open to the community — no fee, no membership",
                  "No registration or RSVP required",
                  "Drop in any day, Monday–Saturday, 10am–5pm",
                  "Free on-site parking at the shop",
                  "Reading trackers and rewards for the Challenge",
                  "Friendly booksellers ready with recommendations",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "#374151" }}
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "#1F7A7A" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Location / CTA */}
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
                <MapPin size={22} style={{ color: "#F1BB1A" }} className="flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-semibold leading-snug">
                    7931 SE King Rd, Unit 1, Portland, OR 97222
                  </p>
                  <p className="flex items-center gap-1.5 text-xs opacity-80">
                    <Clock size={12} /> Mon–Sat · 10am – 5pm · Free parking
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
                  href="/events"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                >
                  All events
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Decorative star row, echoing the flyer */}
          <div aria-hidden="true" className="mt-10 flex justify-center gap-2 opacity-70">
            {[20, 26, 20].map((s, i) => (
              <Star key={i} size={s} style={{ color: "#F1BB1A", fill: "#F1BB1A" }} />
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={programFaqs}
        eyebrow="Summer Reading FAQ"
        titleLead="Summer reading"
        titleAccent="questions"
        intro="Everything families ask about our free summer reading programs."
        id="summer-reading-faq"
      />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
