-- Claude Flows — Initial Database Schema
-- Run this in your Supabase SQL editor or via supabase db push

-- Profiles (linked to auth.users via id)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  github text not null,
  avatar_url text,
  bio text,
  created_at timestamptz default now() not null
);

alter table profiles enable row level security;

create policy "Profiles are publicly readable"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Workflows
create table if not exists workflows (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  display_name text not null,
  description text not null,
  author_id uuid references profiles(id) on delete set null,
  category text not null default 'other',
  tags text[] default '{}',
  repository text not null,
  license text,
  readme text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table workflows enable row level security;

create policy "Workflows are publicly readable"
  on workflows for select using (true);

create policy "Authors can insert own workflows"
  on workflows for insert with check (auth.uid() = author_id);

create policy "Authors can update own workflows"
  on workflows for update using (auth.uid() = author_id);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger workflows_updated_at
  before update on workflows
  for each row execute function update_updated_at();

-- Versions (each published version of a workflow)
create table if not exists versions (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid references workflows(id) on delete cascade not null,
  version text not null,
  manifest jsonb not null default '{}',
  published_at timestamptz default now() not null,
  unique (workflow_id, version)
);

alter table versions enable row level security;

create policy "Versions are publicly readable"
  on versions for select using (true);

-- Installs (anonymous install events logged by CLI)
create table if not exists installs (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid references workflows(id) on delete cascade not null,
  version text not null,
  user_agent text,
  created_at timestamptz default now() not null
);

alter table installs enable row level security;

create policy "Installs are insertable by anyone"
  on installs for insert with check (true);

create policy "Installs are publicly readable"
  on installs for select using (true);

-- Reviews
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid references workflows(id) on delete cascade not null,
  author_name text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  body text,
  created_at timestamptz default now() not null
);

alter table reviews enable row level security;

create policy "Reviews are publicly readable"
  on reviews for select using (true);

create policy "Reviews are insertable by anyone"
  on reviews for insert with check (true);

-- Indexes for common queries
create index if not exists idx_workflows_name on workflows(name);
create index if not exists idx_workflows_category on workflows(category);
create index if not exists idx_installs_workflow_id on installs(workflow_id);
create index if not exists idx_reviews_workflow_id on reviews(workflow_id);
create index if not exists idx_versions_workflow_id on versions(workflow_id);

-- View: workflow stats (install count + avg rating)
create or replace view workflow_stats as
select
  w.id as workflow_id,
  w.name,
  coalesce(i.install_count, 0) as install_count,
  coalesce(r.avg_rating, 0) as avg_rating,
  coalesce(r.review_count, 0) as review_count
from workflows w
left join (
  select workflow_id, count(*) as install_count
  from installs
  group by workflow_id
) i on i.workflow_id = w.id
left join (
  select workflow_id, avg(rating)::numeric(2,1) as avg_rating, count(*) as review_count
  from reviews
  group by workflow_id
) r on r.workflow_id = w.id;
