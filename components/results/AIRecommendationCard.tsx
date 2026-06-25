import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AIRecommendationCard({ recommendations }: { recommendations: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {(recommendations.length ? recommendations : ["Maintain regular portfolio reviews as client goals evolve."]).map(
            (item, index) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-muted/70 p-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-black text-navy-900">
                  {index + 1}
                </div>
                <div className="flex-1 font-semibold text-navy-900">{item}</div>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </div>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
