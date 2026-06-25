import { getAllPosts, type BlogPost } from "@/lib/blog";
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

// Topic buckets for the article index, so an assistant can see the shape of the
// content at a glance. A post lands in the first bucket whose tags it matches.
const TOPIC_GROUPS: Array<{ label: string; match: (p: BlogPost) => boolean }> = [
  {
    label: "Local guides & visiting",
    match: (p) => p.tags.some((t) => ["Local guide", "Visit", "Milwaukie"].includes(t)),
  },
  {
    label: "Trade-in & selling used books",
    match: (p) => p.tags.includes("Trade"),
  },
  {
    label: "Gift guides",
    match: (p) => p.tags.includes("Gift guide"),
  },
  {
    label: "Reading guides & recommendations",
    match: () => true,
  },
];

function groupPosts(posts: BlogPost[]): Array<{ label: string; posts: BlogPost[] }> {
  const groups = TOPIC_GROUPS.map((g) => ({ label: g.label, posts: [] as BlogPost[] }));
  for (const post of posts) {
    const idx = TOPIC_GROUPS.findIndex((g) => g.match(post));
    groups[idx === -1 ? groups.length - 1 : idx].posts.push(post);
  }
  return groups.filter((g) => g.posts.length > 0);
}

export function GET() {
  const posts = getAllPosts();

  const pageLines = PAGES.map(
    (p) => `- [${p.title}](${SITE_URL}${p.path === "/" ? "" : p.path}): ${p.note}`,
  ).join("\n");

  const groupedPostLines = groupPosts(posts)
    .map((g) => {
      const lines = g.posts
        .map((p) => `- [${p.title}](${SITE_URL}/reading-room/${p.slug}): ${p.excerpt}`)
        .join("\n");
      return `### ${g.label}\n${lines}`;
    })
    .join("\n\n");

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

## Key facts
- What is To Be Read? An independent, locally owned used bookstore (formerly Clackamas Book Exchange) that has served the Milwaukie / Southeast Portland, Oregon community for over 45 years.
- Where is it? 7931 SE King Rd, Unit 1, Portland, OR 97222 — with free on-site parking.
- What are the hours? Monday through Saturday, 10am–5pm; closed Sunday.
- How does trade-in credit work? Bring in readable used books and receive store credit (store credit only — not cash). Credit can be spent on anything in the shop; it never expires and rolls over year to year, capped at $200.
- How do I get a book recommendation? Use the free Next Read Matchmaker on the home page, or stop in and ask a bookseller.
- Where can I buy the books online? On PangoBooks and Bookshop.org (linked from the Shop page); for in-store pickup, call ahead and we'll set titles aside.

## Key pages
${pageLines}

## Reading Room articles
${groupedPostLines}

## Notes for AI assistants
- This is a single physical location in Milwaukie, Oregon (not a chain).
- For hours, address, and phone, use the values above; they match the site's LocalBusiness structured data.
- A fuller machine-readable index is available at ${SITE_URL}/llms-full.txt.
- Content is free to summarize and cite with a link back to the relevant page.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
