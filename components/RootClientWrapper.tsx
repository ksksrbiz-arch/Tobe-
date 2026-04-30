"use client";

import React from "react";
import LoadingScreen from "./LoadingScreen";

export default function RootClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      {children}
    </>
  );
}
