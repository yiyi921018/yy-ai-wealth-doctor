import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AIInsightCard({ insight }: { insight: string }) {
  return (
    <Card className="bg-navy-900 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="size-5 text-gold-500" />
          AI 分析洞察
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-7 text-white/82">{insight}</p>
      </CardContent>
    </Card>
  );
}
