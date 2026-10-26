import { home } from '../../content/texts.ar'

export function QuoteBlock() {
  return (
    <section className="relative overflow-hidden border-y border-gold/30 bg-white/60">
      <div
        className="bg-star-pattern pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <div className="container-site relative py-14 md:py-20">
        <figure className="mx-auto max-w-3xl text-center">
          <span
            className="block font-latin text-6xl leading-[0.6] text-gold-ink"
            aria-hidden="true"
          >
            ”
          </span>
          <blockquote className="mt-6 text-xl font-semibold leading-10 text-ink sm:text-2xl sm:leading-[1.9]">
            {home.quote}
          </blockquote>
          <figcaption className="mt-7 flex items-center justify-center gap-3 text-sm text-ink-soft">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            {home.quoteAttribution}
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
