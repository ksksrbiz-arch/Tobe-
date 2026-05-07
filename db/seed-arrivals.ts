/**
 * One-shot seeder for the "Fresh arrivals at the trade desk" feed.
 *
 * Usage:
 *   NETLIFY_DATABASE_URL=postgres://... \
 *   GOOGLE_BOOKS_API_KEY=optional \
 *   npx tsx db/seed-arrivals.ts
 *
 * For each entry, looks up title + author via Google Books, then inserts a row
 * into `recent_arrivals`. Skips silently when a book can't be found. Spaces
 * `added_at` by ~1 second per book so the feed orders predictably.
 */
import { neon } from "@neondatabase/serverless";

type Entry = { title: string; author?: string };

// Books photographed at the trade desk, grouped roughly by photo so the most
// recently shelved (image 1) sit at the top of the feed.
const BOOKS: Entry[] = [
  // image 1 — international / front shelf
  { title: "Hot Wok", author: "Hugh Carpenter" },
  { title: "Cracking the Coconut", author: "Su-Mei Yu" },
  { title: "The Wisdom of the Chinese Kitchen", author: "Grace Young" },
  { title: "Healthy Thai Cooking", author: "Vatcharin Bhumichitr" },
  { title: "Asian Vegetables", author: "Sallie Morris" },
  { title: "Vatch's Thai Street Food", author: "Vatcharin Bhumichitr" },
  { title: "Vatch's Thai Kitchen", author: "Vatcharin Bhumichitr" },
  { title: "Japanese Cookbook for Beginners", author: "Azusa Oda" },
  { title: "More Japanese Garnishes", author: "Yukiko Haydock" },
  { title: "Saveur Cooks Authentic French" },
  { title: "The Book of Jewish Food", author: "Claudia Roden" },
  { title: "The Turkish Cookbook" },
  { title: "Where Flavor Was Born", author: "Andreas Viestad" },
  { title: "Saveur Cooks Authentic American" },
  { title: "Treasury of Country Recipes", author: "Land O'Lakes" },

  // image 2 — drinks
  { title: "Great American Craft Beer", author: "Andy Crouch" },
  { title: "Smuggler's Cove", author: "Martin Cate" },
  { title: "Tiki: Modern Tropical Cocktails" },
  { title: "The New Wine Lover's Companion", author: "Ron Herbst" },
  { title: "The Original Portuguese Cookbook" },
  { title: "Rum Fever and Caribbean Party Cookbook", author: "Barbara Currie DeVoy" },

  // image 3 — celebrity / TV / general
  { title: "Food, Health and Happiness", author: "Daphne Oz" },
  { title: "The Happy Cook", author: "Daphne Oz" },
  { title: "Linda McCartney's Family Kitchen", author: "Linda McCartney" },
  { title: "500 Treasured Country Recipes", author: "Martha Storey" },
  { title: "Rocco's Five Minute Flavor", author: "Rocco DiSpirito" },
  { title: "Emeril's TV Dinners", author: "Emeril Lagasse" },
  { title: "Mark Bittman's Kitchen Express", author: "Mark Bittman" },
  { title: "The Martha Stewart Living Cookbook", author: "Martha Stewart" },
  { title: "Great Food Fast", author: "Martha Stewart" },
  { title: "La Vera Cucina", author: "Carlo Middione" },
  { title: "Eat, Drink, and Be Murray", author: "Andy Murray" },
  { title: "Chef Paul Prudhomme's Pure Magic", author: "Paul Prudhomme" },
  { title: "The Deaf Smith Country Cookbook" },
  { title: "Food Network Kitchens Cookbook" },
  { title: "Food Network Kitchens" },
  { title: "The Quick Recipe", author: "Cook's Illustrated" },
  { title: "The Best Recipe Classic", author: "Cook's Illustrated" },
  { title: "Inside America's Test Kitchen", author: "Christopher Kimball" },
  { title: "Cooking Secrets of the CIA" },
  { title: "More Cooking Secrets of the CIA" },
  { title: "Keo's Thai Cuisine", author: "Keo Sananikone" },

  // image 4 — Mexican / blender / diet
  { title: "BlendJet Next-Gen Blending" },
  { title: "Squeezed: 250 Juices, Smoothies + Spritzers", author: "Jane Lawson" },
  { title: "Ninja Pulse It Up" },
  { title: "Salsas That Cook", author: "Rick Bayless" },
  { title: "Rick Bayless's Mexican Kitchen", author: "Rick Bayless" },
  { title: "Mexico One Plate at a Time", author: "Rick Bayless" },
  { title: "Rancho Cooking", author: "Jacqueline Higuera McMahan" },
  { title: "Authentic Mexican", author: "Rick Bayless" },
  { title: "Inspiralized", author: "Ali Maffucci" },
  { title: "The Type 2 Diabetes Cookbook", author: "Laura Cipullo" },
  { title: "The Negative Calorie Diet", author: "Rocco DiSpirito" },
  { title: "The myWW Program Cookbook" },
  { title: "The Ketogenic Diet Cookbook", author: "Hughes" },
  { title: "Southern Keto: Beyond the Basics", author: "Natasha Newton" },
  { title: "The 30-Day Ketogenic Cleanse", author: "Maria Emmerich" },
  { title: "Incredibly Easy Gluten-Free Recipes" },
  { title: "The Healthy Gluten-Free Life", author: "Tammy Credicott" },

  // image 5 — baking / spices / grilling
  { title: "1 Dough, 100 Cookies" },
  { title: "Lion House Cakes and Cupcakes" },
  { title: "Super Simple Cupcake Recipes" },
  { title: "The Cookie Book", author: "Catherine Atkinson" },
  { title: "Piece of Cake: Home Baking Made Simple", author: "Susan Russo" },
  { title: "Cupcakes! Muffins & More" },
  { title: "Nestle All-Time Favorite Cookie and Baking Recipes" },
  { title: "Best of Betty Crocker 2010" },
  { title: "Saffron", author: "Pat Willard" },
  { title: "The Healing Powers of Vinegar", author: "Cal Orey" },
  { title: "Salt: A World History", author: "Mark Kurlansky" },
  { title: "The Kitchen Pantry Cookbook", author: "Erin Coopey" },
  { title: "Red Hot!", author: "Jenny Fleetwood" },
  { title: "Favorite Brand Name Grilling and More" },
  { title: "Cooking with Fire", author: "Kristian Tapaninaho" },
  { title: "Weber's Art of the Grill" },

  // image 7 — appliances / vegetarian / Italian
  { title: "Everybody Loves Ramen", author: "Eric Hites" },
  { title: "Fix-It and Forget-It Cookbook", author: "Phyllis Pellman Good" },
  { title: "The I Love My Air Fryer Three-Step Recipe Book" },
  { title: "Pressure Cooker Perfection", author: "America's Test Kitchen" },
  { title: "Great Food Fast", author: "Bob Warden" },
  { title: "Instant Pot Obsession", author: "Janet Zimmerman" },
  { title: "The Ultimate Instant Pot Cookbook", author: "Coco Morante" },
  { title: "Bob Warden's Ninja Master Prep Professional Cookbook", author: "Bob Warden" },
  { title: "The Big Book of Casseroles", author: "Maryana Vollstedt" },
  { title: "Cook Once Dinner Fix", author: "Cassy Joy Garcia" },
  { title: "One Pot Meals for People with Diabetes" },
  { title: "Luscious Lemon Desserts", author: "Lori Longbotham" },
  { title: "Peas and Thank You", author: "Sarah Matheny" },
  { title: "Laurel's Kitchen", author: "Laurel Robertson" },
  { title: "Vegetable Soups from Deborah Madison's Kitchen", author: "Deborah Madison" },
  { title: "In Season", author: "Sarah Raven" },
  { title: "Mario Batali Italian Grill", author: "Mario Batali" },
  { title: "Fabio's 30-Minute Italian", author: "Fabio Viviani" },
  { title: "The Cafe Cook Book", author: "Rose Gray" },
  { title: "The Food of Southern Italy", author: "Carlo Middione" },
  { title: "Italian", author: "Carla Capalbo" },
  { title: "200 Veggie Feasts" },
];

type Volume = {
  volumeInfo?: {
    title?: string;
    authors?: string[];
    industryIdentifiers?: { type: string; identifier: string }[];
    imageLinks?: { thumbnail?: string };
  };
  saleInfo?: {
    listPrice?: { amount?: number };
    retailPrice?: { amount?: number };
  };
};

async function lookup(entry: Entry) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const q = entry.author
    ? `intitle:${entry.title}+inauthor:${entry.author}`
    : `intitle:${entry.title}`;
  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.set("q", q);
  url.searchParams.set("maxResults", "1");
  if (apiKey) url.searchParams.set("key", apiKey);

  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) return null;
  const json = (await res.json()) as { items?: Volume[] };
  const item = json.items?.[0];
  if (!item) return null;
  const info = item.volumeInfo ?? {};
  const sale = item.saleInfo ?? {};
  const isbn13 =
    info.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier;
  const isbn10 =
    info.industryIdentifiers?.find((i) => i.type === "ISBN_10")?.identifier;
  const isbn = isbn13 ?? isbn10;
  if (!isbn) return null;
  return {
    isbn,
    title: info.title ?? entry.title,
    author: (info.authors ?? (entry.author ? [entry.author] : [])).join(", "),
    cover_url: info.imageLinks?.thumbnail?.replace("http://", "https://") ?? "",
    list_price: sale.retailPrice?.amount ?? sale.listPrice?.amount ?? 0,
  };
}

async function main() {
  const connectionString =
    process.env.NETLIFY_DATABASE_URL ?? process.env.DATABASE_URL ?? "";
  if (!connectionString) {
    console.error(
      "NETLIFY_DATABASE_URL (or DATABASE_URL) must be set in the environment.",
    );
    process.exit(1);
  }
  const sql = neon(connectionString);

  const baseTime = Date.now();
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < BOOKS.length; i++) {
    const entry = BOOKS[i];
    try {
      const book = await lookup(entry);
      if (!book) {
        console.warn(`  skip — no match for "${entry.title}"`);
        skipped++;
        continue;
      }
      // Stagger added_at: most recent at top, 2 seconds apart so the order is
      // stable but the timestamps still feel like a real shelving session.
      const addedAt = new Date(baseTime - i * 2000).toISOString();
      await sql`
        INSERT INTO recent_arrivals
          (isbn, title, author, cover_url, list_price, added_at)
        VALUES
          (${book.isbn}, ${book.title}, ${book.author}, ${book.cover_url},
           ${book.list_price}, ${addedAt})
      `;
      inserted++;
      console.log(`  ✓ ${book.title} — ${book.author || "—"}`);
    } catch (err) {
      skipped++;
      console.warn(
        `  skip — ${entry.title}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
    // Be polite to Google Books — 200ms between calls keeps us well under
    // the unauthenticated rate limit.
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone. Inserted ${inserted}, skipped ${skipped}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
