"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookLogo from "./BookLogo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ANIMATION_BUFFER_MS = 2600;
    const FALLBACK_TIMEOUT_MS = 5000;

    const dismiss = () => {
      // Small buffer so the animation has time to land
      setTimeout(() => setVisible(false), ANIMATION_BUFFER_MS);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Hard fallback in case the load event never fires
      const fallback = setTimeout(() => setVisible(false), FALLBACK_TIMEOUT_MS);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 28% 38%, rgba(241,187,26,0.20), transparent 52%), radial-gradient(circle at 72% 62%, rgba(107,28,111,0.16), transparent 52%), linear-gradient(145deg, #FFFDF9 0%, #FDF8F0 50%, #F7F0FF 100%)",
          }}
          aria-live="polite"
          aria-label="Loading To Be Read"
          role="status"
        >
          {/* Ambient glow blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <motion.div
              className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full blur-3xl"
              style={{ background: "rgba(241,187,26,0.28)" }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.85, 0.55] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[16%] right-[12%] h-64 w-64 rounded-full blur-3xl"
              style={{ background: "rgba(107,28,111,0.20)" }}
              animate={{ scale: [1, 1.10, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            />
            <motion.div
              className="absolute left-[48%] top-[10%] h-40 w-40 rounded-full blur-2xl"
              style={{ background: "rgba(139,46,144,0.14)" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
            />
          </div>

          {/* Subtle grid pattern */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(107,28,111,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(107,28,111,0.04) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6), transparent 72%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6), transparent 72%)",
            }}
          />

          {/* Main content stack */}
          <div className="relative z-10 flex flex-col items-center px-4 text-center">
            {/* Book logo */}
            <motion.div
              initial={{ scale: 0.65, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <BookLogo
                size={164}
                showText={false}
                className="drop-shadow-[0_22px_38px_rgba(107,28,111,0.22)]"
              />
            </motion.div>

            {/* Brand name */}
            <motion.h1
              className="mt-5 font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B1C6F",
                fontSize: "clamp(2.2rem, 6vw, 3.2rem)",
                lineHeight: 1.08,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              To Be{" "}
              <motion.span
                style={{ fontStyle: "italic", display: "inline-block" }}
                className="text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.72 }}
              >
                Read
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-2 text-xs font-semibold uppercase tracking-[0.30em]"
              style={{ color: "#6B1C6F" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.55, delay: 0.92 }}
            >
              Clackamas Book Exchange
            </motion.p>

            {/* Gold divider */}
            <motion.div
              className="mt-4 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #F1BB1A 50%, transparent)" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 88, opacity: 1 }}
              transition={{ duration: 0.55, delay: 1.15, ease: "easeOut" }}
            />

            {/* Animated loading dots */}
            <motion.div
              className="mt-6 flex items-center gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              aria-hidden="true"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-2 w-2 rounded-full"
                  style={{ background: i === 1 ? "#F1BB1A" : "#6B1C6F" }}
                  animate={{
                    opacity: [0.25, 1, 0.25],
                    scale: [0.75, 1.15, 0.75],
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-3.5 text-[11px] font-medium"
              style={{ color: "#9CA3AF", letterSpacing: "0.04em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.75, duration: 0.5 }}
              aria-hidden="true"
            >
              Opening the next chapter…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
