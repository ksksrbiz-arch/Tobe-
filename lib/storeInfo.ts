// Single source of truth for store contact details, hours, and live open/closed
// status. Centralized so the Visit section, hero, floating buttons, and any CTA
// can share the same logic instead of re-deriving it.

export const STORE_NAME = "Clackamas Book Exchange";
export const STORE_PHONE = "503-659-2559";
export const STORE_ADDRESS = "7931 SE King Rd, Milwaukie, OR 97222";

const ADDRESS_QUERY = encodeURIComponent(STORE_ADDRESS);
export const GOOGLE_MAPS_LINK = `https://maps.google.com/?q=${ADDRESS_QUERY}`;
export const APPLE_MAPS_LINK = `https://maps.apple.com/?q=${ADDRESS_QUERY}`;
export const GOOGLE_MAPS_EMBED = `https://maps.google.com/maps?q=${ADDRESS_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

// Google rating snapshot (matches the /api/google-reviews fallback). Refresh
// periodically or wire to live data.
export const GOOGLE_RATING = 4.6;
export const GOOGLE_REVIEW_COUNT = 112;
export const GOOGLE_REVIEWS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Clackamas+Book+Exchange+Milwaukie+OR";

export const dayHours = [
  { day: "Mon", short: "M", hours: "10:00 – 5:00" },
  { day: "Tue", short: "T", hours: "10:00 – 5:00" },
  { day: "Wed", short: "W", hours: "10:00 – 5:00" },
  { day: "Thu", short: "T", hours: "10:00 – 5:00" },
  { day: "Fri", short: "F", hours: "10:00 – 5:00" },
  { day: "Sat", short: "S", hours: "10:00 – 5:00" },
  { day: "Sun", short: "S", hours: "Closed" },
];

export type OpenStatus = { open: boolean; label: string; short: string };

// Always evaluate in America/Los_Angeles so out-of-state visitors see the
// correct status regardless of their own timezone.
export function isOpenNow(now: Date = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday");
  const hour = parseInt(get("hour"), 10);
  const minute = parseInt(get("minute"), 10);
  const time = hour + minute / 60;

  if (weekday === "Sun")
    return { open: false, label: "Closed today (Sun) · opens Mon 10am", short: "Closed today" };
  if (time >= 10 && time < 17)
    return { open: true, label: "Open now until 5pm", short: "Open now" };
  if (time < 10)
    return { open: false, label: "Opening at 10am today", short: "Opens at 10am" };
  return { open: false, label: "Closed for the day · opens 10am", short: "Closed now" };
}
