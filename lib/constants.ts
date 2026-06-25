import type { AllocationBreakdown, AssetOption, CoreAssetCategory, WeightProfile } from "@/lib/types";

export const ASSET_OPTIONS: AssetOption[] = [
  { id: "real_estate", label: "Real Estate", shortLabel: "Real Estate" },
  { id: "stocks", label: "Stocks", shortLabel: "Stocks" },
  { id: "mutual_funds", label: "Mutual Funds", shortLabel: "Funds" },
  { id: "bonds", label: "Bonds", shortLabel: "Bonds" },
  { id: "cash", label: "Cash / Savings", shortLabel: "Cash" },
  { id: "insurance", label: "Insurance", shortLabel: "Insurance" },
  { id: "gold", label: "Gold", shortLabel: "Gold" },
  { id: "cryptocurrency", label: "Cryptocurrency", shortLabel: "Crypto" },
  { id: "business_equity", label: "Business Equity", shortLabel: "Business" },
  { id: "retirement_assets", label: "Retirement Assets", shortLabel: "Retirement" },
  { id: "overseas_assets", label: "Overseas Assets", shortLabel: "Overseas" },
  { id: "other", label: "Other", shortLabel: "Other" },
];

export const CORE_ASSET_OPTIONS = ASSET_OPTIONS.filter(
  (asset): asset is AssetOption & { id: CoreAssetCategory } => asset.id !== "other",
);

export const AGE_GROUP_TARGETS: Array<{ min: number; max: number } & AllocationBreakdown> = [
  { min: 25, max: 35, growth: 50, liquidity: 30, defense: 20 },
  { min: 36, max: 45, growth: 40, liquidity: 25, defense: 35 },
  { min: 46, max: 55, growth: 30, liquidity: 25, defense: 45 },
  { min: 56, max: 65, growth: 20, liquidity: 30, defense: 50 },
  { min: 66, max: 120, growth: 10, liquidity: 35, defense: 55 },
];

export const ASSET_WEIGHTS: Record<CoreAssetCategory, WeightProfile> = {
  real_estate: { liquidity: 10, growth: 60, defense: 30 },
  stocks: { liquidity: 80, growth: 90, defense: 20 },
  mutual_funds: { liquidity: 70, growth: 70, defense: 40 },
  bonds: { liquidity: 60, growth: 30, defense: 80 },
  cash: { liquidity: 100, growth: 10, defense: 80 },
  insurance: { liquidity: 30, growth: 10, defense: 100 },
  gold: { liquidity: 40, growth: 50, defense: 60 },
  cryptocurrency: { liquidity: 70, growth: 95, defense: 10 },
  business_equity: { liquidity: 20, growth: 95, defense: 30 },
  retirement_assets: { liquidity: 20, growth: 40, defense: 90 },
  overseas_assets: { liquidity: 60, growth: 70, defense: 50 },
};

export const BUCKET_LABELS = {
  growth: "Growth",
  liquidity: "Liquidity",
  defense: "Defense",
} satisfies Record<keyof AllocationBreakdown, string>;

export const CHART_COLORS = ["#f5b942", "#0a1628", "#60a5fa", "#22c55e", "#a78bfa", "#fb7185"];
