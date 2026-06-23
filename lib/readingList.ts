/**
 * A tiny, dependency-free "reading list" persisted in localStorage.
 *
 * It lets a visitor save AI Matchmaker picks (which carry only title + author,
 * no ISBN) and revisit them later, with no sign-in required — distinct from the
 * ISBN-keyed database wishlist that powers the inventory "hunt" emails.
 *
 * An in-memory cache backs every read so the value handed to React's
 * useSyncExternalStore stays referentially stable until something actually
 * changes (a fresh array each read would loop the store).
 */

export interface SavedPick {
  title: string;
  author: string;
  description?: string;
  cover_url?: string;
  reason?: string;
  /** Epoch ms when the pick was saved. */
  savedAt: number;
}

const STORAGE_KEY = "tbr.readingList.v1";
const MAX_ITEMS = 60;

let cache: SavedPick[] | null = null;
const listeners = new Set<() => void>();

function isPick(value: unknown): value is SavedPick {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.title === "string" && typeof v.author === "string";
}

function readFromStorage(): SavedPick[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isPick).map((p) => ({
      title: p.title,
      author: p.author,
      description: typeof p.description === "string" ? p.description : undefined,
      cover_url: typeof p.cover_url === "string" ? p.cover_url : undefined,
      reason: typeof p.reason === "string" ? p.reason : undefined,
      savedAt: typeof p.savedAt === "number" ? p.savedAt : Date.now(),
    }));
  } catch {
    return [];
  }
}

function ensure(): SavedPick[] {
  if (cache === null) cache = readFromStorage();
  return cache;
}

function commit(next: SavedPick[]) {
  cache = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage full or unavailable — keep the in-memory copy */
    }
  }
  for (const fn of listeners) fn();
}

/** Stable identity for a pick: case-insensitive title + author. */
export function pickKey(title: string, author: string): string {
  return `${title.trim().toLowerCase()}|||${author.trim().toLowerCase()}`;
}

export function getReadingList(): SavedPick[] {
  return ensure();
}

export function isSaved(title: string, author: string): boolean {
  const key = pickKey(title, author);
  return ensure().some((p) => pickKey(p.title, p.author) === key);
}

export function addPick(pick: Omit<SavedPick, "savedAt">): SavedPick[] {
  const key = pickKey(pick.title, pick.author);
  const existing = ensure();
  if (existing.some((p) => pickKey(p.title, p.author) === key)) return existing;
  const next = [{ ...pick, savedAt: Date.now() }, ...existing].slice(0, MAX_ITEMS);
  commit(next);
  return next;
}

export function removePick(title: string, author: string): SavedPick[] {
  const key = pickKey(title, author);
  const next = ensure().filter((p) => pickKey(p.title, p.author) !== key);
  commit(next);
  return next;
}

export function clearReadingList(): SavedPick[] {
  commit([]);
  return cache as SavedPick[];
}

export function subscribeReadingList(callback: () => void): () => void {
  listeners.add(callback);

  // Sync across tabs: another tab writing the key invalidates our cache.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = readFromStorage();
      for (const fn of listeners) fn();
    }
  };
  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}
