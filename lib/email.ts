import { Resend } from "resend";
import { sql } from "@/lib/db";
import { SITE_URL } from "@/lib/seo";
import { STORE_NAME, STORE_ADDRESS_TEXT, STORE_PHONE } from "@/lib/store";

interface ArrivalForNotification {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderEmail(arrival: ArrivalForNotification) {
  // Title/author come from external book metadata (Google Books / Open
  // Library) — escape them like the newsletter route does.
  const title = escapeHtml(arrival.title);
  const author = escapeHtml(arrival.author);
  const cover = arrival.cover_url
    ? `<img src="${escapeHtml(arrival.cover_url)}" alt="${title}" width="120" style="border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);margin:20px 0;" />`
    : "";
  return `
<!doctype html>
<html><body style="font-family:Georgia,serif;color:#1F1A2E;background:#FDF8F0;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid rgba(107,28,111,0.10);">
    <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#F1BB1A;margin:0 0 8px;font-weight:bold;">A book from your hunt list just arrived</p>
    <h1 style="font-family:'Playfair Display',Georgia,serif;color:#6B1C6F;font-size:24px;margin:0 0 16px;">${title}</h1>
    <p style="margin:0 0 4px;color:#6B7280;font-size:14px;">${author}</p>
    ${cover}
    <p style="font-size:14px;line-height:1.6;color:#374151;">A copy of <strong>${title}</strong> by ${author} just landed on our shelves. We'll hold it until close of day so you can swing by — first come, first served on a single copy.</p>
    <p style="margin:24px 0;">
      <a href="${SITE_URL}/visit" style="background:linear-gradient(135deg,#6B1C6F 0%,#8B2E90 100%);color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Plan a visit</a>
    </p>
    <p style="font-size:12px;color:#9CA3AF;margin-top:32px;">${STORE_NAME} · ${STORE_ADDRESS_TEXT} · ${STORE_PHONE}</p>
  </div>
</body></html>`.trim();
}

/**
 * Look up wishlist matches for the just-shelved arrival and email each
 * customer. Marks each matched wishlist row as `notified = true` so a
 * customer is not re-emailed when the same ISBN is shelved a second time.
 *
 * Errors are swallowed — wishlist notifications must never block the
 * staff scan flow.
 */
export async function notifyWishlistMatches(arrival: ArrivalForNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !fromEmail) return { notified: 0, skipped: "not_configured" as const };

  // Claim the rows atomically BEFORE sending: two staff scans of the same ISBN
  // seconds apart would otherwise both read `notified = FALSE` and double-email
  // every matched customer. If a send then fails, the claim is released below
  // so the next shelve event retries.
  let matches: Array<{ id: string; email: string }>;
  try {
    matches = (await sql`
      UPDATE wishlists w
      SET notified = TRUE
      FROM users u
      WHERE u.id = w.user_id
        AND w.isbn = ${arrival.isbn}
        AND w.notified = FALSE
        AND u.email IS NOT NULL
      RETURNING w.id AS id, u.email AS email
    `) as Array<{ id: string; email: string }>;
  } catch {
    return { notified: 0 };
  }

  if (matches.length === 0) return { notified: 0 };

  const resend = new Resend(apiKey);
  const html = renderEmail(arrival);
  let notified = 0;

  for (const match of matches) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to: match.email,
        subject: `A book from your hunt list just arrived: ${arrival.title}`,
        html,
      });
      notified += 1;
    } catch {
      // Send failed — release the claim so the next shelve event retries.
      // Best-effort; never let this block the staff scan flow.
      try {
        await sql`UPDATE wishlists SET notified = FALSE WHERE id = ${match.id}`;
      } catch {}
    }
  }

  return { notified };
}
