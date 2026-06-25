"use client";

import Link from "next/link";
import { Activity, SunMedium } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <div className="sun-gradient flex size-10 shrink-0 items-center justify-center rounded-2xl shadow-card sm:size-11">
          <SunMedium className="size-5 text-navy-900 sm:size-6" />
        </div>
        <div className="min-w-0">
          <div className="text-xl font-black tracking-tight text-navy-900">Y&amp;Y</div>
          <div className="hidden text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
            AI 財務健康診斷系統
          </div>
        </div>
      </div>
      <Link
        href="/advisor-console"
        className="flex shrink-0 items-center gap-1.5 rounded-full border bg-white/80 px-3 py-2 text-xs font-medium text-navy-700 shadow-sm transition hover:border-gold-500 hover:bg-gold-100/60 sm:gap-2 sm:px-4 sm:text-sm"
      >
        <Activity className="size-4 text-gold-600" />
        顧問控制台
      </Link>
    </header>
  );
}
