"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import VisitSection from "@/components/VisitSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import { Car, Bus, Bike, ParkingCircle, Coffee, MapPin } from "lucide-react";

const gettingHere = [
  {
    icon: Car,
    title: "By Car",
    details: ["Free parking lot on-site", "Easy access from SE King Rd", "Plenty of spaces available"],
  },
  {
    icon: Bus,
    title: "Public Transit",
    details: ["TriMet routes 29 & 31 nearby", "Short walk from the stop", "Plan your trip at trimet.org"],
  },
  {
    icon: Bike,
    title: "By Bike",
    details: ["Bike rack at the entrance", "Quiet residential streets", "Trolley Trail two blocks east"],
  },
  {
    icon: ParkingCircle,
    title: "Accessibility",
    details: ["Step-free entrance", "Wide aisles between shelves", "ADA parking out front"],
  },
];

const nearbyTreats = [
  { title: "Coffee", text: "Local cafés a few blocks away — fuel before browsing." },
  { title: "Lunch", text: "Plenty of bites along King Rd for after your stack lands." },
  { title: "Walks", text: "The Trolley Trail is right around the corner for a leisurely stroll." },
];

export default function VisitPage() {
  return (
    <main id="main" className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        title="Find Us"
        subtitle="Your neighborhood used bookstore in Milwaukie, OR."
        badge="Visit"
        imageUrl="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80"
        scrollTargetId="visit"
      />

      <VisitSection />

      {/* Getting here */}
      <section
        className="px-4 py-24 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)" }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
            >
              Getting Here
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              However you <span className="underline-accent">arrive</span>, we&apos;re ready
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gettingHere.map((card, i) => (
              <Reveal key={card.title} delay={i * 70}>
                <div
                  className="group h-full rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    borderColor: "rgba(107,28,111,0.10)",
                    boxShadow: "0 8px 22px rgba(107,28,111,0.06)",
                  }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-[-6deg]"
                    style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                  >
                    <card.icon size={20} className="text-white" />
                  </div>
                  <h3
                    className="mb-3 text-lg font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                  >
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.details.map((d, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "#374151" }}
                      >
                        <span style={{ color: "#F1BB1A", fontWeight: 700, marginTop: "1px" }}>•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Make a day of it */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center">
            <span
              className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              <Coffee size={12} />
              Make a day of it
            </span>
            <h2
              className="mb-2 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)",
              }}
            >
              Bookend the visit with the neighborhood
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {nearbyTreats.map((spot, i) => (
              <Reveal key={spot.title} delay={i * 80}>
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: "linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
                    border: "1px solid rgba(107,28,111,0.08)",
                  }}
                >
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                  >
                    {spot.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {spot.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div
              className="mt-12 flex flex-col items-center gap-3 rounded-2xl p-6 text-center sm:flex-row sm:justify-between sm:gap-6 sm:text-left"
              style={{
                background: "linear-gradient(135deg, #6B1C6F 0%, #4A1350 100%)",
                color: "white",
                boxShadow: "0 18px 40px rgba(107,28,111,0.20)",
              }}
            >
              <div className="flex items-center gap-3">
                <MapPin size={22} style={{ color: "#F1BB1A" }} />
                <div>
                  <p className="text-sm font-semibold">7931 SE King Rd, Milwaukie, OR 97222</p>
                  <p className="text-xs opacity-80">Open Mon–Sat · 10am – 5pm</p>
                </div>
              </div>
              <a
                href="tel:503-659-2559"
                className="btn-shine inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:scale-105"
                style={{ background: "#F1BB1A", color: "#1a1a1a" }}
              >
                Call 503-659-2559
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
