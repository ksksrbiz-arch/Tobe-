"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  threshold = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // Default invisible during SSR; if IO is unavailable on the client we'll flip
  // to visible inside the effect (purely a fallback path, won't run normally).
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // No observer support — reveal immediately.
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  const Tag = as as keyof React.JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      ref,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`.trim(),
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  );
}
