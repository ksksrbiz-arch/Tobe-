import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  badge?: string;
  /** ISO date string, e.g. "2026-06-22". Rendered as the effective date. */
  updated: string;
  /** Shared hero artwork; defaults to the cozy shelves shot used site-wide. */
  imageUrl?: string;
  children: React.ReactNode;
}

/**
 * Shared shell for the site's legal documents (Privacy, Cookies, Terms).
 *
 * Keeps the chrome (Navbar / PageHero / Footer / FloatingButtons) and the
 * `.legal-prose` typography identical across every policy page so they read as
 * one coherent set. Server component on purpose — the content is fully static,
 * so there's no client JS shipped for the document body itself.
 */
export default function LegalPageLayout({
  title,
  subtitle,
  badge = "Legal",
  updated,
  imageUrl = "/images/shelves/store-front-adult-fiction.jpg",
  children,
}: LegalPageLayoutProps) {
  const updatedLabel = new Date(`${updated}T00:00:00`).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <>
      <Navbar />
      <PageHero
        title={title}
        subtitle={subtitle}
        badge={badge}
        imageUrl={imageUrl}
        scrollTargetId="legal-content"
      />
      <main id="main">
        <article
          id="legal-content"
          className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 lg:px-8"
        >
          <p className="mb-10 text-sm" style={{ color: "var(--ink-muted)" }}>
            <strong>Last updated:</strong>{" "}
            <time dateTime={updated}>{updatedLabel}</time>
          </p>
          <div className="legal-prose">{children}</div>
        </article>
      </main>
      <FloatingButtons />
      <Footer />
    </>
  );
}
