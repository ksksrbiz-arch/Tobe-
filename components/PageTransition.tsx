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
  // Always start false, matching what the server renders (no `window` at SSR
  // time) — reading matchMedia in the initializer made the client's very
  // first render diverge from the SSR HTML whenever the OS actually has
  // reduced-motion on, which React flags as a hydration mismatch. The real
  // value is read on mount instead, one effect below.
  const [reduceMotion, setReduceMotion] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Deferred to the next task (matching the route-change effect below) so
    // React's set-state-in-effect rule doesn't flag a synchronous cascading
    // render from setting state directly inside the effect body.
    const initId = window.setTimeout(() => setReduceMotion(media.matches), 0);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(initId);
      media.removeEventListener("change", onChange);
    };
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
        // Only hint the compositor during the active transition — leaving
        // willChange permanently set promotes the entire page tree to its own
        // layer indefinitely, wasting GPU memory between navigations.
        willChange: stage === "out" ? "opacity, transform" : "auto",
      }}
    >
      {children}
    </div>
  );
}
