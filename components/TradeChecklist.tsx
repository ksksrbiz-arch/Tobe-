"use client";

import React, { useState } from "react";
import { Check, X as XIcon, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

// Green items are good traits to confirm; red `disqualifier` items are the
// "we can't take these" types. They're interleaved (not bunched at the end) and
// styled red even before you tick them, so a quick glance tells you what's
// welcome and what isn't.
const tradeChecklist = [
  { label: "It's a paperback or hardback with a dust jacket" },
  { label: "It's a magazine, comic, or Reader's Digest", disqualifier: true },
  { label: "It's in good, readable condition" },
  { label: "It's an encyclopedia or textbook", disqualifier: true },
  { label: "It's a Harlequin romance", disqualifier: true },
  { label: "It's a novel, non-fiction, or kids' book" },
  { label: "It has an odor, water damage, or highlighting", disqualifier: true },
  { label: "It's a title from the last few decades" },
];

/**
 * The interactive "Quick Trade Checklist" — the only stateful part of the
 * Trade section. Extracted into its own Client Component so the surrounding
 * TradeSection can render as a Server Component (no hydration for its large
 * static body).
 */
export default function TradeChecklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const allChecked = tradeChecklist.every((item, i) =>
    item.disqualifier ? !checked[i] : !!checked[i],
  );

  return (
    <Reveal delay={300}>
      <div
        className="rounded-3xl p-7"
        style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--purple) 4%, transparent) 0%, color-mix(in srgb, var(--gold) 6%, transparent) 100%)",
          border: "1px solid color-mix(in srgb, var(--purple) 10%, transparent)",
          boxShadow: "0 8px 30px color-mix(in srgb, var(--purple) 6%, transparent)",
        }}
      >
        <h3
          className="mb-2 text-xl font-bold"
          style={{ fontFamily: "var(--font-serif)", color: "var(--purple)" }}
        >
          Quick Trade Checklist
        </h3>
        <p className="mb-5 text-sm" style={{ color: "var(--muted)" }}>
          Tick anything that applies. <strong style={{ color: "#166534" }}>Green</strong> traits are
          perfect for trade; the <strong style={{ color: "#B42318" }}>red</strong> ones are things we
          can&apos;t take.
        </p>
        <div
          role="group"
          aria-label="Quick trade checklist"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {tradeChecklist.map((item, i) => {
            const isChecked = !!checked[i];
            const isDisq = !!item.disqualifier;
            const greenOn = !isDisq && isChecked; // confirmed good trait
            const redOn = isDisq && isChecked; // flagged: a "no" trait applies
            const redRest = isDisq && !isChecked; // resting "we can't take" item
            return (
              <button
                key={item.label}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggle(i)}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-all active:scale-[0.99]"
                style={{
                  borderColor: redOn
                    ? "rgba(239,68,68,0.55)"
                    : redRest
                      ? "rgba(239,68,68,0.32)"
                      : greenOn
                        ? "rgba(34,197,94,0.45)"
                        : "color-mix(in srgb, var(--purple) 10%, transparent)",
                  background: redOn
                    ? "rgba(239,68,68,0.12)"
                    : redRest
                      ? "rgba(254,242,242,0.7)"
                      : greenOn
                        ? "rgba(34,197,94,0.10)"
                        : "white",
                  boxShadow: redOn
                    ? "0 10px 22px rgba(239,68,68,0.16)"
                    : greenOn
                      ? "0 10px 22px rgba(34,197,94,0.12)"
                      : redRest
                        ? "0 6px 16px rgba(239,68,68,0.06)"
                        : "none",
                }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all"
                  style={{
                    borderColor: isDisq
                      ? "#DC2626"
                      : greenOn
                        ? "#16A34A"
                        : "color-mix(in srgb, var(--purple) 18%, transparent)",
                    background: redOn
                      ? "#DC2626"
                      : greenOn
                        ? "#16A34A"
                        : redRest
                          ? "rgba(255,241,242,0.9)"
                          : "rgba(255,255,255,0.92)",
                  }}
                >
                  {isDisq ? (
                    <XIcon
                      size={14}
                      strokeWidth={3}
                      className="transition-all"
                      // Faint at rest so the item reads as a "no" category, solid once ticked.
                      style={{ color: isChecked ? "white" : "#DC2626", opacity: isChecked ? 1 : 0.45 }}
                    />
                  ) : (
                    <Check
                      size={14}
                      strokeWidth={3}
                      className="transition-all"
                      style={{ color: "white", opacity: isChecked ? 1 : 0 }}
                    />
                  )}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: redOn ? "#991B1B" : redRest ? "#B42318" : greenOn ? "#166534" : "#374151",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        {allChecked && (
          <div
            role="status"
            aria-live="polite"
            className="fade-in-up mt-5 flex items-center justify-center gap-2 rounded-xl p-4 text-center"
            style={{
              background: "linear-gradient(135deg, var(--purple) 0%, var(--purple-light) 100%)",
              color: "var(--gold)",
            }}
          >
            <Sparkles size={18} aria-hidden="true" />
            <p className="font-semibold">Sounds great! Bring those books in — we&apos;d love to take a look (titles we&apos;re already stocked up on are the only maybe).</p>
            <Sparkles size={18} aria-hidden="true" />
          </div>
        )}
      </div>
    </Reveal>
  );
}
