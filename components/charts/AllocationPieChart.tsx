"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS } from "@/lib/constants";
import type { AllocationBreakdown } from "@/lib/types";

interface AllocationPieChartProps {
  data: AllocationBreakdown;
}

export function AllocationPieChart({ data }: AllocationPieChartProps) {
  const chartData = [
    { name: "成長", value: data.growth },
    { name: "流動", value: data.liquidity },
    { name: "防禦", value: data.defense },
  ];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={4}
            animationDuration={900}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 flex justify-center gap-4 text-xs font-semibold text-muted-foreground">
        {chartData.map((entry, index) => (
          <span key={entry.name} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index] }} />
            {entry.name} {entry.value.toFixed(1)}%
          </span>
        ))}
      </div>
    </div>
  );
}
