"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "@/components/forms/CurrencyInput";
import type { CustomAsset } from "@/lib/types";

interface CustomAssetFieldsProps {
  assets: CustomAsset[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<CustomAsset>) => void;
  onRemove: (id: string) => void;
}

export function CustomAssetFields({ assets, onAdd, onUpdate, onRemove }: CustomAssetFieldsProps) {
  return (
    <div className="mt-6 space-y-4 rounded-3xl border bg-white/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-navy-900">自訂資產類別</h3>
          <p className="text-sm text-muted-foreground">最多可新增 3 個自訂資產類別。</p>
        </div>
        <Button type="button" variant="outline" onClick={onAdd} disabled={assets.length >= 3}>
          <Plus className="mr-2 size-4" />
          新增一筆
        </Button>
      </div>

      {assets.map((asset, index) => (
        <div key={asset.id} className="grid gap-3 rounded-2xl bg-white p-4 sm:grid-cols-[1fr_1fr_auto]">
          <div className="space-y-2">
            <Label>自訂資產名稱 {index + 1}</Label>
            <Input value={asset.name} onChange={(event) => onUpdate(asset.id, { name: event.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>自訂資產價值</Label>
            <CurrencyInput value={asset.value} onChange={(value) => onUpdate(asset.id, { value })} />
          </div>
          <Button type="button" variant="ghost" size="icon" className="self-end" onClick={() => onRemove(asset.id)}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
