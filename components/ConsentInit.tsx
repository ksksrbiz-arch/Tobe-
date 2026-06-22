/**
 * Google Consent Mode v2 bootstrap.
 *
 * Emits a synchronous inline <script> that MUST run before Google Tag Manager
 * loads, so it is rendered as the very first child of the root <head> (ahead of
 * <GoogleTagManager>, which next/third-parties injects with the afterInteractive
 * strategy). It:
 *
 *   1. Defines dataLayer + gtag().
 *   2. Sets all consent signals to "denied" by default (GDPR/ePrivacy: no
 *      non-essential storage before opt-in), EXCEPT security/functionality
 *      which are strictly necessary.
 *   3. Re-reads the persisted choice from the `tbr_consent` cookie so returning
 *      visitors who already accepted get "granted" defaults immediately — no
 *      consent flash and tags fire on the first pageview.
 *   4. Enables url_passthrough + ads_data_redaction so measurement degrades
 *      gracefully while consent is denied.
 *
 * The matching <CookieConsent> banner issues the consent *update* after a
 * visitor chooses. Keep this a Server Component (no "use client") so the script
 * is in the server-rendered HTML.
 */

export const CONSENT_COOKIE = "tbr_consent";
export const CONSENT_VERSION = 1;

const CONSENT_INIT = `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var analytics = 'denied';
  try {
    var match = document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);
    if (match) {
      var saved = JSON.parse(decodeURIComponent(match[1]));
      if (saved && saved.v === ${CONSENT_VERSION} && saved.analytics === 'granted') {
        analytics = 'granted';
      }
    }
  } catch (e) { /* malformed cookie — fall back to denied */ }

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: analytics,
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });
  gtag('set', 'url_passthrough', true);
  gtag('set', 'ads_data_redaction', true);
})();
`.trim();

export default function ConsentInit() {
  return (
    <script
      // Author-controlled snippet, never user input. Must be inline + synchronous
      // so it executes before GTM. dangerouslySetInnerHTML is the documented way
      // to emit a raw inline script from the App Router <head>.
      dangerouslySetInnerHTML={{ __html: CONSENT_INIT }}
    />
  );
}
