import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit, getClientIp } from "@/lib/server/functionHardening";

export const runtime = "nodejs";

const STORE_NAME = "To Be Read · Clackamas Book Exchange";
const STORE_URL = "https://tobereadshop.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ownerNotificationHtml(email: string) {
  const safeEmail = escapeHtml(email);
  return `<!doctype html>
<html><body style="font-family:Georgia,serif;color:#1F1A2E;background:#FDF8F0;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid rgba(107,28,111,0.10);">
    <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#F1BB1A;margin:0 0 8px;font-weight:bold;">New Newsletter Signup</p>
    <h1 style="font-family:'Playfair Display',Georgia,serif;color:#6B1C6F;font-size:22px;margin:0 0 16px;">📬 New subscriber</h1>
    <p style="font-size:15px;color:#374151;"><strong>${safeEmail}</strong> just signed up for the TBR newsletter from the website.</p>
    <p style="font-size:12px;color:#9CA3AF;margin-top:32px;">${STORE_NAME} · 7931 SE King Rd, Unit 1, Portland, OR 97222</p>
  </div>
</body></html>`.trim();
}

function subscriberConfirmationHtml(email: string) {
  const safeEmail = escapeHtml(email);
  return `<!doctype html>
<html><body style="font-family:Georgia,serif;color:#1F1A2E;background:#FDF8F0;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid rgba(107,28,111,0.10);">
    <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#F1BB1A;margin:0 0 8px;font-weight:bold;">To Be Read · Milwaukie, OR</p>
    <h1 style="font-family:'Playfair Display',Georgia,serif;color:#6B1C6F;font-size:28px;margin:0 0 16px;">You're on the list! 📚</h1>
    <p style="font-size:15px;line-height:1.7;color:#374151;">Thanks for signing up — we'll keep you in the loop on new arrivals, events, and anything else worth knowing from the shelves of <strong>To Be Read</strong>.</p>
    <p style="font-size:14px;color:#6B7280;">Signed up as <strong>${safeEmail}</strong></p>
    <p style="font-size:15px;line-height:1.7;color:#374151;margin-top:16px;">In the meantime, come say hi — we're open <strong>Monday–Saturday, 10am – 5pm</strong> at 7931 SE King Rd, Unit 1, Portland, OR.</p>
    <p style="margin:28px 0;">
      <a href="${STORE_URL}/visit" style="background:linear-gradient(135deg,#6B1C6F 0%,#8B2E90 100%);color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Plan a visit →</a>
    </p>
    <p style="font-size:12px;color:#9CA3AF;margin-top:32px;">${STORE_NAME} · 7931 SE King Rd, Unit 1, Portland, OR 97222 · (503) 659-2559</p>
    <p style="font-size:11px;color:#9CA3AF;margin-top:8px;">You signed up at ${STORE_URL}. Reply to this email at any time to unsubscribe.</p>
  </div>
</body></html>`.trim();
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit({
    key: `newsletter:${ip}`,
    maxRequests: 5,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please wait a minute and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  }

  let email: string;
  try {
    const body = await req.json();
    email = (body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  // If Resend isn't configured yet, still return 200 so the UX works in dev/staging.
  if (!apiKey || !fromEmail) {
    console.warn("[newsletter] RESEND_API_KEY or RESEND_FROM_EMAIL not set — signup logged only.", email);
    return NextResponse.json({ ok: true, note: "not_configured" });
  }

  const resend = new Resend(apiKey);

  try {
    // 1. Confirmation to the subscriber
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "You're on the TBR list 📚",
      html: subscriberConfirmationHtml(email),
    });

    // 2. Owner notification (bcc-style — reply goes to subscriber)
    await resend.emails.send({
      from: fromEmail,
      to: fromEmail,
      replyTo: email,
      subject: `New newsletter signup: ${email}`,
      html: ownerNotificationHtml(email),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] Resend error:", err);
    return NextResponse.json({ error: "Failed to send — please try again." }, { status: 500 });
  }
}
