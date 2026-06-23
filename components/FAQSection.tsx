"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Reveal from "./Reveal";
import JsonLd from "./JsonLd";
import {
  TRADE_POLICY_CAP_AND_NOV1,
  TRADE_POLICY_EXPIRY,
  TRADE_POLICY_WAIT,
} from "@/lib/tradePolicy";

export type Faq = { q: string; a: string };

const defaultFaqs: Faq[] = [
  {
    q: "Do you really not give cash for trades?",
    a: `Correct — we operate as a trade-credit shop. ${TRADE_POLICY_WAIT} Credit is store credit only (not cash). ${TRADE_POLICY_EXPIRY}`,
  },
  {
    q: "How is my trade credit calculated?",
    a: `You receive 25% of the book's original list price as store credit on books we accept. When you purchase with credit, 50% of the list price comes off your credit plus a small swap fee ($1–$3). ${TRADE_POLICY_CAP_AND_NOV1}`,
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
    q: "When are you open?",
    a: "Monday through Saturday, 10am – 5pm. Closed Sundays. We occasionally open a few minutes late if a chapter runs long — thank you for understanding!",
  },
  {
    q: "Why are you rebranding to TBR?",
    a: "Same store, same heart — just a fresh name for the next 45 years. \"To Be Read\" captures that towering, exciting stack of books waiting on your nightstand. The change rolls out in 2026.",
  },
  {
    q: "Can I order books online for in-store pickup?",
    a: "Right now we recommend browsing PangoBooks for our online inventory. For in-store pickup, give us a call and we'll happily set books aside for you.",
  },
  {
    q: "Do you do book recommendations?",
    a: "Absolutely — that's the best part of working here. Stop in, tell us what you've been loving lately, and we'll make a stack.",
  },
  {
    q: "Do you buy used books?",
    a: "Yes — we take used books in trade for store credit. Bring them by during open hours and we'll look them over.",
  },
  {
    q: "What are your hours?",
    a: "We're open Monday through Saturday, 10am to 5pm, and closed on Sunday.",
  },
  {
    q: "Where are you located and is there parking?",
    a: "We're at 7931 SE King Rd, Unit 1, Portland, OR 97222. There's free on-site parking.",
  },
  {
    q: "Do you offer store credit?",
    a: "Yes — you earn store credit by trading in your used books, then put it toward your next reads.",
  },
  {
    q: "What kinds of books do you carry?",
    a: "Thousands of used titles across fiction, classics, romantasy, mystery, sci-fi/fantasy, kids', and nonfiction.",
  },
  {
    q: "Do you have a phone number?",
    a: "Yes — you can reach us at +1-503-659-2559 during open hours.",
  },
];

/**
 * Accordion FAQ with FAQPage structured data. Defaults to the store's general
 * trade questions (homepage); pass `faqs` + headings to reuse it elsewhere,
 * e.g. the location FAQ on /visit.
 */
export default function FAQSection({
  faqs = defaultFaqs,
  eyebrow = "Frequently asked",
  titleLead = "Quick",
  titleAccent = "answers",
  intro = "The questions we hear most often, in one place.",
  id = "faq",
}: {
  faqs?: Faq[];
  eyebrow?: string;
  titleLead?: string;
  titleAccent?: string;
  intro?: string;
  id?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section
      className="px-4 py-14 sm:py-24 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)" }}
      id={id}
    >
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <span
            className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
          >
            <HelpCircle size={12} />
            {eyebrow}
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            {titleLead} <span className="underline-accent">{titleAccent}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm" style={{ color: "#6B7280" }}>
            {intro}
          </p>
        </Reveal>

        <Reveal>
          <div
            className="overflow-hidden rounded-2xl border bg-white shadow-md"
            style={{ borderColor: "rgba(107,28,111,0.10)" }}
          >
            {faqs.map((faq, i) => {
              const open = openIdx === i;
              return (
                <div
                  key={faq.q}
                  className="border-b last:border-b-0"
                  style={{ borderColor: "rgba(107,28,111,0.08)" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#FDF8F0]"
                  >
                    <span
                      className="text-sm font-semibold sm:text-base"
                      style={{ color: open ? "#6B1C6F" : "#1a1a1a" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all"
                      style={{
                        background: open ? "#6B1C6F" : "rgba(107,28,111,0.08)",
                        color: open ? "white" : "#6B1C6F",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{
                      gridTemplateRows: open ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="px-5 pb-5 text-sm leading-relaxed"
                        style={{ color: "#4B5563" }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 text-center text-sm" style={{ color: "#6B7280" }}>
            Still curious?{" "}
            <a
              href="mailto:TBR@tcpbusiness.com"
              className="font-semibold underline decoration-2 underline-offset-4"
              style={{ color: "#6B1C6F", textDecorationColor: "#F1BB1A" }}
            >
              Send us an email
            </a>{" "}
            or stop by the shop.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
