"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole, Trash2, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CORE_ASSET_OPTIONS } from "@/lib/constants";
import { clearClientRecords, getClientRecords } from "@/lib/store/clientRecords";
import type { SavedClientRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

function getAssetRows(record: SavedClientRecord) {
  const coreRows = CORE_ASSET_OPTIONS.filter((asset) => record.selectedAssets.includes(asset.id))
    .map((asset) => ({
      label: asset.label,
      value: record.assetValues[asset.id] ?? 0,
    }))
    .filter((asset) => asset.value > 0);

  const customRows = record.customAssets
    .filter((asset) => asset.value > 0)
    .map((asset) => ({
      label: asset.name || "自訂資產",
      value: asset.value,
    }));

  return [...coreRows, ...customRows];
}

export default function AdvisorConsolePage() {
  const [records, setRecords] = useState<SavedClientRecord[]>([]);
  const [advisorPassword, setAdvisorPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedPassword = window.sessionStorage.getItem("yy-advisor-password");
    if (!savedPassword) return;

    setAdvisorPassword(savedPassword);
    void loadRecords(savedPassword);
  }, []);

  const loadRecords = async (password = advisorPassword) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const nextRecords = await getClientRecords(password);
      setRecords(nextRecords);
      setIsUnlocked(true);
      window.sessionStorage.setItem("yy-advisor-password", password);
    } catch (error) {
      setIsUnlocked(false);
      setRecords([]);
      setErrorMessage(error instanceof Error ? error.message : "無法讀取客戶紀錄。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    setErrorMessage("");

    try {
      await clearClientRecords(advisorPassword);
      setRecords([]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "無法清除客戶紀錄。");
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem("yy-advisor-password");
    setIsUnlocked(false);
    setAdvisorPassword("");
    setRecords([]);
  };

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-6 py-8">
          <div className="flex flex-col justify-between gap-4 rounded-3xl bg-navy-900 p-6 text-white shadow-premium sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gold-500 text-navy-900">
                <Users className="size-7" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">顧問控制台</h1>
                <p className="text-white/65">查看已完成分析的客戶輸入資料。</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="mr-2 size-4" />
                  返回首頁
                </Link>
              </Button>
              {isUnlocked && (
                <>
                  <Button variant="outline" onClick={handleLogout}>
                    登出
                  </Button>
                  <Button variant="gold" onClick={handleClear} disabled={records.length === 0}>
                    <Trash2 className="mr-2 size-4" />
                    清除紀錄
                  </Button>
                </>
              )}
            </div>
          </div>

          {!isUnlocked ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LockKeyhole className="size-5 text-gold-600" />
                  顧問登入
                </CardTitle>
                <CardDescription>
                  請輸入顧問密碼，登入後即可查看所有客戶雲端紀錄。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="advisor-password">顧問密碼</Label>
                  <Input
                    id="advisor-password"
                    type="password"
                    value={advisorPassword}
                    placeholder="請輸入顧問密碼"
                    onChange={(event) => setAdvisorPassword(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && advisorPassword) {
                        void loadRecords();
                      }
                    }}
                  />
                </div>
                <Button
                  variant="gold"
                  disabled={!advisorPassword || isLoading}
                  onClick={() => void loadRecords()}
                >
                  {isLoading ? "讀取中..." : "登入並讀取資料"}
                </Button>
                {errorMessage && (
                  <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {errorMessage}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : records.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>目前沒有客戶紀錄</CardTitle>
                <CardDescription>
                  客戶完成資產輸入並按下「產生分析」後，資料會出現在這裡。
                </CardDescription>
              </CardHeader>
              {errorMessage && (
                <CardContent>
                  <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {errorMessage}
                  </div>
                </CardContent>
              )}
            </Card>
          ) : (
            <div className="grid gap-5">
              {records.map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <CardTitle>{record.clientName}</CardTitle>
                        <CardDescription>
                          {new Date(record.createdAt).toLocaleString("zh-TW")}
                        </CardDescription>
                      </div>
                      <div className="rounded-2xl bg-gold-100 px-4 py-2 text-sm font-bold text-navy-900">
                        總資產 {formatCurrency(record.totalAssets)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-2xl bg-muted/70 p-4">
                        <div className="text-muted-foreground">年齡</div>
                        <div className="mt-1 text-lg font-bold text-navy-900">{record.age} 歲</div>
                      </div>
                      <div className="rounded-2xl bg-muted/70 p-4">
                        <div className="text-muted-foreground">負債狀態</div>
                        <div className="mt-1 text-lg font-bold text-navy-900">
                          {record.hasDebt ? "有負債" : "無負債"}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-muted/70 p-4">
                        <div className="text-muted-foreground">負債總金額</div>
                        <div className="mt-1 text-lg font-bold text-navy-900">
                          {record.hasDebt ? formatCurrency(record.totalDebt) : "無"}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-muted/70 p-4">
                        <div className="text-muted-foreground">每年負債繳款</div>
                        <div className="mt-1 text-lg font-bold text-navy-900">
                          {record.hasDebt ? formatCurrency(record.annualDebtPayment) : "無"}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-muted/70 p-4">
                        <div className="text-muted-foreground">選擇資產數</div>
                        <div className="mt-1 text-lg font-bold text-navy-900">
                          {getAssetRows(record).length} 項
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="mb-3 font-semibold text-navy-900">客戶輸入資產明細</div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {getAssetRows(record).map((asset) => (
                          <div key={`${record.id}-${asset.label}`} className="flex justify-between gap-4 rounded-xl bg-muted/60 px-3 py-2 text-sm">
                            <span className="text-muted-foreground">{asset.label}</span>
                            <span className="font-semibold text-navy-900">{formatCurrency(asset.value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </AppShell>
  );
}
