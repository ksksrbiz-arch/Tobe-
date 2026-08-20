/**
 * Feature flags.
 *
 * `EMAIL_ENABLED` — master switch for every user-facing email surface:
 *   - the homepage newsletter section shows a signup form (vs. a "follow us on
 *     social" CTA),
 *   - the wishlist page shows the magic-link sign-in + hunting list (vs. a
 *     "coming soon" notice),
 *   - the /api/newsletter endpoint actually calls Resend.
 *
 * Restored now that Resend (RESEND_API_KEY, RESEND_FROM_EMAIL, and the
 * tobereadshop.com sending domain) is configured in production.
 *
 * Typed as `boolean` (not the literal `true`) so consumers keep both branches
 * live for the type-checker / linter.
 */
export const EMAIL_ENABLED = true as boolean;
