#!/usr/bin/env node
// Renders Lighthouse CI results as GitHub-flavoured Markdown for the job's
// Step Summary, replacing fire-and-forget logs with a scannable score table
// and a shareable report link.
//
// Reads two env vars produced by treosh/lighthouse-ci-action:
//   LH_MANIFEST – JSON array of runs, each with { url, summary: {category: 0..1} }
//   LH_LINKS    – JSON object mapping url -> temporary public report URL
//
// Usage: node lighthouse-summary.js "<label>"  (writes Markdown to stdout)

const label = process.argv[2] || "Lighthouse";

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

const manifest = safeParse(process.env.LH_MANIFEST, []);
const links = safeParse(process.env.LH_LINKS, {});

const out = [];
out.push(`## 🔦 Lighthouse — ${label}`);
out.push("");

// Prefer the representative run per URL; fall back to any run.
const runs = Array.isArray(manifest) ? manifest : [];
const representative = runs.filter((r) => r && r.isRepresentativeRun);
const chosen = (representative.length ? representative : runs).filter((r) => r && r.summary);

if (chosen.length === 0) {
  out.push("> No Lighthouse summary was produced (the audit may have failed before collecting metrics — check the step logs above).");
} else {
  const emoji = (score) => (score >= 0.9 ? "🟢" : score >= 0.5 ? "🟠" : "🔴");
  const pretty = (key) =>
    key.replace(/(^|-)([a-z])/g, (_, sep, c) => (sep ? " " : "") + c.toUpperCase());

  for (const run of chosen) {
    out.push(`### ${run.url || "Audited page"}`);
    out.push("");
    out.push("| Category | Score |");
    out.push("| --- | --- |");
    for (const [key, value] of Object.entries(run.summary)) {
      if (typeof value !== "number") continue;
      const pct = Math.round(value * 100);
      out.push(`| ${pretty(key)} | ${emoji(value)} ${pct} |`);
    }
    out.push("");
    const reportUrl = links && links[run.url];
    if (reportUrl) {
      out.push(`📄 [Full HTML report](${reportUrl})`);
      out.push("");
    }
  }
}

process.stdout.write(out.join("\n") + "\n");
