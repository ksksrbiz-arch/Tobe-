"use client";

import React, { useCallback, useEffect, useRef } from "react";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt away from flat, in degrees. */
  max?: number;
  /** Hover scale applied alongside the tilt. */
  scale?: number;
  /** Render a soft cursor-tracking sheen over the surface. */
  glare?: boolean;
}

/**
 * A reusable, pointer-tracked 3D tilt wrapper. The wrapped surface leans
 * toward the cursor and (optionally) catches a soft sheen where the pointer
 * sits — a tactile, "pick it up" feel for cards and panels.
 *
 * It is deliberately quiet about cost and taste:
 *  - Transforms are written straight to the DOM inside a single rAF, so moving
 *    the pointer never triggers a React re-render.
 *  - It only ever activates for a *fine* pointer (mouse / trackpad) and when
 *    the visitor hasn't asked for reduced motion. Touch devices and
 *    motion-sensitive visitors get a plain, static element.
 */
export default function Tilt({
  children,
  className = "",
  max = 8,
  scale = 1.02,
  glare = true,
}: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLSpanElement | null>(null);
  const frame = useRef<number | null>(null);
  const enabled = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabled.current = fine && !reduce;
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const reset = useCallback(() => {
    const node = ref.current;
    if (node) node.style.transform = "";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }, []);

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!enabled.current || !node || frame.current !== null) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width; // 0 (left) → 1 (right)
      const py = (event.clientY - rect.top) / rect.height; // 0 (top)  → 1 (bottom)
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const rx = (0.5 - py) * max * 2;
        const ry = (px - 0.5) * max * 2;
        node.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
        const g = glareRef.current;
        if (g) {
          g.style.opacity = "1";
          g.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
          g.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        }
      });
    },
    [max, scale],
  );

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
      {glare ? <span ref={glareRef} aria-hidden="true" className="tilt__glare" /> : null}
    </div>
  );
}
