"use client";

import React, { useState } from "react";
import { Check, X as XIcon, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const tradeChecklist = [
  { label: "It's a paperback or hardback with dust jacket" },
  { label: "It's in good readable condition" },
  { label: "It's NOT a magazine" },
  { label: "It's NOT a Harlequin romance" },
  { label: "Book has an odor or water damage or highlighting", disqualifier: true },
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
          background: "linear-gradient(135deg, rgba(107,28,111,0.04) 0%, rgba(241,187,26,0.06) 100%)",
          border: "1px solid rgba(107,28,111,0.10)",
          boxShadow: "0 8px 30px rgba(107,28,111,0.06)",
        }}
      >
        <h3
          className="mb-2 text-xl font-bold"
          style={{ fontFamily: "var(--font-serif)", color: "#6B1C6F" }}
        >
          Quick Trade Checklist
        </h3>
        <p className="mb-5 text-sm" style={{ color: "#6B7280" }}>
          Tick what applies and we&apos;ll let you know if your stack is a good fit.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tradeChecklist.map((item, i) => {
            const isChecked = !!checked[i];
            const isRed = item.disqualifier && isChecked;
            const isGreen = !item.disqualifier && isChecked;
            return (
              <button
                key={item.label}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggle(i)}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-all hover:bg-white/70"
                style={{
                  borderColor: isRed
                    ? "rgba(239,68,68,0.45)"
                    : isGreen
                      ? "rgba(34,197,94,0.45)"
                      : "rgba(107,28,111,0.10)",
                  background: isRed
                    ? "rgba(239,68,68,0.08)"
                    : isGreen
                      ? "rgba(34,197,94,0.10)"
                      : "white",
                  boxShadow: isRed
                    ? "0 10px 22px rgba(239,68,68,0.12)"
                    : isGreen
                      ? "0 10px 22px rgba(34,197,94,0.12)"
                      : "none",
                }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all"
                  style={{
                    borderColor: isRed
                      ? "#DC2626"
                      : isGreen
                        ? "#16A34A"
                        : "rgba(107,28,111,0.18)",
                    background: isRed
                      ? "#DC2626"
                      : isGreen
                        ? "#16A34A"
                        : "rgba(255,255,255,0.92)",
                  }}
                >
                  {item.disqualifier ? (
                    <XIcon
                      size={14}
                      strokeWidth={3}
                      className="transition-all"
                      style={{ color: "white", opacity: isChecked ? 1 : 0 }}
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
                    color: isRed ? "#991B1B" : isGreen ? "#166534" : "#374151",
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
            className="fade-in-up mt-5 flex items-center justify-center gap-2 rounded-xl p-4 text-center"
            style={{
              background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
              color: "#F1BB1A",
            }}
          >
            <Sparkles size={18} />
            <p className="font-semibold">Sounds great! Bring those books in — we&apos;d love to take a look (titles we&apos;re already stocked up on are the only maybe).</p>
            <Sparkles size={18} />
          </div>
        )}
      </div>
    </Reveal>
  );
}
