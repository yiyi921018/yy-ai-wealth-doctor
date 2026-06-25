"use client";

import { Input } from "@/components/ui/input";
import { formatNumber, parseCurrencyInput } from "@/lib/utils/format";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export function CurrencyInput({ value, onChange, placeholder = "請輸入新台幣金額" }: CurrencyInputProps) {
  return (
    <Input
      inputMode="decimal"
      value={value ? formatNumber(value) : ""}
      placeholder={placeholder}
      onChange={(event) => onChange(parseCurrencyInput(event.target.value))}
    />
  );
}
