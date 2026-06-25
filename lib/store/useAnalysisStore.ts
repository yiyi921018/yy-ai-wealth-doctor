"use client";

import { create } from "zustand";
import type { AssetCategory, ClientProfile, CoreAssetCategory, CustomAsset } from "@/lib/types";

interface AnalysisStore extends ClientProfile {
  setClientName: (clientName: string) => void;
  setBasicInfo: (age: number, totalAssets: number) => void;
  setDebtInfo: (hasDebt: boolean, totalDebt: number) => void;
  setAnnualDebtPayment: (annualDebtPayment: number) => void;
  toggleAsset: (asset: AssetCategory) => void;
  setAssetValue: (asset: CoreAssetCategory, value: number) => void;
  addCustomAsset: () => void;
  updateCustomAsset: (id: string, patch: Partial<CustomAsset>) => void;
  removeCustomAsset: (id: string) => void;
  reset: () => void;
}

const initialState: ClientProfile = {
  clientName: "",
  age: 0,
  totalAssets: 0,
  hasDebt: false,
  totalDebt: 0,
  annualDebtPayment: 0,
  selectedAssets: [],
  customAssets: [],
  assetValues: {},
};

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  ...initialState,
  setClientName: (clientName) => set({ clientName }),
  setBasicInfo: (age, totalAssets) => set({ age, totalAssets }),
  setDebtInfo: (hasDebt, totalDebt) =>
    set((state) => ({
      hasDebt,
      totalDebt: hasDebt ? totalDebt : 0,
      annualDebtPayment: hasDebt ? state.annualDebtPayment : 0,
    })),
  setAnnualDebtPayment: (annualDebtPayment) => set({ annualDebtPayment }),
  toggleAsset: (asset) =>
    set((state) => {
      const isSelected = state.selectedAssets.includes(asset);
      const selected = isSelected
        ? state.selectedAssets.filter((item) => item !== asset)
        : [...state.selectedAssets, asset];
      const assetValues = { ...state.assetValues };

      if (isSelected) {
        delete assetValues[asset as CoreAssetCategory];
      }

      return {
        selectedAssets: selected,
        assetValues,
        customAssets: state.customAssets,
      };
    }),
  setAssetValue: (asset, value) =>
    set((state) => ({
      assetValues: { ...state.assetValues, [asset]: value },
    })),
  addCustomAsset: () =>
    set((state) => {
      if (state.customAssets.length >= 3) return state;
      return {
        customAssets: [
          ...state.customAssets,
          { id: crypto.randomUUID(), name: "", value: 0 },
        ],
      };
    }),
  updateCustomAsset: (id, patch) =>
    set((state) => ({
      customAssets: state.customAssets.map((asset) =>
        asset.id === id ? { ...asset, ...patch } : asset,
      ),
    })),
  removeCustomAsset: (id) =>
    set((state) => ({
      customAssets: state.customAssets.filter((asset) => asset.id !== id),
    })),
  reset: () => set(initialState),
}));
