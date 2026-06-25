"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ASSET_OPTIONS } from "@/lib/constants";
import type { AssetCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AssetCheckboxGroupProps {
  selectedAssets: AssetCategory[];
  onToggle: (asset: AssetCategory) => void;
}

export function AssetCheckboxGroup({ selectedAssets, onToggle }: AssetCheckboxGroupProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ASSET_OPTIONS.map((asset) => {
        const checked = selectedAssets.includes(asset.id);
        return (
          <label
            key={asset.id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:border-gold-500 hover:shadow-card",
              checked && "border-gold-500 bg-gold-100/60",
            )}
          >
            <Checkbox checked={checked} onCheckedChange={() => onToggle(asset.id)} />
            <span className="font-medium text-navy-900">{asset.label}</span>
          </label>
        );
      })}
    </div>
  );
}
