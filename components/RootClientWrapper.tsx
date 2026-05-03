"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import LoadingScreen from "./LoadingScreen";

export default function RootClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LoadingScreen />
      {children}
    </SessionProvider>
  );
}
