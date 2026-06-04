"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, BookOpen } from "lucide-react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const scrollBehavior = (): ScrollBehavior =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 480);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleTrade = () => {
    const el = document.querySelector("#trade");
    if (el) {
      el.scrollIntoView({ behavior: scrollBehavior() });
    } else {
      // If trade section isn't on this page, navigate
      window.location.href = "/trade";
    }
  };

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex flex-col items-end gap-3 sm:bottom-[max(1.75rem,env(safe-area-inset-bottom))] sm:right-[max(1.75rem,env(safe-area-inset-right))]">
      <button
        type="button"
        onClick={handleTrade}
        className="touch-target btn-shine animate-pulse-glow group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-2xl transition-transform hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
        }}
        aria-label="Trade books with us"
      >
        <BookOpen size={16} className="transition-transform group-hover:rotate-[-8deg]" />
        Trade Now
      </button>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className="touch-target flex h-11 w-11 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #6B1C6F 0%, #4A1350 100%)",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
          pointerEvents: showTop ? "auto" : "none",
        }}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
