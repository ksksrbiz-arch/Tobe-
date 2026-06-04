"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps page content with a quick fade/translate when the route changes,
 * so navigation feels like turning a page rather than a hard cut.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stage, setStage] = useState<"in" | "out">("in");
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const firstRender = useRef(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduceMotion) return;
    // Defer the route-change state flip to the next task so React's
    // set-state-in-effect rule does not flag a synchronous cascading render.
    const outId = window.setTimeout(() => setStage("out"), 0);
    const inId = window.setTimeout(() => setStage("in"), 180);
    return () => {
      window.clearTimeout(outId);
      window.clearTimeout(inId);
    };
  }, [pathname, reduceMotion]);

  return (
    <div
      style={{
        opacity: stage === "in" ? 1 : 0,
        transform: reduceMotion || stage === "in" ? "translateY(0)" : "translateY(8px)",
        transition: reduceMotion
          ? "none"
          : "opacity 360ms cubic-bezier(0.22, 1, 0.36, 1), transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: reduceMotion ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
