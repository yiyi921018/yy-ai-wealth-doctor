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
    return "目前資產配置在成長性、流動性與防禦性之間大致平衡。建議隨著客戶目標與年齡階段變化，定期檢視配置是否仍符合需求。";
  }

  if (financialSafety.status === "Weak") {
    return financialSafety.explanation;
  }

  const pressure =
    scores.liquidity < 60
      ? "使資金流動性與調度彈性下降"
      : scores.defense < 60
        ? "使下行風險防護能力偏弱"
        : "形成較明顯的資產集中風險";

  const underweightLabel =
    underweight?.category === "insurance"
      ? "財務保障配置"
      : underweight?.label ?? "防禦型與流動型資產";

  return `目前資產配置最集中在${overweight?.label ?? "成長型資產"}，${pressure}。建議提高${underweightLabel}，以提升整體財務穩定度。`;
}

function recommendationLabel(gap: CategoryAllocation) {
  if (gap.category === "insurance") {
    return "提升財務保障配置";
  }

  if (gap.category === "cash") {
    return `增加${gap.label}準備金 ${Math.abs(gap.difference).toFixed(1)}%`;
  }

  return `增加${gap.label}配置 ${Math.abs(gap.difference).toFixed(1)}%`;
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
    .map((gap) => `降低${gap.label}曝險 ${gap.difference.toFixed(1)}%`);

  const safetyActions =
    financialSafety.status === "Weak" || financialSafety.status === "Moderate"
      ? [
          "強化風險轉移能力",
          "提升家庭財務韌性",
          "增加對突發人生事件的防護能力",
        ]
      : [];

  return [...safetyActions, ...increases, ...decrease].slice(0, 3);
}
