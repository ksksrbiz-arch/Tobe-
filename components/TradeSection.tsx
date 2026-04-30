"use client";

import React, { useState } from "react";
import { Check, X as XIcon, AlertTriangle } from "lucide-react";

const acceptItems = [
  "Fiction & literary novels",
  "Non-fiction & biographies",
  "Children's & young adult books",
  "Science fiction & fantasy",
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
  { label: "It's a paperback or hardback with dust jacket", safe: true },
  { label: "It's in good readable condition", safe: true },
  { label: "It's NOT a magazine", safe: null },
  { label: "It's NOT a Harlequin romance", safe: null },
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
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "#FDF8F0" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: "#F1BB1A20", color: "#6B1C6F" }}
          >
            Trade With Us
          </span>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Bring Your Books In
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "#F1BB1A" }} />
        </div>

        {/* Important Notice */}
        <div
          className="flex gap-4 items-start p-5 rounded-2xl mb-10 border-2"
          style={{ background: "#6B1C6F08", borderColor: "#6B1C6F" }}
        >
          <AlertTriangle size={24} style={{ color: "#F1BB1A", flexShrink: 0, marginTop: 2 }} />
          <div>
            <p
              className="font-bold text-lg"
              style={{ color: "#6B1C6F" }}
            >
              NO CASH GIVEN FOR BOOKS!
            </p>
            <p className="mt-1 text-sm" style={{ color: "#374151" }}>
              We operate on a trade credit system. Bring your books in and receive store credit toward any purchase!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Accept */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
          >
            <h3
              className="font-bold text-lg mb-5 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#22c55e20" }}
              >
                <Check size={16} className="text-green-600" />
              </span>
              What We Accept
            </h3>
            <ul className="space-y-2">
              {acceptItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                  <Check size={14} className="text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Do Not Accept */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
          >
            <h3
              className="font-bold text-lg mb-5 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#ef444420" }}
              >
                <XIcon size={16} className="text-red-500" />
              </span>
              What We Do <em>Not</em> Accept
            </h3>
            <ul className="space-y-2">
              {notAcceptItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                  <XIcon size={14} className="text-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Checklist */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
        >
          <h3
            className="font-bold text-lg mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B1C6F" }}
          >
            Quick Trade Checklist
          </h3>
          <p className="text-sm mb-5" style={{ color: "#6B7280" }}>
            Check all that apply to see if your books are a good fit:
          </p>
          <div className="space-y-3">
            {tradeChecklist.map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={!!checked[i]}
                  onChange={() => toggle(i)}
                  className="w-5 h-5 rounded cursor-pointer"
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
              className="mt-5 p-4 rounded-xl text-center"
              style={{ background: "#6B1C6F10" }}
            >
              <p className="font-semibold" style={{ color: "#6B1C6F" }}>
                ✅ Sounds great! Bring those books in, we&apos;d love to see them.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
