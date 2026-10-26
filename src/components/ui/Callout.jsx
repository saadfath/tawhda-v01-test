import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { cx } from '../../lib/cx'

const styles = {
  info: {
    wrap: 'border-gold/60 bg-ivory-dark/60',
    icon: 'bg-green text-white',
    Icon: Info,
  },
  warning: {
    wrap: 'border-red/30 bg-red/5',
    icon: 'bg-red text-white',
    Icon: AlertTriangle,
  },
  success: {
    wrap: 'border-green/25 bg-green-soft',
    icon: 'bg-green text-white',
    Icon: CheckCircle2,
  },
}

export function Callout({
  variant = 'info',
  title,
  children,
  className,
  icon: IconOverride,
}) {
  const style = styles[variant] ?? styles.info
  const Icon = IconOverride ?? style.Icon

  return (
    <div
      className={cx(
        'rounded-2xl border border-s-4 p-5 md:p-6',
        style.wrap,
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cx(
            'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full',
            style.icon,
          )}
          aria-hidden="true"
        >
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          {title ? (
            <h3 className="text-base font-bold text-ink md:text-lg">{title}</h3>
          ) : null}
          <div className="prose-ar text-[0.975rem]">{children}</div>
        </div>
      </div>
    </div>
  )
}
