import { ScoreCircle } from "@/components/charts/ScoreCircle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { HealthScores } from "@/lib/types";

export function HealthScoreCard({ scores }: { scores: HealthScores }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Health Score</CardTitle>
        <CardDescription>Weighted by defense, growth, and liquidity resilience.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-5">
          <ScoreCircle label="Liquidity" value={scores.liquidity} />
          <ScoreCircle label="Growth" value={scores.growth} />
          <ScoreCircle label="Defense" value={scores.defense} />
          <ScoreCircle label="Safety" value={scores.financialSafety} />
          <ScoreCircle label="Overall" value={scores.overall} className="rounded-3xl bg-gold-100/50 py-3" />
        </div>
      </CardContent>
    </Card>
  );
}
