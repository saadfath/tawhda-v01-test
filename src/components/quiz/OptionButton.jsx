import { Check } from 'lucide-react'
import { cx } from '../../lib/cx'

export function OptionButton({ option, name, checked, onChange, disabled }) {
  return (
    <label
      className={cx(
        'group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition duration-150 focus-within:ring-[3px] focus-within:ring-green/35 focus-within:ring-offset-2 focus-within:ring-offset-ivory md:p-5',
        checked
          ? 'border-green bg-green-soft/60'
          : 'border-gold/40 bg-white hover:border-green/50 hover:bg-ivory/70',
        disabled && 'pointer-events-none opacity-70',
      )}
    >
      <input
        type="radio"
        name={name}
        value={option.id}
        checked={checked}
        onChange={() => onChange(option.id)}
        disabled={disabled}
        className="sr-only"
      />

      <span
        className={cx(
          'flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition',
          checked
            ? 'border-green bg-green text-white'
            : 'border-ink/25 bg-white text-transparent group-hover:border-green/60',
        )}
        aria-hidden="true"
      >
        <Check className="size-3.5" strokeWidth={3} />
      </span>

      <span className="flex-1 text-base font-medium leading-7 text-ink">
        {option.ar}
      </span>
    </label>
  )
}
