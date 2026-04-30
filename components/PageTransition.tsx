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
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setStage("out");
    const id = window.setTimeout(() => setStage("in"), 180);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: stage === "in" ? 1 : 0,
        transform: stage === "in" ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 360ms cubic-bezier(0.22, 1, 0.36, 1), transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
