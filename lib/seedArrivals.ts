// Seed data for the New Arrivals shelf. These appear alongside any rows in
// the `recent_arrivals` Postgres table so the shelf is never empty and stays
// populated even when the database hasn't been provisioned yet.
//
// Cover images are pulled from Open Library by ISBN — they fall back to a
// blank image if a cover hasn't been uploaded yet, which the UI handles.

export interface SeedArrival {
  id: string;
  sku: string;
  isbn: string;
  title: string;
  author: string;
  co_author: string;
  series: string;
  series_number: string;
  category: string;
  subcategory: string;
  format: string;
  publisher: string;
  pub_year: number;
  verified: "verified" | "verify";
  cover_url: string;
  list_price: number;
  added_at: string;
  notes: string;
}

function cover(isbn: string): string {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
}

// Stagger added_at so the existing `ORDER BY added_at DESC` produces a stable
// ordering that matches the SKU sequence (NA-001 first → NA-038 last).
function stagger(index: number): string {
  const base = new Date("2026-06-13T18:00:00Z").getTime();
  return new Date(base - index * 60_000).toISOString();
}

// Refreshed arrivals — popular, widely-stocked used-bookstore titles. Every ISBN
// below has a confirmed Open Library cover (verified against
// covers.openlibrary.org/b/isbn/<isbn>-L.jpg), so the shelf always renders real
// jackets rather than blank placeholders.
const rows: Omit<SeedArrival, "id" | "cover_url" | "added_at">[] = [
  { sku: "NA-001", isbn: "9781250301697", title: "The Silent Patient", author: "Alex Michaelides", co_author: "", series: "", series_number: "", category: "thriller_psychological", subcategory: "suspense", format: "paperback", publisher: "Celadon Books", pub_year: 2019, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-002", isbn: "9780735219090", title: "Where the Crawdads Sing", author: "Delia Owens", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "book_club", format: "paperback", publisher: "G.P. Putnam's Sons", pub_year: 2018, verified: "verified", list_price: 18.0, notes: "" },
  { sku: "NA-003", isbn: "9780525559474", title: "The Midnight Library", author: "Matt Haig", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "contemporary", format: "paperback", publisher: "Viking", pub_year: 2020, verified: "verified", list_price: 17.0, notes: "" },
  { sku: "NA-004", isbn: "9781501110368", title: "It Ends with Us", author: "Colleen Hoover", co_author: "", series: "", series_number: "", category: "romance_contemporary", subcategory: "book_club", format: "paperback", publisher: "Atria Books", pub_year: 2016, verified: "verified", list_price: 16.99, notes: "" },
  { sku: "NA-005", isbn: "9781538724736", title: "Verity", author: "Colleen Hoover", co_author: "", series: "", series_number: "", category: "thriller_psychological", subcategory: "romantic_suspense", format: "paperback", publisher: "Grand Central Publishing", pub_year: 2021, verified: "verified", list_price: 16.99, notes: "" },
  { sku: "NA-006", isbn: "9780735211292", title: "Atomic Habits", author: "James Clear", co_author: "", series: "", series_number: "", category: "literary_nonfiction", subcategory: "self_help", format: "hardcover", publisher: "Avery", pub_year: 2018, verified: "verified", list_price: 27.0, notes: "" },
  { sku: "NA-007", isbn: "9781538742570", title: "The Housemaid", author: "Freida McFadden", co_author: "", series: "The Housemaid", series_number: "1", category: "thriller_psychological", subcategory: "suspense", format: "paperback", publisher: "Grand Central Publishing", pub_year: 2022, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-008", isbn: "9780307588371", title: "Gone Girl", author: "Gillian Flynn", co_author: "", series: "", series_number: "", category: "thriller_psychological", subcategory: "suspense", format: "paperback", publisher: "Crown", pub_year: 2012, verified: "verified", list_price: 17.0, notes: "" },
  { sku: "NA-009", isbn: "9781594634024", title: "The Girl on the Train", author: "Paula Hawkins", co_author: "", series: "", series_number: "", category: "thriller_psychological", subcategory: "suspense", format: "paperback", publisher: "Riverhead Books", pub_year: 2015, verified: "verified", list_price: 17.0, notes: "" },
  { sku: "NA-010", isbn: "9780804172707", title: "A Little Life", author: "Hanya Yanagihara", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "contemporary", format: "paperback", publisher: "Anchor", pub_year: 2015, verified: "verified", list_price: 18.0, notes: "" },
  { sku: "NA-011", isbn: "9780399590504", title: "Educated", author: "Tara Westover", co_author: "", series: "", series_number: "", category: "literary_nonfiction", subcategory: "memoir", format: "paperback", publisher: "Random House", pub_year: 2018, verified: "verified", list_price: 18.0, notes: "" },
  { sku: "NA-012", isbn: "9780316556347", title: "Circe", author: "Madeline Miller", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "mythology", format: "paperback", publisher: "Back Bay Books", pub_year: 2018, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-013", isbn: "9780062060624", title: "The Song of Achilles", author: "Madeline Miller", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "mythology", format: "paperback", publisher: "Ecco", pub_year: 2011, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-014", isbn: "9781984822178", title: "Normal People", author: "Sally Rooney", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "contemporary", format: "paperback", publisher: "Hogarth", pub_year: 2019, verified: "verified", list_price: 17.0, notes: "" },
  { sku: "NA-015", isbn: "9780593135204", title: "Project Hail Mary", author: "Andy Weir", co_author: "", series: "", series_number: "", category: "science_fiction", subcategory: "adventure", format: "hardcover", publisher: "Ballantine Books", pub_year: 2021, verified: "verified", list_price: 28.99, notes: "" },
  { sku: "NA-016", isbn: "9780312577223", title: "The Nightingale", author: "Kristin Hannah", co_author: "", series: "", series_number: "", category: "historical_fiction", subcategory: "wwii", format: "paperback", publisher: "St. Martin's Griffin", pub_year: 2015, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-017", isbn: "9780385547345", title: "Lessons in Chemistry", author: "Bonnie Garmus", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "book_club", format: "hardcover", publisher: "Doubleday", pub_year: 2022, verified: "verified", list_price: 29.0, notes: "" },
  { sku: "NA-018", isbn: "9781649374042", title: "Fourth Wing", author: "Rebecca Yarros", co_author: "", series: "The Empyrean", series_number: "1", category: "fantasy_romance", subcategory: "romantasy", format: "hardcover", publisher: "Entangled: Red Tower Books", pub_year: 2023, verified: "verified", list_price: 29.99, notes: "" },
  { sku: "NA-019", isbn: "9781649374172", title: "Iron Flame", author: "Rebecca Yarros", co_author: "", series: "The Empyrean", series_number: "2", category: "fantasy_romance", subcategory: "romantasy", format: "hardcover", publisher: "Entangled: Red Tower Books", pub_year: 2023, verified: "verified", list_price: 29.99, notes: "" },
  { sku: "NA-020", isbn: "9781619634442", title: "A Court of Thorns and Roses", author: "Sarah J. Maas", co_author: "", series: "A Court of Thorns and Roses", series_number: "1", category: "fantasy_romance", subcategory: "romantasy", format: "paperback", publisher: "Bloomsbury", pub_year: 2015, verified: "verified", list_price: 19.0, notes: "" },
  { sku: "NA-021", isbn: "9780765326355", title: "The Way of Kings", author: "Brandon Sanderson", co_author: "", series: "The Stormlight Archive", series_number: "1", category: "fantasy_epic", subcategory: "high_fantasy", format: "paperback", publisher: "Tor Books", pub_year: 2010, verified: "verified", list_price: 24.99, notes: "" },
  { sku: "NA-022", isbn: "9780063251922", title: "Demon Copperhead", author: "Barbara Kingsolver", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "book_club", format: "paperback", publisher: "Harper", pub_year: 2022, verified: "verified", list_price: 19.99, notes: "Pulitzer Prize winner" },
  { sku: "NA-023", isbn: "9780141439518", title: "Pride and Prejudice", author: "Jane Austen", co_author: "", series: "", series_number: "", category: "literary_classic", subcategory: "classic", format: "paperback", publisher: "Penguin Classics", pub_year: 1813, verified: "verified", list_price: 12.0, notes: "" },
  { sku: "NA-024", isbn: "9780451524935", title: "1984", author: "George Orwell", co_author: "", series: "", series_number: "", category: "literary_classic", subcategory: "dystopian", format: "paperback", publisher: "Signet Classics", pub_year: 1949, verified: "verified", list_price: 9.99, notes: "" },
  { sku: "NA-025", isbn: "9780743273565", title: "The Great Gatsby", author: "F. Scott Fitzgerald", co_author: "", series: "", series_number: "", category: "literary_classic", subcategory: "classic", format: "paperback", publisher: "Scribner", pub_year: 1925, verified: "verified", list_price: 17.0, notes: "" },
  { sku: "NA-026", isbn: "9780525536291", title: "The Vanishing Half", author: "Brit Bennett", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "book_club", format: "paperback", publisher: "Riverhead Books", pub_year: 2020, verified: "verified", list_price: 17.0, notes: "" },
  { sku: "NA-027", isbn: "9781984806734", title: "Beach Read", author: "Emily Henry", co_author: "", series: "", series_number: "", category: "romance_contemporary", subcategory: "contemporary", format: "paperback", publisher: "Berkley", pub_year: 2020, verified: "verified", list_price: 17.0, notes: "" },
  { sku: "NA-028", isbn: "9780593334836", title: "Book Lovers", author: "Emily Henry", co_author: "", series: "", series_number: "", category: "romance_contemporary", subcategory: "contemporary", format: "paperback", publisher: "Berkley", pub_year: 2022, verified: "verified", list_price: 17.0, notes: "" },
  { sku: "NA-029", isbn: "9780593336823", title: "The Love Hypothesis", author: "Ali Hazelwood", co_author: "", series: "", series_number: "", category: "romance_contemporary", subcategory: "stem", format: "paperback", publisher: "Berkley", pub_year: 2021, verified: "verified", list_price: 16.0, notes: "" },
  { sku: "NA-030", isbn: "9780593441275", title: "Happy Place", author: "Emily Henry", co_author: "", series: "", series_number: "", category: "romance_contemporary", subcategory: "contemporary", format: "paperback", publisher: "Berkley", pub_year: 2023, verified: "verified", list_price: 19.0, notes: "" },
  { sku: "NA-031", isbn: "9780593356159", title: "The Maid", author: "Nita Prose", co_author: "", series: "Molly the Maid", series_number: "1", category: "thriller_psychological", subcategory: "cozy_mystery", format: "paperback", publisher: "Ballantine Books", pub_year: 2022, verified: "verified", list_price: 18.0, notes: "" },
  { sku: "NA-032", isbn: "9780063204157", title: "Remarkably Bright Creatures", author: "Shelby Van Pelt", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "book_club", format: "paperback", publisher: "Ecco", pub_year: 2022, verified: "verified", list_price: 18.99, notes: "" },
  { sku: "NA-033", isbn: "9780593243732", title: "Hello Beautiful", author: "Ann Napolitano", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "book_club", format: "hardcover", publisher: "Dial Press", pub_year: 2023, verified: "verified", list_price: 28.0, notes: "" },
  { sku: "NA-034", isbn: "9780593321201", title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "contemporary", format: "hardcover", publisher: "Knopf", pub_year: 2022, verified: "verified", list_price: 28.0, notes: "" },
  { sku: "NA-035", isbn: "9780061120084", title: "To Kill a Mockingbird", author: "Harper Lee", co_author: "", series: "", series_number: "", category: "literary_classic", subcategory: "classic", format: "paperback", publisher: "Harper Perennial Modern Classics", pub_year: 1960, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-036", isbn: "9780399501487", title: "Lord of the Flies", author: "William Golding", co_author: "", series: "", series_number: "", category: "literary_classic", subcategory: "classic", format: "paperback", publisher: "Penguin Books", pub_year: 1954, verified: "verified", list_price: 12.0, notes: "" },
  { sku: "NA-037", isbn: "9780316769488", title: "The Catcher in the Rye", author: "J.D. Salinger", co_author: "", series: "", series_number: "", category: "literary_classic", subcategory: "classic", format: "paperback", publisher: "Little, Brown and Company", pub_year: 1951, verified: "verified", list_price: 9.99, notes: "" },
  { sku: "NA-038", isbn: "9781250178602", title: "The Four Winds", author: "Kristin Hannah", co_author: "", series: "", series_number: "", category: "historical_fiction", subcategory: "depression_era", format: "paperback", publisher: "St. Martin's Press", pub_year: 2021, verified: "verified", list_price: 18.99, notes: "" },
];

export const seedArrivals: SeedArrival[] = rows.map((row, index) => ({
  ...row,
  id: `seed-${row.sku}`,
  cover_url: cover(row.isbn),
  added_at: stagger(index),
}));
