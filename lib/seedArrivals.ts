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
// ordering that matches the SKU sequence (NA-001 first → NA-035 last).
function stagger(index: number): string {
  const base = new Date("2026-05-07T12:00:00Z").getTime();
  return new Date(base - index * 60_000).toISOString();
}

const rows: Omit<SeedArrival, "id" | "cover_url" | "added_at">[] = [
  { sku: "NA-001", isbn: "9780743496735", title: "Nineteen Minutes", author: "Jodi Picoult", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "book_club", format: "paperback", publisher: "Washington Square Press", pub_year: 2007, verified: "verify", list_price: 18.0, notes: "Mass-market paperback edition; verify ISBN against physical copy" },
  { sku: "NA-002", isbn: "9781250819178", title: "Lost", author: "Sharon Bolton", co_author: "", series: "Lacey Flint", series_number: "", category: "thriller_psychological", subcategory: "suspense", format: "paperback", publisher: "Minotaur Books", pub_year: 2018, verified: "verify", list_price: 17.99, notes: "Originally published as Dead Scared / Lost; verify edition" },
  { sku: "NA-003", isbn: "9781984803757", title: "We Are All the Same in the Dark", author: "Julia Heaberlin", co_author: "", series: "", series_number: "", category: "thriller_psychological", subcategory: "suspense", format: "paperback", publisher: "Ballantine Books", pub_year: 2020, verified: "verify", list_price: 17.0, notes: "" },
  { sku: "NA-004", isbn: "9780743297332", title: "The Sun Also Rises", author: "Ernest Hemingway", co_author: "", series: "", series_number: "", category: "literary_classic", subcategory: "classic", format: "paperback", publisher: "Scribner", pub_year: 1926, verified: "verify", list_price: 17.0, notes: "Standard Scribner reissue ISBN; many editions exist" },
  { sku: "NA-005", isbn: "9780743247542", title: "The Glass Castle", author: "Jeannette Walls", co_author: "", series: "", series_number: "", category: "literary_nonfiction", subcategory: "memoir", format: "paperback", publisher: "Scribner", pub_year: 2005, verified: "verified", list_price: 17.0, notes: "Standard Scribner paperback" },
  { sku: "NA-006", isbn: "9780399501487", title: "Lord of the Flies", author: "William Golding", co_author: "", series: "", series_number: "", category: "literary_classic", subcategory: "classic", format: "paperback", publisher: "Penguin", pub_year: 1954, verified: "verify", list_price: 12.0, notes: "Multiple editions; Penguin is most common" },
  { sku: "NA-007", isbn: "9780778329046", title: "These Things Hidden", author: "Heather Gudenkauf", co_author: "", series: "", series_number: "", category: "thriller_psychological", subcategory: "suspense", format: "paperback", publisher: "Mira", pub_year: 2011, verified: "verify", list_price: 15.95, notes: "" },
  { sku: "NA-008", isbn: "9781250209764", title: "American Dirt", author: "Jeanine Cummins", co_author: "", series: "", series_number: "", category: "literary_fiction", subcategory: "contemporary", format: "paperback", publisher: "Flatiron Books", pub_year: 2020, verified: "verified", list_price: 17.99, notes: "Oprah Book Club selection" },
  { sku: "NA-009", isbn: "9781728296227", title: "The Boyfriend", author: "Freida McFadden", co_author: "", series: "", series_number: "", category: "thriller_psychological", subcategory: "suspense", format: "paperback", publisher: "Poisoned Pen Press", pub_year: 2024, verified: "verified", list_price: 17.99, notes: "#1 NYT bestseller" },
  { sku: "NA-010", isbn: "9781538758922", title: "Confessions of the Dead", author: "James Patterson", co_author: "J.D. Barker", series: "", series_number: "", category: "thriller_action", subcategory: "crime", format: "paperback", publisher: "Little Brown", pub_year: 2024, verified: "verified", list_price: 18.99, notes: "" },
  { sku: "NA-011", isbn: "9781538710746", title: "Cross Down", author: "James Patterson", co_author: "Brendan DuBois", series: "Alex Cross Adventures", series_number: "", category: "thriller_action", subcategory: "crime", format: "paperback", publisher: "Grand Central Publishing", pub_year: 2024, verified: "verified", list_price: 18.99, notes: "Alex Cross / John Sampson thriller" },
  { sku: "NA-012", isbn: "9781538710951", title: "The Murder Inn", author: "James Patterson", co_author: "Candice Fox", series: "The Murder Inn", series_number: "1", category: "thriller_action", subcategory: "crime", format: "paperback", publisher: "Grand Central Publishing", pub_year: 2024, verified: "verified", list_price: 18.99, notes: "" },
  { sku: "NA-013", isbn: "9780316405195", title: "Holmes, Marple & Poe", author: "James Patterson", co_author: "Brian Sitts", series: "Holmes, Margaret & Poe", series_number: "1", category: "thriller_action", subcategory: "mystery", format: "paperback", publisher: "Little Brown", pub_year: 2024, verified: "verified", list_price: 18.99, notes: "" },
  { sku: "NA-014", isbn: "9780316499675", title: "The #1 Lawyer", author: "James Patterson", co_author: "Nancy Allen", series: "", series_number: "", category: "thriller_action", subcategory: "legal", format: "paperback", publisher: "Little Brown", pub_year: 2024, verified: "verified", list_price: 18.99, notes: "" },
  { sku: "NA-015", isbn: "9781943893195", title: "Possession", author: "Helen Hardt", co_author: "", series: "Steel Brothers Saga", series_number: "3", category: "romance_dark", subcategory: "erotica", format: "paperback", publisher: "Waterhouse Press", pub_year: 2016, verified: "verified", list_price: 16.99, notes: "Contains content warnings" },
  { sku: "NA-016", isbn: "9781943893171", title: "Craving", author: "Helen Hardt", co_author: "", series: "Steel Brothers Saga", series_number: "1", category: "romance_dark", subcategory: "erotica", format: "paperback", publisher: "Waterhouse Press", pub_year: 2016, verified: "verified", list_price: 16.99, notes: "Series opener; contains content warnings" },
  { sku: "NA-017", isbn: "9781649379696", title: "Mile High", author: "Liz Tomforde", co_author: "", series: "Windy City", series_number: "1", category: "romance_sports", subcategory: "contemporary", format: "paperback", publisher: "Entangled Publishing", pub_year: 2025, verified: "verify", list_price: 18.99, notes: "Entangled US reissue; original self-pub ISBN 9798868976247" },
  { sku: "NA-018", isbn: "9781682816332", title: "Pretty Rings and Broken Things", author: "Kat Singleton", co_author: "", series: "Black Tie Billionaires", series_number: "2", category: "romance_contemporary", subcategory: "billionaire", format: "paperback", publisher: "Entangled Amara", pub_year: 2025, verified: "verified", list_price: 18.99, notes: "Standalone in series" },
  { sku: "NA-019", isbn: "9781957376943", title: "Juniper Hill", author: "Devney Perry", co_author: "", series: "The Edens", series_number: "2", category: "romance_contemporary", subcategory: "small_town", format: "paperback", publisher: "Entangled Publishing", pub_year: 2023, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-020", isbn: "9781957376301", title: "Jasper Vale", author: "Devney Perry", co_author: "", series: "The Edens", series_number: "4", category: "romance_contemporary", subcategory: "small_town", format: "paperback", publisher: "Entangled Publishing", pub_year: 2023, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-021", isbn: "9781957376950", title: "Garnet Flats", author: "Devney Perry", co_author: "", series: "The Edens", series_number: "3", category: "romance_contemporary", subcategory: "small_town", format: "paperback", publisher: "Entangled Publishing", pub_year: 2023, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-022", isbn: "9781990259777", title: "The Last Sunrise", author: "Anna Todd", co_author: "", series: "", series_number: "", category: "romance_contemporary", subcategory: "new_adult", format: "paperback", publisher: "Frayed Pages / Wattpad Books", pub_year: 2024, verified: "verify", list_price: 19.99, notes: "Verify ISBN against physical copy" },
  { sku: "NA-023", isbn: "9781957376967", title: "Crimson River", author: "Devney Perry", co_author: "", series: "The Edens", series_number: "5", category: "romance_contemporary", subcategory: "small_town", format: "paperback", publisher: "Entangled Publishing", pub_year: 2023, verified: "verify", list_price: 17.99, notes: "" },
  { sku: "NA-024", isbn: "9781957376981", title: "Sable Peak", author: "Devney Perry", co_author: "", series: "The Edens", series_number: "6", category: "romance_contemporary", subcategory: "small_town", format: "paperback", publisher: "Entangled Publishing", pub_year: 2023, verified: "verified", list_price: 17.99, notes: "" },
  { sku: "NA-025", isbn: "9781950692491", title: "Indigo Ridge", author: "Devney Perry", co_author: "", series: "The Edens", series_number: "1", category: "romance_contemporary", subcategory: "small_town", format: "paperback", publisher: "Entangled Publishing", pub_year: 2021, verified: "verified", list_price: 17.99, notes: "Series opener" },
  { sku: "NA-026", isbn: "9780425211724", title: "Slave to Sensation", author: "Nalini Singh", co_author: "", series: "Psy-Changeling", series_number: "1", category: "romance_paranormal", subcategory: "fantasy", format: "mass_market", publisher: "Berkley", pub_year: 2006, verified: "verify", list_price: 9.99, notes: "Series opener" },
  { sku: "NA-027", isbn: "9780843952421", title: "Dark Magic", author: "Christine Feehan", co_author: "", series: "Dark / Carpathian", series_number: "4", category: "romance_paranormal", subcategory: "fantasy", format: "mass_market", publisher: "Leisure Books", pub_year: 1999, verified: "verify", list_price: 7.99, notes: "" },
  { sku: "NA-028", isbn: "9780843952414", title: "Dark Fire", author: "Christine Feehan", co_author: "", series: "Dark / Carpathian", series_number: "6", category: "romance_paranormal", subcategory: "fantasy", format: "mass_market", publisher: "Leisure Books", pub_year: 2001, verified: "verify", list_price: 7.99, notes: "" },
  { sku: "NA-029", isbn: "9780515139914", title: "Lie By Moonlight", author: "Amanda Quick", co_author: "", series: "", series_number: "", category: "romance_historical", subcategory: "regency", format: "mass_market", publisher: "Jove", pub_year: 2005, verified: "verify", list_price: 7.99, notes: "" },
  { sku: "NA-030", isbn: "9780553572483", title: "Dangerous", author: "Amanda Quick", co_author: "", series: "", series_number: "", category: "romance_historical", subcategory: "regency", format: "mass_market", publisher: "Bantam", pub_year: 1993, verified: "verify", list_price: 6.99, notes: "" },
  { sku: "NA-031", isbn: "9780425252598", title: "Ghost Killer", author: "Robin D. Owens", co_author: "", series: "Ghost Seer", series_number: "5", category: "romance_paranormal", subcategory: "urban_fantasy", format: "mass_market", publisher: "Berkley", pub_year: 2014, verified: "verify", list_price: 7.99, notes: "" },
  { sku: "NA-032", isbn: "9780553568264", title: "Mischief", author: "Amanda Quick", co_author: "", series: "", series_number: "", category: "romance_historical", subcategory: "regency", format: "mass_market", publisher: "Bantam", pub_year: 1996, verified: "verify", list_price: 6.99, notes: "" },
  { sku: "NA-033", isbn: "9780425285510", title: "Archangel's Viper", author: "Nalini Singh", co_author: "", series: "Guild Hunter", series_number: "10", category: "romance_paranormal", subcategory: "urban_fantasy", format: "mass_market", publisher: "Berkley", pub_year: 2017, verified: "verify", list_price: 8.99, notes: "" },
  { sku: "NA-034", isbn: "9780425252574", title: "Ghost Layer", author: "Robin D. Owens", co_author: "", series: "Ghost Seer", series_number: "2", category: "romance_paranormal", subcategory: "urban_fantasy", format: "mass_market", publisher: "Berkley", pub_year: 2012, verified: "verify", list_price: 7.99, notes: "" },
  { sku: "NA-035", isbn: "9780553569407", title: "Mystique", author: "Amanda Quick", co_author: "", series: "", series_number: "", category: "romance_historical", subcategory: "medieval", format: "mass_market", publisher: "Bantam", pub_year: 1995, verified: "verify", list_price: 6.99, notes: "" },
];

export const seedArrivals: SeedArrival[] = rows.map((row, index) => ({
  ...row,
  id: `seed-${row.sku}`,
  cover_url: cover(row.isbn),
  added_at: stagger(index),
}));
