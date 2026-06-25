import React from "react";
import { Sparkles } from "lucide-react";

/**
 * A short, answer-first callout placed at the top of an article. Gives readers
 * (and search engines / AI answer engines) the one-sentence takeaway before the
 * long-form content — good for featured snippets and generative answers.
 *
 * Rendered inside <BlogProse>; uses its own block styling so the article's
 * descendant typography rules don't restyle it.
 */
export default function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <aside
      role="note"
      aria-label="Quick answer"
      className="not-prose mb-8 rounded-2xl border p-5 sm:p-6"
      style={{
        background: "linear-gradient(135deg, rgba(107,28,111,0.06) 0%, rgba(241,187,26,0.10) 100%)",
        borderColor: "rgba(107,28,111,0.16)",
        borderLeft: "4px solid #F1BB1A",
      }}
    >
      <div
        className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
        style={{ color: "#6B1C6F" }}
      >
        <Sparkles size={13} aria-hidden="true" />
        Quick answer
      </div>
      <div className="text-[1.05rem] leading-7" style={{ color: "#3f2447" }}>
        {children}
      </div>
    </aside>
  );
}
