-- 0003_seed_questions.sql — 10 verified questions + private answer keys.
-- Sources: S1 (Royal Office statement, Arabic), S2-b (UN meeting summary),
-- S4 (maroc.ma national holidays). Plan §8.3 claims C1–C11.

insert into public.questions
  (id, question_ar, question_fr, options, category, display_order, is_active, source_url)
values
  (
    'a0000000-0000-4000-8000-000000000001',
    'في أي تاريخ يُحتفل بعيد الوحدة كل سنة؟',
    null,
    '[{"id":"a","ar":"31 أكتوبر"},{"id":"b","ar":"6 نونبر"},{"id":"c","ar":"14 غشت"},{"id":"d","ar":"30 يوليوز"}]'::jsonb,
    'dates', 1, true,
    'https://maroc.ma/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/sahb-aljlalt-yqrr-jl-31-aktwbr-mn-kl-snt-yda-wtnya-tht-asm-yd-alwhdt-blagh-mn-aldywan-almlky'
  ),
  (
    'a0000000-0000-4000-8000-000000000002',
    'ما الاسم الذي أُطلق على العيد الوطني الجديد في بلاغ الديوان الملكي؟',
    null,
    '[{"id":"a","ar":"عيد العرش"},{"id":"b","ar":"عيد الشباب"},{"id":"c","ar":"عيد الوحدة"},{"id":"d","ar":"عيد الاستقلال"}]'::jsonb,
    'symbols', 2, true,
    'https://maroc.ma/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/sahb-aljlalt-yqrr-jl-31-aktwbr-mn-kl-snt-yda-wtnya-tht-asm-yd-alwhdt-blagh-mn-aldywan-almlky'
  ),
  (
    'a0000000-0000-4000-8000-000000000003',
    'متى صدر بلاغ الديوان الملكي الذي أعلن عن عيد الوحدة؟',
    null,
    '[{"id":"a","ar":"31 أكتوبر 2025"},{"id":"b","ar":"4 نونبر 2025"},{"id":"c","ar":"6 نونبر 2025"},{"id":"d","ar":"31 أكتوبر 2026"}]'::jsonb,
    'dates', 3, true,
    'https://maroc.ma/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/sahb-aljlalt-yqrr-jl-31-aktwbr-mn-kl-snt-yda-wtnya-tht-asm-yd-alwhdt-blagh-mn-aldywan-almlky'
  ),
  (
    'a0000000-0000-4000-8000-000000000004',
    'أي قرار لمجلس الأمن أشار إليه بلاغ الديوان الملكي؟',
    null,
    '[{"id":"a","ar":"القرار 690 (1991)"},{"id":"b","ar":"القرار 1979 (2011)"},{"id":"c","ar":"القرار 2351 (2017)"},{"id":"d","ar":"القرار 2797 (2025)"}]'::jsonb,
    'institutions', 4, true,
    'https://maroc.ma/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/sahb-aljlalt-yqrr-jl-31-aktwbr-mn-kl-snt-yda-wtnya-tht-asm-yd-alwhdt-blagh-mn-aldywan-almlky'
  ),
  (
    'a0000000-0000-4000-8000-000000000005',
    'ما المقابل الإنجليزي لاسم «عيد الوحدة» كما ورد في البلاغ؟',
    null,
    '[{"id":"a","ar":"Unity Day"},{"id":"b","ar":"Independence Day"},{"id":"c","ar":"Throne Day"},{"id":"d","ar":"Youth Day"}]'::jsonb,
    'symbols', 5, true,
    'https://maroc.ma/en/news/his-majesty-king-proclaims-october-31-unity-day-statement-royal-office'
  ),
  (
    'a0000000-0000-4000-8000-000000000006',
    'إلى جانب كونه عيدًا وطنيًا، ما المناسبة الأخرى التي يتفضل فيها جلالة الملك في 31 أكتوبر وفق البلاغ؟',
    null,
    '[{"id":"a","ar":"انتخابات وطنية"},{"id":"b","ar":"استعراض عسكري"},{"id":"c","ar":"إصدار العفو السامي"},{"id":"d","ar":"امتحان مدرسي"}]'::jsonb,
    'symbols', 6, true,
    'https://maroc.ma/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/sahb-aljlalt-yqrr-jl-31-aktwbr-mn-kl-snt-yda-wtnya-tht-asm-yd-alwhdt-blagh-mn-aldywan-almlky'
  ),
  (
    'a0000000-0000-4000-8000-000000000007',
    'في أي مناسبتين رسميتين سيُلقى النطق المولوي السامي مستقبلًا، وفق البلاغ؟',
    null,
    '[{"id":"a","ar":"عيد الوحدة وعيد العرش"},{"id":"b","ar":"عيد العرش وافتتاح الدورة الأولى من السنة التشريعية"},{"id":"c","ar":"ذكرى المسيرة الخضراء وافتتاح البرلمان"},{"id":"d","ar":"رأس السنة وعيد العرش"}]'::jsonb,
    'context', 7, true,
    'https://maroc.ma/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/sahb-aljlalt-yqrr-jl-31-aktwbr-mn-kl-snt-yda-wtnya-tht-asm-yd-alwhdt-blagh-mn-aldywan-almlky'
  ),
  (
    'a0000000-0000-4000-8000-000000000008',
    'في أي سنة يُحتفل بعيد الوحدة لأول مرة؟',
    null,
    '[{"id":"a","ar":"2024"},{"id":"b","ar":"2025"},{"id":"c","ar":"2027"},{"id":"d","ar":"2026"}]'::jsonb,
    'dates', 8, true,
    'https://maroc.ma/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/sahb-aljlalt-yqrr-jl-31-aktwbr-mn-kl-snt-yda-wtnya-tht-asm-yd-alwhdt-blagh-mn-aldywan-almlky'
  ),
  (
    'a0000000-0000-4000-8000-000000000009',
    'أي بعثة أممية جدد القرار 2797 ولايتها إلى غاية 31 أكتوبر 2026؟',
    null,
    '[{"id":"a","ar":"المينورسو"},{"id":"b","ar":"اليونيفيل"},{"id":"c","ar":"اليوناميس"},{"id":"d","ar":"المونوسكو"}]'::jsonb,
    'institutions', 9, true,
    'https://media.un.org/avlibrary/en/asset/d348/d3489764'
  ),
  (
    'a0000000-0000-4000-8000-000000000010',
    'أي مناسبة وطنية تُخلَّد في 6 نونبر، بعد عيد الوحدة؟',
    null,
    '[{"id":"a","ar":"عيد الشباب"},{"id":"b","ar":"عيد الشغل"},{"id":"c","ar":"ذكرى المسيرة الخضراء"},{"id":"d","ar":"ذكرى تقديم وثيقة الاستقلال"}]'::jsonb,
    'dates', 10, true,
    'https://www.maroc.ma/en/morocco/religious-and-national-holidays'
  )
on conflict (id) do update set
  question_ar   = excluded.question_ar,
  question_fr   = excluded.question_fr,
  options       = excluded.options,
  category      = excluded.category,
  display_order = excluded.display_order,
  is_active     = excluded.is_active,
  source_url    = excluded.source_url;

insert into public.answer_keys
  (question_id, correct_option_id, explanation_ar, explanation_fr, verified_on)
values
  ('a0000000-0000-4000-8000-000000000001', 'a',
   'ينص البلاغ على جعل يوم 31 أكتوبر من كل سنة عيدًا وطنيًا. وتذكر صفحة الأعياد الوطنية في بوابة المغرب التاريخ نفسه.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000002', 'c',
   'أطلق جلالة الملك على العيد اسم «عيد الوحدة»، كما ورد في نص البلاغ.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000003', 'b',
   'صدر البلاغ يوم الثلاثاء 4 نونبر 2025، أي بعد اعتماد القرار 2797 (2025) في 31 أكتوبر 2025.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000004', 'd',
   'يشير البلاغ صراحة إلى القرار رقم 2797/2025 لمجلس الأمن، وإلى الخطاب الملكي الأخير الذي تناوله.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000005', 'a',
   'ورد في البلاغ أن الاسم هو «Aid Al Wahda» (Unity Day)، وأيضًا «Fête de l’Unité» في النسخة الفرنسية.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000006', 'c',
   'ينص البلاغ على أن 31 أكتوبر مناسبة يتفضل فيها جلالته بإصدار عفوه السامي.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000007', 'b',
   'حدد البلاغ مناسبتين: خطاب عيد العرش، وخطاب افتتاح الدورة الأولى من السنة التشريعية.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000008', 'd',
   'أُعلن العيد في 4 نونبر 2025، لذلك أول 31 أكتوبر بعده هو 31 أكتوبر 2026.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000009', 'a',
   'جدّد القرار 2797 (2025) ولاية بعثة المينورسو إلى غاية 31 أكتوبر 2026، بحسب ملخّص الأمم المتحدة للاجتماع.',
   null, '2026-10-26'),
  ('a0000000-0000-4000-8000-000000000010', 'c',
   'تُدرج بوابة المغرب 6 نونبر كذكرى للمسيرة الخضراء، وهو العيد الوطني الذي يلي عيد الوحدة في الترتيب الزمني.',
   null, '2026-10-26')
on conflict (question_id) do update set
  correct_option_id = excluded.correct_option_id,
  explanation_ar    = excluded.explanation_ar,
  explanation_fr    = excluded.explanation_fr,
  verified_on       = excluded.verified_on;

-- Validation 1: every correct_option_id must exist in its question's options.
do $$
declare
  bad_count int;
begin
  select count(*) into bad_count
  from public.questions q
  join public.answer_keys k on k.question_id = q.id
  where not exists (
    select 1
    from jsonb_array_elements(q.options) as option
    where option ->> 'id' = k.correct_option_id
  );

  if bad_count > 0 then
    raise exception 'Seed validation failed: % answer key(s) point to a missing option', bad_count;
  end if;
end $$;

-- Validation 2: every active question must have an answer key.
do $$
declare
  missing_count int;
begin
  select count(*) into missing_count
  from public.questions q
  left join public.answer_keys k on k.question_id = q.id
  where q.is_active and k.question_id is null;

  if missing_count > 0 then
    raise exception 'Seed validation failed: % active question(s) without a key', missing_count;
  end if;
end $$;
