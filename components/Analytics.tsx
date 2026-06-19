/**
 * Privacy-friendly, cookieless web analytics (Plausible).
 *
 * Emits Plausible's script-init snippet as plain <script> tags so it appears in
 * the server-rendered <head> — this is what Plausible's site verifier checks
 * for, and it starts collecting earlier than a post-hydration injection would.
 * Rendered from the root layout's <head>, so keep this a Server Component (no
 * "use client", no next/script).
 *
 * The script URL contains a public client-side token (it's served to every
 * visitor), so the project's URL is committed as the default. Override per
 * environment with NEXT_PUBLIC_PLAUSIBLE_SRC — e.g. a self-hosted Plausible
 * instance — or set it empty to disable analytics for a deploy.
 *
 * Plausible only counts hits whose domain matches the site registered in the
 * dashboard, so preview/localhost traffic is ignored automatically.
 */
const DEFAULT_PLAUSIBLE_SRC =
  "https://plausible.io/js/pa-xVSJKrQOeZLNh8avUMWjP.js";

// Stub queue + init, per Plausible's install snippet. Runs before the async
// script finishes loading; queued calls are flushed once it does.
const PLAUSIBLE_INIT =
  "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()";

export default function Analytics() {
  // `undefined` keeps the committed default; an explicitly empty
  // NEXT_PUBLIC_PLAUSIBLE_SRC disables analytics entirely.
  const envSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC;
  const src = envSrc === undefined ? DEFAULT_PLAUSIBLE_SRC : envSrc;
  if (!src) return null;

  return (
    <>
      <script async src={src} />
      {/* Author-controlled snippet, never user input. */}
      <script dangerouslySetInnerHTML={{ __html: PLAUSIBLE_INIT }} />
    </>
  );
}
