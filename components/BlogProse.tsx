import React from "react";

/**
 * Shared typographic wrapper for Reading Room article bodies. Styles child
 * elements via Tailwind arbitrary-variant selectors so individual posts can be
 * written as plain semantic HTML (<p>, <h2>, <ul>, <a>…) with zero per-element
 * classes — no @tailwindcss/typography dependency required.
 */
export default function BlogProse({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={[
        "mx-auto max-w-2xl text-[1.0625rem] leading-8 text-[#374151]",
        "[&_p]:mb-6",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:[font-family:var(--font-serif)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--purple-dark)]",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--purple)]",
        "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2",
        "[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_a]:font-semibold [&_a]:text-[var(--purple)] [&_a]:underline [&_a]:decoration-[var(--gold)] [&_a]:underline-offset-2 hover:[&_a]:text-[var(--purple-light)]",
        "[&_strong]:font-semibold [&_strong]:text-[var(--purple-dark)]",
        "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--gold)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[var(--purple-dark)]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
