-- Waitlist table for landing-page email capture.
-- Apply with: supabase db push   (or paste into the Supabase SQL editor).

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       citext not null unique,
  source      text,
  ip          inet,
  user_agent  text,
  referrer    text,
  created_at  timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

-- RLS: nobody can read or write directly from the browser. The /api/signup
-- route uses the service-role key on the server.
alter table public.waitlist enable row level security;

-- Drop any inherited permissive policies; we explicitly want zero anon access.
revoke all on public.waitlist from anon, authenticated;

-- Public count of waitlist signups, exposed via PostgREST. Returns a single
-- integer so the landing page can show an honest "N people in line" number
-- without leaking emails.
create or replace view public.waitlist_count as
  select count(*)::int as total from public.waitlist;

grant select on public.waitlist_count to anon, authenticated;
