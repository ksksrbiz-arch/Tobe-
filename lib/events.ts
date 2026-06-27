/**
 * Recurring in-store events for To Be Read (TBR).
 *
 * Events are modeled as recurrence *rules*, not hand-entered dates, so the
 * Events page and its Event structured data stay valid and fresh without
 * anyone editing a list. `getUpcomingEvents()` expands the rules into concrete
 * upcoming occurrences, deterministically, from the current date.
 *
 * All times are computed in the store's local zone (America/Los_Angeles) and
 * emitted as ISO-8601 strings carrying the correct -07:00 / -08:00 offset so
 * schema.org Event startDate/endDate are unambiguous.
 */

import { SITE_URL, storeEventLocation } from "@/lib/seo";

export interface EventOccurrence {
  /** Stable identifier for this concrete occurrence (slug + date). */
  id: string;
  /** Recurrence slug, shared across all occurrences of the same event. */
  slug: string;
  title: string;
  description: string;
  /** ISO-8601 start, with America/Los_Angeles offset (e.g. ...T11:00:00-07:00). */
  startDate: string;
  /** ISO-8601 end, with America/Los_Angeles offset. */
  endDate: string;
  /** Human-readable cadence, e.g. "Every Saturday". */
  recurrence: string;
}

interface RecurrenceRule {
  slug: string;
  title: string;
  description: string;
  recurrence: string;
  /**
   * Returns true if the given local calendar date is an occurrence date.
   * `parts` is a wall-clock date in America/Los_Angeles.
   */
  matches: (parts: LocalDateParts) => boolean;
  /** Local start time, 24h. */
  startHour: number;
  startMinute: number;
  /** Duration in minutes. */
  durationMinutes: number;
}

interface LocalDateParts {
  year: number;
  /** 1-12 */
  month: number;
  /** 1-31 */
  day: number;
  /** 0 = Sunday ... 6 = Saturday */
  weekday: number;
}

const SATURDAY = 6;

/** Which Saturday of the month a date falls on (1 = first, 2 = second, ...). */
function nthWeekdayOfMonth(day: number): number {
  return Math.floor((day - 1) / 7) + 1;
}

const RULES: RecurrenceRule[] = [
  {
    slug: "cozy-reading-hour",
    title: "Cozy Reading Hour",
    description:
      "Bring your current read, grab a comfy chair, and join other readers for an hour of quiet, companionable reading in the shop. No agenda — just good books and good company.",
    recurrence: "Every Saturday",
    matches: (p) => p.weekday === SATURDAY,
    startHour: 11,
    startMinute: 0,
    durationMinutes: 60,
  },
  {
    slug: "staff-picks-saturday",
    title: "Staff Picks Saturday",
    description:
      "On the first Saturday of every month our booksellers set out their favorite recent finds across the store — handwritten notes and all. Come browse the picks and ask us why we loved them.",
    recurrence: "First Saturday monthly",
    matches: (p) => p.weekday === SATURDAY && nthWeekdayOfMonth(p.day) === 1,
    startHour: 10,
    startMinute: 0,
    durationMinutes: 7 * 60, // all day: 10am–5pm
  },
];

/**
 * Returns the UTC offset (e.g. "-07:00" or "-08:00") for America/Los_Angeles
 * at the given UTC instant, derived from the IANA database via Intl — so it
 * tracks daylight-saving transitions correctly without a hardcoded table.
 */
function losAngelesOffset(utcDate: Date): string {
  const tzName = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    timeZoneName: "longOffset",
  })
    .formatToParts(utcDate)
    .find((part) => part.type === "timeZoneName")?.value;

  // tzName looks like "GMT-07:00"; normalize to "-07:00".
  if (tzName) {
    const match = tzName.match(/GMT([+-]\d{2}:\d{2})/);
    if (match) return match[1];
    if (/^GMT$/.test(tzName)) return "+00:00";
  }
  return "-08:00";
}

/** The wall-clock date parts in America/Los_Angeles for a UTC instant. */
function localDateParts(utcDate: Date): LocalDateParts {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  const parts = fmt.formatToParts(utcDate);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: weekdayMap[get("weekday")] ?? 0,
  };
}

/** Build an ISO-8601 string for a local wall-clock time in Los Angeles. */
function losAngelesISO(
  parts: LocalDateParts,
  hour: number,
  minute: number,
): string {
  const y = String(parts.year).padStart(4, "0");
  const mo = String(parts.month).padStart(2, "0");
  const d = String(parts.day).padStart(2, "0");
  const h = String(hour).padStart(2, "0");
  const mi = String(minute).padStart(2, "0");
  // Approximate the instant to look up the correct DST offset for this date.
  const approx = new Date(`${y}-${mo}-${d}T${h}:${mi}:00Z`);
  const offset = losAngelesOffset(approx);
  return `${y}-${mo}-${d}T${h}:${mi}:00${offset}`;
}

/**
 * Expand the recurrence rules into the next `count` upcoming occurrences,
 * ordered by start time. Deterministic given `now`.
 *
 * @param count Number of occurrences to return (default 8).
 * @param now   Reference instant (defaults to the current time).
 */
export function getUpcomingEvents(
  count = 8,
  now: Date = new Date(),
): EventOccurrence[] {
  const results: EventOccurrence[] = [];
  const DAY_MS = 24 * 60 * 60 * 1000;

  // Walk forward day by day from today. Scanning a bounded horizon keeps this
  // simple and deterministic; 120 days comfortably covers several monthly
  // occurrences across all rules.
  for (let i = 0; i < 120 && results.length < count * RULES.length; i++) {
    const cursor = new Date(now.getTime() + i * DAY_MS);
    const parts = localDateParts(cursor);

    for (const rule of RULES) {
      if (!rule.matches(parts)) continue;

      const startDate = losAngelesISO(parts, rule.startHour, rule.startMinute);
      const start = new Date(startDate);
      const end = new Date(start.getTime() + rule.durationMinutes * 60 * 1000);
      // Skip occurrences already finished (relevant only for today's date).
      if (end.getTime() <= now.getTime()) continue;

      const endParts = localDateParts(end);
      const endHour = Number(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "2-digit",
          hour12: false,
        })
          .formatToParts(end)
          .find((p) => p.type === "hour")?.value ?? "0",
      );
      const endMinute = Number(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Los_Angeles",
          minute: "2-digit",
        })
          .formatToParts(end)
          .find((p) => p.type === "minute")?.value ?? "0",
      );
      const endDate = losAngelesISO(
        endParts,
        endHour % 24,
        endMinute,
      );

      const dateKey = startDate.slice(0, 10);
      results.push({
        id: `${rule.slug}-${dateKey}`,
        slug: rule.slug,
        title: rule.title,
        description: rule.description,
        startDate,
        endDate,
        recurrence: rule.recurrence,
      });
    }
  }

  results.sort((a, b) => a.startDate.localeCompare(b.startDate));
  return results.slice(0, count);
}

/**
 * A dated, one-off / seasonal happening (as opposed to the recurring rules
 * above). These are hand-authored because they have a fixed calendar window —
 * e.g. a summer program — and they automatically stop showing once they end,
 * so the homepage banner and Event structured data clean themselves up without
 * anyone deleting an entry.
 */
export interface SpecialEvent {
  /** Stable slug — also the structured-data anchor and React key. */
  slug: string;
  /** The umbrella program this belongs to, if any (groups related cards). */
  program?: string;
  title: string;
  /** Short marketing line shown under the title on a card. */
  tagline: string;
  description: string;
  /** ISO-8601 start, with America/Los_Angeles offset. */
  startDate: string;
  /** ISO-8601 end, with America/Los_Angeles offset. */
  endDate: string;
  /** Human-readable date window, e.g. "July 1 – August 21, 2026". */
  dateLabel: string;
  /** Short cadence/season label, e.g. "Summer 2026". */
  season: string;
  /** Accent color for the card (brand-aligned). */
  accent: string;
  /** Who the program is for, e.g. "Kids & teens". */
  audience?: string;
}

/**
 * Featured seasonal programs. July & August in Oregon are always PDT (-07:00),
 * so the summer window uses that offset directly.
 */
const SPECIAL_EVENTS: SpecialEvent[] = [
  {
    slug: "summer-reading-circle",
    program: "Summer Reading Programs",
    title: "Summer Reading Circle",
    tagline: "A cozy, low-key reading group for younger readers",
    description:
      "Drop in to our Summer Reading Circle — a relaxed, welcoming reading group for youth. Kids gather at the shop to share what they're reading, discover new favorites with a bookseller's help, and keep the pages turning all summer long. Free and open to the community; no sign-up required.",
    startDate: "2026-07-01T10:00:00-07:00",
    endDate: "2026-08-21T17:00:00-07:00",
    dateLabel: "July 1 – August 21, 2026",
    season: "Summer 2026",
    accent: "#1F7A7A",
    audience: "Youth",
  },
  {
    slug: "summer-reading-challenge",
    program: "Summer Reading Programs",
    title: "Summer Reading Challenge",
    tagline: "Read more, earn rewards, beat the summer slump",
    description:
      "Take the Summer Reading Challenge! Youth readers set a goal, track the books they finish over the summer, and earn fun rewards along the way. It's a playful way to keep reading between school years — pick up a tracker at the shop and start your stack. Free to join.",
    startDate: "2026-07-01T10:00:00-07:00",
    endDate: "2026-08-21T17:00:00-07:00",
    dateLabel: "July 1 – August 21, 2026",
    season: "Summer 2026",
    accent: "#C0492F",
    audience: "Youth",
  },
];

/** All defined special events (regardless of date), ordered by start date. */
export function getAllSpecialEvents(): SpecialEvent[] {
  return [...SPECIAL_EVENTS].sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );
}

/** The special events belonging to a named program (regardless of date). */
export function getProgramEvents(program: string): SpecialEvent[] {
  return getAllSpecialEvents().filter((ev) => ev.program === program);
}

/**
 * Special events that haven't finished yet, ordered by start date. An event is
 * "active" through its end instant, so a program shows for its whole window and
 * disappears the day after it wraps. Deterministic given `now`.
 */
export function getActiveSpecialEvents(now: Date = new Date()): SpecialEvent[] {
  return SPECIAL_EVENTS.filter(
    (ev) => new Date(ev.endDate).getTime() > now.getTime(),
  ).sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/**
 * schema.org Event for a seasonal program — self-contained (inline location +
 * named organizer + free Offer) so it qualifies for Google's Event rich result
 * on whatever page emits it. Shared by the homepage banner and the dedicated
 * Summer Reading landing page so the two never drift apart.
 */
export function specialEventJsonLd(ev: SpecialEvent): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.title,
    description: ev.description,
    startDate: ev.startDate,
    endDate: ev.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    ...(ev.audience
      ? { audience: { "@type": "Audience", audienceType: ev.audience } }
      : {}),
    location: storeEventLocation(),
    organizer: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#bookstore`,
      name: "To Be Read (Clackamas Book Exchange)",
      url: SITE_URL,
    },
    image: `${SITE_URL}/opengraph-image`,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/events/summer-reading`,
    },
  };
}

/**
 * The active special events grouped under a single program name, if one program
 * is currently running. Used by the homepage banner, which showcases one
 * featured program (e.g. "Summer Reading Programs") at a time.
 */
export function getFeaturedProgram(
  now: Date = new Date(),
): { program: string; events: SpecialEvent[] } | null {
  const active = getActiveSpecialEvents(now);
  if (active.length === 0) return null;
  const program = active[0].program;
  if (!program) {
    return { program: active[0].title, events: [active[0]] };
  }
  return {
    program,
    events: active.filter((ev) => ev.program === program),
  };
}
