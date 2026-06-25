import { ShieldCheck } from "lucide-react";
import { ScoreCircle } from "@/components/charts/ScoreCircle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinancialSafetyAnalysis } from "@/lib/types";

const statusVariant: Record<FinancialSafetyAnalysis["status"], "danger" | "warning" | "gold" | "success"> = {
  Weak: "danger",
  Moderate: "warning",
  Strong: "gold",
  Excellent: "success",
};

const statusLabel: Record<FinancialSafetyAnalysis["status"], string> = {
  Weak: "偏弱",
  Moderate: "中等",
  Strong: "穩健",
  Excellent: "優秀",
};

export function FinancialSafetyCard({ analysis }: { analysis: FinancialSafetyAnalysis }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-gold-600" />
              財務安全分數
            </CardTitle>
            <CardDescription>
              評估資產配置是否足以應對重大人生風險與突發財務事件。
            </CardDescription>
          </div>
          <Badge variant={statusVariant[analysis.status]}>{statusLabel[analysis.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-center">
          <ScoreCircle label="安全分數" value={analysis.score} />
          <p className="leading-7 text-muted-foreground">{analysis.explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
