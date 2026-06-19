import Script from "next/script";

/**
 * Privacy-friendly, cookieless web analytics (Plausible-compatible).
 *
 * Renders nothing unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set, so local dev and
 * preview builds stay clean and the site works with zero analytics config. No
 * cookies, no consent banner, GDPR/CCPA-friendly.
 *
 * Configure via env (see .env.example):
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  the domain registered in your analytics
 *                                 dashboard, e.g. "to-be-read-clackamas.netlify.app".
 *   NEXT_PUBLIC_PLAUSIBLE_SRC     optional script URL. Defaults to Plausible
 *                                 Cloud. Point at a self-hosted Plausible
 *                                 instance, or a Umami script, to switch host.
 *
 * Umami note: Umami identifies sites by `data-website-id`, not `data-domain`.
 * To use Umami, set NEXT_PUBLIC_PLAUSIBLE_SRC to your Umami script URL and put
 * the website id in NEXT_PUBLIC_PLAUSIBLE_DOMAIN — Umami reads either attribute.
 */
export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";

  return (
    <Script
      // Load after the page is interactive so analytics never delays content.
      strategy="afterInteractive"
      data-domain={domain}
      data-website-id={domain}
      src={src}
    />
  );
}
