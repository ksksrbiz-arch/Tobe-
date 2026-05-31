import React from "react";

/**
 * Renders a JSON-LD structured-data block. Safe to use in both server and
 * client components — it only emits a <script> tag.
 *
 * Keep one <JsonLd> per logical schema entity so search engines can parse
 * each block independently.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is build-time/author-controlled, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
