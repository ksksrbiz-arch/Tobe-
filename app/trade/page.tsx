"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import TradeSection from "@/components/TradeSection";
import TradeCreditEstimator from "@/components/TradeCreditEstimator";
import FAQSection, { type Faq } from "@/components/FAQSection";
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
import {
  TRADE_POLICY_REDEMPTION,
  TRADE_POLICY_REDEMPTION_FULL,
  TRADE_POLICY_ROLLOVER,
  TRADE_POLICY_WAIT,
} from "@/lib/tradePolicy";

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
      "Bring what you can comfortably review with us at the counter.",
  },
  {
    icon: Sunrise,
    title: "Come Early",
    description:
      "Mornings are quieter — easier to chat, easier to browse. We're open Mon–Sat 10am–5pm.",
  },
];

// Visible trade FAQ — also emits FAQPage structured data via <FAQSection>.
const tradeFaqs: Faq[] = [
  {
    q: "Do you give cash for trades?",
    a: `No — we're a trade-credit shop, so trades earn store credit rather than cash. ${TRADE_POLICY_WAIT}`,
  },
  {
    q: "How is my trade credit calculated?",
    a: `You receive 25% of the book's original list price as store credit on books we accept. ${TRADE_POLICY_REDEMPTION_FULL}`,
  },
  {
    q: "What books do you accept?",
    a: "Fiction, non-fiction, biographies, kids/YA, sci-fi/fantasy, mystery, history, self-help, cookbooks, and more — as long as they're in good readable shape. Hardbacks must include their dust jackets.",
  },
  {
    q: "What books don't you accept?",
    a: "Magazines, Harlequin romance novels, hardbacks without dust jackets, encyclopedias and most textbooks, and anything heavily damaged, water-stained, or dated media like VHS tapes.",
  },
  {
    q: "Does my store credit expire?",
    a: `No — ${TRADE_POLICY_ROLLOVER.charAt(0).toLowerCase()}${TRADE_POLICY_ROLLOVER.slice(1)}`,
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
    title: "Wait while we review",
    body: TRADE_POLICY_WAIT,
  },
  {
    icon: HandCoins,
    title: "Get store credit",
    body: `Receive 25% of the original list price as credit on each accepted book. ${TRADE_POLICY_ROLLOVER}`,
  },
  {
    icon: Smile,
    title: "Pick new reads",
    body: `Browse, ask for recommendations, and use your credit toward the next stack. ${TRADE_POLICY_REDEMPTION}`,
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
        imageUrl="/images/shelves/store-kids-chapter-wall.jpg"
        scrollTargetId="trade"
      />

      {/* How it works */}
      <section
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(107,28,111,0.06) 0%, transparent 45%), radial-gradient(ellipse at 100% 100%, rgba(241,187,26,0.08) 0%, transparent 45%), linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)",
        }}
      >
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
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              Four simple <span className="underline-accent">steps</span>
            </h2>
            <div className="mx-auto accent-bar h-1 w-16 rounded-full" />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div
                  className="group relative h-full rounded-2xl border bg-white p-6 card-cozy"
                  style={{
                    borderColor: "rgba(107,28,111,0.10)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span
                    className="absolute right-5 top-5 text-3xl font-bold opacity-15 transition-opacity group-hover:opacity-30"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "#6B1C6F",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)" }}
                  >
                    <step.icon size={20} aria-hidden="true" className="text-white" />
                  </div>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
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
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
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
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              How much credit will I <span className="underline-accent">earn?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6" style={{ color: "#6B7280" }}>
              Enter a list price or scan an ISBN to instantly see your estimated store credit — before you even walk in.
            </p>
            <div className="mx-auto mt-4 accent-bar h-1 w-16 rounded-full" />
          </Reveal>
          <TradeCreditEstimator />
        </div>
      </section>

      {/* Tips */}
      <section
        className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(241,187,26,0.10) 0%, transparent 45%), radial-gradient(ellipse at 0% 100%, rgba(107,28,111,0.07) 0%, transparent 50%), linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 60%, #F5EAFB 100%)",
        }}
      >
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
                fontFamily: "var(--font-serif)",
                color: "#6B1C6F",
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              }}
            >
              Make the most of your <span className="underline-accent">trade</span>
            </h2>
            <div className="mx-auto accent-bar h-1 w-16 rounded-full" />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {tradeTips.map((tip, i) => (
              <Reveal key={tip.title} delay={i * 80}>
                <div
                  className="flex h-full flex-col items-center rounded-2xl p-7 text-center transition-all hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(180deg, #FDF8F0 0%, #FFFEFB 100%)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(107,28,111,0.10) 0%, rgba(241,187,26,0.18) 100%)",
                    }}
                  >
                    <tip.icon size={26} aria-hidden="true" style={{ color: "#6B1C6F" }} />
                  </div>
                  <h3
                    className="mb-3 text-lg font-bold"
                    style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
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

      <FAQSection
        faqs={tradeFaqs}
        eyebrow="Trade FAQ"
        titleLead="Trade"
        titleAccent="questions"
        intro="The questions we hear most often about trading in books."
        id="trade-faq"
      />

      <Footer />
      <FloatingButtons />
    </main>
  );
}
