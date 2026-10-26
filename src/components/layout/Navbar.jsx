import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { nav, site } from '../../content/texts.ar'
import { cx } from '../../lib/cx'

const links = [
  { to: '/', label: nav.home, end: true },
  { to: '/info', label: nav.info },
  { to: '/quiz', label: nav.quiz },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-ivory/90 backdrop-blur">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/logo.svg"
            alt=""
            width="42"
            height="42"
            className="size-10 shrink-0 sm:size-11"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[1.45rem] font-extrabold tracking-tight text-green sm:text-2xl">
              {site.name}
            </span>
            <span className="mt-1 text-[0.7rem] font-medium text-ink-soft sm:text-xs">
              {site.subtitle} · 31 أكتوبر
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="التنقل الرئيسي"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cx(
                  'relative rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-green after:transition-opacity',
                  isActive
                    ? 'text-green after:opacity-100'
                    : 'text-ink-soft after:opacity-0 hover:text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-xl border border-gold/50 bg-white text-ink transition hover:border-green/50 hover:text-green md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? nav.close : nav.menu}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cx(
          'overflow-hidden border-t border-gold/30 bg-ivory transition-[max-height,opacity] duration-300 md:hidden',
          open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav
          className="container-site flex flex-col gap-1 py-3"
          aria-label="التنقل على الهاتف"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cx(
                  'rounded-xl px-4 py-3 text-base font-semibold transition-colors',
                  isActive
                    ? 'bg-green-soft text-green'
                    : 'text-ink-soft hover:bg-ivory-dark hover:text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
