"use client";

import { useEffect, useState } from "react";
import { getStoreStatus, type StoreStatus } from "@/lib/storeHours";

/**
 * Live store open/closed status for badges. Returns `null` until mounted — so
 * the server and first client render show a neutral placeholder and hydration
 * matches — then refreshes every minute so the countdown stays accurate.
 *
 * The state update is deferred out of the effect body via queueMicrotask to
 * avoid the react-hooks/set-state-in-effect cascading-render path.
 */
export function useStoreStatus(): StoreStatus | null {
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStoreStatus());
    queueMicrotask(update);
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
