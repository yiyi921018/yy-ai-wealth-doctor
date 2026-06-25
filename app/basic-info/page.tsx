"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { StepProgress } from "@/components/layout/StepProgress";
import { CurrencyInput } from "@/components/forms/CurrencyInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAnalysisStore } from "@/lib/store/useAnalysisStore";

export default function BasicInfoPage() {
  const router = useRouter();
  const clientName = useAnalysisStore((state) => state.clientName);
  const age = useAnalysisStore((state) => state.age);
  const totalAssets = useAnalysisStore((state) => state.totalAssets);
  const hasDebt = useAnalysisStore((state) => state.hasDebt);
  const totalDebt = useAnalysisStore((state) => state.totalDebt);
  const setClientName = useAnalysisStore((state) => state.setClientName);
  const setBasicInfo = useAnalysisStore((state) => state.setBasicInfo);
  const setDebtInfo = useAnalysisStore((state) => state.setDebtInfo);

  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto max-w-3xl py-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">基本資訊</CardTitle>
              <CardDescription>請輸入客戶的年齡與申報的總資產。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="client-name">客戶姓名</Label>
                <Input
                  id="client-name"
                  value={clientName}
                  placeholder="請輸入客戶姓名"
                  onChange={(event) => setClientName(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">年齡</Label>
                <Input
                  id="age"
                  type="number"
                  min={18}
                  max={120}
                  value={age || ""}
                  placeholder="請輸入年齡"
                  onChange={(event) => setBasicInfo(Number(event.target.value || 0), totalAssets)}
                />
              </div>
              <div className="space-y-2">
                <Label>總資產（新台幣）</Label>
                <CurrencyInput value={totalAssets} onChange={(value) => setBasicInfo(age, value)} />
              </div>
              <div className="space-y-3 rounded-3xl border bg-white/70 p-4">
                <Label>有無負債</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setDebtInfo(true, totalDebt)}
                    className={`rounded-2xl border px-4 py-3 text-left font-semibold transition ${
                      hasDebt ? "border-gold-500 bg-gold-100 text-navy-900" : "bg-white text-muted-foreground"
                    }`}
                  >
                    有負債
                  </button>
                  <button
                    type="button"
                    onClick={() => setDebtInfo(false, 0)}
                    className={`rounded-2xl border px-4 py-3 text-left font-semibold transition ${
                      !hasDebt ? "border-gold-500 bg-gold-100 text-navy-900" : "bg-white text-muted-foreground"
                    }`}
                  >
                    無負債
                  </button>
                </div>
                {hasDebt && (
                  <div className="space-y-2">
                    <Label>負債（信貸 車貸 房貸 學貸總金額）</Label>
                    <CurrencyInput
                      value={totalDebt}
                      placeholder="請輸入負債總金額"
                      onChange={(value) => setDebtInfo(true, value)}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button asChild variant="outline" size="lg">
                  <Link href="/">
                    <ArrowLeft className="mr-2 size-4" />
                    返回
                  </Link>
                </Button>
                <Button
                  variant="gold"
                  className="sm:min-w-48"
                  size="lg"
                  disabled={!clientName.trim() || !age || !totalAssets || (hasDebt && !totalDebt)}
                  onClick={() => router.push("/asset-selection")}
                >
                  下一篇
                </Button>
              </div>
            </CardContent>
          </Card>
          <StepProgress currentStep={2} />
        </div>
      </PageTransition>
    </AppShell>
  );
}
