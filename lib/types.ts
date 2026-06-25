export type AssetCategory =
  | "real_estate"
  | "stocks"
  | "mutual_funds"
  | "bonds"
  | "cash"
  | "insurance"
  | "gold"
  | "cryptocurrency"
  | "business_equity"
  | "retirement_assets"
  | "overseas_assets"
  | "other";

export type CoreAssetCategory = Exclude<AssetCategory, "other">;

export type AllocationBucket = "growth" | "liquidity" | "defense";

export type WeightProfile = Record<AllocationBucket, number>;

export interface AssetOption {
  id: AssetCategory;
  label: string;
  shortLabel: string;
}

export interface CustomAsset {
  id: string;
  name: string;
  value: number;
}

export interface ClientProfile {
  age: number;
  totalAssets: number;
  selectedAssets: AssetCategory[];
  customAssets: CustomAsset[];
  assetValues: Partial<Record<CoreAssetCategory, number>>;
}

export interface AllocationBreakdown {
  growth: number;
  liquidity: number;
  defense: number;
}

export interface CategoryAllocation {
  category: string;
  label: string;
  actualAmount: number;
  recommendedAmount: number;
  recommendedPercent: number;
  actualPercent: number;
  difference: number;
  status: "Overweight" | "Underweight" | "Balanced";
}

export interface HealthScores {
  liquidity: number;
  growth: number;
  defense: number;
  financialSafety: number;
  overall: number;
}

export interface FinancialSafetyAnalysis {
  score: number;
  status: "Weak" | "Moderate" | "Strong" | "Excellent";
  explanation: string;
}

export interface AnalysisResult {
  recommendedAllocation: AllocationBreakdown;
  actualAllocation: AllocationBreakdown;
  categoryGap: CategoryAllocation[];
  scores: HealthScores;
  financialSafety: FinancialSafetyAnalysis;
  insight: string;
  recommendations: string[];
}
