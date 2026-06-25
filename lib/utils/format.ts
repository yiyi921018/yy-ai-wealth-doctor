export function formatCurrency(value: number) {
  const amount = formatNumber(value);

  return `新台幣 ${amount}`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-TW", {
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function parseCurrencyInput(value: string) {
  const numeric = value.replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(numeric);
  return Number.isFinite(parsed) ? parsed : 0;
}
