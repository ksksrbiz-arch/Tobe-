"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";
import BookLogo from "@/components/BookLogo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for monitoring; the user sees the friendly fallback.
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="viewport-min-height flex items-center justify-center px-4 py-16"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--gold) 14%, transparent), transparent 36%), radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--purple) 14%, transparent), transparent 34%), linear-gradient(135deg, var(--paper) 0%, #FFF7EC 40%, #F7F0FF 100%)",
      }}
    >
      <div
        className="w-full max-w-lg rounded-[28px] border px-6 py-12 text-center backdrop-blur-md sm:px-10"
        style={{
          background: "rgba(255,255,255,0.82)",
          borderColor: "color-mix(in srgb, var(--purple) 10%, transparent)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <div className="mb-6 flex justify-center">
          <BookLogo size={96} showText={false} className="animate-float-slow" />
        </div>
        <h1
          className="mb-3 font-bold"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--purple)",
            fontSize: "clamp(1.7rem, 5vw, 2.4rem)",
            lineHeight: 1.1,
          }}
        >
          A dog-eared page
        </h1>
        <p
          className="mx-auto mb-8 max-w-sm text-balance"
          style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7 }}
        >
          Something went wrong on our end. Give it another turn — and if it keeps happening, the
          rest of the shop is still open.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="touch-target btn-primary w-full active:scale-[0.98] sm:w-auto"
          >
            <RefreshCw size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-[0.98] sm:w-auto"
            style={{ background: "rgba(255,255,255,0.8)", color: "var(--purple)", borderColor: "color-mix(in srgb, var(--purple) 16%, transparent)" }}
          >
            <Home size={16} />
            Back home
          </Link>
        </div>
        {error?.digest && (
          <p className="mt-6 text-[11px]" style={{ color: "var(--muted)" }}>
            Reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
