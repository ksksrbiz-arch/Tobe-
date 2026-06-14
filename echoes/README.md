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

- **Fixed:** `@grpc/grpc-js` (transitive via `firebase`) — patched to a
  non-vulnerable version.
- **Deferred (2 high):** `esbuild` ≤ 0.28.0 and the `vite` that bundles it.
  - The only fix is `esbuild@0.28.1`, but **no `vite` 6/7 release pins esbuild
    that high**, and forcing `esbuild@0.28.1` under vite 6 breaks `npm run build`
    (vite errors transforming destructuring to its legacy browser targets).
  - Both advisories concern esbuild's **dev server** (Windows file read) and
    **Deno install integrity** — neither is reachable in this project: dev uses
    vite (not `esbuild --serve`), and the production artifact is the prebuilt
    `dist/server.cjs` run with plain `node`. No production exposure.
  - **Resolution path:** a coordinated upgrade to a future `vite` that depends on
    `esbuild ≥ 0.28.1`, done as its own scoped change with a build smoke-test.
