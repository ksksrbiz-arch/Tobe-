"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

// The classic. ↑ ↑ ↓ ↓ ← → ← → B A — but for a bookshop.
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

/**
 * A subtle, site-wide bookish easter egg. Enter the Konami code and a quiet
 * shower of books falls, with a whispered note from the shop. Renders nothing
 * and stays completely out of the way until summoned.
 */
export default function BookishEasterEgg() {
  const progress = useRef(0);
  const firedRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    async function celebrate() {
      if (firedRef.current) return;
      firedRef.current = true;

      toast("📚 You found the hidden shelf.", {
        description:
          "“A book is a dream that you hold in your hand.” Stop by — we always keep one set aside for fellow code-readers.",
        duration: 7000,
      });

      if (!reduceMotion) {
        try {
          const confetti = (await import("canvas-confetti")).default;
          const books = confetti.shapeFromText
            ? [
                confetti.shapeFromText({ text: "📖", scalar: 2 }),
                confetti.shapeFromText({ text: "📚", scalar: 2 }),
                confetti.shapeFromText({ text: "🔖", scalar: 2 }),
              ]
            : undefined;

          const fall = (origin: { x: number; y: number }) =>
            confetti({
              particleCount: 18,
              spread: 70,
              startVelocity: 32,
              gravity: 0.8,
              scalar: 2,
              ticks: 220,
              origin,
              ...(books ? { shapes: books } : {}),
            });

          fall({ x: 0.2, y: -0.1 });
          fall({ x: 0.5, y: -0.1 });
          fall({ x: 0.8, y: -0.1 });
        } catch {
          /* confetti is purely decorative — ignore load failures */
        }
      }

      // Allow the egg to be found again after it settles.
      window.setTimeout(() => {
        firedRef.current = false;
      }, 8000);
    }

    function onKeyDown(event: KeyboardEvent) {
      // Ignore while typing into a field so we never hijack real input.
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        progress.current = 0;
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expected = SEQUENCE[progress.current];

      if (key === expected) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          void celebrate();
        }
      } else {
        // Restart, but allow the wrong key to be the start of a fresh attempt.
        progress.current = key === SEQUENCE[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
