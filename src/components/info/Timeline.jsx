import { Card } from '../ui/Card'
import { timeline } from '../../content/timeline'

export function Timeline() {
  return (
    <ol className="relative mt-8 space-y-4">
      <span
        className="absolute start-[0.44rem] top-3 bottom-3 w-px bg-gold/50"
        aria-hidden="true"
      />
      {timeline.map((entry) => (
        <li key={entry.date} className="relative ps-8 sm:ps-10">
          <span
            className="absolute start-0 top-5 size-3.5 rounded-full border-2 border-gold bg-ivory shadow-[0_0_0_4px_var(--color-ivory)]"
            aria-hidden="true"
          />
          <Card className="transition duration-200 hover:border-gold/70 hover:shadow-lift">
            <p className="text-xs font-bold text-red">{entry.date}</p>
            <h3 className="mt-1 text-base font-bold leading-7 text-ink">
              {entry.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-ink-soft">{entry.body}</p>
            <p className="mt-3 flex flex-wrap gap-1.5">
              {entry.sources.map((source) => (
                <span
                  key={source}
                  className="rounded-md bg-ivory-dark px-2 py-0.5 font-latin text-[0.65rem] font-semibold text-ink-soft"
                >
                  {source}
                </span>
              ))}
            </p>
          </Card>
        </li>
      ))}
    </ol>
  )
}
