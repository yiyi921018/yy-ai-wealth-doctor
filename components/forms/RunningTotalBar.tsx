import { AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils/format";

interface RunningTotalBarProps {
  totalAssets: number;
  currentTotal: number;
}

export function RunningTotalBar({ totalAssets, currentTotal }: RunningTotalBarProps) {
  const percentage = totalAssets ? (currentTotal / totalAssets) * 100 : 0;
  const exceeds = currentTotal > totalAssets;

  return (
    <div className="rounded-3xl border bg-white/80 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-navy-900">資產總數</span>
        <span className="font-bold text-navy-900">
          {formatCurrency(currentTotal)} / {formatCurrency(totalAssets)}
        </span>
      </div>
      <Progress value={Math.min(100, percentage)} className={exceeds ? "[&>div]:bg-rose-500" : ""} />
      {exceeds && (
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          <AlertTriangle className="size-4" />
          輸入的資產總額已超過申報的總資產。
        </div>
      )}
    </div>
  );
}
