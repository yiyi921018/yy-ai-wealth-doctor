"use client";

import Link from "next/link";
import { ArrowLeft, Download, Stethoscope } from "lucide-react";
import { AllocationPieChart } from "@/components/charts/AllocationPieChart";
import { AssetAllocationPieChart } from "@/components/charts/AssetAllocationPieChart";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { StepProgress } from "@/components/layout/StepProgress";
import { AIInsightCard } from "@/components/results/AIInsightCard";
import { AIRecommendationCard } from "@/components/results/AIRecommendationCard";
import { FinancialSafetyCard } from "@/components/results/FinancialSafetyCard";
import { GapAnalysisTable } from "@/components/results/GapAnalysisTable";
import { HealthScoreCard } from "@/components/results/HealthScoreCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeProfile } from "@/lib/calculations/analysis";
import { useAnalysisStore } from "@/lib/store/useAnalysisStore";
import type { CoreAssetCategory } from "@/lib/types";

export default function ResultsPage() {
  const age = useAnalysisStore((state) => state.age);
  const totalAssets = useAnalysisStore((state) => state.totalAssets);
  const selectedAssets = useAnalysisStore((state) => state.selectedAssets);
  const customAssets = useAnalysisStore((state) => state.customAssets);
  const assetValues = useAnalysisStore((state) => state.assetValues);

  const selectedAssetValues: Partial<Record<CoreAssetCategory, number>> = Object.fromEntries(
    Object.entries(assetValues).filter(([asset]) =>
      selectedAssets.includes(asset as CoreAssetCategory),
    ),
  );

  const profile = {
    age,
    totalAssets,
    selectedAssets,
    customAssets,
    assetValues: selectedAssetValues,
  };

  const hasLiveData =
    selectedAssets.length > 0 &&
    (Object.values(selectedAssetValues).some((value) => (value ?? 0) > 0) ||
      customAssets.some((asset) => asset.value > 0));
  const result = analyzeProfile(profile);

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-8 py-8">
          <div className="flex flex-col justify-between gap-4 rounded-3xl bg-navy-900 p-6 text-white shadow-premium sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gold-500 text-navy-900">
                <Stethoscope className="size-7" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">財務健康報告</h1>
                <p className="text-white/65">以 AI 協助顧問快速診斷客戶資產配置。</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href="/asset-values">
                  <ArrowLeft className="mr-2 size-4" />
                  返回
                </Link>
              </Button>
              <Button variant="gold">
                <Download className="mr-2 size-4" />
                匯出
              </Button>
            </div>
          </div>

          {!hasLiveData && (
            <Card>
              <CardHeader>
                <CardTitle>尚未輸入資產資料</CardTitle>
                <CardDescription>
                  請返回上一頁輸入資產價值後，再產生分析結果。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="gold">
                  <Link href="/asset-values">輸入資產價值</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI 建議配置</CardTitle>
                  <CardDescription>依年齡調整的成長、流動與防禦配置建議。</CardDescription>
                </CardHeader>
                <CardContent>
                  <AllocationPieChart data={result.recommendedAllocation} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>實際資產配置</CardTitle>
                  <CardDescription>依客戶輸入的資產金額計算目前配置比例。</CardDescription>
                </CardHeader>
                <CardContent>
                  <AssetAllocationPieChart profile={profile} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>配置缺口分析</CardTitle>
                  <CardDescription>比較建議配置與實際配置在各資產類別上的差異。</CardDescription>
                </CardHeader>
                <CardContent>
                  <GapAnalysisTable rows={result.categoryGap} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <HealthScoreCard scores={result.scores} />
              <FinancialSafetyCard analysis={result.financialSafety} />
              <AIInsightCard insight={result.insight} />
              <AIRecommendationCard recommendations={result.recommendations} />
            </div>
          </div>

          <StepProgress currentStep={5} />
        </div>
      </PageTransition>
    </AppShell>
  );
}
