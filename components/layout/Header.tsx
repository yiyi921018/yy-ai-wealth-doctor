"use client";

import { Activity, SunMedium } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="sun-gradient flex size-11 items-center justify-center rounded-2xl shadow-card">
          <SunMedium className="size-6 text-navy-900" />
        </div>
        <div>
          <div className="text-xl font-black tracking-tight text-navy-900">Y&amp;Y</div>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            AI Financial Health Diagnostic System
          </div>
        </div>
      </div>
      <div className="hidden items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm font-medium text-navy-700 shadow-sm sm:flex">
        <Activity className="size-4 text-gold-600" />
        Advisor Console
      </div>
    </header>
  );
}
