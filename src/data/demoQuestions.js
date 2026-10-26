const S1 =
  'https://maroc.ma/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/sahb-aljlalt-yqrr-jl-31-aktwbr-mn-kl-snt-yda-wtnya-tht-asm-yd-alwhdt-blagh-mn-aldywan-almlky'
const S2B = 'https://media.un.org/avlibrary/en/asset/d348/d3489764'
const S4 = 'https://www.maroc.ma/en/morocco/religious-and-national-holidays'

// DEMO ONLY. Replaced by an empty module whenever Supabase env vars exist.
// Answer keys must never ship in the production bundle.
const demoQuestions = [
  {
    id: 'a0000000-0000-4000-8000-000000000001',
    question_ar: 'في أي تاريخ يُحتفل بعيد الوحدة كل سنة؟',
    options: [
      { id: 'a', ar: '31 أكتوبر' },
      { id: 'b', ar: '6 نونبر' },
      { id: 'c', ar: '14 غشت' },
      { id: 'd', ar: '30 يوليوز' },
    ],
    category: 'dates',
    display_order: 1,
    is_active: true,
    source_url: S1,
    correct_option_id: 'a',
    explanation_ar:
      'ينص البلاغ على جعل يوم 31 أكتوبر من كل سنة عيدًا وطنيًا. وتذكر صفحة الأعياد الوطنية في بوابة المغرب التاريخ نفسه.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000002',
    question_ar:
      'ما الاسم الذي أُطلق على العيد الوطني الجديد في بلاغ الديوان الملكي؟',
    options: [
      { id: 'a', ar: 'عيد العرش' },
      { id: 'b', ar: 'عيد الشباب' },
      { id: 'c', ar: 'عيد الوحدة' },
      { id: 'd', ar: 'عيد الاستقلال' },
    ],
    category: 'symbols',
    display_order: 2,
    is_active: true,
    source_url: S1,
    correct_option_id: 'c',
    explanation_ar:
      'أطلق جلالة الملك على العيد اسم «عيد الوحدة»، كما ورد في نص البلاغ.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000003',
    question_ar: 'متى صدر بلاغ الديوان الملكي الذي أعلن عن عيد الوحدة؟',
    options: [
      { id: 'a', ar: '31 أكتوبر 2025' },
      { id: 'b', ar: '4 نونبر 2025' },
      { id: 'c', ar: '6 نونبر 2025' },
      { id: 'd', ar: '31 أكتوبر 2026' },
    ],
    category: 'dates',
    display_order: 3,
    is_active: true,
    source_url: S1,
    correct_option_id: 'b',
    explanation_ar:
      'صدر البلاغ يوم الثلاثاء 4 نونبر 2025، أي بعد اعتماد القرار 2797 (2025) في 31 أكتوبر 2025.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000004',
    question_ar: 'أي قرار لمجلس الأمن أشار إليه بلاغ الديوان الملكي؟',
    options: [
      { id: 'a', ar: 'القرار 690 (1991)' },
      { id: 'b', ar: 'القرار 1979 (2011)' },
      { id: 'c', ar: 'القرار 2351 (2017)' },
      { id: 'd', ar: 'القرار 2797 (2025)' },
    ],
    category: 'institutions',
    display_order: 4,
    is_active: true,
    source_url: S1,
    correct_option_id: 'd',
    explanation_ar:
      'يشير البلاغ صراحة إلى القرار رقم 2797/2025 لمجلس الأمن، وإلى الخطاب الملكي الأخير الذي تناوله.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000005',
    question_ar:
      'ما المقابل الإنجليزي لاسم «عيد الوحدة» كما ورد في البلاغ؟',
    options: [
      { id: 'a', ar: 'Unity Day' },
      { id: 'b', ar: 'Independence Day' },
      { id: 'c', ar: 'Throne Day' },
      { id: 'd', ar: 'Youth Day' },
    ],
    category: 'symbols',
    display_order: 5,
    is_active: true,
    source_url: S1,
    correct_option_id: 'a',
    explanation_ar:
      'ورد في البلاغ أن الاسم هو «Aid Al Wahda» (Unity Day)، وأيضًا «Fête de l’Unité» في النسخة الفرنسية.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000006',
    question_ar:
      'إلى جانب كونه عيدًا وطنيًا، ما المناسبة الأخرى التي يتفضل فيها جلالة الملك في 31 أكتوبر وفق البلاغ؟',
    options: [
      { id: 'a', ar: 'انتخابات وطنية' },
      { id: 'b', ar: 'استعراض عسكري' },
      { id: 'c', ar: 'إصدار العفو السامي' },
      { id: 'd', ar: 'امتحان مدرسي' },
    ],
    category: 'symbols',
    display_order: 6,
    is_active: true,
    source_url: S1,
    correct_option_id: 'c',
    explanation_ar:
      'ينص البلاغ على أن 31 أكتوبر مناسبة يتفضل فيها جلالته بإصدار عفوه السامي.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000007',
    question_ar:
      'في أي مناسبتين رسميتين سيُلقى النطق المولوي السامي مستقبلًا، وفق البلاغ؟',
    options: [
      { id: 'a', ar: 'عيد الوحدة وعيد العرش' },
      {
        id: 'b',
        ar: 'عيد العرش وافتتاح الدورة الأولى من السنة التشريعية',
      },
      { id: 'c', ar: 'ذكرى المسيرة الخضراء وافتتاح البرلمان' },
      { id: 'd', ar: 'رأس السنة وعيد العرش' },
    ],
    category: 'context',
    display_order: 7,
    is_active: true,
    source_url: S1,
    correct_option_id: 'b',
    explanation_ar:
      'حدد البلاغ مناسبتين: خطاب عيد العرش، وخطاب افتتاح الدورة الأولى من السنة التشريعية.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000008',
    question_ar: 'في أي سنة يُحتفل بعيد الوحدة لأول مرة؟',
    options: [
      { id: 'a', ar: '2024' },
      { id: 'b', ar: '2025' },
      { id: 'c', ar: '2027' },
      { id: 'd', ar: '2026' },
    ],
    category: 'dates',
    display_order: 8,
    is_active: true,
    source_url: S1,
    correct_option_id: 'd',
    explanation_ar:
      'أُعلن العيد في 4 نونبر 2025، لذلك أول 31 أكتوبر بعده هو 31 أكتوبر 2026.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000009',
    question_ar:
      'أي بعثة أممية جدد القرار 2797 ولايتها إلى غاية 31 أكتوبر 2026؟',
    options: [
      { id: 'a', ar: 'المينورسو' },
      { id: 'b', ar: 'اليونيفيل' },
      { id: 'c', ar: 'اليوناميس' },
      { id: 'd', ar: 'المونوسكو' },
    ],
    category: 'institutions',
    display_order: 9,
    is_active: true,
    source_url: S2B,
    correct_option_id: 'a',
    explanation_ar:
      'جدّد القرار 2797 (2025) ولاية بعثة المينورسو إلى غاية 31 أكتوبر 2026، بحسب ملخّص الأمم المتحدة للاجتماع.',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000010',
    question_ar: 'أي عيد وطني يأتي بعد عيد الوحدة في 6 نونبر؟',
    options: [
      { id: 'a', ar: 'عيد الشباب' },
      { id: 'b', ar: 'عيد الشغل' },
      { id: 'c', ar: 'ذكرى المسيرة الخضراء' },
      { id: 'd', ar: 'ذكرى تقديم وثيقة الاستقلال' },
    ],
    category: 'dates',
    display_order: 10,
    is_active: true,
    source_url: S4,
    correct_option_id: 'c',
    explanation_ar:
      'تُدرج بوابة المغرب 6 نونبر كذكرى للمسيرة الخضراء، وهو العيد الوطني الذي يلي عيد الوحدة في الترتيب الزمني.',
  },
]

export default demoQuestions
