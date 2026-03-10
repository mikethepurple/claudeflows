-- Purchases table — records of paid workflow purchases (populated by Stripe webhook)
create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  workflow_id uuid references workflows(id) on delete cascade not null,
  tier text not null default 'pro',
  stripe_payment_id text,
  amount_cents integer not null default 0,
  currency text not null default 'usd',
  created_at timestamptz default now() not null,
  unique (user_id, workflow_id)
);

alter table purchases enable row level security;

create policy "Users can read own purchases"
  on purchases for select using (auth.uid() = user_id);

create index if not exists idx_purchases_user_id on purchases(user_id);
create index if not exists idx_purchases_workflow_id on purchases(workflow_id);
