"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import BookLogo from "@/components/BookLogo";

/**
 * Global error boundary — rendered by Next.js when an unhandled exception
 * bubbles up from a Server Component or a client component outside a
 * nested error boundary. Matches the brand so users don't see a white crash.
 *
 * `reset` re-attempts rendering the failed segment.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the console so it shows in Netlify function logs and any future
    // error-tracking integration (Sentry, etc.) can be wired here.
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          background:
            "radial-gradient(circle at 20% 20%, rgba(241,187,26,0.12), transparent 38%), " +
            "radial-gradient(circle at 80% 80%, rgba(107,28,111,0.12), transparent 38%), " +
            "linear-gradient(160deg, #FDF8F0 0%, #F7F0FF 100%)",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          {/* Logo */}
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
            <BookLogo size={88} showText={false} />
          </div>

          {/* Badge */}
          <div
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: 999,
              background: "rgba(244,63,94,0.10)",
              color: "#be123c",
              fontSize: "0.65rem",
              fontWeight: 900,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </div>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
              lineHeight: 1.12,
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            A page fell off the shelf.
          </h1>

          <p
            style={{
              color: "#6B7280",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Something unexpected happened on our end. You can try again or head
            back to the homepage — we&apos;ll have it tidied up shortly.
            {error.digest && (
              <span
                style={{
                  display: "block",
                  marginTop: "0.75rem",
                  fontSize: "0.7rem",
                  color: "rgba(107,28,111,0.4)",
                  fontFamily: "monospace",
                }}
              >
                ref: {error.digest}
              </span>
            )}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                width: "100%",
                maxWidth: 280,
                padding: "0.85rem 1.75rem",
                borderRadius: "1rem",
                background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 28px rgba(107,28,111,0.22)",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "0.85rem 1.75rem",
                borderRadius: "1rem",
                border: "2px solid #F1BB1A",
                color: "#6B1C6F",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                width: "100%",
                maxWidth: 280,
                boxSizing: "border-box",
              }}
            >
              Go to homepage
            </Link>
          </div>

          <p
            style={{
              marginTop: "3rem",
              fontSize: "0.7rem",
              color: "rgba(107,28,111,0.4)",
            }}
          >
            To Be Read · Clackamas Book Exchange · Milwaukie, OR
          </p>
        </div>
      </body>
    </html>
  );
}
