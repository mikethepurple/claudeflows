-- Email subscribers (captured on free skill install)
create table if not exists public.email_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  source_skill text, -- which skill page they came from
  created_at timestamptz default now() not null
);

-- Unique on email so we don't store duplicates
create unique index if not exists email_subscribers_email_idx on public.email_subscribers (email);

-- Consulting leads (from /consulting intake form)
create table if not exists public.consulting_leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  role text,
  needs text,
  budget text,
  source_skill text, -- which skill page referred them, if any
  created_at timestamptz default now() not null
);

-- RLS: allow anonymous inserts (public form submissions), no reads
alter table public.email_subscribers enable row level security;
alter table public.consulting_leads enable row level security;

create policy "Anyone can subscribe" on public.email_subscribers
  for insert with check (true);

create policy "Anyone can submit consulting lead" on public.consulting_leads
  for insert with check (true);
