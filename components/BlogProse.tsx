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
        // h2: serif heading topped with a small gold "eyebrow" accent rule.
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:[font-family:var(--font-serif)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--purple-dark)]",
        "[&_h2]:before:mb-3 [&_h2]:before:block [&_h2]:before:h-1 [&_h2]:before:w-10 [&_h2]:before:rounded-full [&_h2]:before:bg-[color-mix(in_srgb,var(--gold)_80%,transparent)] [&_h2]:before:content-['']",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--purple)]",
        "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2",
        "[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_a]:font-semibold [&_a]:text-[var(--purple)] [&_a]:underline [&_a]:decoration-[var(--gold)] [&_a]:underline-offset-2 hover:[&_a]:text-[var(--purple-light)]",
        "[&_strong]:font-semibold [&_strong]:text-[var(--purple-dark)]",
        // blockquote: serif pull-quote with a faint oversized opening quotation mark.
        "[&_blockquote]:relative [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--gold)] [&_blockquote]:pl-5 [&_blockquote]:pt-1 [&_blockquote]:italic [&_blockquote]:[font-family:var(--font-serif)] [&_blockquote]:text-[var(--purple-dark)]",
        "[&_blockquote]:before:absolute [&_blockquote]:before:-top-2 [&_blockquote]:before:left-3 [&_blockquote]:before:font-serif [&_blockquote]:before:text-5xl [&_blockquote]:before:not-italic [&_blockquote]:before:leading-none [&_blockquote]:before:text-[color-mix(in_srgb,var(--gold)_40%,transparent)] [&_blockquote]:before:content-['“']",
        // hr: a short, centered gold flourish instead of a full-width line.
        "[&_hr]:mx-auto [&_hr]:my-10 [&_hr]:h-px [&_hr]:w-24 [&_hr]:border-0 [&_hr]:bg-[color-mix(in_srgb,var(--gold)_55%,transparent)]",
        // figure: rounded media with a centered, muted caption.
        "[&_figure]:my-8 [&_figure_img]:w-full [&_figure_img]:rounded-xl",
        "[&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:text-[var(--muted)]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
