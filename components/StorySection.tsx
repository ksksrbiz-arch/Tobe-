"use client";

import React from "react";
import { BookOpen, Heart, Sparkles, Coffee } from "lucide-react";
import Reveal from "./Reveal";

const milestones = [
  {
    icon: BookOpen,
    label: "~1979",
    title: "It begins",
    desc: "Clackamas Book Exchange opens its doors and quickly becomes a local haven for readers.",
  },
  {
    icon: Coffee,
    label: "1980 – 2024",
    title: "45 cozy years",
    desc: "Generations of readers wander our stacks, swap stories, and turn the shop into a community living room.",
  },
  {
    icon: Heart,
    label: "June 7, 2024",
    title: "New chapter",
    desc: "New owners step in with fresh energy and deep respect for everything that made the shop special.",
  },
  {
    icon: Sparkles,
    label: "2026",
    title: "Hello, TBR",
    desc: "Same store, same heart — we proudly become To Be Read (TBR) and keep the next 45 years going.",
  },
];

export default function StorySection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #FDF8F0 0%, #F8F2E8 100%)" }}
    >
      {/* Decorative quote mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-[6%] select-none text-[16rem] leading-none opacity-[0.06]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
      >
        “
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <Reveal className="mb-14 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            Our Story
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)",
              lineHeight: 1.05,
            }}
          >
            45 Years of <span className="underline-accent">Stories</span>
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
        </Reveal>

        {/* Story paragraphs in two-column lift */}
        <div className="mx-auto mb-20 grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal delay={80} className="space-y-3">
            <p
              className="text-2xl font-semibold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
            >
              A neighborhood story written one book at a time.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              Three small chapters that brought us to today.
            </p>
          </Reveal>

          <Reveal delay={160} className="space-y-5 text-base leading-relaxed lg:text-lg" >
            <p style={{ color: "#374151" }}>
              Nestled in the heart of Milwaukie, Oregon, <strong style={{ color: "#6B1C6F" }}>Clackamas Book Exchange</strong> has been a beloved community treasure for nearly five decades. Since the late 1970s, book lovers of all ages have wandered through our shelves, discovering hidden gems, trading beloved reads, and building connections over shared stories.
            </p>
            <p style={{ color: "#374151" }}>
              On <strong style={{ color: "#6B1C6F" }}>June 7, 2024</strong>, a new chapter began. With fresh eyes and deep respect for the store&apos;s rich history, our new owners stepped in — bringing renewed energy, modern touches, and the same heartfelt commitment to this community.
            </p>
            <p style={{ color: "#374151" }}>
              In <strong style={{ color: "#6B1C6F" }}>2026</strong>, we&apos;ll proudly unveil our new identity:{" "}
              <em
                className="not-italic font-semibold"
                style={{ color: "#6B1C6F", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                To Be Read (TBR)
              </em>
              {" "}— a name that captures the magic of that towering, exciting stack of books always waiting on your nightstand.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <Reveal>
          <div className="relative">
            {/* Vertical/horizontal line */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 sm:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(107,28,111,0.20) 12%, rgba(107,28,111,0.20) 88%, transparent 100%)",
              }}
            />
            <ul className="space-y-10 sm:space-y-14">
              {milestones.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <li
                    key={item.title}
                    className={`relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10 ${
                      isLeft ? "" : "sm:[&>div:first-child]:order-2"
                    }`}
                  >
                    {/* Marker */}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-4 hidden h-3 w-3 -translate-x-1/2 rounded-full ring-4 sm:block"
                      style={{ background: "#F1BB1A", boxShadow: "0 0 0 2px #6B1C6F", color: "#FDF8F0" }}
                    />
                    <div className={isLeft ? "sm:text-right" : "sm:text-left"}>
                      <div
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
                      >
                        <item.icon size={13} />
                        {item.label}
                      </div>
                    </div>
                    <div className={isLeft ? "sm:text-left" : "sm:text-left"}>
                      <div
                        className="rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        style={{
                          background: "white",
                          borderColor: "rgba(107,28,111,0.10)",
                          boxShadow: "0 8px 24px rgba(107,28,111,0.06)",
                        }}
                      >
                        <h3
                          className="mb-2 text-lg font-bold"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: "#6B1C6F",
                          }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
