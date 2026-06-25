"use client";

import type { PropsWithChildren } from "react";
import { Header } from "@/components/layout/Header";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
