"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import TradeSection from "@/components/TradeSection";
import Footer from "@/components/Footer";
import { Search, BookCopy, Sunrise } from "lucide-react";

const tradeTips = [
  {
    icon: Search,
    title: "Check Condition",
    description:
      "Make sure your books are in good readable condition — no water damage, torn pages, or heavy highlighting. The better the condition, the better your credit!",
  },
  {
    icon: BookCopy,
    title: "Bring Multiples",
    description:
      "The more titles you bring, the more store credit you can earn. We encourage bringing in several books at once to maximize your trading session.",
  },
  {
    icon: Sunrise,
    title: "Come Early",
    description:
      "We're open Mon–Sat 10am–5pm. Come early to beat the rush and give yourself plenty of time to browse and pick new reads with your credit.",
  },
];

export default function TradePage() {
  return (
    <main className="min-h-screen" style={{ background: "#FDF8F0" }}>
      <Navbar />
      <div className="pt-16">
        <PageHero
          title="Trade Your Books"
          subtitle="Bring your books in and get store credit toward new adventures"
          badge="Trade With Us"
          imageUrl="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600&q=80"
        />
        <TradeSection />

        {/* Book Trade Tips */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#6B1C6F",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                }}
              >
                Book Trade Tips
              </h2>
              <div className="w-12 h-1 mx-auto rounded-full" style={{ background: "#F1BB1A" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tradeTips.map((tip) => (
                <div
                  key={tip.title}
                  className="flex flex-col items-center text-center p-7 rounded-2xl transition-transform hover:-translate-y-1"
                  style={{ background: "#FDF8F0", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "#6B1C6F15" }}
                  >
                    <tip.icon size={26} style={{ color: "#6B1C6F" }} />
                  </div>
                  <h3
                    className="font-bold text-lg mb-3"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                  >
                    {tip.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {tip.description}
                  </p>
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
