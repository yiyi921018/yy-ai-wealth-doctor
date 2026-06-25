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
  const setClientName = useAnalysisStore((state) => state.setClientName);
  const setBasicInfo = useAnalysisStore((state) => state.setBasicInfo);

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
                  disabled={!clientName.trim() || !age || !totalAssets}
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
