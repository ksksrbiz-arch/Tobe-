"use client";

import React, { useId, useState } from "react";
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
  const baseId = useId();

  return (
    <Reveal>
      <div
        className="overflow-hidden rounded-2xl border bg-white shadow-md"
        style={{ borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)" }}
      >
        {faqs.map((faq, i) => {
          const open = openIdx === i;
          const triggerId = `${baseId}-trigger-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <div
              key={faq.q}
              className="border-b last:border-b-0"
              style={{ borderColor: "color-mix(in srgb, var(--purple) 8%, transparent)" }}
            >
              <button
                type="button"
                id={triggerId}
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--paper)]"
              >
                <span
                  className="text-sm font-semibold sm:text-base"
                  style={{ color: open ? "var(--purple)" : "var(--ink)" }}
                >
                  {faq.q}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: open ? "var(--purple)" : "color-mix(in srgb, var(--purple) 8%, transparent)",
                    color: open ? "white" : "var(--purple)",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition:
                      "transform var(--dur-med) var(--ease-out), background var(--dur-med) var(--ease-out), color var(--dur-med) var(--ease-out)",
                  }}
                >
                  <ChevronDown size={14} />
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                inert={!open}
                className="grid"
                style={{
                  gridTemplateRows: open ? "1fr" : "0fr",
                  transition: "grid-template-rows var(--dur-med) var(--ease-out)",
                }}
              >
                <div className="overflow-hidden">
                  <p
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "var(--ink-soft)" }}
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
