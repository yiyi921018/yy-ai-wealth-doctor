"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS, CORE_ASSET_OPTIONS } from "@/lib/constants";
import type { ClientProfile } from "@/lib/types";
import { calculateCategoryActualPercent } from "@/lib/calculations/allocation";

export function AssetAllocationPieChart({ profile }: { profile: ClientProfile }) {
  const coreData = CORE_ASSET_OPTIONS.filter((asset) => profile.selectedAssets.includes(asset.id))
    .map((asset) => ({
      name: asset.shortLabel,
      value: calculateCategoryActualPercent(profile.assetValues[asset.id] ?? 0, profile.totalAssets),
    }))
    .filter((item) => item.value > 0);

  const customData = profile.customAssets
    .filter((asset) => asset.value > 0)
    .map((asset) => ({
      name: asset.name || "Custom",
      value: calculateCategoryActualPercent(asset.value, profile.totalAssets),
    }));

  const chartData = [...coreData, ...customData];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={105}
            paddingAngle={3}
            animationDuration={900}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs font-semibold text-muted-foreground">
        {chartData.map((entry, index) => (
          <span key={entry.name} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
            {entry.name} {entry.value.toFixed(1)}%
          </span>
        ))}
      </div>
    </div>
  );
}
