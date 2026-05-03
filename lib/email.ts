import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-server";

interface ArrivalForNotification {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
}

interface WishlistMatch {
  id: string;
  user_id: string;
  isbn: string;
  title: string;
  author: string;
}

interface SupabaseUser {
  id: string;
  email?: string | null;
}

const STORE_NAME = "To Be Read · Clackamas Book Exchange";
const STORE_URL = "https://tobereadbooks.com";

function renderEmail(arrival: ArrivalForNotification, customerName?: string) {
  const greeting = customerName ? `Hi ${customerName},` : "Hi there,";
  const cover = arrival.cover_url
    ? `<img src="${arrival.cover_url}" alt="${arrival.title}" width="120" style="border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);margin:20px 0;" />`
    : "";
  return `
<!doctype html>
<html><body style="font-family:Georgia,serif;color:#1F1A2E;background:#FDF8F0;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid rgba(107,28,111,0.10);">
    <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#F1BB1A;margin:0 0 8px;font-weight:bold;">A book from your hunt list just arrived</p>
    <h1 style="font-family:'Playfair Display',Georgia,serif;color:#6B1C6F;font-size:24px;margin:0 0 16px;">${arrival.title}</h1>
    <p style="margin:0 0 4px;color:#6B7280;font-size:14px;">${arrival.author}</p>
    ${cover}
    <p style="font-size:14px;line-height:1.6;color:#374151;">${greeting}</p>
    <p style="font-size:14px;line-height:1.6;color:#374151;">A copy of <strong>${arrival.title}</strong> by ${arrival.author} just landed on our shelves. We'll hold it until close of day so you can swing by — first come, first served on a single copy.</p>
    <p style="margin:24px 0;">
      <a href="${STORE_URL}/visit" style="background:linear-gradient(135deg,#6B1C6F 0%,#8B2E90 100%);color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Plan a visit</a>
    </p>
    <p style="font-size:12px;color:#9CA3AF;margin-top:32px;">${STORE_NAME} · 7931 SE King Rd, Milwaukie, OR 97222 · (503) 659-2559</p>
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

  const supabase = createServiceClient();

  // Pending matches only — don't double-notify the same customer.
  const { data: matches, error: matchesError } = await supabase
    .from("wishlists")
    .select("id, user_id, isbn, title, author")
    .eq("isbn", arrival.isbn)
    .eq("notified", false);

  if (matchesError || !matches || matches.length === 0) {
    return { notified: 0 };
  }

  const resend = new Resend(apiKey);
  let notified = 0;

  for (const match of matches as WishlistMatch[]) {
    // Resolve the customer's email via the auth admin API. The wishlist
    // table only stores user_id; emails live in auth.users.
    const { data: userData, error: userError } =
      await supabase.auth.admin.getUserById(match.user_id);
    const user = userData?.user as SupabaseUser | null;
    if (userError || !user?.email) continue;

    try {
      await resend.emails.send({
        from: fromEmail,
        to: user.email,
        subject: `A book from your hunt list just arrived: ${arrival.title}`,
        html: renderEmail(arrival),
      });
      await supabase
        .from("wishlists")
        .update({ notified: true })
        .eq("id", match.id);
      notified += 1;
    } catch {
      // Email send failed — leave `notified=false` so the next shelve
      // event will retry. Don't surface the error to the caller.
    }
  }

  return { notified };
}
