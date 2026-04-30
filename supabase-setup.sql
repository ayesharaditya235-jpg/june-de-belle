-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)

create table if not exists orders (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  whatsapp    text not null,
  email       text,
  product     text not null,
  variant     text not null,
  notes       text,
  status      text not null default 'Waiting Confirmation',
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security (orders are only accessible server-side via service role key)
alter table orders enable row level security;

-- No public access — all reads/writes go through the service role in API routes
-- To verify the setup, run:
-- select count(*) from orders;
