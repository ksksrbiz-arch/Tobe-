"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Sparkles, X } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Portland Book Week sale banner — runs June 5–13, 2026.
 *
 * Auto-removes itself once EXPIRES_AT passes (June 13 midnight Pacific),
 * so no manual clean-up is needed after the sale window. Visitors can also
 * dismiss it for the session, stored in localStorage.
 *
 * Sale details:
 *   • Spend $100 in-store → receive $100 in store credit
 *   • No limit on how much credit you can earn
 *   • Credit expires December 31, 2026
 */
const EXPIRES_AT = new Date("2026-06-14T07:00:00Z").getTime(); // June 13 midnight PDT = June 14 07:00 UTC
const DISMISS_KEY = "tbr-portland-book-week-banner-dismissed";

export default function PortlandBookWeekBanner() {
  // Start null to avoid hydration mismatch — decision depends on Date.now()
  // and localStorage, neither of which exist during SSR.
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const evaluate = () => {
      if (Date.now() >= EXPIRES_AT) {
        setVisible(false);
        return;
      }
      try {
        setVisible(window.localStorage.getItem(DISMISS_KEY) !== "1");
      } catch {
        // Storage blocked (private mode, etc.) — show the banner anyway.
        setVisible(true);
      }
    };
    evaluate();
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Best-effort only.
    }
  };

  if (!visible) return null;

  return (
    <section
      className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      aria-label="Portland Book Week — in-store sale June 5–13"
      style={{
        background:
          "radial-gradient(ellipse at 30% -10%, rgba(107,28,111,0.22) 0%, transparent 55%), radial-gradient(ellipse at 80% 110%, rgba(241,187,26,0.14) 0%, transparent 48%), linear-gradient(160deg, #1e0a2e 0%, #2a0d38 45%, #1a1228 100%)",
      }}
    >
      {/* Dismiss button */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss Portland Book Week banner"
        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}
      >
        <X size={15} />
      </button>

      {/* Subtle scanline overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.6) 3px, rgba(255,255,255,0.6) 4px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: copy */}
          <Reveal className="flex-1">
            {/* Event badge */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em]"
                style={{
                  background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                  color: "#1e0a2e",
                }}
              >
                <Sparkles size={10} />
                Portland Book Week
              </span>
              <span
                className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em]"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
              >
                June 5–13 · In-Store
              </span>
            </div>

            <h2
              className="font-black leading-[1.08]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
                color: "white",
              }}
            >
              Spend{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #F1BB1A, #F5CC45, #F1BB1A)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                $100
              </span>
              , get{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #F1BB1A, #F5CC45, #F1BB1A)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                $100 credit
              </span>
            </h2>

            <p
              className="mt-3 max-w-lg text-[15px] leading-7"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Celebrate Portland Book Week with us. Every $100 you spend in-store
              earns you $100 in store credit — no limit on how much you can stack.
              Credit is valid through{" "}
              <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                December 31, 2026
              </span>
              .
            </p>

            {/* Fine-print pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["No spending cap", "In-store only", "Credit valid thru Dec 31, 2026"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(107,28,111,0.35)",
                    color: "rgba(255,255,255,0.72)",
                    border: "1px solid rgba(107,28,111,0.55)",
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#visit"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform duration-200 hover:scale-[1.03]"
                style={{
                  background: "linear-gradient(135deg, #F1BB1A 0%, #F5CC45 100%)",
                  color: "#1e0a2e",
                  boxShadow: "0 10px 28px rgba(241,187,26,0.28)",
                }}
              >
                Plan your visit
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
                Sale ends June 13 · While you shop
              </span>
            </div>
          </Reveal>

          {/* Right: offer card */}
          <Reveal delay={120} className="w-full lg:w-auto lg:flex-shrink-0">
            <div
              className="relative w-full overflow-hidden rounded-[28px] lg:w-[280px]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.45) 100%)",
                border: "1px solid rgba(241,187,26,0.22)",
                boxShadow: "0 0 50px rgba(241,187,26,0.12), 0 28px 60px rgba(0,0,0,0.55)",
              }}
            >
              {/* Top accent line */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: "linear-gradient(90deg, transparent, #F1BB1A, transparent)",
                }}
              />

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(241,187,26,0.12)" }}
                  >
                    <BookOpen size={20} style={{ color: "#F1BB1A" }} />
                  </div>
                  <span
                    className="rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[0.28em]"
                    style={{
                      background: "rgba(241,187,26,0.12)",
                      color: "#F1BB1A",
                      border: "1px solid rgba(241,187,26,0.22)",
                    }}
                  >
                    Live now
                  </span>
                </div>

                <p
                  className="text-[10px] font-black uppercase tracking-[0.28em]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  The deal
                </p>

                {/* Big visual ratio */}
                <div className="my-4 flex items-center justify-center gap-3">
                  {[["$100", "Spent"], ["→", ""], ["$100", "Credit"]].map(([val, label], i) => (
                    <React.Fragment key={i}>
                      {label === "" ? (
                        <span
                          className="text-xl font-black"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {val}
                        </span>
                      ) : (
                        <div className="text-center">
                          <div
                            className="text-2xl font-black leading-none"
                            style={{ color: "#F1BB1A", fontFamily: "var(--font-serif)" }}
                          >
                            {val}
                          </div>
                          <div
                            className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em]"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            {label}
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div
                  className="h-px w-full"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />

                <div className="mt-4 space-y-2">
                  {[
                    ["Sale window", "June 5 – 13"],
                    ["Credit valid", "Thru Dec 31, 2026"],
                    ["Cap", "No limit"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span
                        className="text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: "rgba(255,255,255,0.38)" }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-[11px] font-bold"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(241,187,26,0.5), transparent)",
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
