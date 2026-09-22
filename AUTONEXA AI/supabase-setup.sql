-- Supabase SQL editor mein ye run karein (Project -> SQL Editor -> New Query)

-- 1. Table banayein
create table items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default now()
);

-- 2. Row Level Security ON karein (har user sirf apna data dekhe)
alter table items enable row level security;

-- 3. Policies: user sirf apne rows read/write/delete kar sake
create policy "Users can view own items"
  on items for select
  using (auth.uid() = user_id);

create policy "Users can insert own items"
  on items for insert
  with check (auth.uid() = user_id);

create policy "Users can update own items"
  on items for update
  using (auth.uid() = user_id);

create policy "Users can delete own items"
  on items for delete
  using (auth.uid() = user_id);
