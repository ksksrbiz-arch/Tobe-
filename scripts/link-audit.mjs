// Internal-link + sitemap integrity validator for the *built* site output.
//
// Runs after `next build` and inspects `.next/server/app`:
//   - builds the ground-truth set of valid internal paths from every
//     prerendered page (.html) and route body (.body)
//   - every internal href in the prerendered HTML must resolve to one of them
//     (hard fail) — this catches the slug != filename class of broken links
//   - every prerendered Reading Room post must appear in the sitemap
//     (hard fail — no orphaned posts)
//   - every sitemap <loc> must resolve to a real prerendered route
//     (hard fail — no stale / 404 sitemap entries)
//
// Exits non-zero on any hard failure so CI catches a broken internal link or a
// drifted sitemap before it ships. Emits GitHub Actions ::error:: annotations.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = ".next/server/app";
let hardFailures = 0;
const err = (msg) => { hardFailures++; console.log(`::error::${msg}`); };

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

// Turn a built file path into the public route it serves.
//   index.html                        -> "/"
//   trade.html                        -> "/trade"
//   reading-room/books-like-dune.html -> "/reading-room/books-like-dune"
//   sitemap.xml.body                  -> "/sitemap.xml"
// Route-group folders like "(marketing)" never appear in the URL, so strip them.
function fileToRoute(file, suffix) {
  let rel = relative(APP_DIR, file).slice(0, -suffix.length);
  const segments = rel
    .split(sep)
    .filter((s) => !(s.startsWith("(") && s.endsWith(")")));
  let route = "/" + segments.join("/");
  if (route.endsWith("/index")) route = route.slice(0, -"index".length);
  if (route.length > 1 && route.endsWith("/")) route = route.slice(0, -1);
  return route || "/";
}

const allFiles = walk(APP_DIR);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

// Ground-truth valid internal paths: prerendered pages + route bodies.
const validPaths = new Set();
for (const f of htmlFiles) validPaths.add(fileToRoute(f, ".html"));
for (const f of allFiles.filter((f) => f.endsWith(".body"))) {
  validPaths.add(fileToRoute(f, ".body"));
}

// Internal paths that are legitimately reachable but not emitted as a single
// file we can enumerate (Next metadata image routes, static public assets).
// Kept deliberately small; anything here is an explicit, reviewed exception.
const ALLOW_PREFIXES = ["/_next/", "/images/", "/cookbooks/", "/fonts/", "/api/"];
const ALLOW_EXACT = new Set([
  "/favicon.ico",
  "/manifest.webmanifest",
  "/opengraph-image",
  "/twitter-image",
  "/icon",
  "/apple-icon",
]);

function normalize(href) {
  // Drop query + fragment, then trailing slash (except root).
  let p = href.split("#")[0].split("?")[0];
  if (!p) return null; // pure fragment / query link -> same page
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

function isInternalPageHref(href) {
  return href.startsWith("/") && !href.startsWith("//");
}

function allowed(path) {
  if (validPaths.has(path)) return true;
  if (ALLOW_EXACT.has(path)) return true;
  if (path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".svg") ||
      path.endsWith(".webp") || path.endsWith(".ico")) return true;
  return ALLOW_PREFIXES.some((pre) => path.startsWith(pre));
}

// Scan every prerendered page for broken internal links. Report each unique
// (brokenPath -> one example source route) once.
const broken = new Map(); // brokenPath -> Set(sourceRoutes)
let linksChecked = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const src = fileToRoute(file, ".html");
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const raw = m[1];
    if (!isInternalPageHref(raw)) continue;
    const path = normalize(raw);
    if (!path) continue;
    linksChecked++;
    if (!allowed(path)) {
      if (!broken.has(path)) broken.set(path, new Set());
      broken.get(path).add(src);
    }
  }
}

for (const [path, sources] of broken) {
  const examples = [...sources].slice(0, 5).join(", ");
  err(`broken internal link "${path}" — found on: ${examples}${sources.size > 5 ? " …" : ""}`);
}

// Sitemap integrity: parse the built sitemap body and cross-check both ways.
const sitemapPath = join(APP_DIR, "sitemap.xml.body");
// A real post route is exactly one slug segment under /reading-room/ — this
// excludes hub sections (tags/collections), the per-post metadata image
// sub-routes (/reading-room/<slug>/opengraph-image), and file-like route
// bodies (/reading-room/feed.xml).
const postRoutes = [...validPaths].filter((p) => {
  const m = p.match(/^\/reading-room\/([^/]+)$/);
  return m && !m[1].includes(".") &&
    m[1] !== "tags" && m[1] !== "collections";
});
let sitemapPaths = new Set();
if (!existsSync(sitemapPath)) {
  err("missing built sitemap.xml body");
} else {
  const xml = readFileSync(sitemapPath, "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    let p;
    try { p = new URL(m[1]).pathname; } catch { continue; }
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    sitemapPaths.add(p);
  }
  // Every sitemap entry must resolve to a real prerendered route.
  for (const p of sitemapPaths) {
    if (!validPaths.has(p)) err(`sitemap lists "${p}" but no page prerenders for it (stale entry).`);
  }
  // Every prerendered post must be in the sitemap (no orphaned posts).
  for (const p of postRoutes) {
    if (!sitemapPaths.has(p)) err(`Reading Room post "${p}" is prerendered but missing from the sitemap.`);
  }
}

console.log("\n=== Link & sitemap audit (built output) ===");
console.log(`Prerendered pages:    ${htmlFiles.length}`);
console.log(`Valid internal paths: ${validPaths.size}`);
console.log(`Internal links checked: ${linksChecked}`);
console.log(`Reading Room posts:   ${postRoutes.length}`);
console.log(`Sitemap URLs:         ${sitemapPaths.size}`);
console.log(`Broken internal links: ${broken.size}`);
console.log(`Hard failures:        ${hardFailures}`);

if (hardFailures > 0) {
  console.log(`\nLink & sitemap audit FAILED with ${hardFailures} hard failure(s).`);
  process.exit(1);
}
console.log("\nLink & sitemap audit passed.");
