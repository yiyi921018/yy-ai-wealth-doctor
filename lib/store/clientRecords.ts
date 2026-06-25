"use client";

import type { ClientProfile, SavedClientRecord } from "@/lib/types";

export async function getClientRecords(advisorPassword: string) {
  const response = await fetch("/api/client-records", {
    headers: {
      "x-advisor-password": advisorPassword,
    },
  });

  if (!response.ok) {
    throw new Error("無法讀取客戶紀錄，請確認顧問密碼是否正確。");
  }

  const data = (await response.json()) as { records: SavedClientRecord[] };
  return data.records;
}

export async function saveClientRecord(profile: ClientProfile) {
  const response = await fetch("/api/client-records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error("客戶資料未成功儲存，請稍後再試。");
  }

  const data = (await response.json()) as { record: SavedClientRecord };
  return data.record;
}

export async function clearClientRecords(advisorPassword: string) {
  const response = await fetch("/api/client-records", {
    method: "DELETE",
    headers: {
      "x-advisor-password": advisorPassword,
    },
  });

  if (!response.ok) {
    throw new Error("無法清除客戶紀錄，請確認顧問密碼是否正確。");
  }
}
