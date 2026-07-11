import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { CalendarClock, ChevronDown, ListTree, ShieldCheck } from "lucide-react";

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

interface TocEntry {
  id: string;
  text: string;
}

/** Slug a heading's plain-text into a stable, URL-safe id. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[‘’“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Recursively pull the visible text out of an arbitrary React node. */
function nodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (React.isValidElement(node)) {
    return nodeText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

function classNameOf(el: React.ReactElement): string {
  const cn = (el.props as { className?: unknown }).className;
  return typeof cn === "string" ? cn : "";
}

/**
 * Shared shell for the site's legal documents (Privacy, Cookies, Terms,
 * Accessibility).
 *
 * Keeps the chrome (Navbar / PageHero / Footer / FloatingButtons) and the
 * `.legal-prose` typography identical across every policy page so they read as
 * one coherent set. Server component on purpose — the content is fully static,
 * so there's no client JS shipped for the document body itself. The
 * "On this page" table of contents, the per-heading anchor affordances, and the
 * callout icons are all derived from the children at render time on the server.
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

  // Walk the top-level children once to (a) collect an ordered list of section
  // headings for the TOC, (b) give each <h2> a stable id + hover anchor link,
  // and (c) drop a shield icon into any callout block. Every policy page authors
  // its <h2>s and .legal-callout blocks as direct children, so a single-level
  // pass is enough — no deep tree rewriting, no client JS.
  const toc: TocEntry[] = [];
  const usedIds = new Set<string>();

  const content = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === "h2") {
      const el = child as React.ReactElement<{
        id?: string;
        children?: React.ReactNode;
      }>;
      const text = nodeText(el.props.children).trim();
      const baseId = el.props.id ?? slugify(text);
      if (!baseId) return child;
      // Guard against the (unlikely) duplicate slug within one document.
      let id = baseId;
      let n = 2;
      while (usedIds.has(id)) id = `${baseId}-${n++}`;
      usedIds.add(id);
      toc.push({ id, text });

      const anchor = (
        <a
          key="__anchor"
          href={`#${id}`}
          className="legal-heading-anchor"
          aria-label={`Permalink to “${text}”`}
        >
          #
        </a>
      );
      return React.cloneElement(el, { id }, el.props.children, anchor);
    }

    if (classNameOf(child).split(/\s+/).includes("legal-callout")) {
      const el = child as React.ReactElement<{
        style?: React.CSSProperties;
        children?: React.ReactNode;
      }>;
      const icon = (
        <ShieldCheck
          key="__callout-icon"
          aria-hidden="true"
          size={22}
          strokeWidth={2}
          style={{
            color: "var(--purple)",
            flex: "0 0 auto",
            marginTop: "0.15rem",
          }}
        />
      );
      return React.cloneElement(
        el,
        {
          style: {
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            ...el.props.style,
          },
        },
        icon,
        <div key="__callout-body" style={{ minWidth: 0 }}>
          {el.props.children}
        </div>,
      );
    }

    return child;
  });

  return (
    <>
      {/* Scoped styles for the in-page anchor affordance and TOC chevron. Kept
          in the component (not app/globals.css) so this unit stays
          self-contained. Motion is gated behind prefers-reduced-motion; touch
          devices, which have no hover, get a faint always-visible affordance. */}
      <style>{`
        .legal-prose h2 .legal-heading-anchor {
          color: color-mix(in srgb, var(--purple) 45%, transparent);
          text-decoration: none;
          font-weight: 700;
          margin-left: 0.4rem;
          opacity: 0;
          user-select: none;
        }
        .legal-prose h2:hover .legal-heading-anchor,
        .legal-prose h2 .legal-heading-anchor:focus-visible {
          opacity: 1;
        }
        .legal-prose h2 .legal-heading-anchor:hover { color: var(--gold); }
        @media (prefers-reduced-motion: no-preference) {
          .legal-prose h2 .legal-heading-anchor { transition: opacity 0.18s ease, color 0.18s ease; }
          .legal-toc-chevron { transition: transform 0.2s ease; }
        }
        @media (hover: none) {
          .legal-prose h2 .legal-heading-anchor { opacity: 0.55; }
        }
        .legal-toc[open] .legal-toc-chevron { transform: rotate(180deg); }
        .legal-toc summary { list-style: none; }
        .legal-toc summary::-webkit-details-marker { display: none; }
      `}</style>
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
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                color: "var(--purple)",
                background: "color-mix(in srgb, var(--purple) 8%, transparent)",
                border:
                  "1px solid color-mix(in srgb, var(--purple) 22%, transparent)",
              }}
            >
              <CalendarClock aria-hidden="true" size={14} strokeWidth={2} />
              <span>
                Last updated{" "}
                <time dateTime={updated} className="font-bold">
                  {updatedLabel}
                </time>
              </span>
            </span>
          </div>

          {toc.length >= 3 && (
            <details
              className="legal-toc mb-10 rounded-2xl"
              open
              style={{
                background: "color-mix(in srgb, var(--purple) 4%, transparent)",
                border: "1px solid var(--line-strong)",
              }}
            >
              <summary
                className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold sm:px-5"
                style={{ color: "var(--purple)" }}
              >
                <ListTree aria-hidden="true" size={16} strokeWidth={2} />
                <span className="flex-1">On this page</span>
                <ChevronDown
                  className="legal-toc-chevron"
                  aria-hidden="true"
                  size={16}
                  strokeWidth={2}
                />
              </summary>
              <nav
                aria-label="On this page"
                className="px-4 pb-4 sm:px-5"
                style={{
                  borderTop: "1px solid var(--line)",
                  paddingTop: "0.75rem",
                }}
              >
                <ol className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                  {toc.map((entry) => (
                    <li key={entry.id} className="min-w-0">
                      <a
                        href={`#${entry.id}`}
                        className="block truncate rounded px-2 py-1 text-sm no-underline transition-colors hover:underline"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          )}

          <div className="legal-prose">{content}</div>
        </article>
      </main>
      <FloatingButtons />
      <Footer />
    </>
  );
}
