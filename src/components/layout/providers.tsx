"use client";

import type { ReactNode } from "react";
import { WatchlistProvider } from "@/context/watchlist-provider";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WatchlistProvider>
      {children}
      <Toaster />
    </WatchlistProvider>
  );
}
