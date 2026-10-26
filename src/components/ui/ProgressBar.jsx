import { cx } from '../../lib/cx'

export function ProgressBar({ value, max = 100, label, className }) {
  const safeMax = max > 0 ? max : 1
  const safeValue = Math.min(Math.max(value, 0), safeMax)
  const percentage = (safeValue / safeMax) * 100

  return (
    <div
      className={cx(
        'h-2 w-full overflow-hidden rounded-full bg-ink/10',
        className,
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue}
      aria-label={label}
    >
      <div
        className="h-full rounded-full bg-gold transition-[width] duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
