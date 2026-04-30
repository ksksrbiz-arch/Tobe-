"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import TradeSection from "@/components/TradeSection";
import TradeCreditEstimator from "@/components/TradeCreditEstimator";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";
import {
  Search,
  BookCopy,
  Sunrise,
  PackageOpen,
  HandCoins,
  Smile,
} from "lucide-react";

const tradeTips = [
  {
    icon: Search,
    title: "Check Condition",
    description:
      "Make sure your books are in good readable condition — no water damage, torn pages, or heavy highlighting. The better the condition, the better your credit.",
  },
  {
    icon: BookCopy,
    title: "Bring Multiples",
    description:
      "The more titles you bring, the more store credit you can earn. We encourage trading several at once to maximize your session.",
  },
  {
    icon: Sunrise,
    title: "Come Early",
    description:
      "Mornings are quieter — easier to chat, easier to browse. We're open Mon–Sat 10am–5pm.",
  },
];

const steps = [
  {
    icon: PackageOpen,
    title: "Pack a stack",
    body: "Round up the books you've finished, fall out of love with, or just want to share with a new reader.",
  },
  {
    icon: BookCopy,
    title: "Drop them off",
    body: "Bring them to the trade counter. We'll look through them and let you know what we can accept.",
  },
  {
    icon: HandCoins,
    title: "Get store credit",
    body: "Receive 25% of the original list price as credit on each accepted book. It never expires.",
  },
  {
    icon: Smile,
    title: "Pick new reads",
    body: "Browse, ask for recommendations, and use your credit toward the next stack. Pay only the swap fee + 50% of list.",
  },
];

export default function TradePage() {
  return (
    <main id="main" className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <PageHero
        title="Trade Your Books"
        subtitle="Bring your books in, take new adventures home with store credit."
        badge="Trade With Us"
        imageUrl="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600&q=80"
        scrollTargetId="trade"
      />

      {/* How it works */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
            >
              How it works
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              Four simple <span className="underline-accent">steps</span>
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div
                  className="group relative h-full rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    borderColor: "rgba(107,28,111,0.10)",
                    boxShadow: "0 8px 22px rgba(107,28,111,0.06)",
                  }}
                >
                  <span
                    className="absolute right-5 top-5 text-3xl font-bold opacity-15 transition-opacity group-hover:opacity-30"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#6B1C6F",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                  >
                    <step.icon size={20} className="text-white" />
                  </div>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TradeSection />

      {/* Trade Credit Estimator */}
      <section
        id="estimator"
        className="px-4 py-24 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(circle at 90% 10%, rgba(241,187,26,0.10), transparent 40%), linear-gradient(180deg, white 0%, #FDF8F0 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              Instant estimate
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              How much credit will I <span className="underline-accent">earn?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6" style={{ color: "#6B7280" }}>
              Enter a list price or scan an ISBN to instantly see your estimated store credit and swap fee — before you even walk in.
            </p>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </Reveal>
          <TradeCreditEstimator />
        </div>
      </section>

      {/* Tips */}
      <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: "white" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
            >
              Pro tips
            </span>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              Make the most of your <span className="underline-accent">trade</span>
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {tradeTips.map((tip, i) => (
              <Reveal key={tip.title} delay={i * 80}>
                <div
                  className="flex h-full flex-col items-center rounded-2xl p-7 text-center transition-all hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
                    boxShadow: "0 8px 22px rgba(107,28,111,0.06)",
                  }}
                >
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(107,28,111,0.10) 0%, rgba(241,187,26,0.18) 100%)",
                    }}
                  >
                    <tip.icon size={26} style={{ color: "#6B1C6F" }} />
                  </div>
                  <h3
                    className="mb-3 text-lg font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
                  >
                    {tip.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    {tip.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
