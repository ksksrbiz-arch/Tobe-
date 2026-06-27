"use client";

import React from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Small share button for Reading Room articles. Uses the native share sheet
 * where available (mobile), falling back to copying the link. Pairs with the
 * per-post OpenGraph images so a shared link previews nicely.
 */
export default function SharePost({ url, title }: { url: string; title: string }) {
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
      toast.success("Link copied — thanks for sharing!");
    } catch {
      toast.error("Couldn't copy the link. Try again?");
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share this article"
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.03] active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
      style={{
        borderColor: "rgba(107,28,111,0.18)",
        color: "#6B1C6F",
        background: "rgba(107,28,111,0.04)",
      }}
    >
      <Share2 size={13} aria-hidden="true" />
      Share
    </button>
  );
}
