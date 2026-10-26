-- 0001_schema.sql — tables, constraints, indexes
-- Apply with: npx supabase db push

create table public.questions (
  id            uuid primary key default gen_random_uuid(),
  question_ar   text not null,
  question_fr   text,
  options       jsonb not null,
  category      text not null default 'general',
  display_order int  not null unique,
  is_active     boolean not null default true,
  source_url    text,
  created_at    timestamptz not null default now(),
  constraint questions_options_valid
    check (
      jsonb_typeof(options) = 'array'
      and jsonb_array_length(options) between 3 and 4
    ),
  constraint questions_active_needs_source
    check (
      not is_active
      or (source_url is not null and source_url like 'https://%')
    )
);

create table public.answer_keys (
  question_id       uuid primary key references public.questions(id) on delete cascade,
  correct_option_id text not null check (correct_option_id in ('a', 'b', 'c', 'd')),
  explanation_ar    text not null,
  explanation_fr    text,
  verified_on       date
);

create table public.quiz_submissions (
  id              uuid primary key default gen_random_uuid(),
  attempt_id      uuid not null unique,
  score           int  not null check (score >= 0),
  total_questions int  not null check (total_questions > 0),
  percentage      numeric(5, 2) not null check (percentage between 0 and 100),
  language        text not null default 'ar' check (language in ('ar', 'fr')),
  submitted_at    timestamptz not null default now(),
  constraint score_not_above_total check (score <= total_questions)
);

create table public.quiz_responses (
  id                 uuid primary key default gen_random_uuid(),
  submission_id      uuid not null references public.quiz_submissions(id) on delete cascade,
  question_id        uuid not null references public.questions(id),
  selected_option_id text not null check (selected_option_id in ('a', 'b', 'c', 'd')),
  is_correct         boolean not null,
  unique (submission_id, question_id)
);

create index quiz_responses_question_idx on public.quiz_responses (question_id);
create index quiz_responses_submission_idx on public.quiz_responses (submission_id);
create index questions_active_order_idx on public.questions (is_active, display_order);
