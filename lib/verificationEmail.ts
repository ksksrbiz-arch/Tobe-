import { Resend } from "resend";
import { STORE_NAME, STORE_ADDRESS_TEXT, STORE_PHONE } from "@/lib/store";

// Auth.js's built-in Resend provider ships a plain, unbranded template. This
// mirrors the visual style already used for the newsletter and wishlist-match
// emails (app/api/newsletter/route.ts, lib/email.ts) so every email a
// customer gets from the site looks like it came from the same place.

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function magicLinkHtml(url: string, host: string) {
  const safeHost = escapeHtml(host);
  return `<!doctype html>
<html><body style="font-family:Georgia,serif;color:#1F1A2E;background:#FDF8F0;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid rgba(107,28,111,0.10);">
    <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#F1BB1A;margin:0 0 8px;font-weight:bold;">To Be Read · Sign-in</p>
    <h1 style="font-family:'Playfair Display',Georgia,serif;color:#6B1C6F;font-size:26px;margin:0 0 16px;">Sign in to ${safeHost}</h1>
    <p style="font-size:15px;line-height:1.7;color:#374151;">Click below to sign in. This link is valid for the next 24 hours and can only be used once.</p>
    <p style="margin:28px 0;">
      <a href="${url}" style="background:linear-gradient(135deg,#6B1C6F 0%,#8B2E90 100%);color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block;">Sign in →</a>
    </p>
    <p style="font-size:13px;line-height:1.6;color:#6B7280;">If you didn't request this, you can safely ignore this email — no account changes will be made.</p>
    <p style="font-size:12px;color:#9CA3AF;margin-top:32px;">${STORE_NAME} · ${STORE_ADDRESS_TEXT} · ${STORE_PHONE}</p>
  </div>
</body></html>`.trim();
}

function magicLinkText(url: string, host: string) {
  return `Sign in to ${host}\n${url}\n\nThis link is valid for 24 hours and can only be used once. If you didn't request this, you can safely ignore this email.`;
}

/**
 * Custom `sendVerificationRequest` for the Auth.js Resend provider — sends
 * the branded magic-link email above via the `resend` SDK (matching how the
 * rest of the app sends mail) instead of Auth.js's default plain template.
 */
export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: { apiKey?: string; from?: string };
}) {
  const { identifier: to, url, provider } = params;
  const { host } = new URL(url);
  if (!provider.apiKey || !provider.from) {
    throw new Error("Resend is not configured (RESEND_API_KEY / RESEND_FROM_EMAIL).");
  }
  const resend = new Resend(provider.apiKey);
  const { error } = await resend.emails.send({
    from: provider.from,
    to,
    subject: `Sign in to ${host}`,
    html: magicLinkHtml(url, host),
    text: magicLinkText(url, host),
  });
  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
}
