"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  addPick,
  clearReadingList,
  getReadingList,
  isSaved,
  pickKey,
  removePick,
  subscribeReadingList,
  type SavedPick,
} from "./readingList";

const EMPTY: SavedPick[] = [];

/**
 * React binding for the localStorage reading list. The list renders empty on
 * the server (no localStorage) and reconciles to the stored value after mount.
 */
export function useReadingList() {
  const items = useSyncExternalStore(
    subscribeReadingList,
    getReadingList,
    () => EMPTY,
  );

  const save = useCallback((pick: Omit<SavedPick, "savedAt">) => addPick(pick), []);
  const remove = useCallback(
    (title: string, author: string) => removePick(title, author),
    [],
  );
  const clear = useCallback(() => clearReadingList(), []);
  const has = useCallback(
    (title: string, author: string) =>
      items.some((p) => pickKey(p.title, p.author) === pickKey(title, author)),
    [items],
  );

  return { items, count: items.length, save, remove, clear, has, isSaved };
}
