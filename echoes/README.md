<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/590eef94-28a6-4c7a-a01a-cb805945fa19

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Security / known advisories

`npm audit` is run weekly in CI (see `.github/workflows/daily-dependency-security.yml`).

`npm audit` currently reports **0 vulnerabilities**.

- **Fixed:** `@grpc/grpc-js` (transitive via `firebase`) — patched to a
  non-vulnerable version.
- **Fixed:** the `esbuild` ≤ 0.28.0 advisory. Resolved by upgrading to **Vite 8**
  (which bundles with rolldown and no longer depends on esbuild at all) plus
  `@vitejs/plugin-react@6`, and bumping the direct `esbuild` devDependency (used
  only to bundle `server.ts` → `dist/server.cjs`) to `^0.28.1`. Verified with a
  full `npm run build` + `tsc` smoke-test. Note: Vite 8 requires Node
  `^20.19 || >=22.12`.
