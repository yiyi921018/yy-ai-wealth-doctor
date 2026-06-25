"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { StepProgress } from "@/components/layout/StepProgress";
import { AssetCheckboxGroup } from "@/components/forms/AssetCheckboxGroup";
import { CustomAssetFields } from "@/components/forms/CustomAssetFields";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysisStore } from "@/lib/store/useAnalysisStore";

export default function AssetSelectionPage() {
  const router = useRouter();
  const selectedAssets = useAnalysisStore((state) => state.selectedAssets);
  const customAssets = useAnalysisStore((state) => state.customAssets);
  const toggleAsset = useAnalysisStore((state) => state.toggleAsset);
  const addCustomAsset = useAnalysisStore((state) => state.addCustomAsset);
  const updateCustomAsset = useAnalysisStore((state) => state.updateCustomAsset);
  const removeCustomAsset = useAnalysisStore((state) => state.removeCustomAsset);
  const showCustomAssets = selectedAssets.includes("other");

  useEffect(() => {
    if (showCustomAssets && customAssets.length === 0) {
      addCustomAsset();
    }
  }, [addCustomAsset, customAssets.length, showCustomAssets]);

  return (
    <AppShell>
      <PageTransition>
        <div className="py-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">資產選擇</CardTitle>
              <CardDescription>請選擇客戶目前持有的所有資產類別。</CardDescription>
            </CardHeader>
            <CardContent>
              <AssetCheckboxGroup selectedAssets={selectedAssets} onToggle={toggleAsset} />
              {showCustomAssets && (
                <CustomAssetFields
                  assets={customAssets}
                  onAdd={addCustomAsset}
                  onUpdate={updateCustomAsset}
                  onRemove={removeCustomAsset}
                />
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button asChild variant="outline" size="lg">
                  <Link href="/basic-info">
                    <ArrowLeft className="mr-2 size-4" />
                    返回
                  </Link>
                </Button>
                <Button
                  variant="gold"
                  size="lg"
                  className="sm:min-w-48"
                  disabled={selectedAssets.length === 0}
                  onClick={() => router.push("/asset-values")}
                >
                  下一篇
                </Button>
              </div>
            </CardContent>
          </Card>
          <StepProgress currentStep={3} />
        </div>
      </PageTransition>
    </AppShell>
  );
}
