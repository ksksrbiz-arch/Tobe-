-- Studio photo-intake feature.
-- Adds provenance + description columns to recent_arrivals so books published
-- from Jess's phone-photo workflow carry an online description and a (private,
-- never-displayed) reference to the source photo on Cloudinary.
-- Idempotent — safe to re-run. Apply after db/schema.sql:
--   psql "$NETLIFY_DATABASE_URL" -f db/studio-photos.sql

ALTER TABLE recent_arrivals ADD COLUMN IF NOT EXISTS description      TEXT NOT NULL DEFAULT '';
ALTER TABLE recent_arrivals ADD COLUMN IF NOT EXISTS source           TEXT NOT NULL DEFAULT '';
ALTER TABLE recent_arrivals ADD COLUMN IF NOT EXISTS source_photo_url TEXT NOT NULL DEFAULT '';
