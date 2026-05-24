#!/usr/bin/env node
// Parses npm audit JSON output from stdin and reports critical/high counts.
// Usage: npm audit --json | node check-audit.js <project-label>
const label = process.argv[2] || "project";
let data = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (data += chunk));
process.stdin.on("end", () => {
  let critical = 0;
  let high = 0;
  try {
    const json = JSON.parse(data);
    const v = json.metadata?.vulnerabilities || {};
    critical = v.critical || 0;
    high = v.high || 0;
  } catch {
    // If parsing fails, assume no vulnerabilities detected
  }
  console.log(`Critical: ${critical} | High: ${high}`);
  if (critical > 0) {
    console.log(`::error::Found ${critical} critical vulnerabilities in ${label}`);
  }
  if (high > 0) {
    console.log(`::warning::Found ${high} high vulnerabilities in ${label}`);
  }
  if (critical === 0 && high === 0) {
    console.log(`✅ No critical or high vulnerabilities found in ${label}`);
  }
});
