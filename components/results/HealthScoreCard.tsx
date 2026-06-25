import { ScoreCircle } from "@/components/charts/ScoreCircle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { HealthScores } from "@/lib/types";

export function HealthScoreCard({ scores }: { scores: HealthScores }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>財務健康分數</CardTitle>
        <CardDescription>依防禦、成長、流動與財務安全能力加權評估。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-5">
          <ScoreCircle label="流動性" value={scores.liquidity} />
          <ScoreCircle label="成長性" value={scores.growth} />
          <ScoreCircle label="防禦性" value={scores.defense} />
          <ScoreCircle label="財務安全" value={scores.financialSafety} />
          <ScoreCircle label="總分" value={scores.overall} className="rounded-3xl bg-gold-100/50 py-3" />
        </div>
      </CardContent>
    </Card>
  );
}
