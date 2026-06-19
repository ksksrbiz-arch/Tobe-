import Script from "next/script";

/**
 * Privacy-friendly, cookieless web analytics (Plausible).
 *
 * Uses Plausible's script-init format, where the site is identified by the
 * script filename (`pa-<id>.js`) and tracking starts via `plausible.init()`.
 * No cookies, no consent banner, GDPR/CCPA-friendly.
 *
 * The script URL contains a public client-side token (it's served to every
 * visitor), so the project's URL is committed as the default. Override per
 * environment with NEXT_PUBLIC_PLAUSIBLE_SRC — e.g. point at a self-hosted
 * Plausible instance, or set it empty to disable analytics for a deploy.
 *
 * Plausible only counts hits whose domain matches the site registered in the
 * dashboard, so preview/localhost traffic is ignored automatically.
 */
const DEFAULT_PLAUSIBLE_SRC =
  "https://plausible.io/js/pa-xVSJKrQOeZLNh8avUMWjP.js";

export default function Analytics() {
  // `?? DEFAULT` keeps the committed default when the env var is unset; an
  // explicitly empty NEXT_PUBLIC_PLAUSIBLE_SRC disables analytics entirely.
  const envSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC;
  const src = envSrc === undefined ? DEFAULT_PLAUSIBLE_SRC : envSrc;
  if (!src) return null;

  return (
    <>
      <Script
        // Load after the page is interactive so analytics never delays content.
        strategy="afterInteractive"
        src={src}
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
      </Script>
    </>
  );
}
