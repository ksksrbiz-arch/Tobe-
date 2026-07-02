/**
 * Feature flags.
 *
 * `EMAIL_ENABLED` — master switch for every user-facing email surface. It's
 * OFF while we move off Resend to a new email provider (TBD by Jess). When off:
 *   - the homepage newsletter section shows a "follow us on social" CTA instead
 *     of a signup form,
 *   - the wishlist page shows a "coming soon" notice instead of the magic-link
 *     sign-in,
 *   - the /api/newsletter endpoint short-circuits (never calls Resend).
 *
 * Flip this to `true` (and wire up the new provider's env vars) to restore
 * everything — no other code changes required.
 *
 * Typed as `boolean` (not the literal `false`) so consumers keep both branches
 * live for the type-checker / linter.
 */
export const EMAIL_ENABLED = false as boolean;
