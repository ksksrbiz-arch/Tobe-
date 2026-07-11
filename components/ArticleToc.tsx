"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string, used: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section";
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

/**
 * An auto-generated table of contents for a Reading Room article.
 *
 * It reads the rendered `<h2>`/`<h3>` headings out of the prose container
 * (`targetId`) after mount, assigns stable ids to any heading that lacks one,
 * and tracks the heading currently in view with an IntersectionObserver so the
 * matching entry can be highlighted. Renders nothing when an article has fewer
 * than two headings, so short posts stay clean.
 */
export default function ArticleToc({
  targetId,
  label = "In this article",
}: {
  targetId: string;
  label?: string;
}) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = document.getElementById(targetId);
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll<HTMLHeadingElement>("h2, h3"),
    );
    const used = new Set<string>();
    const collected: TocItem[] = [];
    for (const el of headings) {
      const text = el.textContent?.trim() ?? "";
      if (!text) continue;
      if (el.id) used.add(el.id);
      else el.id = slugify(text, used);
      // Land below the fixed header when jumped to via the in-page anchor.
      el.style.setProperty("scroll-margin-top", "var(--header-offset)");
      collected.push({
        id: el.id,
        text,
        level: el.tagName === "H3" ? 3 : 2,
      });
    }

    // Defer the state update out of the synchronous effect body (matches the
    // DustMotes / CursorGlow pattern) to satisfy the set-state-in-effect rule.
    rafRef.current = requestAnimationFrame(() => setItems(collected));

    let observer: IntersectionObserver | null = null;
    if (collected.length >= 2 && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) setActiveId(visible[0].target.id);
        },
        { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
      );
      headings.forEach((el) => observer!.observe(el));
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      observer?.disconnect();
    };
  }, [targetId]);

  // Reading-progress rail: track how far the reader has scrolled through the
  // article body. rAF-throttled + passive listener so it stays off the main
  // scroll path and never janks. The bar simply mirrors scroll position, so it
  // carries no independent animation to gate for reduced-motion users.
  useEffect(() => {
    const container = document.getElementById(targetId);
    if (!container) return;

    let frame: number | null = null;
    const compute = () => {
      frame = null;
      const start = container.offsetTop;
      const span = container.offsetHeight - window.innerHeight;
      if (span <= 0) {
        // Body fits within the viewport — there is nothing to scroll through, so
        // leave the rail empty rather than showing a misleading "fully read" bar.
        setProgress(0);
        return;
      }
      const ratio = (window.scrollY - start) / span;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  const progressRail = (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px]"
      style={{ background: "color-mix(in srgb, var(--purple) 8%, transparent)" }}
    >
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, var(--gold) 0%, var(--purple) 100%)",
        }}
      />
    </div>
  );

  if (items.length < 2) return progressRail;

  return (
    <>
      {progressRail}
      <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border p-4 sm:p-5"
      style={{
        borderColor: "color-mix(in srgb, var(--purple) 12%, transparent)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(253,248,240,0.85) 100%)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--purple)" }}
        >
          <List size={15} aria-hidden="true" />
          {label}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="transition-transform duration-300"
          style={{ color: "var(--purple)", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>

      {open && (
        <ol className="mt-4 space-y-1">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className="block rounded-lg border-l-2 py-1 pl-3 pr-2 text-sm transition-colors hover:bg-[color-mix(in srgb, var(--purple) 6%, transparent)] hover:text-[var(--purple-dark)] focus-visible:bg-[color-mix(in srgb, var(--purple) 6%, transparent)]"
                  style={{
                    borderColor: active ? "var(--gold)" : "transparent",
                    color: active ? "var(--purple-dark)" : "var(--muted)",
                    fontWeight: active ? 700 : 500,
                    // Only set background inline for the active item; leaving it
                    // unset lets the hover/focus Tailwind classes apply to the rest.
                    ...(active ? { background: "color-mix(in srgb, var(--gold) 10%, transparent)" } : {}),
                  }}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ol>
      )}
      </nav>
    </>
  );
}
