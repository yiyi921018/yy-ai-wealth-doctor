"use client";

import { useMemo } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { StepProgress } from "@/components/layout/StepProgress";
import { CurrencyInput } from "@/components/forms/CurrencyInput";
import { RunningTotalBar } from "@/components/forms/RunningTotalBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CORE_ASSET_OPTIONS } from "@/lib/constants";
import { sumAssetValues } from "@/lib/calculations/allocation";
import { saveClientRecord } from "@/lib/store/clientRecords";
import { useAnalysisStore } from "@/lib/store/useAnalysisStore";

export default function AssetValuesPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const clientName = useAnalysisStore((state) => state.clientName);
  const age = useAnalysisStore((state) => state.age);
  const totalAssets = useAnalysisStore((state) => state.totalAssets);
  const hasDebt = useAnalysisStore((state) => state.hasDebt);
  const totalDebt = useAnalysisStore((state) => state.totalDebt);
  const annualDebtPayment = useAnalysisStore((state) => state.annualDebtPayment);
  const selectedAssets = useAnalysisStore((state) => state.selectedAssets);
  const assetValues = useAnalysisStore((state) => state.assetValues);
  const customAssets = useAnalysisStore((state) => state.customAssets);
  const setAssetValue = useAnalysisStore((state) => state.setAssetValue);
  const setAnnualDebtPayment = useAnalysisStore((state) => state.setAnnualDebtPayment);

  const selectedCoreAssets = CORE_ASSET_OPTIONS.filter((asset) => selectedAssets.includes(asset.id));
  const runningTotal = useMemo(
    () => sumAssetValues(assetValues, customAssets),
    [assetValues, customAssets],
  );

  const handleGenerateAnalysis = async () => {
    setIsSaving(true);
    setSaveError("");

    try {
      await saveClientRecord({
        clientName,
        age,
        totalAssets,
        hasDebt,
        totalDebt,
        annualDebtPayment,
        selectedAssets,
        customAssets,
        assetValues,
      });
      router.push("/results");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "客戶資料未成功儲存，請稍後再試。");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppShell>
      <PageTransition>
        <div className="mx-auto max-w-4xl py-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">資產價值輸入</CardTitle>
              <CardDescription>請輸入每個已選資產類別的新台幣價值。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RunningTotalBar totalAssets={totalAssets} currentTotal={runningTotal} />

              <div className="grid gap-4 sm:grid-cols-2">
                {selectedCoreAssets.map((asset) => (
                  <div key={asset.id} className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
                    <Label>{asset.label}</Label>
                    <CurrencyInput
                      value={assetValues[asset.id] ?? 0}
                      onChange={(value) => setAssetValue(asset.id, value)}
                    />
                  </div>
                ))}
              </div>

              {hasDebt && (
                <div className="space-y-2 rounded-2xl border bg-white p-4 shadow-sm">
                  <Label>負債（每年需要繳多少）</Label>
                  <CurrencyInput
                    value={annualDebtPayment}
                    placeholder="請輸入每年需繳負債金額"
                    onChange={setAnnualDebtPayment}
                  />
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button asChild variant="outline" size="lg">
                  <Link href="/asset-selection">
                    <ArrowLeft className="mr-2 size-4" />
                    返回
                  </Link>
                </Button>
                <Button
                  variant="gold"
                  size="lg"
                  className="sm:min-w-48"
                  disabled={!runningTotal || (hasDebt && !annualDebtPayment) || isSaving}
                  onClick={handleGenerateAnalysis}
                >
                  {isSaving ? "儲存中..." : "產生分析"}
                </Button>
              </div>
              {saveError && (
                <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  {saveError}
                </div>
              )}
            </CardContent>
          </Card>
          <StepProgress currentStep={4} />
        </div>
      </PageTransition>
    </AppShell>
  );
}
