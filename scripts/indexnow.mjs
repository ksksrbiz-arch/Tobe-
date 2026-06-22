// IndexNow submission — notifies Bing (and other IndexNow participants like
// Yandex, Seznam, Naver) of the site's URLs so new/changed pages get crawled
// and indexed faster than waiting for an organic recrawl.
//
// Usage:
//   node scripts/indexnow.mjs --force     # submit now (manual)
//   npm run indexnow                      # same, via package.json
//
// Wiring: runs automatically as `postbuild`, but only submits on Netlify
// PRODUCTION deploys (CONTEXT=production). On previews, branch deploys, CI, and
// local builds it no-ops. The key is published at /<key>.txt (it is not a
// secret); override it with INDEXNOW_KEY if you rotate it.

import { readFile } from "node:fs/promises";

// Keep in sync with SITE_URL in lib/seo.ts (this plain-Node script can't import
// the TypeScript module). Update both when the domain changes.
const SITE_URL = "https://tobereadshop.com";
const KEY = process.env.INDEXNOW_KEY ?? "b77ed2e4fd0f6c50a89d84dab5727f56";
const FORCE = process.argv.includes("--force") || process.env.INDEXNOW_FORCE === "1";
const CONTEXT = process.env.CONTEXT; // Netlify: production | deploy-preview | branch-deploy

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function getUrls() {
  // Prefer the freshly-built sitemap so brand-new URLs are included; fall back
  // to the live sitemap if the build output isn't present.
  try {
    const xml = await readFile(".next/server/app/sitemap.xml.body", "utf8");
    const urls = extractLocs(xml);
    if (urls.length) return urls;
  } catch {}
  try {
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    if (res.ok) return extractLocs(await res.text());
  } catch {}
  return [];
}

async function main() {
  if (!FORCE && CONTEXT !== "production") {
    console.log(
      `[indexnow] skip (CONTEXT=${CONTEXT ?? "none"}; use --force to submit manually)`,
    );
    return;
  }

  const urlList = [...new Set(await getUrls())].filter((u) => u.startsWith(SITE_URL));
  if (urlList.length === 0) {
    console.log("[indexnow] no URLs found; nothing to submit");
    return;
  }

  const body = {
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200/202 = accepted. Anything else is logged but never fails the build.
  console.log(`[indexnow] submitted ${urlList.length} URLs → HTTP ${res.status}`);
}

// Never throw — IndexNow is best-effort and must not break a deploy.
main().catch((err) => console.warn("[indexnow] skipped:", err?.message ?? err));
