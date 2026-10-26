import {
  CalendarDays,
  HandHeart,
  ScrollText,
  Sparkles,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { home } from '../../content/texts.ar'

const icons = {
  calendar: CalendarDays,
  scroll: ScrollText,
  sparkles: Sparkles,
  heart: HandHeart,
}

export function Highlights() {
  return (
    <section className="container-site py-12 md:py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">
            {home.highlightsKicker}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
            {home.highlightsTitle}
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-7 text-ink-soft">
          {home.highlightsLead}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {home.highlights.map((item, index) => {
          const Icon = icons[item.icon] ?? CalendarDays
          return (
            <Card
              key={item.title}
              className="group relative overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lift"
            >
              <span
                className="absolute end-4 top-4 font-latin text-xs font-semibold text-gold-ink"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <span className="flex size-11 items-center justify-center rounded-xl bg-green-soft text-green transition-colors group-hover:bg-green group-hover:text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold leading-7 text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">
                {item.body}
              </p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
