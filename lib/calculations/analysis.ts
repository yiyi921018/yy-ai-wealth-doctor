import { ASSET_WEIGHTS, CORE_ASSET_OPTIONS } from "@/lib/constants";
import { calculateActualAllocation, calculateCategoryActualPercent } from "@/lib/calculations/allocation";
import { generateInsight, generateRecommendations } from "@/lib/calculations/insights";
import { calculateRecommendedAllocation } from "@/lib/calculations/recommendation";
import { calculateHealthScores, getFinancialSafetyAnalysis } from "@/lib/calculations/scoring";
import type { AnalysisResult, CategoryAllocation, ClientProfile, CoreAssetCategory } from "@/lib/types";
import { round } from "@/lib/utils";

function buildCategoryGap(
  profile: ClientProfile,
  recommendedAllocation: AnalysisResult["recommendedAllocation"],
): CategoryAllocation[] {
  const selectedCore = CORE_ASSET_OPTIONS.filter((asset) => profile.selectedAssets.includes(asset.id));
  const suitability = selectedCore.map((asset) => {
    const weights = ASSET_WEIGHTS[asset.id];
    return {
      asset,
      score:
        weights.growth * recommendedAllocation.growth +
        weights.liquidity * recommendedAllocation.liquidity +
        weights.defense * recommendedAllocation.defense,
    };
  });

  const scoreTotal = suitability.reduce((sum, item) => sum + item.score, 0) || 1;

  return suitability.map(({ asset, score }) => {
    const actualAmount = profile.assetValues[asset.id as CoreAssetCategory] ?? 0;
    const actual = calculateCategoryActualPercent(
      actualAmount,
      profile.totalAssets,
    );
    const recommended = round((score / scoreTotal) * 100);
    const recommendedAmount = Math.round((profile.totalAssets * recommended) / 100);
    const difference = round(actual - recommended);
    const status =
      Math.abs(difference) < 5 ? "Balanced" : difference > 0 ? "Overweight" : "Underweight";

    return {
      category: asset.id,
      label: asset.label,
      actualAmount,
      recommendedAmount,
      recommendedPercent: recommended,
      actualPercent: actual,
      difference,
      status,
    };
  });
}

export function analyzeProfile(profile: ClientProfile): AnalysisResult {
  const recommendedAllocation = calculateRecommendedAllocation(profile.age, profile.assetValues);
  const actualAllocation = calculateActualAllocation(profile.assetValues, profile.totalAssets);
  const categoryGap = buildCategoryGap(profile, recommendedAllocation);
  const scores = calculateHealthScores(profile.assetValues, profile.totalAssets);
  const financialSafety = getFinancialSafetyAnalysis(profile.assetValues, profile.totalAssets);
  const insight = generateInsight(categoryGap, scores, financialSafety);
  const recommendations = generateRecommendations(categoryGap, financialSafety);

  return {
    recommendedAllocation,
    actualAllocation,
    categoryGap,
    scores,
    financialSafety,
    insight,
    recommendations,
  };
}
