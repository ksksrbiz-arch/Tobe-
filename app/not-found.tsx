import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BookLogo from "@/components/BookLogo";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page has wandered off the shelves. Let's find you something better.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(241,187,26,0.14), transparent 38%), " +
          "radial-gradient(circle at 80% 80%, rgba(107,28,111,0.14), transparent 38%), " +
          "linear-gradient(160deg, #FDF8F0 0%, #F7F0FF 100%)",
        minHeight: "100dvh",
      }}
    >
      <div className="mx-auto max-w-lg">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <BookLogo size={100} showText={false} className="opacity-70" />
        </div>

        {/* 404 callout */}
        <div
          className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em]"
          style={{ background: "rgba(241,187,26,0.18)", color: "#6B1C6F" }}
        >
          404 · Not Found
        </div>

        <h1
          className="mb-4 font-bold"
          style={{
            fontFamily: "var(--font-serif)",
            color: "#6B1C6F",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            lineHeight: 1.08,
          }}
        >
          This page has wandered{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #F1BB1A, #F5CC45)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            off the shelves.
          </span>
        </h1>

        <p
          className="mb-10 text-base leading-relaxed"
          style={{ color: "#6B7280" }}
        >
          We couldn&apos;t find what you were looking for — but we have thousands of
          real pages waiting for you inside.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 sm:w-auto"
            style={{
              background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
              boxShadow: "0 12px 30px rgba(107,28,111,0.25)",
            }}
          >
            Back to the homepage
          </Link>
          <Link
            href="/visit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 px-7 py-3.5 text-sm font-semibold transition-all hover:scale-105 sm:w-auto"
            style={{ borderColor: "#F1BB1A", color: "#6B1C6F" }}
          >
            Plan a visit
          </Link>
        </div>

        <p
          className="mt-12 text-xs"
          style={{ color: "rgba(107,28,111,0.45)" }}
        >
          To Be Read · Clackamas Book Exchange · Milwaukie, OR
        </p>
      </div>
    </div>
  );
}
