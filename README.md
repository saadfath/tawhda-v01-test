# تَوْحَدَة · TAWḤDA

موقع تعليمي مستقل عن **عيد الوحدة** المغربي (31 أكتوبر)، بالعربية واتجاه RTL: صفحة تعريفية موثقة المصادر، وخط زمني، واختبار من عشرة أسئلة يُصحَّح على الخادم عند ربط Supabase.

> **تنبيه:** هذا موقع تعليمي مستقل، وليس موقعًا حكوميًا رسميًا ولا تابعًا لأي جهة رسمية. لا يستخدم شعارات رسمية، ولا يعبّر عن موقف أي جهة.

---

## الحالة الحالية

| البند | الحالة |
| --- | --- |
| واجهة React + Vite + Tailwind v4، عربية RTL | ✅ مكتملة |
| الصفحات: الرئيسية، عن العيد، الاختبار، 404 | ✅ مكتملة |
| اختبار محلي من 10 أسئلة (وضع تجريبي) | ✅ يعمل |
| مخطط قاعدة البيانات + RLS + بيانات البذر | ✅ مكتوب، لم يُطبَّق بعد |
| Edge Function `submit-quiz` | ✅ مكتوبة، لم تُنشر بعد |
| ربط Supabase (URL + anon key) | ⏳ يحتاج مفاتيح المشروع |
| النشر على Vercel/Netlify | ⏳ لم يتم |
| تدقيق العربية من قارئ ثانٍ | ⏳ مطلوب |

**مهم:** بدون متغيرات Supabase يعمل الموقع في **وضع تجريبي محلي**: الأسئلة ومفاتيح الإجابات موجودة في حزمة المتصفح. هذا مقصود لتجربة الواجهة فقط. بمجرد ضبط `VITE_SUPABASE_URL` و`VITE_SUPABASE_ANON_KEY` يستبدل `vite.config.js` ملف البيانات التجريبية بملف فارغ، فلا تدخل الإجابات في حزمة الإنتاج.

---

## التقنيات

- React 19 + Vite 8 (JavaScript)
- Tailwind CSS v4 عبر `@tailwindcss/vite`
- React Router 7
- Lucide icons
- خطوط مستضافة ذاتيًا: Noto Sans Arabic Variable وDM Sans Variable
- Supabase (PostgreSQL + RLS + Edge Function)
- استضافة ثابتة: Vercel أو Netlify

---

## التشغيل المحلي

```bash
npm install
cp .env.example .env.local   # اختياري: املأ قيم Supabase لتفعيل الوضع الحقيقي
npm run dev                  # http://localhost:5173
```

بدون `.env.local` سيعمل الاختبار في الوضع التجريبي، مع تنبيه ظاهر في صفحة الاختبار.

### أوامر مفيدة

```bash
npm run build       # بناء إنتاجي؛ يتطلب VITE_SUPABASE_URL وVITE_SUPABASE_ANON_KEY
npm run build:demo  # بناء تجريبي محلي فقط (يتضمن مفاتيح الإجابات — لا تنشره علنًا)
npm run preview     # معاينة حزمة الإنتاج محليًا
npm run smoke       # اختبار دخان آلي (يتطلب Chromium)
npm run lint        # oxlint
```

`npm run build` **يرفض البناء** إذا كانت متغيرات Supabase ناقصة، حتى لا تُنشر نسخة تجريبية تحمل مفاتيح الإجابات. استخدم `npm run build:demo` محليًا فقط لاختبار الواجهة دون قاعدة بيانات.

`npm run smoke` يحتاج متصفح Chromium. إذا لم يكن مثبتًا:

```bash
npx playwright install chromium
# أو مرّر المسار: CHROME_PATH=/usr/bin/chromium npm run smoke
```

شغّل `npm run build:demo` ثم `npm run preview` في طرفية أخرى قبل `npm run smoke` (الافتراضي `http://127.0.0.1:4173`).

---

## متغيرات البيئة

| المتغير | المكان | سري؟ |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `.env.local` محليًا، وإعدادات Vercel/Netlify | لا |
| `VITE_SUPABASE_ANON_KEY` | نفس المكان | لا (مفتاح عام، RLS يحمي البيانات) |
| `SUPABASE_SERVICE_ROLE_KEY` | تُحقن تلقائيًا داخل Edge Function | **نعم** — لا تضعها في الواجهة أو Git |
| `SITE_ORIGIN` | أسرار Supabase (اختياري) | لا — مصدر CORS المسموح |

`.env.example` يحتوي قيمًا وهمية فقط. `.env` و`.env.local` مستبعدان في `.gitignore`.

---

## إعداد Supabase

1. أنشئ مشروعًا على [supabase.com](https://supabase.com) وسجّل `Project URL` و`anon/publishable key`.
2. املأ `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_KEY
   ```
3. طبّق المخطط والبيانات:
   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```
   بديل: نفّذ الملفات بالترتيب في SQL Editor:
   `0001_schema.sql` ← `0002_rls.sql` ← `0003_seed_questions.sql`.
4. انشر دالة التصحيح:
   ```bash
   npx supabase functions deploy submit-quiz
   ```
5. اختياريًا، اضبط أصل الموقع لتقييد CORS:
   ```bash
   npx supabase secrets set SITE_ORIGIN=https://your-domain.example
   ```

### الجداول

- `questions` — محتوى عام: السؤال، الخيارات (`jsonb`)، الترتيب، المصدر، حالة التفعيل.
- `answer_keys` — خاص: الإجابة الصحيحة والتوضيح.
- `quiz_submissions` — محاولة واحدة لكل `attempt_id` فريد.
- `quiz_responses` — إجابة لكل سؤال داخل المحاولة، مع `unique (submission_id, question_id)`.

### الأمان

- RLS مفعّل على الجداول الأربعة.
- الزوار يقرؤون الأسئلة **النشطة** فقط.
- لا توجد سياسات على `answer_keys` و`quiz_submissions` و`quiz_responses`؛ وصول المتصفح مرفوض.
- التصحيح والكتابة يتمان داخل Edge Function بمفتاح الخدمة.
- `attempt_id` فريد: إعادة إرسال الطلب تعيد النتيجة المخزنة بدل إنشاء محاولة ثانية.
- التحقق من المدخلات: JSON صالح، UUID، لغة `ar|fr`، 1–20 إجابة، خيارات `a–d`، لا تكرار، وكل الأسئلة النشطة يجب الإجابة عنها.
- رسائل الخطأ العامة للمستخدم، والتفاصيل في سجلات الدالة فقط.

---

## النشر

### Vercel

1. ادفع المستودع إلى GitHub واستورد المشروع في Vercel (Framework: Vite).
2. أضف `VITE_SUPABASE_URL` و`VITE_SUPABASE_ANON_KEY` إلى Production وPreview.
3. انشر. `vercel.json` يتضمن إعادة كتابة SPA حتى تعمل الروابط المباشرة (`/info`, `/quiz`).
4. أعد النشر بعد أي تغيير في متغيرات البيئة (تُدمج وقت البناء).

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- `public/_redirects` يتضمن `/* /index.html 200`.

### بعد النشر

- تحقق من تحميل الأسئلة من Supabase في تبويب Network (يجب ألا تحتوي الاستجابة على `correct_option_id`).
- أكمل اختبارًا وتحقق من ظهور صف في `quiz_submissions` و10 صفوف في `quiz_responses`.
- جرّب `curl` بمفتاح anon على `answer_keys` — يجب أن يعيد خطأ صلاحية أو نتيجة فارغة.
- افتح `/info` و`/quiz` مباشرة ثم حدّث الصفحة.

---

## الاختبارات المنفذة

نُفّذت في **26 أكتوبر 2026** محليًا على بناء `dist/`:

| الاختبار | النتيجة |
| --- | --- |
| البناء التجريبي `npm run build:demo` | ✅ نجح |
| بناء إنتاجي بمتغيرات Supabase (قيم وهمية) | ✅ نجح، وحزمة الأسئلة التجريبية فارغة |
| رفض `npm run build` بدون متغيرات Supabase | ✅ مقصود |
| T1 الصفحة الرئيسية وعنوان h1 واحد | ✅ |
| T2 التنقل إلى `/info` | ✅ |
| قائمة المراجع (6 مصادر) | ✅ |
| T3–T5 تحميل الاختبار، الاختيار، تعطيل «التالي» قبل الاختيار | ✅ |
| T6 التصحيح: إجابات صحيحة كلها = 10/10 و100% | ✅ |
| T19 مسار غير معروف = 404 | ✅ |
| T20 إعادة الاختبار تصفّر الحالة | ✅ |
| T15 لا تمرير أفقي عند 360px | ✅ |
| T16 `dir="rtl"` و`lang="ar"` | ✅ |
| T21 خيارات الاختبار قابلة للوصول بلوحة المفاتيح | ✅ |
| أخطاء console | ✅ لا توجد |

اختبارات قاعدة البيانات (T7–T14) **لم تُنفّذ بعد** لأن المشروع لم يُربط بـ Supabase. يجب تنفيذها قبل الإطلاق.

---

## المصادر والتحقق

المحتوى مبني على سجل الادعاءات في خطة المشروع (§8.3)، ولا تُنشر ادعاءات بحالة **TO VERIFY**.

| المعرّف | المصدر |
| --- | --- |
| S1 | بلاغ الديوان الملكي بالعربية، 4 نونبر 2025 — بوابة المغرب |
| S1-FR | النسخة الفرنسية للبلاغ |
| S2 | قرار مجلس الأمن 2797 (2025) — النص الرسمي |
| S2-b | ملخّص الاجتماع رقم 10030 — الأمم المتحدة |
| S4 | صفحة الأعياد الوطنية في بوابة المغرب |

- أُعيد فتح S1 (عربي/فرنسي/إنجليزي) وS4 والتحقق من نصهما في 26 أكتوبر 2026.
- أُعيد التحقق من S2 عبر النص الرسمي `S/RES/2797(2025)` على `docs.un.org`، ومن S2-b عبر مكتبة الأمم المتحدة السمعية البصرية. يطابقان ما ورد في الخط الزمني: القرار 2797 (2025)، الاجتماع 10030، 31 أكتوبر 2025، وتمديد ولاية المينورسو إلى 31 أكتوبر 2026.
- استُبعدت الادعاءات C14–C18 (تواريخ 1975/1979/2007، المرسوم القانوني، برنامج الاحتفالات، ردود الأطراف) لعدم اكتمال التحقق.
- العربية مكتوبة اعتمادًا على النص الرسمي، لكنها تحتاج **تدقيقًا من قارئ ثانٍ** قبل الإطلاق.

### ملاحظة تحريرية

الموضوع حساس سياسيًا. الصفحة تعرض ما ورد في البلاغ والقرار الأممي مع نسبته إلى مصدره، ولا تضيف تقييمًا أو موقفًا. راجع كل جملة قبل النشر.

---

## الصور والحقوق

لا تُستخدم صور فوتوغرافية في هذه النسخة. جميع الزخارف والرسوم من إنتاج المشروع:

- `public/images/decorative/pattern-star.svg`
- `public/images/decorative/pattern-star-light.svg`
- `public/images/decorative/motif-arch.svg`
- `public/images/logo.svg`
- `public/favicon.svg`

الخطوط: Noto Sans Arabic وDM Sans، رخصة SIL Open Font License، مستضافة عبر حزم `@fontsource-variable`.

إذا أُضيفت صور لاحقًا، سجّل لكل صورة: الرابط، المؤلف، الرخصة، تاريخ الوصول، نص `alt`، وسطر الإسناد.

---

## البنية

```
tawhda/
├── public/
│   ├── images/{decorative}/
│   ├── favicon.svg
│   └── _redirects
├── scripts/smoke.mjs
├── src/
│   ├── components/{layout,ui,home,info,quiz}/
│   ├── content/{texts.ar.js,timeline.js,references.js}
│   ├── data/{demoQuestions.js,emptyQuestions.js}
│   ├── hooks/{useQuestions.js,useQuiz.js,usePageTitle.js}
│   ├── lib/{supabaseClient.js,quizApi.js,cx.js}
│   └── pages/{HomePage,InfoPage,QuizPage,NotFoundPage}.jsx
├── supabase/
│   ├── config.toml
│   ├── migrations/{0001_schema,0002_rls,0003_seed_questions}.sql
│   └── functions/submit-quiz/index.ts
├── .env.example
├── vercel.json
├── vite.config.js
└── README.md
```

---

## القيود المعروفة

- لا توجد لوحة إدارة في MVP؛ تعديل الأسئلة يتم عبر SQL أو Table Editor.
- الإحصاءات غير موثوقة: الإرسال مجهول، ولا يوجد rate limiting أو CAPTCHA.
- تُكشف الإجابات الصحيحة بعد الإرسال (مقايضة مقبولة لاختبار تعليمي).
- الفرنسية غير مضافة إلى الواجهة بعد؛ الأعمدة الفرنسية محجوزة في قاعدة البيانات.
- لا توجد صور فوتوغرافية؛ التصميم يعتمد على الزخارف الهندسية.
- لا توجد اختبارات آلية لقاعدة البيانات/الدالة؛ T7–T14 يدوية حتى الآن.
- المحتوى العربي يحتاج تدقيقًا لغويًا نهائيًا.
- لم يُختر ترخيص الكود بعد؛ أضف `LICENSE` قبل النشر العام.

## الخطوات التالية

1. إنشاء مشروع Supabase وربطه، ثم `db push`.
2. نشر `submit-quiz` وتنفيذ T7–T14 على بيئة التطوير.
3. تدقيق العربية من قارئ ثانٍ.
4. النشر على Vercel/Netlify واختبار الروابط المباشرة على هاتف حقيقي.
5. إضافة `LICENSE` ووسم `v1.0`.
