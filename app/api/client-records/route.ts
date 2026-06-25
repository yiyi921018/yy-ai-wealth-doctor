import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig, getSupabaseHeaders } from "@/lib/supabase/server";
import type { ClientProfile, SavedClientRecord } from "@/lib/types";

function isAuthorized(request: NextRequest) {
  const advisorPassword = process.env.ADVISOR_PASSWORD;
  const providedPassword = request.headers.get("x-advisor-password");

  return Boolean(advisorPassword && providedPassword && providedPassword === advisorPassword);
}

function toRecord(row: {
  id: string;
  created_at: string;
  client_name: string;
  age: number;
  total_assets: number;
  has_debt?: boolean | null;
  total_debt?: number | null;
  annual_debt_payment?: number | null;
  selected_assets: ClientProfile["selectedAssets"];
  custom_assets: ClientProfile["customAssets"];
  asset_values: ClientProfile["assetValues"];
}): SavedClientRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    clientName: row.client_name,
    age: row.age,
    totalAssets: Number(row.total_assets),
    hasDebt: Boolean(row.has_debt),
    totalDebt: Number(row.total_debt ?? 0),
    annualDebtPayment: Number(row.annual_debt_payment ?? 0),
    selectedAssets: row.selected_assets,
    customAssets: row.custom_assets,
    assetValues: row.asset_values,
  };
}

export async function POST(request: NextRequest) {
  try {
    const profile = (await request.json()) as ClientProfile;

    if (!profile.clientName?.trim() || !profile.age || !profile.totalAssets) {
      return NextResponse.json({ error: "Missing required client profile fields." }, { status: 400 });
    }

    const { supabaseUrl } = getSupabaseConfig();
    const response = await fetch(`${supabaseUrl}/rest/v1/client_records`, {
      method: "POST",
      headers: getSupabaseHeaders("return=representation"),
      body: JSON.stringify({
        client_name: profile.clientName.trim(),
        age: profile.age,
        total_assets: profile.totalAssets,
        has_debt: profile.hasDebt,
        total_debt: profile.totalDebt,
        annual_debt_payment: profile.annualDebtPayment,
        selected_assets: profile.selectedAssets,
        custom_assets: profile.customAssets,
        asset_values: profile.assetValues,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: 500 });
    }

    const data = (await response.json()) as Parameters<typeof toRecord>[0][];
    return NextResponse.json({ record: toRecord(data[0]) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save client record." },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { supabaseUrl } = getSupabaseConfig();
    const response = await fetch(
      `${supabaseUrl}/rest/v1/client_records?select=*&order=created_at.desc&limit=200`,
      {
        headers: getSupabaseHeaders(),
      },
    );

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: 500 });
    }

    const data = (await response.json()) as Parameters<typeof toRecord>[0][];
    return NextResponse.json({ records: data.map(toRecord) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load client records." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { supabaseUrl } = getSupabaseConfig();
    const response = await fetch(`${supabaseUrl}/rest/v1/client_records?id=not.is.null`, {
      method: "DELETE",
      headers: getSupabaseHeaders(),
    });

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to clear client records." },
      { status: 500 },
    );
  }
}
