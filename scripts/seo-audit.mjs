// SEO / structured-data validator for the *built* site output.
//
// Runs after `next build` and inspects `.next/server/app`:
//   - every prerendered page's JSON-LD blocks must be valid JSON (hard fail)
//   - every page should declare a canonical <link> (warning)
//   - the static route bodies (sitemap.xml, robots.txt, the RSS feed,
//     llms.txt, llms-full.txt) must exist, be non-empty, and look well-formed
//     (hard fail)
//
// Exits non-zero on any hard failure so CI catches malformed structured data
// or a missing/duplicate-broken feed before it ships. Emits GitHub Actions
// ::error:: / ::warning:: annotations and a step-summary-friendly recap.

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = ".next/server/app";
let hardFailures = 0;
let warnings = 0;
const notes = [];

function err(msg) {
  hardFailures++;
  console.log(`::error::${msg}`);
}
function warn(msg) {
  warnings++;
  console.log(`::warning::${msg}`);
}

if (!existsSync(APP_DIR)) {
  err(`${APP_DIR} not found — run \`next build\` before this script.`);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const allFiles = walk(APP_DIR);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

let pagesChecked = 0;
let jsonLdBlocks = 0;
let pagesMissingCanonical = 0;
let pagesMissingDescription = 0;

// Next.js internal boundary pages (_global-error, _not-found) intentionally
// carry no marketing metadata and are non-indexable — exempt them.
const isSystemPage = (file) => /(^|\/)(_global-error|_not-found|_error|404|500)\.html$/.test(file);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  pagesChecked++;

  // Every real page must carry a non-empty <title> (hard fail) and a meta
  // description (warn) — the baseline for a page Google will index and rank.
  if (!isSystemPage(file)) {
    const title = html.match(/<title>([^<]*)<\/title>/);
    if (!title || !title[1].trim()) {
      err(`${file}: missing or empty <title>`);
    }
    if (!/<meta name="description" content="[^"]+"/.test(html)) {
      pagesMissingDescription++;
      warn(`${file}: missing meta description`);
    }
  }

  // Validate every JSON-LD block parses.
  const blocks = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];
  for (const m of blocks) {
    jsonLdBlocks++;
    try {
      const data = JSON.parse(m[1]);
      if (!data || typeof data !== "object" || !data["@type"]) {
        warn(`${file}: JSON-LD block missing @type`);
      }
    } catch (e) {
      err(`${file}: invalid JSON-LD — ${e.message}`);
    }
  }

  // Canonical presence (warn only — a few system routes legitimately omit it).
  if (!/rel="canonical"/.test(html)) {
    pagesMissingCanonical++;
  }
}

if (pagesMissingCanonical > 0) {
  warn(`${pagesMissingCanonical} prerendered page(s) have no canonical link.`);
}

// Static route bodies produced by route handlers / metadata routes.
const bodyChecks = [
  { path: "sitemap.xml.body", must: ["<urlset", "tobereadshop.com"] },
  { path: "robots.txt.body", must: ["Sitemap:"] },
  { path: "reading-room/feed.xml.body", must: ["<rss", "<item>"] },
  { path: "llms.txt.body", must: ["## About", "## Key facts"] },
  { path: "llms-full.txt.body", must: ["## About", "Reading Room articles"] },
];

for (const { path, must } of bodyChecks) {
  const full = join(APP_DIR, path);
  if (!existsSync(full)) {
    err(`missing built route body: ${path}`);
    continue;
  }
  const body = readFileSync(full, "utf8");
  if (statSync(full).size === 0) {
    err(`empty built route body: ${path}`);
    continue;
  }
  const missing = must.filter((token) => !body.includes(token));
  if (missing.length) {
    err(`${path}: expected content not found: ${missing.join(", ")}`);
  } else {
    notes.push(`✓ ${path}`);
  }
}

// Recap (also useful in the Actions step summary).
console.log("\n=== SEO audit (built output) ===");
console.log(`Pages checked:        ${pagesChecked}`);
console.log(`Pages w/o description: ${pagesMissingDescription}`);
console.log(`JSON-LD blocks valid: ${jsonLdBlocks - 0}`);
console.log(`Route bodies OK:      ${notes.length}/${bodyChecks.length}`);
console.log(`Warnings:             ${warnings}`);
console.log(`Hard failures:        ${hardFailures}`);
for (const n of notes) console.log(`  ${n}`);

if (hardFailures > 0) {
  console.log(`\nSEO audit FAILED with ${hardFailures} hard failure(s).`);
  process.exit(1);
}
console.log("\nSEO audit passed.");
