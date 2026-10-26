import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary:
    'bg-red text-white shadow-[0_14px_30px_-18px_rgba(193,39,45,0.9)] hover:bg-red-dark',
  secondary:
    'border border-green/60 bg-white text-green hover:border-green hover:bg-green-soft',
  gold: 'bg-gold text-ink hover:bg-gold-soft',
  ghost: 'text-ink hover:bg-ivory-dark',
  inverse:
    'border border-white/40 bg-white/10 text-white hover:border-gold hover:bg-white/15',
}

const sizes = {
  sm: 'min-h-10 px-4 py-2 text-sm',
  md: 'min-h-11 px-6 py-3 text-base',
  lg: 'min-h-12 px-7 py-3.5 text-lg',
}

export function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  type,
  className,
  children,
  ...props
}) {
  const classes = cx(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type ?? 'button'} className={classes} {...props}>
      {children}
    </button>
  )
}
