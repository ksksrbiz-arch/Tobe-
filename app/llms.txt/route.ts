import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

// llms.txt — a curated, machine-readable index for AI / generative search
// engines (the "robots.txt for LLMs" convention). Auto-regenerated at build
// time from the post registry so it always lists current content.
export const dynamic = "force-static";

const PAGES: Array<{ title: string; path: string; note: string }> = [
  { title: "Home", path: "/", note: "Overview, featured books, and the AI Next Read Matchmaker." },
  { title: "Plan Your Visit", path: "/visit", note: "Address, hours, parking, transit, accessibility, and map." },
  { title: "Trade Your Books", path: "/trade", note: "Trade used books for store credit; what we accept." },
  { title: "How It Works", path: "/how-it-works", note: "Step-by-step guide to trading and store credit." },
  { title: "Shop Online", path: "/shop", note: "Curated used books on PangoBooks and Bookshop.org." },
  { title: "About the Store", path: "/about", note: "History and story of the shop." },
  { title: "Connect", path: "/connect", note: "Contact details and social channels." },
  { title: "The Reading Room", path: "/reading-room", note: "Blog: reading guides, recommendations, and local tips." },
];

export function GET() {
  const posts = getAllPosts();

  const pageLines = PAGES.map(
    (p) => `- [${p.title}](${SITE_URL}${p.path === "/" ? "" : p.path}): ${p.note}`,
  ).join("\n");

  const postLines = posts
    .map((p) => `- [${p.title}](${SITE_URL}/reading-room/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const body = `# ${SITE_NAME}

> An independent used bookstore in Milwaukie, Oregon. Trade used books for store credit, browse thousands of secondhand titles in-store and online, and get AI-powered book recommendations.

## About
- Business name: To Be Read (TBR), formerly/also Clackamas Book Exchange
- Address: 7931 SE King Rd, Unit 1, Portland, OR 97222
- Phone: (503) 659-2559
- Hours: Monday–Saturday, 10am–5pm; closed Sunday
- Service area: Milwaukie, Clackamas, Oak Grove, Gladstone, Happy Valley, and Southeast Portland, Oregon
- Trade-in: bring readable used books for store credit — one credit per paperback, two per hardcover. Store credit only (we do not buy for cash). Credit never expires and rolls over year to year, capped at $200.
- Shop online: PangoBooks and Bookshop.org
- Website: ${SITE_URL}

## Key pages
${pageLines}

## Reading Room articles
${postLines}

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
