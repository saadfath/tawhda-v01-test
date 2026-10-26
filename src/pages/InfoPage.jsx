import { Clock, ExternalLink } from 'lucide-react'
import { Callout } from '../components/ui/Callout'
import { FactCard } from '../components/info/FactCard'
import { ImageFigure } from '../components/info/ImageFigure'
import { Timeline } from '../components/info/Timeline'
import { references } from '../content/references'
import { info } from '../content/texts.ar'
import { usePageTitle } from '../hooks/usePageTitle'

function InfoSection({ id, index, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 pb-10">
      <div className="flex items-baseline gap-3">
        <span
          className="font-latin text-xs font-bold text-gold-ink"
          aria-hidden="true"
        >
          {String(index).padStart(2, '0')}
        </span>
        <h2 className="text-2xl font-extrabold text-ink sm:text-[1.7rem]">
          {title}
        </h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function InfoPage() {
  usePageTitle(info.title)

  return (
    <>
      <header className="relative overflow-hidden border-b border-gold/30">
        <div
          className="bg-star-pattern pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="container-site relative py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">
            {info.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
            {info.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-9 text-ink-soft">
            {info.lead}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-4 py-1.5 text-xs text-ink-soft">
            <Clock className="size-3.5 text-green" aria-hidden="true" />
            {info.updated}
          </p>
        </div>
      </header>

      <div className="container-site grid gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-12">
        <article className="lg:col-span-8">
          <div className="divide-y divide-gold/25">
            <InfoSection id="what" index={1} title={info.what.title}>
              <div className="prose-ar space-y-4">
                {info.what.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </InfoSection>

            <InfoSection
              id="dates"
              index={2}
              title={info.dates.sectionTitle}
            >
              <Callout title={info.dates.title}>
                <p>{info.dates.body}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-red/20 bg-white p-4">
                    <p className="text-xs font-bold text-red">
                      {info.dates.announcement.label}
                    </p>
                    <p className="mt-1 text-base font-extrabold text-ink">
                      {info.dates.announcement.value}
                    </p>
                    <p className="mt-1 text-xs leading-6 text-ink-soft">
                      {info.dates.announcement.note}
                    </p>
                  </div>
                  <div className="rounded-xl border border-green/25 bg-white p-4">
                    <p className="text-xs font-bold text-green">
                      {info.dates.observance.label}
                    </p>
                    <p className="mt-1 text-base font-extrabold text-ink">
                      {info.dates.observance.value}
                    </p>
                    <p className="mt-1 text-xs leading-6 text-ink-soft">
                      {info.dates.observance.note}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs font-semibold text-green">
                  {info.dates.note}
                </p>
              </Callout>
            </InfoSection>

            <InfoSection id="context" index={3} title={info.context.title}>
              <div className="prose-ar space-y-4">
                {info.context.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-soft">
                {info.context.sourceNote}
              </p>

              <div className="mt-7">
                <ImageFigure
                  src="/images/decorative/motif-arch.svg"
                  alt="زخرفة هندسية مستوحاة من القوس المغربي والنجمة الثمانية"
                  caption="زخرفة أصلية مستوحاة من الفن الهندسي المغربي."
                  credit="من إنتاج المشروع · عمل أصلي"
                />
              </div>
            </InfoSection>

            <InfoSection id="speech" index={4} title={info.speech.title}>
              <div className="prose-ar space-y-4">
                {info.speech.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </InfoSection>

            <InfoSection id="timeline" index={5} title={info.timeline.title}>
              <p className="prose-ar">{info.timeline.lead}</p>
              <Timeline />
            </InfoSection>

            <InfoSection id="facts" index={6} title={info.facts.title}>
              <p className="prose-ar">{info.facts.lead}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {info.facts.items.map((fact) => (
                  <FactCard key={fact.label} {...fact} />
                ))}
              </div>
            </InfoSection>

            <section id="references" className="scroll-mt-28 pb-2">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-latin text-xs font-bold text-gold-ink"
                  aria-hidden="true"
                >
                  07
                </span>
                <h2 className="text-2xl font-extrabold text-ink sm:text-[1.7rem]">
                  {info.references.title}
                </h2>
              </div>
              <p className="prose-ar mt-4">{info.references.lead}</p>
              <p className="mt-2 text-xs leading-6 text-ink-soft">
                {info.references.note}
              </p>

              <ul className="mt-5 space-y-3">
                {references.map((reference) => (
                  <li key={reference.id}>
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-start gap-3 rounded-2xl border border-gold/40 bg-white p-4 shadow-card transition hover:border-gold/70 hover:shadow-lift"
                    >
                      <span className="mt-0.5 rounded-md bg-ivory-dark px-2 py-0.5 font-latin text-[0.65rem] font-bold text-ink-soft">
                        {reference.id}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold leading-6 text-ink group-hover:text-green">
                          {reference.label}
                        </span>
                        <span className="mt-1 block text-xs leading-6 text-ink-soft">
                          {reference.publisher} · {reference.date} ·{' '}
                          {reference.lang}
                        </span>
                      </span>
                      <ExternalLink
                        className="mt-1 size-4 shrink-0 text-ink-soft transition group-hover:text-green"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Callout variant="warning" title={info.disclaimer.title}>
                  <p>{info.disclaimer.body}</p>
                </Callout>
              </div>
            </section>
          </div>
        </article>

        <aside className="order-first lg:order-last lg:col-span-4">
          <div className="rounded-2xl border border-gold/40 bg-white p-5 shadow-card lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">
              {info.tocTitle}
            </p>
            <nav aria-label={info.tocTitle} className="mt-3">
              <ol className="space-y-1">
                {info.toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-ink-soft transition hover:bg-ivory hover:text-ink"
                    >
                      <span
                        className="font-latin text-[0.65rem] font-bold text-gold-ink"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-5 border-t border-gold/30 pt-4">
              <a
                href={references[0].url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-xs font-semibold text-green transition hover:text-green-dark"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
                النص الأصلي للبلاغ
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
