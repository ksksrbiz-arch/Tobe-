"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import type { Faq } from "./FAQSection";

/**
 * The expand/collapse accordion — the only stateful part of the FAQ. Extracted
 * into a Client island so the surrounding FAQSection (heading + FAQPage JSON-LD)
 * can render as a Server Component on every page that reuses it.
 */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
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
  );
}
