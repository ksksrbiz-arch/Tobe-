"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Small share button for Reading Room articles. Uses the native share sheet
 * where available (mobile), falling back to copying the link. Pairs with the
 * per-post OpenGraph images so a shared link previews nicely.
 */
export default function SharePost({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const flashCopied = () => {
    setCopied(true);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  };

  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User dismissed the share sheet, or it's unavailable — fall through.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      flashCopied();
      toast.success("Link copied — thanks for sharing!");
    } catch {
      toast.error("Couldn't copy the link. Try again?");
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? "Link copied to clipboard" : "Share this article"}
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.03] active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
      style={{
        borderColor: copied
          ? "color-mix(in srgb, var(--gold) 45%, transparent)"
          : "color-mix(in srgb, var(--purple) 18%, transparent)",
        color: copied ? "var(--purple-dark)" : "var(--purple)",
        background: copied
          ? "color-mix(in srgb, var(--gold) 14%, transparent)"
          : "color-mix(in srgb, var(--purple) 4%, transparent)",
      }}
    >
      {copied ? (
        <Check size={13} aria-hidden="true" />
      ) : (
        <Share2 size={13} aria-hidden="true" />
      )}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
