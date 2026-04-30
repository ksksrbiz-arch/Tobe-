"use client";

import React from "react";
import { BookOpen, Heart, Users } from "lucide-react";

const milestones = [
  { icon: BookOpen, label: "Est. ~1979", desc: "45 years of connecting readers with stories" },
  { icon: Heart, label: "June 7, 2024", desc: "New owners, same love for books" },
  { icon: Users, label: "TBR 2026", desc: "Rebranding to serve the community better" },
];

export default function StorySection() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "#FDF8F0" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: "#F1BB1A20", color: "#6B1C6F" }}
          >
            Our Story
          </span>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            45 Years of Stories
          </h2>
          <div
            className="w-16 h-1 mx-auto rounded-full"
            style={{ background: "#F1BB1A" }}
          />
        </div>

        {/* Story paragraphs */}
        <div className="max-w-3xl mx-auto mb-16 space-y-5 text-lg leading-relaxed" style={{ color: "#374151" }}>
          <p>
            Nestled in the heart of Milwaukie, Oregon, <strong>Clackamas Book Exchange</strong> has been a beloved community treasure for nearly five decades. Since the late 1970s, book lovers of all ages have wandered through our shelves, discovering hidden gems, trading beloved reads, and building connections over shared stories.
          </p>
          <p>
            On <strong>June 7, 2024</strong>, a new chapter began. With fresh eyes and deep respect for the store&apos;s rich history, our new owners stepped in — bringing renewed energy, modern touches, and the same heartfelt commitment to this community. We&apos;re not just a bookstore; we&apos;re a place where stories live and breathe.
          </p>
          <p>
            And we&apos;re just getting started. In <strong>2026</strong>, we&apos;ll proudly unveil our new identity: <em style={{ color: "#6B1C6F", fontFamily: "'Playfair Display', Georgia, serif" }}>To Be Read (TBR)</em> — a name that captures the magic of that towering, exciting stack of books always waiting on your nightstand. Same great store, same welcoming spirit, with a fresh new name for the next 45 years.
          </p>
        </div>

        {/* Timeline/Icon Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {milestones.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl transition-transform hover:-translate-y-1"
              style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: "#6B1C6F10" }}
              >
                <item.icon size={26} style={{ color: "#6B1C6F" }} />
              </div>
              <h3
                className="font-bold text-lg mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
              >
                {item.label}
              </h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
