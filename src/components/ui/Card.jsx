import { cx } from '../../lib/cx'

export function Card({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag
      className={cx(
        'rounded-2xl border border-gold/40 bg-white p-5 shadow-card md:p-6',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
