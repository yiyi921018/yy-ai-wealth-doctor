create table if not exists public.client_records (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_name text not null,
  age integer not null,
  total_assets numeric not null,
  has_debt boolean not null default false,
  total_debt numeric not null default 0,
  annual_debt_payment numeric not null default 0,
  selected_assets jsonb not null default '[]'::jsonb,
  custom_assets jsonb not null default '[]'::jsonb,
  asset_values jsonb not null default '{}'::jsonb
);

alter table public.client_records enable row level security;

alter table public.client_records
  add column if not exists has_debt boolean not null default false,
  add column if not exists total_debt numeric not null default 0,
  add column if not exists annual_debt_payment numeric not null default 0;

-- The app writes and reads through a Netlify server function using the Supabase service role key.
-- No public browser access to this table is required.
