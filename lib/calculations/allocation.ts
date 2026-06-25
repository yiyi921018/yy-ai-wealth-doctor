import { ASSET_WEIGHTS, CORE_ASSET_OPTIONS } from "@/lib/constants";
import type { AllocationBreakdown, CoreAssetCategory, CustomAsset } from "@/lib/types";
import { round } from "@/lib/utils";

export function sumAssetValues(
  assetValues: Partial<Record<CoreAssetCategory, number>>,
  customAssets: CustomAsset[] = [],
) {
  const coreTotal = Object.values(assetValues).reduce((sum, value) => sum + (value ?? 0), 0);
  const customTotal = customAssets.reduce((sum, asset) => sum + asset.value, 0);
  return coreTotal + customTotal;
}

export function calculateCategoryActualPercent(
  value: number,
  totalAssets: number,
) {
  if (!totalAssets) return 0;
  return round((value / totalAssets) * 100);
}

export function calculateActualAllocation(
  assetValues: Partial<Record<CoreAssetCategory, number>>,
  totalAssets: number,
): AllocationBreakdown {
  if (!totalAssets) return { growth: 0, liquidity: 0, defense: 0 };

  const weighted = CORE_ASSET_OPTIONS.reduce(
    (acc, option) => {
      const value = assetValues[option.id] ?? 0;
      const ratio = value / totalAssets;
      const weights = ASSET_WEIGHTS[option.id];

      acc.growth += ratio * weights.growth;
      acc.liquidity += ratio * weights.liquidity;
      acc.defense += ratio * weights.defense;
      return acc;
    },
    { growth: 0, liquidity: 0, defense: 0 },
  );

  const total = weighted.growth + weighted.liquidity + weighted.defense;
  if (!total) return { growth: 0, liquidity: 0, defense: 0 };

  return {
    growth: round((weighted.growth / total) * 100),
    liquidity: round((weighted.liquidity / total) * 100),
    defense: round((weighted.defense / total) * 100),
  };
}
