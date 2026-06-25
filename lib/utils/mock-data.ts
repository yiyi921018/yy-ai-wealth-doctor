import type { ClientProfile } from "@/lib/types";

export const mockProfile: ClientProfile = {
  clientName: "範例客戶",
  age: 42,
  totalAssets: 5_000_000,
  hasDebt: false,
  totalDebt: 0,
  annualDebtPayment: 0,
  selectedAssets: ["real_estate", "stocks", "insurance", "cash", "bonds"],
  customAssets: [],
  assetValues: {
    real_estate: 2_250_000,
    stocks: 1_000_000,
    insurance: 250_000,
    cash: 500_000,
    bonds: 1_000_000,
  },
};
