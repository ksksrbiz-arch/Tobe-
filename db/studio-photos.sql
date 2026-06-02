-- Studio photo-intake feature.
-- Adds provenance + description columns to recent_arrivals so books published
-- from Jess's phone-photo workflow carry an online description and a (private,
-- never-displayed) reference to the source photo on Cloudinary.
-- Idempotent — safe to re-run. Apply after db/schema.sql:
--   psql "$NETLIFY_DATABASE_URL" -f db/studio-photos.sql

ALTER TABLE recent_arrivals ADD COLUMN IF NOT EXISTS description      TEXT NOT NULL DEFAULT '';
ALTER TABLE recent_arrivals ADD COLUMN IF NOT EXISTS source           TEXT NOT NULL DEFAULT '';
ALTER TABLE recent_arrivals ADD COLUMN IF NOT EXISTS source_photo_url TEXT NOT NULL DEFAULT '';

-- Staff Picks: let Jess flag a book as a featured pick with a short note.
ALTER TABLE recent_arrivals ADD COLUMN IF NOT EXISTS featured  BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE recent_arrivals ADD COLUMN IF NOT EXISTS pick_note TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS recent_arrivals_featured_idx
  ON recent_arrivals (added_at DESC) WHERE featured = TRUE;
