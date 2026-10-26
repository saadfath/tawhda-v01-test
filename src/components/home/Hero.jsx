import { ArrowLeft, CalendarDays, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { HeroArt } from './HeroArt'
import { common, home } from '../../content/texts.ar'

const metaIcons = [CalendarDays, Sparkles]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="bg-star-pattern pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 end-[-12rem] size-[30rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative grid items-center gap-14 py-12 pb-20 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="animate-fade-up lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-red/20 bg-white px-4 py-1.5 text-xs font-semibold text-red">
            <span className="size-1.5 rounded-full bg-red" aria-hidden="true" />
            {home.eyebrow}
          </p>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.12] text-ink sm:text-6xl lg:text-7xl">
            {home.title}
            <span className="mt-3 block text-2xl font-bold text-green sm:text-3xl">
              مناسبة وطنية جامعة
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-9 text-ink-soft sm:text-xl sm:leading-10">
            {home.lead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/info" size="lg">
              {common.learnMore}
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button to="/quiz" variant="secondary" size="lg">
              {common.takeQuiz}
            </Button>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-sm text-ink-soft sm:flex-row sm:gap-6">
            {home.meta.map((item, index) => {
              const Icon = metaIcons[index] ?? CalendarDays
              return (
                <li key={item} className="flex items-center gap-2.5">
                  <Icon
                    className="size-4 shrink-0 text-green"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="animate-fade-up animation-delay-200 lg:col-span-5">
          <HeroArt />
        </div>
      </div>
    </section>
  )
}
