-- Schema for Netlify DB (Neon Postgres).
-- Apply once in the Neon SQL editor or via `psql $NETLIFY_DATABASE_URL -f db/schema.sql`.
-- Idempotent — safe to re-run.

-- ─── NextAuth tables (created by @auth/core/adapters/postgres on first run too,
-- but pre-creating keeps cold-start fast and lets us add indexes deliberately).

CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  name          TEXT,
  email         TEXT UNIQUE,
  email_verified TIMESTAMPTZ,
  image         TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id                  TEXT PRIMARY KEY,
  user_id             TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type                TEXT NOT NULL,
  provider            TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token       TEXT,
  access_token        TEXT,
  expires_at          BIGINT,
  token_type          TEXT,
  scope               TEXT,
  id_token            TEXT,
  session_state       TEXT,
  UNIQUE (provider, provider_account_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires       TIMESTAMPTZ NOT NULL,
  session_token TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token      TEXT UNIQUE NOT NULL,
  expires    TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- ─── Application tables.

CREATE TABLE IF NOT EXISTS recent_arrivals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  isbn        TEXT NOT NULL,
  title       TEXT NOT NULL,
  author      TEXT NOT NULL DEFAULT '',
  cover_url   TEXT NOT NULL DEFAULT '',
  list_price  NUMERIC(10,2) NOT NULL DEFAULT 0,
  added_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS recent_arrivals_added_at_idx ON recent_arrivals (added_at DESC);
CREATE INDEX IF NOT EXISTS recent_arrivals_isbn_idx ON recent_arrivals (isbn);

CREATE TABLE IF NOT EXISTS wishlists (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  isbn        TEXT NOT NULL,
  title       TEXT NOT NULL,
  author      TEXT NOT NULL DEFAULT '',
  cover_url   TEXT NOT NULL DEFAULT '',
  list_price  NUMERIC(10,2),
  notified    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, isbn)
);

CREATE INDEX IF NOT EXISTS wishlists_isbn_pending_idx
  ON wishlists (isbn) WHERE notified = FALSE;
