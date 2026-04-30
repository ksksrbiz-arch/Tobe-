"use client";

import React from "react";
import { Calendar, Users, Sparkles, Coffee, BookHeart } from "lucide-react";
import Reveal from "./Reveal";

const events = [
  {
    icon: BookHeart,
    when: "Every Saturday",
    title: "Staff Picks Saturday",
    desc: "Stop in for a fresh stack of staff favorites from the week. We always have a story to go with the recommendation.",
    accent: "#6B1C6F",
  },
  {
    icon: Coffee,
    when: "Last Friday Monthly",
    title: "Cozy Reading Hour",
    desc: "Bring your current read, grab a comfy spot, and join other readers for an hour of quiet companionship.",
    accent: "#F1BB1A",
  },
  {
    icon: Users,
    when: "Quarterly",
    title: "Trade-In Day",
    desc: "Special trade days where credit values get a friendly boost. Watch our socials for the next date.",
    accent: "#8B2E90",
  },
  {
    icon: Sparkles,
    when: "Spring 2026",
    title: "TBR Launch Party",
    desc: "Celebrate our official rebrand to To Be Read with treats, trivia, and giveaways. Save the date!",
    accent: "#F5CC45",
  },
];

export default function EventsSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(107,28,111,0.08), transparent 38%), linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
      }}
      id="events"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
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
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Events &amp; <span className="underline-accent">happenings</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed" style={{ color: "#6B7280" }}>
            We host small, cozy moments throughout the year — here&apos;s what&apos;s on right now.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {events.map((ev, i) => (
            <Reveal key={ev.title} delay={i * 80}>
              <article
                className="group relative h-full overflow-hidden rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{
                  borderColor: "rgba(107,28,111,0.10)",
                  boxShadow: "0 8px 22px rgba(107,28,111,0.06)",
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
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
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
      </div>
    </section>
  );
}
