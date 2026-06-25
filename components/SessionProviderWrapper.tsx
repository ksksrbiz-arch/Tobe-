"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

/**
 * Wraps a subtree in NextAuth's <SessionProvider> so client components can call
 * `useSession()`. Scoped to the routes that actually need auth (the /admin and
 * /wishlist layouts) rather than the whole app, so the marketing pages don't
 * pay for a client-side session fetch on every load.
 */
export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
