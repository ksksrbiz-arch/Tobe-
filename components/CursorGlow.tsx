"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * A whisper-quiet "reading lamp" that follows the cursor — a soft, warm gold
 * pool of light pooling under the pointer to match the shop's candle-lit
 * brand language. It is purely ambient:
 *  - Only mounts for a *fine* pointer (mouse / trackpad) and when the visitor
 *    hasn't asked for reduced motion. Touch and motion-sensitive visitors get
 *    nothing at all.
 *  - Position is written straight to the DOM inside a single rAF, so moving the
 *    mouse never re-renders React.
 *  - `pointer-events: none` and a fixed, GPU-composited layer keep it free of
 *    interaction and layout cost.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // Defer the state update out of the effect body (matches DustMotes) so we
    // never paint the glow layer until after the first frame is on screen.
    const t = window.setTimeout(() => setEnabled(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        node.style.opacity = "1";
      });
    };
    const onLeave = () => {
      node.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
}
