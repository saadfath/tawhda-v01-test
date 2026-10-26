import { Card } from '../ui/Card'

export function FactCard({ label, value, note }) {
  return (
    <Card className="h-full transition duration-200 hover:-translate-y-0.5 hover:border-gold/70">
      <p className="text-xs font-semibold text-ink-soft">{label}</p>
      <p className="mt-2 text-lg font-extrabold leading-7 text-ink">{value}</p>
      {note ? (
        <p className="mt-1.5 text-xs leading-6 text-ink-soft">{note}</p>
      ) : null}
    </Card>
  )
}
