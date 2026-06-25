import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { CategoryAllocation } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

const statusLabel: Record<CategoryAllocation["status"], string> = {
  Overweight: "比例過高",
  Underweight: "比例過低",
  Balanced: "平衡",
};

export function GapAnalysisTable({ rows }: { rows: CategoryAllocation[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>資產類別</TableHead>
          <TableHead>客戶輸入金額</TableHead>
          <TableHead>建議百分比</TableHead>
          <TableHead>實際百分比</TableHead>
          <TableHead>差異</TableHead>
          <TableHead>建議調整到</TableHead>
          <TableHead>現況</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.category}>
            <TableCell className="font-semibold text-navy-900">{row.label}</TableCell>
            <TableCell>{formatCurrency(row.actualAmount)}</TableCell>
            <TableCell>{row.recommendedPercent.toFixed(1)}%</TableCell>
            <TableCell>{row.actualPercent.toFixed(1)}%</TableCell>
            <TableCell>{formatPercent(row.difference)}</TableCell>
            <TableCell className="font-semibold text-navy-900">
              {formatCurrency(row.recommendedAmount)}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  row.status === "Balanced"
                    ? "success"
                    : row.status === "Overweight"
                      ? "warning"
                      : "danger"
                }
              >
                {statusLabel[row.status]}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
