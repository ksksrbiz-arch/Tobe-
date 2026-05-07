"use client";

import React, { useState } from "react";
import { Check, X as XIcon, AlertTriangle, Receipt, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const acceptItems = [
  "Fiction & literary novels",
  "Non-fiction & biographies",
  "Children's & young adult",
  "Sci-fi & fantasy",
  "Mystery & thriller",
  "History & true crime",
  "Self-help & wellness",
  "Cookbooks & crafts",
  "Hardbacks WITH dust jackets",
  "Good condition paperbacks",
];

const notAcceptItems = [
  "Magazines",
  "Harlequin romance novels",
  "Hardbacks WITHOUT dust jackets",
  "Damaged or heavily worn books",
  "Encyclopedias & textbooks (most)",
  "VHS tapes or outdated media",
];

const tradeChecklist = [
  { label: "It's a paperback or hardback with dust jacket" },
  { label: "It's in good readable condition" },
  { label: "It's NOT a magazine" },
  { label: "It's NOT a Harlequin romance" },
];

const swapTiers = [
  { range: "$10 or under", fee: "$1" },
  { range: "$11 – $19", fee: "$2" },
  { range: "$20 and up", fee: "$3" },
];

export default function TradeSection() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const allChecked = Object.values(checked).filter(Boolean).length === tradeChecklist.length;

  return (
    <section
      id="trade"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(circle at 90% 10%, rgba(241,187,26,0.10), transparent 40%), linear-gradient(180deg, #FDF8F0 0%, #F8F2E8 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <Reveal className="mb-12 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
          >
            Trade With Us
          </span>
          <h2
            className="mb-3 font-bold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Bring Your <span className="underline-accent">Books</span> In
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full" style={{ background: "#F1BB1A" }} />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed" style={{ color: "#6B7280" }}>
            We run a friendly trade-credit shop — bring books in, take new ones home with credit toward the trade.
          </p>
        </Reveal>

        {/* Important Notice */}
        <Reveal delay={60}>
          <div
            className="mb-10 flex items-start gap-4 rounded-2xl border-2 p-5"
            style={{
              background: "linear-gradient(135deg, rgba(107,28,111,0.05), rgba(241,187,26,0.05))",
              borderColor: "#6B1C6F",
            }}
          >
            <AlertTriangle size={26} style={{ color: "#F1BB1A", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-lg font-bold" style={{ color: "#6B1C6F" }}>
                NO CASH GIVEN FOR BOOKS!
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "#374151" }}>
                We operate on a trade credit system. Bring your books in and receive store credit toward any book purchase.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Book Exchange Policy */}
        <Reveal delay={120}>
          <div
            className="relative mb-10 overflow-hidden rounded-3xl border-2 p-8 shadow-xl"
            style={{
              background: "white",
              borderColor: "#6B1C6F",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-15 blur-3xl"
              style={{ background: "#F1BB1A" }}
            />

            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
                  }}
                >
                  <Receipt size={20} className="text-white" />
                </div>
                <h3
                  className="font-bold"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#6B1C6F",
                    fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Book Exchange Policy
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(107,28,111,0.05)" }}
                >
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#6B1C6F",
                    }}
                  >
                    25%
                  </div>
                  <p className="mt-1 text-sm font-semibold" style={{ color: "#1a1a1a" }}>
                    Of the book&apos;s original list price
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#4B5563" }}>
                    in store credit on any book we&apos;re able to take.
                  </p>
                </div>
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(241,187,26,0.10)" }}
                >
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#6B1C6F",
                    }}
                  >
                    50%
                  </div>
                  <p className="mt-1 text-sm font-semibold" style={{ color: "#1a1a1a" }}>
                    Of the list price deducted
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#4B5563" }}>
                    from your credit on any book you&apos;re purchasing.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium" style={{ color: "#374151" }}>
                  A <strong style={{ color: "#6B1C6F" }}>swap fee</strong> per book applies as follows, based on list price:
                </p>
                <div
                  className="grid grid-cols-3 gap-3 rounded-2xl p-5"
                  style={{ background: "#FDF8F0" }}
                >
                  {swapTiers.map((tier, i) => (
                    <div
                      key={tier.range}
                      className="text-center"
                      style={{
                        borderRight: i < swapTiers.length - 1 ? "1px solid #E5E0D5" : "none",
                      }}
                    >
                      <div
                        className="mb-1.5 text-[10px] uppercase tracking-wider"
                        style={{ color: "#6B7280" }}
                      >
                        {tier.range}
                      </div>
                      <div
                        className="text-3xl font-bold"
                        style={{
                          color: "#F1BB1A",
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {tier.fee}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p
                className="mt-6 border-t pt-4 text-center text-sm italic"
                style={{ color: "#6B7280", borderColor: "rgba(107,28,111,0.10)" }}
              >
                Without credit, books are priced at 50% of the list price unless otherwise marked with our store sticker.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Accept / Don't accept */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal delay={180}>
            <div
              className="h-full rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{
                background: "white",
                boxShadow: "0 12px 30px rgba(34,197,94,0.10)",
                borderTop: "4px solid #22c55e",
              }}
            >
              <h3
                className="mb-5 flex items-center gap-2 text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "rgba(34,197,94,0.15)" }}
                >
                  <Check size={16} className="text-green-600" />
                </span>
                What We Accept
              </h3>
              <ul className="space-y-2.5">
                {acceptItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "#374151" }}
                  >
                    <Check size={14} className="flex-shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div
              className="h-full rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{
                background: "white",
                boxShadow: "0 12px 30px rgba(239,68,68,0.10)",
                borderTop: "4px solid #ef4444",
              }}
            >
              <h3
                className="mb-5 flex items-center gap-2 text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "rgba(239,68,68,0.15)" }}
                >
                  <XIcon size={16} className="text-red-500" />
                </span>
                What We Don&apos;t Accept
              </h3>
              <ul className="space-y-2.5">
                {notAcceptItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                    <XIcon size={14} className="flex-shrink-0 text-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Interactive Checklist */}
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
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
            >
              Quick Trade Checklist
            </h3>
            <p className="mb-5 text-sm" style={{ color: "#6B7280" }}>
              Tick what applies and we&apos;ll let you know if your stack is a good fit.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tradeChecklist.map((item, i) => (
                <label
                  key={item.label}
                  className="group flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all hover:bg-white/70"
                  style={{
                    borderColor: checked[i] ? "rgba(107,28,111,0.50)" : "rgba(107,28,111,0.10)",
                    background: checked[i] ? "rgba(107,28,111,0.05)" : "white",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!checked[i]}
                    onChange={() => toggle(i)}
                    className="h-5 w-5 cursor-pointer rounded"
                    style={{ accentColor: "#6B1C6F" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: checked[i] ? "#6B1C6F" : "#374151" }}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
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
                <p className="font-semibold">Sounds great! Bring those books in — we&apos;d love to see them.</p>
                <Sparkles size={18} />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
