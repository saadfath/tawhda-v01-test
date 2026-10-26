import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { home } from '../../content/texts.ar'

const cardRows = [
  { label: 'الاسم', value: 'عيد الوحدة' },
  { label: 'الإعلان', value: '4 نونبر 2025' },
  { label: 'أول احتفال', value: 'السبت 31 أكتوبر 2026' },
  { label: 'العفو الملكي', value: 'نعم، وفق البلاغ' },
]

export function AboutSection() {
  return (
    <section className="container-site py-14 md:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">
            {home.aboutKicker}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl md:text-4xl">
            {home.aboutTitle}
          </h2>
          <p className="prose-ar mt-5 max-w-2xl">{home.aboutBody}</p>

          <ul className="mt-8 space-y-5">
            {home.aboutFeatures.map((feature) => (
              <li key={feature.title} className="flex items-start gap-4">
                <CheckCircle2
                  className="mt-1 size-5 shrink-0 text-green"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-7 text-ink-soft">
                    {feature.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/info" variant="secondary">
              صفحة المعلومات
            </Button>
            <Button to="/quiz" variant="ghost">
              الانتقال إلى الاختبار
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-green p-1.5 shadow-lift">
            <div className="bg-star-pattern-light rounded-[1.6rem] border border-gold/25 p-6 sm:p-8">
              <p className="font-latin text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-gold-soft">
                The occasion
              </p>
              <p className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
                31 أكتوبر
              </p>

              <dl className="mt-7 divide-y divide-ivory/15">
                {cardRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <dt className="text-xs text-ivory/60">{row.label}</dt>
                    <dd className="text-sm font-semibold text-white">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 rounded-xl border border-gold/20 bg-green-dark/50 p-4 text-xs leading-6 text-ivory/75">
                المعلومات مأخوذة من بلاغ الديوان الملكي المنشور على بوابة
                المغرب. راجع صفحة «عن العيد» للاطلاع على النص والمراجع.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
