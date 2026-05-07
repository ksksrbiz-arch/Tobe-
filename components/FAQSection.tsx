"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Do you really not give cash for trades?",
    a: "Correct — we operate as a trade-credit shop. Bring books in, get store credit, then use it toward anything in the store. It's how we keep prices low and inventory fresh.",
  },
  {
    q: "How is my trade credit calculated?",
    a: "You receive 25% of the book's original list price as store credit on books we accept. When you purchase a book using credit, 50% of the list price comes off your credit, plus a small swap fee ($1–$3 depending on price).",
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
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      className="px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #FFFEFB 0%, #FDF8F0 100%)" }}
      id="faq"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <span
            className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(107,28,111,0.10)", color: "#6B1C6F" }}
          >
            <HelpCircle size={12} />
            Frequently asked
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Quick <span className="underline-accent">answers</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm" style={{ color: "#6B7280" }}>
            The questions we hear most often, in one place.
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
