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

export function FinancialSafetyCard({ analysis }: { analysis: FinancialSafetyAnalysis }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-gold-600" />
              Financial Safety Score
            </CardTitle>
            <CardDescription>
              Measures protection against major life risks and unexpected financial events.
            </CardDescription>
          </div>
          <Badge variant={statusVariant[analysis.status]}>{analysis.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-center">
          <ScoreCircle label="Safety" value={analysis.score} />
          <p className="leading-7 text-muted-foreground">{analysis.explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
