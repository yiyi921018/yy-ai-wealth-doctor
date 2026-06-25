import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, SunMedium, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { StepProgress } from "@/components/layout/StepProgress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const valueProps = [
  { icon: ShieldCheck, label: "財務健康診斷" },
  { icon: TrendingUp, label: "AI 資產配置分析" },
  { icon: Sparkles, label: "專屬改善建議" },
];

export default function WelcomePage() {
  return (
    <AppShell>
      <PageTransition>
        <section className="grid min-h-[70vh] items-center gap-10 py-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm font-semibold text-navy-700 shadow-sm">
              <SunMedium className="size-4 text-gold-600" />
              太陽般清晰、穩健的財務診斷
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-navy-900 sm:text-6xl lg:text-7xl">
                歡迎使用 Y&amp;Y AI Wealth Doctor
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-muted-foreground">
                透過 AI 分析客戶資產配置，快速找出流動性、成長性與防禦性的健康狀態。
              </p>
            </div>
            <Button asChild variant="gold" size="lg">
              <Link href="/basic-info">
                開始分析
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>

          <Card className="relative overflow-hidden p-6">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-gold-300/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-navy-100/80 blur-3xl" />
            <div className="relative space-y-5">
              <div className="sun-gradient flex aspect-square max-h-72 items-center justify-center rounded-full shadow-premium">
                <div className="rounded-full bg-white/75 p-8 text-center shadow-card">
                  <div className="text-5xl font-black text-navy-900">Y&amp;Y</div>
                  <div className="mt-2 text-sm font-semibold text-navy-700">AI 財務健康診斷系統</div>
                </div>
              </div>
              <div className="grid gap-3">
                {valueProps.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <item.icon className="size-5 text-gold-600" />
                    <span className="font-semibold text-navy-900">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>
        <StepProgress currentStep={1} />
      </PageTransition>
    </AppShell>
  );
}
