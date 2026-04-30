"use client";

import React, { useEffect, useState } from "react";
import AnimatedBookLogo from "./AnimatedBookLogo";

const STORAGE_KEY = "tbr_visited_v1";
const MIN_DURATION_MS = 1100;
const MAX_DURATION_MS = 2200;

/**
 * A first-impression loading splash. Shows the animated book logo with a
 * warm gradient and a subtle progress bar. Auto-dismisses on `load` and
 * remembers the visit in sessionStorage so subsequent route changes don't
 * re-trigger it.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let visited = false;
    try {
      visited = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      visited = false;
    }

    if (visited) {
      // Defer the dismiss so we don't update state synchronously inside the
      // effect body (and so any SSR markup is replaced cleanly).
      const raf = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(raf);
    }

    const start = performance.now();
    let cancelled = false;

    const dismiss = () => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION_MS - elapsed);
      window.setTimeout(() => {
        if (cancelled) return;
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* noop */
        }
        setLeaving(true);
        window.setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, 650);
      }, wait);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    // Hard fallback so the splash never sticks.
    const fallback = window.setTimeout(dismiss, MAX_DURATION_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading To Be Read"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 25% 20%, rgba(241,187,26,0.28), transparent 50%), radial-gradient(circle at 80% 80%, rgba(107,28,111,0.38), transparent 55%), radial-gradient(circle at 50% 50%, rgba(139,46,144,0.10), transparent 70%), linear-gradient(135deg, #FDF8F0 0%, #FFF7EC 25%, #F5EAFB 65%, #E8D5F0 100%)",
        opacity: leaving ? 0 : 1,
        transition: "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* Soft floating ornaments */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full blur-3xl"
        style={{
          background: "rgba(241,187,26,0.25)",
          left: "10%",
          top: "18%",
          animation: "floatSlow 6s ease-in-out infinite",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-80 w-80 rounded-full blur-3xl"
        style={{
          background: "rgba(107,28,111,0.22)",
          right: "8%",
          bottom: "16%",
          animation: "floatSlow 7.5s ease-in-out infinite reverse",
        }}
      />

      {/* Dust motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => {
          const left = (i * 73) % 100;
          const top = (i * 41 + 15) % 100;
          const delay = (i * 0.4) % 4;
          const dur = 7 + (i % 5);
          return (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                background: i % 2 === 0 ? "rgba(241,187,26,0.65)" : "rgba(107,28,111,0.45)",
                boxShadow: "0 0 8px currentColor",
                color: i % 2 === 0 ? "rgba(241,187,26,0.5)" : "rgba(107,28,111,0.4)",
                animation: `dustDrift ${dur}s ease-in-out ${delay}s infinite`,
                opacity: 0.8,
              }}
            />
          );
        })}
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <AnimatedBookLogo size={180} />

        <div className="flex flex-col items-center gap-2 text-center">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.42em]"
            style={{ color: "#6B1C6F", opacity: 0.78 }}
          >
            To Be Read
          </span>
          <span
            className="font-serif text-2xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#4A1350",
              animation: "fadeIn 0.9s ease-out 0.4s both",
            }}
          >
            Opening the next chapter
            <span style={{ animation: "blink 1.4s steps(3, end) infinite" }}>…</span>
          </span>
        </div>

        {/* Bookmark progress */}
        <div
          className="relative mt-2 h-[3px] w-48 overflow-hidden rounded-full"
          style={{ background: "rgba(107,28,111,0.12)" }}
        >
          <span
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: "40%",
              background: "linear-gradient(90deg, #6B1C6F 0%, #F1BB1A 100%)",
              animation: "loadingSweep 1.6s cubic-bezier(0.45, 0.05, 0.35, 1) infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
