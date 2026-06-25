import type { CoreAssetCategory, FinancialSafetyAnalysis, HealthScores } from "@/lib/types";
import { clamp, round } from "@/lib/utils";

function percent(assetValues: Partial<Record<CoreAssetCategory, number>>, asset: CoreAssetCategory, total: number) {
  if (!total) return 0;
  return ((assetValues[asset] ?? 0) / total) * 100;
}

export function calculateHealthScores(
  assetValues: Partial<Record<CoreAssetCategory, number>>,
  totalAssets: number,
): HealthScores {
  const cash = percent(assetValues, "cash", totalAssets);
  const stocks = percent(assetValues, "stocks", totalAssets);
  const realEstate = percent(assetValues, "real_estate", totalAssets);
  const business = percent(assetValues, "business_equity", totalAssets);
  const insurance = percent(assetValues, "insurance", totalAssets);
  const bonds = percent(assetValues, "bonds", totalAssets);
  const crypto = percent(assetValues, "cryptocurrency", totalAssets);
  const retirement = percent(assetValues, "retirement_assets", totalAssets);

  const realEstatePenalty = realEstate > 40 ? Math.min(24, (realEstate - 40) * 0.8) : 0;

  const liquidity = clamp(35 + cash * 1.35 + stocks * 0.55 - realEstatePenalty);
  const growth = clamp(30 + stocks * 0.9 + business * 1.1 + realEstate * 0.35);
  const defense = clamp(28 + insurance * 1.05 + bonds * 0.9 + cash * 0.45);
  const financialSafety = calculateFinancialSafetyScore({
    insurance,
    cash,
    bonds,
    retirement,
    realEstate,
    stocks,
    crypto,
    business,
  });
  const overall = clamp(defense * 0.35 + financialSafety * 0.25 + growth * 0.2 + liquidity * 0.2);

  return {
    liquidity: round(liquidity, 0),
    growth: round(growth, 0),
    defense: round(defense, 0),
    financialSafety: round(financialSafety, 0),
    overall: round(overall, 0),
  };
}

function calculateFinancialSafetyScore({
  insurance,
  cash,
  bonds,
  retirement,
  realEstate,
  stocks,
  crypto,
  business,
}: Record<"insurance" | "cash" | "bonds" | "retirement" | "realEstate" | "stocks" | "crypto" | "business", number>) {
  const positive =
    Math.min(28, insurance * 1.3) +
    Math.min(22, cash * 0.95) +
    Math.min(18, bonds * 0.9) +
    Math.min(16, retirement * 0.65);

  const concentrationPenalty =
    Math.max(0, realEstate - 45) * 0.55 +
    Math.max(0, stocks - 50) * 0.45 +
    Math.max(0, crypto - 10) * 1.2 +
    Math.max(0, business - 30) * 0.75;

  const noInsurancePenalty = insurance <= 0 ? 18 : 0;

  return clamp(34 + positive - concentrationPenalty - noInsurancePenalty);
}

export function getFinancialSafetyAnalysis(
  assetValues: Partial<Record<CoreAssetCategory, number>>,
  totalAssets: number,
): FinancialSafetyAnalysis {
  const score = calculateHealthScores(assetValues, totalAssets).financialSafety;
  const insurance = percent(assetValues, "insurance", totalAssets);
  const cash = percent(assetValues, "cash", totalAssets);
  const bonds = percent(assetValues, "bonds", totalAssets);
  const realEstate = percent(assetValues, "real_estate", totalAssets);
  const stocks = percent(assetValues, "stocks", totalAssets);
  const crypto = percent(assetValues, "cryptocurrency", totalAssets);
  const business = percent(assetValues, "business_equity", totalAssets);

  const status: FinancialSafetyAnalysis["status"] =
    score < 50 ? "Weak" : score < 70 ? "Moderate" : score < 85 ? "Strong" : "Excellent";

  let explanation =
    "目前資產配置具備一定的流動準備、防禦型資產與長期保障能力，整體財務安全性相對穩定。";

  if (insurance <= 0) {
    explanation =
      "目前投資組合缺乏專門用於風險轉移的資產。若發生健康事件、收入中斷或家庭責任增加，可能需要出售投資資產來應對，進而降低長期財務穩定性。";
  } else if (realEstate > 45 || stocks > 50 || crypto > 10 || business > 30) {
    explanation =
      "財務安全性受到資產集中度影響。若遇到重大人生事件，客戶可能被迫在不利時機出售波動較高或流動性較低的資產。";
  } else if (cash < 10 && bonds < 10) {
    explanation =
      "目前可立即動用的準備金相對有限。提高流動型與防禦型資產配置，有助於提升面對突發事件時的韌性。";
  }

  return {
    score,
    status,
    explanation,
  };
}
