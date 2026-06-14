"use client";

import { useEffect } from "react";

// Last-resort boundary for failures in the root layout itself. It replaces the
// whole document (including globals.css and fonts), so everything here is
// dependency-free and inline-styled to stay robust when the app is broken.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background:
            "radial-gradient(circle at 20% 20%, rgba(241,187,26,0.16), transparent 38%), linear-gradient(135deg, #FDF8F0 0%, #F7F0FF 100%)",
          color: "#1F1A2E",
        }}
      >
        <div
          style={{
            maxWidth: "30rem",
            width: "100%",
            textAlign: "center",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(107,28,111,0.12)",
            borderRadius: "24px",
            padding: "2.5rem 1.5rem",
            boxShadow: "0 24px 60px rgba(107,28,111,0.18)",
          }}
        >
          <div aria-hidden="true" style={{ fontSize: "2.25rem", lineHeight: 1 }}>
            📚
          </div>
          <h1
            style={{
              margin: "1rem 0 0.5rem",
              fontSize: "1.6rem",
              color: "#6B1C6F",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Something went wrong
          </h1>
          <p style={{ margin: "0 0 1.5rem", color: "#6B7280", lineHeight: 1.6 }}>
            The page hit an unexpected snag. Please try again — the rest of the shop is still open.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "14px",
                padding: "0.85rem 1.4rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg, #6B1C6F 0%, #8B2E90 100%)",
              }}
            >
              Try again
            </button>
            {/* A hard navigation (not next/link) intentionally forces a full
                document reload to escape the broken app state. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                borderRadius: "14px",
                padding: "0.85rem 1.4rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#6B1C6F",
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(107,28,111,0.18)",
                textDecoration: "none",
              }}
            >
              Back home
            </a>
          </div>
          {error?.digest && (
            <p style={{ marginTop: "1.25rem", fontSize: "0.7rem", color: "#9CA3AF" }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
