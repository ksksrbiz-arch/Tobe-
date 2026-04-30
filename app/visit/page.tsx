"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import VisitSection from "@/components/VisitSection";
import Footer from "@/components/Footer";
import { Car, Bus } from "lucide-react";

const gettingHereCards = [
  {
    icon: Car,
    title: "By Car",
    details: [
      "Free parking lot on-site",
      "Easy access from SE King Rd",
      "Plenty of spaces available",
    ],
  },
  {
    icon: Bus,
    title: "Public Transit",
    details: [
      "Bus routes 29 and 31 nearby",
      "Short walk from the stop",
      "TriMet trip planning at trimet.org",
    ],
  },
];

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <PageHero
          title="Find Us"
          subtitle="Your neighborhood used bookstore in Milwaukie, OR"
          badge="Visit"
          imageUrl="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80"
        />
        <VisitSection />

        {/* Getting Here Tips */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "#FDF8F0" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#6B1C6F",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                }}
              >
                Getting Here
              </h2>
              <div className="w-12 h-1 mx-auto rounded-full" style={{ background: "#F1BB1A" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gettingHereCards.map((card, i) => (
                <div
                  key={i}
                  className="p-7 rounded-2xl"
                  style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "#6B1C6F" }}
                    >
                      <card.icon size={20} className="text-white" />
                    </div>
                    <h3
                      className="font-bold text-lg"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {card.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                        <span style={{ color: "#F1BB1A", fontWeight: "bold" }}>•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
