"use client";

import { useMemo } from "react";
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
import { useAnalysisStore } from "@/lib/store/useAnalysisStore";

export default function AssetValuesPage() {
  const router = useRouter();
  const totalAssets = useAnalysisStore((state) => state.totalAssets);
  const selectedAssets = useAnalysisStore((state) => state.selectedAssets);
  const assetValues = useAnalysisStore((state) => state.assetValues);
  const customAssets = useAnalysisStore((state) => state.customAssets);
  const setAssetValue = useAnalysisStore((state) => state.setAssetValue);
  const updateCustomAsset = useAnalysisStore((state) => state.updateCustomAsset);

  const selectedCoreAssets = CORE_ASSET_OPTIONS.filter((asset) => selectedAssets.includes(asset.id));
  const runningTotal = useMemo(
    () => sumAssetValues(assetValues, customAssets),
    [assetValues, customAssets],
  );

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

              {customAssets.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {customAssets.map((asset) => (
                    <div key={asset.id} className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
                      <Label>{asset.name || "Custom Asset"}</Label>
                      <CurrencyInput
                        value={asset.value}
                        onChange={(value) => updateCustomAsset(asset.id, { value })}
                      />
                    </div>
                  ))}
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
                  disabled={!runningTotal}
                  onClick={() => router.push("/results")}
                >
                  產生分析
                </Button>
              </div>
            </CardContent>
          </Card>
          <StepProgress currentStep={4} />
        </div>
      </PageTransition>
    </AppShell>
  );
}
