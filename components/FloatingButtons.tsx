"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, BookOpen } from "lucide-react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrade = () => {
    const el = document.querySelector("#trade");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* Trade Now button */}
      <button
        onClick={handleTrade}
        className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
        style={{ background: "#6B1C6F" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#F1BB1A"; (e.currentTarget as HTMLButtonElement).style.color = "#1a1a1a"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#6B1C6F"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
        aria-label="Trade books with us"
      >
        <BookOpen size={16} />
        Trade Now
      </button>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-110"
          style={{ background: "#6B1C6F" }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
