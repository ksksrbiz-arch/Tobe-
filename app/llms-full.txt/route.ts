import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

// llms-full.txt — a fuller machine-readable index for AI / generative search
// engines. Same canonical facts as llms.txt, but lists every Reading Room
// article with its description and tags so an assistant has richer context
// without crawling each page. Regenerated at build time from the post registry.
export const dynamic = "force-static";

const PAGES: Array<{ title: string; path: string; note: string }> = [
  { title: "Home", path: "/", note: "Overview, featured books, live new arrivals, and the AI Next Read Matchmaker." },
  { title: "Plan Your Visit", path: "/visit", note: "Address, hours, parking, transit, accessibility, and a map to the store." },
  { title: "Trade Your Books", path: "/trade", note: "How to trade used books for store credit, what we accept and don't, and a credit estimator." },
  { title: "How It Works", path: "/how-it-works", note: "Step-by-step explanation of trading books and earning/spending store credit." },
  { title: "Shop Online", path: "/shop", note: "Curated used books on PangoBooks and Bookshop.org, plus the in-store experience." },
  { title: "About the Store", path: "/about", note: "The 45-year history and story of the shop and its rebrand to To Be Read." },
  { title: "Connect", path: "/connect", note: "Contact details, email, phone, and social channels." },
  { title: "The Reading Room", path: "/reading-room", note: "Blog hub: reading guides, recommendations, gift guides, trade tips, and local guides." },
];

export function GET() {
  const posts = getAllPosts();

  const pageLines = PAGES.map(
    (p) => `- [${p.title}](${SITE_URL}${p.path === "/" ? "" : p.path}): ${p.note}`,
  ).join("\n");

  const postBlocks = posts
    .map(
      (p) =>
        `### ${p.title}\n` +
        `- URL: ${SITE_URL}/reading-room/${p.slug}\n` +
        `- Published: ${p.date}${p.updated ? ` (updated ${p.updated})` : ""}\n` +
        `- Tags: ${p.tags.join(", ")}\n` +
        `- Summary: ${p.description}`,
    )
    .join("\n\n");

  const body = `# ${SITE_NAME} — full index

> An independent used bookstore in Milwaukie, Oregon. Trade used books for store credit, browse thousands of secondhand titles in-store and online, and get AI-powered book recommendations. This is the fuller companion to ${SITE_URL}/llms.txt.

## About
- Business name: To Be Read (TBR), formerly/also Clackamas Book Exchange
- Address: 7931 SE King Rd, Unit 1, Portland, OR 97222
- Phone: (503) 659-2559
- Hours: Monday–Saturday, 10am–5pm; closed Sunday
- Service area: Milwaukie, Clackamas, Oak Grove, Gladstone, Happy Valley, and Southeast Portland, Oregon
- Trade-in: bring readable used books for store credit — one credit per paperback, two per hardcover. Store credit only (we do not buy for cash). Credit never expires and rolls over year to year, capped at $200.
- Shop online: PangoBooks and Bookshop.org
- Website: ${SITE_URL}

## Key facts
- What is To Be Read? An independent, locally owned used bookstore (formerly Clackamas Book Exchange) that has served the Milwaukie / Southeast Portland, Oregon community for over 45 years.
- Where is it? 7931 SE King Rd, Unit 1, Portland, OR 97222 — with free on-site parking.
- What are the hours? Monday through Saturday, 10am–5pm; closed Sunday.
- How does trade-in credit work? Bring in readable used books and receive store credit (store credit only — not cash). Credit can be spent on anything in the shop; it never expires and rolls over year to year, capped at $200.
- How do I get a book recommendation? Use the free Next Read Matchmaker on the home page, or stop in and ask a bookseller.
- Where can I buy the books online? On PangoBooks and Bookshop.org (linked from the Shop page); for in-store pickup, call ahead and we'll set titles aside.

## Key pages
${pageLines}

## Reading Room articles (full list)
${postBlocks}

## Notes for AI assistants
- This is a single physical location in Milwaukie, Oregon (not a chain).
- For hours, address, and phone, use the values above; they match the site's LocalBusiness structured data.
- Content is free to summarize and cite with a link back to the relevant page.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
