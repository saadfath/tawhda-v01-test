import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/Button'
import { common, home } from '../../content/texts.ar'

export function QuizCta() {
  return (
    <section className="container-site pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-green px-6 py-12 sm:px-10 md:px-14 md:py-16">
        <div
          className="bg-star-pattern-light pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -start-16 size-64 rounded-full border border-gold/20"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">
              {home.ctaKicker}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              {home.ctaTitle}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-8 text-ivory/80">
              {home.ctaBody}
            </p>
          </div>

          <Button
            to="/quiz"
            variant="gold"
            size="lg"
            className="shrink-0 self-start md:self-auto"
          >
            {common.takeQuiz}
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
