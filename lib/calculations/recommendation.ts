import { AGE_GROUP_TARGETS, ASSET_WEIGHTS } from "@/lib/constants";
import type { AllocationBreakdown, CoreAssetCategory } from "@/lib/types";
import { round } from "@/lib/utils";

export function getAgeTarget(age: number): AllocationBreakdown {
  const target =
    AGE_GROUP_TARGETS.find((group) => age >= group.min && age <= group.max) ??
    AGE_GROUP_TARGETS[AGE_GROUP_TARGETS.length - 1];

  return {
    growth: target.growth,
    liquidity: target.liquidity,
    defense: target.defense,
  };
}

export function calculateRecommendedAllocation(
  age: number,
  assetValues: Partial<Record<CoreAssetCategory, number>>,
): AllocationBreakdown {
  const ageTarget = getAgeTarget(age);
  const total = Object.values(assetValues).reduce((sum, value) => sum + (value ?? 0), 0);

  if (!total) return ageTarget;

  const assetSignal = Object.entries(assetValues).reduce(
    (acc, [asset, value]) => {
      const weights = ASSET_WEIGHTS[asset as CoreAssetCategory];
      if (!weights || !value) return acc;
      const ratio = value / total;
      acc.growth += weights.growth * ratio;
      acc.liquidity += weights.liquidity * ratio;
      acc.defense += weights.defense * ratio;
      return acc;
    },
    { growth: 0, liquidity: 0, defense: 0 },
  );

  const normalizedSignalTotal = assetSignal.growth + assetSignal.liquidity + assetSignal.defense;
  const normalizedSignal: AllocationBreakdown = normalizedSignalTotal
    ? {
        growth: (assetSignal.growth / normalizedSignalTotal) * 100,
        liquidity: (assetSignal.liquidity / normalizedSignalTotal) * 100,
        defense: (assetSignal.defense / normalizedSignalTotal) * 100,
      }
    : ageTarget;

  return {
    growth: round(ageTarget.growth * 0.7 + normalizedSignal.growth * 0.3),
    liquidity: round(ageTarget.liquidity * 0.7 + normalizedSignal.liquidity * 0.3),
    defense: round(ageTarget.defense * 0.7 + normalizedSignal.defense * 0.3),
  };
}
