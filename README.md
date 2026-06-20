# To Be Read — bookshop website

Marketing site and lightweight commerce tooling for **To Be Read**, an
independent bookshop in Clackamas, Oregon. Built with the Next.js App Router and
deployed on Netlify.

Production: <https://to-be-read-clackamas.netlify.app>

## Stack

| Concern        | Choice                                                        |
| -------------- | ------------------------------------------------------------- |
| Framework      | Next.js 16 (App Router, React 19)                             |
| Styling        | Tailwind CSS v4 + shadcn/ui (Radix primitives)                |
| Animation      | Framer Motion                                                 |
| Database       | Neon Postgres (provisioned via **Netlify DB**)                |
| Auth           | Auth.js / NextAuth v5 (magic-link email)                      |
| Email          | Resend (magic links + wishlist hunt notifications)            |
| AI             | Groq (LLM) + DuckDuckGo grounding (Next Read Matchmaker)       |
| Hosting        | Netlify (`@netlify/plugin-nextjs`)                            |

> **Note on the database:** the app uses a single Neon Postgres instance reached
> through `@neondatabase/serverless`. There is **no Supabase** in this project.
> The separate `echoes/` subproject (an experimental applet) uses Firebase /
> Firestore and is built and deployed independently.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

### Environment variables

See `.env.example` for the full annotated list. The important ones:

| Variable                  | Required | Purpose                                          |
| ------------------------- | -------- | ------------------------------------------------ |
| `NETLIFY_DATABASE_URL`    | yes\*    | Neon connection string (auto-set on Netlify).    |
| `DATABASE_URL`            | —        | Local-dev fallback when not on Netlify.          |
| `AUTH_SECRET`             | yes      | NextAuth signing secret (`openssl rand -base64 32`). |
| `RESEND_API_KEY`          | yes      | Magic-link + notification email delivery.        |
| `RESEND_FROM_EMAIL`       | yes      | Verified sender identity.                        |
| `GROQ_API_KEY`            | yes      | Next Read Matchmaker LLM (DuckDuckGo grounding is keyless). |
| `GROQ_MODEL`              | no       | Override the matchmaker model (default `llama-3.3-70b-versatile`). |
| `ADMIN_EMAILS`            | yes      | Comma-separated allowlist for `/admin`.          |
| `GOOGLE_BOOKS_API_KEY`    | no       | Lifts the unauthenticated Google Books rate limit. |
| `GOOGLE_PLACES_*`         | no       | Live Google reviews on `/connect` and `/visit`.  |

\* Either `NETLIFY_DATABASE_URL` or `DATABASE_URL` must be set for any
database-backed route to work. Routes fail gracefully (not at build time) when
the database is unavailable.

## Scripts

| Script                  | What it does                                  |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start the dev server.                         |
| `npm run build`         | Production build.                             |
| `npm run start`         | Serve the production build.                   |
| `npm run lint`          | ESLint (Next.js config).                      |
| `npm run typecheck`     | `tsc --noEmit` — strict type checking.        |
| `npm run seed:arrivals` | Seed the `recent_arrivals` table.             |

Run `npm run lint && npm run typecheck && npm run build` before pushing — this
mirrors the **CI** workflow exactly.

## Database

The schema lives in [`db/schema.sql`](db/schema.sql) and is **idempotent** —
safe to re-run. Apply it once against the Neon instance:

```bash
psql "$NETLIFY_DATABASE_URL" -f db/schema.sql
```

Tables: NextAuth auth tables (`users`, `accounts`, `sessions`,
`verification_tokens`), plus the application tables `recent_arrivals` and
`wishlists`. Hot query paths are indexed (`recent_arrivals_added_at_idx`, a
partial index for pending wishlist notifications, etc.).

## Project layout

```
app/            App Router routes + API handlers (app/api/*)
components/     React components (sections, UI primitives in components/ui)
lib/            Shared server/client helpers
  db.ts             Neon client + shared row types
  server/           Server-only hardening: rate limiting, fetch timeouts
db/             SQL schema + seed scripts
echoes/         Independent Firebase applet (own package.json + deploy)
.github/workflows/  CI + scheduled audits
```

### API routes

All routes under `app/api/` run on the Node.js runtime and share the hardening
helpers in `lib/server/functionHardening.ts` (in-memory IP rate limiting,
`fetchWithTimeout`, `withTimeout`). They validate input, return typed JSON
errors with appropriate status codes, and degrade gracefully when an upstream
(DB, Groq, DuckDuckGo, Google) is unavailable.

## CI / CD

| Workflow                          | Trigger                | Purpose                                            |
| --------------------------------- | ---------------------- | -------------------------------------------------- |
| `ci.yml`                          | every PR + push `main` | Lint, typecheck, build + schema check — merge gate.|
| `daily-seo-audit.yml`             | weekly (Mon 06:00 UTC) | SEO metadata checks + Lighthouse SEO.              |
| `daily-dependency-security.yml`   | weekly (Mon 07:00 UTC) | `npm audit` for root + `echoes`.                   |
| `daily-mobile-optimization.yml`   | weekly (Mon 08:00 UTC) | Viewport/manifest checks + Lighthouse.             |

`ci.yml` also runs a **schema check**: it applies `db/schema.sql` to a throwaway
Postgres twice to catch broken SQL and verify the file stays idempotent before
it reaches the live Neon database.

The scheduled audits run **weekly** (not daily) and use `concurrency` guards to
avoid stacking runs — per-PR correctness is already enforced by `ci.yml`, so the
heavier audits only need a periodic cadence. They also surface Lighthouse scores
in each run's **Step Summary** with a shareable report link. Every scheduled
workflow supports `workflow_dispatch` for on-demand runs.

Deployment is handled by Netlify via `netlify.toml` (`npm run build`, published
from `.next`).
