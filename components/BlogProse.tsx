import React from "react";

/**
 * Shared typographic wrapper for Reading Room article bodies. Styles child
 * elements via Tailwind arbitrary-variant selectors so individual posts can be
 * written as plain semantic HTML (<p>, <h2>, <ul>, <a>…) with zero per-element
 * classes — no @tailwindcss/typography dependency required.
 */
export default function BlogProse({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        "mx-auto max-w-2xl text-[1.0625rem] leading-8 text-[#374151]",
        "[&_p]:mb-6",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:[font-family:var(--font-serif)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#4A1350]",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#6B1C6F]",
        "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2",
        "[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_a]:font-semibold [&_a]:text-[#6B1C6F] [&_a]:underline [&_a]:decoration-[#F1BB1A] [&_a]:underline-offset-2 hover:[&_a]:text-[#8B2E90]",
        "[&_strong]:font-semibold [&_strong]:text-[#4A1350]",
        "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#F1BB1A] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[#4A1350]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
