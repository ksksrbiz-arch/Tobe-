"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, BookOpen } from "lucide-react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 480);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrade = () => {
    const el = document.querySelector("#trade");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // If trade section isn't on this page, navigate
      window.location.href = "/trade";
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <button
        onClick={handleTrade}
        className="btn-shine animate-pulse-glow group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-2xl transition-all hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
        }}
        aria-label="Trade books with us"
      >
        <BookOpen size={16} className="transition-transform group-hover:rotate-[-8deg]" />
        Trade Now
      </button>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300"
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
