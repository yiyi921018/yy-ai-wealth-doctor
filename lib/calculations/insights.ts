import type { CategoryAllocation, FinancialSafetyAnalysis, HealthScores } from "@/lib/types";

export function generateInsight(
  gaps: CategoryAllocation[],
  scores: HealthScores,
  financialSafety: FinancialSafetyAnalysis,
) {
  const overweight = [...gaps]
    .filter((gap) => gap.status === "Overweight")
    .sort((a, b) => b.difference - a.difference)[0];
  const underweight = [...gaps]
    .filter((gap) => gap.status === "Underweight")
    .sort((a, b) => a.difference - b.difference)[0];

  if (!overweight && !underweight) {
    return "Your allocation is broadly balanced across growth, liquidity, and defense. Continue reviewing the portfolio as client goals and age profile evolve.";
  }

  if (financialSafety.status === "Weak") {
    return financialSafety.explanation;
  }

  const pressure =
    scores.liquidity < 60
      ? "reducing liquidity and flexibility"
      : scores.defense < 60
        ? "leaving the client with weaker downside protection"
        : "creating a visible portfolio concentration";

  const underweightLabel =
    underweight?.category === "insurance"
      ? "financial protection allocation"
      : underweight?.label ?? "defensive and liquid reserves";

  return `Your asset allocation is most concentrated in ${overweight?.label ?? "growth assets"}, ${pressure}. Consider increasing ${underweightLabel} to improve overall financial stability.`;
}

function recommendationLabel(gap: CategoryAllocation) {
  if (gap.category === "insurance") {
    return "Improve financial protection allocation";
  }

  if (gap.category === "cash") {
    return `Increase ${gap.label} reserves by ${Math.abs(gap.difference).toFixed(1)}%`;
  }

  return `Increase ${gap.label} allocation by ${Math.abs(gap.difference).toFixed(1)}%`;
}

export function generateRecommendations(
  gaps: CategoryAllocation[],
  financialSafety: FinancialSafetyAnalysis,
) {
  const increases = gaps
    .filter((gap) => gap.status === "Underweight")
    .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))
    .slice(0, 2)
    .map(recommendationLabel);

  const decrease = gaps
    .filter((gap) => gap.status === "Overweight")
    .sort((a, b) => b.difference - a.difference)
    .slice(0, 1)
    .map((gap) => `Reduce ${gap.label} exposure by ${gap.difference.toFixed(1)}%`);

  const safetyActions =
    financialSafety.status === "Weak" || financialSafety.status === "Moderate"
      ? [
          "Strengthen risk-transfer capacity",
          "Enhance family financial resilience",
          "Increase protection against unexpected life events",
        ]
      : [];

  return [...safetyActions, ...increases, ...decrease].slice(0, 3);
}
