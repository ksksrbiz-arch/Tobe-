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

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border p-4 sm:p-5"
      style={{
        borderColor: "rgba(107,28,111,0.12)",
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
          style={{ color: "#6B1C6F" }}
        >
          <List size={15} aria-hidden="true" />
          {label}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="transition-transform duration-300"
          style={{ color: "#6B1C6F", transform: open ? "rotate(180deg)" : "none" }}
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
                  aria-current={active ? "true" : undefined}
                  className="block rounded-lg border-l-2 py-1 pl-3 pr-2 text-sm transition-colors"
                  style={{
                    borderColor: active ? "#F1BB1A" : "transparent",
                    color: active ? "#4A1350" : "#6B7280",
                    fontWeight: active ? 700 : 500,
                    background: active ? "rgba(241,187,26,0.10)" : "transparent",
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
  );
}
