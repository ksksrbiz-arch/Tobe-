-- Seed New Arrivals into the recent_arrivals table.
-- Idempotent on ISBN — re-running updates the metadata without duplicating rows.
-- Run after db/schema.sql has been applied.

CREATE UNIQUE INDEX IF NOT EXISTS recent_arrivals_isbn_unique ON recent_arrivals (isbn);

INSERT INTO recent_arrivals
  (sku, isbn, title, author, co_author, series, series_number, category, subcategory, format, publisher, pub_year, verified, cover_url, list_price, notes, added_at)
VALUES
  ('NA-001','9780743496735','Nineteen Minutes','Jodi Picoult','','','','literary_fiction','book_club','paperback','Washington Square Press',2007,'verify','https://covers.openlibrary.org/b/isbn/9780743496735-L.jpg',18.00,'Mass-market paperback edition; verify ISBN against physical copy', NOW() - INTERVAL '0 minutes'),
  ('NA-002','9781250819178','Lost','Sharon Bolton','','Lacey Flint','','thriller_psychological','suspense','paperback','Minotaur Books',2018,'verify','https://covers.openlibrary.org/b/isbn/9781250819178-L.jpg',17.99,'Originally published as Dead Scared / Lost; verify edition', NOW() - INTERVAL '1 minutes'),
  ('NA-003','9781984803757','We Are All the Same in the Dark','Julia Heaberlin','','','','thriller_psychological','suspense','paperback','Ballantine Books',2020,'verify','https://covers.openlibrary.org/b/isbn/9781984803757-L.jpg',17.00,'', NOW() - INTERVAL '2 minutes'),
  ('NA-004','9780743297332','The Sun Also Rises','Ernest Hemingway','','','','literary_classic','classic','paperback','Scribner',1926,'verify','https://covers.openlibrary.org/b/isbn/9780743297332-L.jpg',17.00,'Standard Scribner reissue ISBN; many editions exist', NOW() - INTERVAL '3 minutes'),
  ('NA-005','9780743247542','The Glass Castle','Jeannette Walls','','','','literary_nonfiction','memoir','paperback','Scribner',2005,'verified','https://covers.openlibrary.org/b/isbn/9780743247542-L.jpg',17.00,'Standard Scribner paperback', NOW() - INTERVAL '4 minutes'),
  ('NA-006','9780399501487','Lord of the Flies','William Golding','','','','literary_classic','classic','paperback','Penguin',1954,'verify','https://covers.openlibrary.org/b/isbn/9780399501487-L.jpg',12.00,'Multiple editions; Penguin is most common', NOW() - INTERVAL '5 minutes'),
  ('NA-007','9780778329046','These Things Hidden','Heather Gudenkauf','','','','thriller_psychological','suspense','paperback','Mira',2011,'verify','https://covers.openlibrary.org/b/isbn/9780778329046-L.jpg',15.95,'', NOW() - INTERVAL '6 minutes'),
  ('NA-008','9781250209764','American Dirt','Jeanine Cummins','','','','literary_fiction','contemporary','paperback','Flatiron Books',2020,'verified','https://covers.openlibrary.org/b/isbn/9781250209764-L.jpg',17.99,'Oprah Book Club selection', NOW() - INTERVAL '7 minutes'),
  ('NA-009','9781728296227','The Boyfriend','Freida McFadden','','','','thriller_psychological','suspense','paperback','Poisoned Pen Press',2024,'verified','https://covers.openlibrary.org/b/isbn/9781728296227-L.jpg',17.99,'#1 NYT bestseller', NOW() - INTERVAL '8 minutes'),
  ('NA-010','9781538758922','Confessions of the Dead','James Patterson','J.D. Barker','','','thriller_action','crime','paperback','Little Brown',2024,'verified','https://covers.openlibrary.org/b/isbn/9781538758922-L.jpg',18.99,'', NOW() - INTERVAL '9 minutes'),
  ('NA-011','9781538710746','Cross Down','James Patterson','Brendan DuBois','Alex Cross Adventures','','thriller_action','crime','paperback','Grand Central Publishing',2024,'verified','https://covers.openlibrary.org/b/isbn/9781538710746-L.jpg',18.99,'Alex Cross / John Sampson thriller', NOW() - INTERVAL '10 minutes'),
  ('NA-012','9781538710951','The Murder Inn','James Patterson','Candice Fox','The Murder Inn','1','thriller_action','crime','paperback','Grand Central Publishing',2024,'verified','https://covers.openlibrary.org/b/isbn/9781538710951-L.jpg',18.99,'', NOW() - INTERVAL '11 minutes'),
  ('NA-013','9780316405195','Holmes, Marple & Poe','James Patterson','Brian Sitts','Holmes, Margaret & Poe','1','thriller_action','mystery','paperback','Little Brown',2024,'verified','https://covers.openlibrary.org/b/isbn/9780316405195-L.jpg',18.99,'', NOW() - INTERVAL '12 minutes'),
  ('NA-014','9780316499675','The #1 Lawyer','James Patterson','Nancy Allen','','','thriller_action','legal','paperback','Little Brown',2024,'verified','https://covers.openlibrary.org/b/isbn/9780316499675-L.jpg',18.99,'', NOW() - INTERVAL '13 minutes'),
  ('NA-015','9781943893195','Possession','Helen Hardt','','Steel Brothers Saga','3','romance_dark','erotica','paperback','Waterhouse Press',2016,'verified','https://covers.openlibrary.org/b/isbn/9781943893195-L.jpg',16.99,'Contains content warnings', NOW() - INTERVAL '14 minutes'),
  ('NA-016','9781943893171','Craving','Helen Hardt','','Steel Brothers Saga','1','romance_dark','erotica','paperback','Waterhouse Press',2016,'verified','https://covers.openlibrary.org/b/isbn/9781943893171-L.jpg',16.99,'Series opener; contains content warnings', NOW() - INTERVAL '15 minutes'),
  ('NA-017','9781649379696','Mile High','Liz Tomforde','','Windy City','1','romance_sports','contemporary','paperback','Entangled Publishing',2025,'verify','https://covers.openlibrary.org/b/isbn/9781649379696-L.jpg',18.99,'Entangled US reissue; original self-pub ISBN 9798868976247', NOW() - INTERVAL '16 minutes'),
  ('NA-018','9781682816332','Pretty Rings and Broken Things','Kat Singleton','','Black Tie Billionaires','2','romance_contemporary','billionaire','paperback','Entangled Amara',2025,'verified','https://covers.openlibrary.org/b/isbn/9781682816332-L.jpg',18.99,'Standalone in series', NOW() - INTERVAL '17 minutes'),
  ('NA-019','9781957376943','Juniper Hill','Devney Perry','','The Edens','2','romance_contemporary','small_town','paperback','Entangled Publishing',2023,'verified','https://covers.openlibrary.org/b/isbn/9781957376943-L.jpg',17.99,'', NOW() - INTERVAL '18 minutes'),
  ('NA-020','9781957376301','Jasper Vale','Devney Perry','','The Edens','4','romance_contemporary','small_town','paperback','Entangled Publishing',2023,'verified','https://covers.openlibrary.org/b/isbn/9781957376301-L.jpg',17.99,'', NOW() - INTERVAL '19 minutes'),
  ('NA-021','9781957376950','Garnet Flats','Devney Perry','','The Edens','3','romance_contemporary','small_town','paperback','Entangled Publishing',2023,'verified','https://covers.openlibrary.org/b/isbn/9781957376950-L.jpg',17.99,'', NOW() - INTERVAL '20 minutes'),
  ('NA-022','9781990259777','The Last Sunrise','Anna Todd','','','','romance_contemporary','new_adult','paperback','Frayed Pages / Wattpad Books',2024,'verify','https://covers.openlibrary.org/b/isbn/9781990259777-L.jpg',19.99,'Verify ISBN against physical copy', NOW() - INTERVAL '21 minutes'),
  ('NA-023','9781957376967','Crimson River','Devney Perry','','The Edens','5','romance_contemporary','small_town','paperback','Entangled Publishing',2023,'verify','https://covers.openlibrary.org/b/isbn/9781957376967-L.jpg',17.99,'', NOW() - INTERVAL '22 minutes'),
  ('NA-024','9781957376981','Sable Peak','Devney Perry','','The Edens','6','romance_contemporary','small_town','paperback','Entangled Publishing',2023,'verified','https://covers.openlibrary.org/b/isbn/9781957376981-L.jpg',17.99,'', NOW() - INTERVAL '23 minutes'),
  ('NA-025','9781950692491','Indigo Ridge','Devney Perry','','The Edens','1','romance_contemporary','small_town','paperback','Entangled Publishing',2021,'verified','https://covers.openlibrary.org/b/isbn/9781950692491-L.jpg',17.99,'Series opener', NOW() - INTERVAL '24 minutes'),
  ('NA-026','9780425211724','Slave to Sensation','Nalini Singh','','Psy-Changeling','1','romance_paranormal','fantasy','mass_market','Berkley',2006,'verify','https://covers.openlibrary.org/b/isbn/9780425211724-L.jpg',9.99,'Series opener', NOW() - INTERVAL '25 minutes'),
  ('NA-027','9780843952421','Dark Magic','Christine Feehan','','Dark / Carpathian','4','romance_paranormal','fantasy','mass_market','Leisure Books',1999,'verify','https://covers.openlibrary.org/b/isbn/9780843952421-L.jpg',7.99,'', NOW() - INTERVAL '26 minutes'),
  ('NA-028','9780843952414','Dark Fire','Christine Feehan','','Dark / Carpathian','6','romance_paranormal','fantasy','mass_market','Leisure Books',2001,'verify','https://covers.openlibrary.org/b/isbn/9780843952414-L.jpg',7.99,'', NOW() - INTERVAL '27 minutes'),
  ('NA-029','9780515139914','Lie By Moonlight','Amanda Quick','','','','romance_historical','regency','mass_market','Jove',2005,'verify','https://covers.openlibrary.org/b/isbn/9780515139914-L.jpg',7.99,'', NOW() - INTERVAL '28 minutes'),
  ('NA-030','9780553572483','Dangerous','Amanda Quick','','','','romance_historical','regency','mass_market','Bantam',1993,'verify','https://covers.openlibrary.org/b/isbn/9780553572483-L.jpg',6.99,'', NOW() - INTERVAL '29 minutes'),
  ('NA-031','9780425252598','Ghost Killer','Robin D. Owens','','Ghost Seer','5','romance_paranormal','urban_fantasy','mass_market','Berkley',2014,'verify','https://covers.openlibrary.org/b/isbn/9780425252598-L.jpg',7.99,'', NOW() - INTERVAL '30 minutes'),
  ('NA-032','9780553568264','Mischief','Amanda Quick','','','','romance_historical','regency','mass_market','Bantam',1996,'verify','https://covers.openlibrary.org/b/isbn/9780553568264-L.jpg',6.99,'', NOW() - INTERVAL '31 minutes'),
  ('NA-033','9780425285510','Archangel''s Viper','Nalini Singh','','Guild Hunter','10','romance_paranormal','urban_fantasy','mass_market','Berkley',2017,'verify','https://covers.openlibrary.org/b/isbn/9780425285510-L.jpg',8.99,'', NOW() - INTERVAL '32 minutes'),
  ('NA-034','9780425252574','Ghost Layer','Robin D. Owens','','Ghost Seer','2','romance_paranormal','urban_fantasy','mass_market','Berkley',2012,'verify','https://covers.openlibrary.org/b/isbn/9780425252574-L.jpg',7.99,'', NOW() - INTERVAL '33 minutes'),
  ('NA-035','9780553569407','Mystique','Amanda Quick','','','','romance_historical','medieval','mass_market','Bantam',1995,'verify','https://covers.openlibrary.org/b/isbn/9780553569407-L.jpg',6.99,'', NOW() - INTERVAL '34 minutes')
ON CONFLICT (isbn) DO UPDATE SET
  sku           = EXCLUDED.sku,
  title         = EXCLUDED.title,
  author        = EXCLUDED.author,
  co_author     = EXCLUDED.co_author,
  series        = EXCLUDED.series,
  series_number = EXCLUDED.series_number,
  category      = EXCLUDED.category,
  subcategory   = EXCLUDED.subcategory,
  format        = EXCLUDED.format,
  publisher     = EXCLUDED.publisher,
  pub_year      = EXCLUDED.pub_year,
  verified      = EXCLUDED.verified,
  cover_url     = EXCLUDED.cover_url,
  list_price    = EXCLUDED.list_price,
  notes         = EXCLUDED.notes;
