-- 0002_rls.sql — enable RLS, expose only active questions, keep results private.

alter table public.questions        enable row level security;
alter table public.answer_keys      enable row level security;
alter table public.quiz_submissions enable row level security;
alter table public.quiz_responses   enable row level security;

-- Anyone (anon or signed-in) may read ACTIVE questions only.
drop policy if exists "public read active questions" on public.questions;
create policy "public read active questions"
  on public.questions for select
  to anon, authenticated
  using (is_active = true);

-- No policies on answer_keys / quiz_submissions / quiz_responses:
-- browser roles are denied by RLS. The service role used inside the Edge
-- Function bypasses RLS.

-- Belt and braces: remove table privileges from browser roles.
revoke all on public.answer_keys, public.quiz_submissions, public.quiz_responses
  from anon, authenticated;
revoke insert, update, delete on public.questions from anon, authenticated;
grant select on public.questions to anon, authenticated;
