import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { footer, nav, site } from '../../content/texts.ar'
import { references } from '../../content/references'

const navLinks = [
  { to: '/', label: nav.home },
  { to: '/info', label: nav.info },
  { to: '/quiz', label: nav.quiz },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-gold bg-green-dark text-ivory">
      <div
        className="bg-star-pattern-light pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div className="container-site relative py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.svg"
                alt=""
                width="44"
                height="44"
                className="size-11 brightness-0 invert"
              />
              <div>
                <p className="text-2xl font-extrabold leading-none text-white">
                  {site.name}
                </p>
                <p className="mt-1.5 text-xs text-ivory/70">{site.subtitle}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-ivory/75">
              {footer.about}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm font-bold text-gold-soft">{footer.navTitle}</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/80 transition hover:text-gold-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-sm font-bold text-gold-soft">
              {footer.refsTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {references.slice(0, 4).map((reference) => (
                <li key={reference.id}>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-start gap-2 text-sm leading-6 text-ivory/80 transition hover:text-gold-soft"
                  >
                    <ExternalLink
                      className="mt-1 size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{reference.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-gold/30 bg-green/40 p-5">
          <p className="text-sm font-bold text-gold-soft">
            {footer.disclaimerTitle}
          </p>
          <p className="mt-2 text-sm leading-7 text-ivory/80">
            {footer.disclaimer}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.credits}</p>
          <p>{footer.updated}</p>
        </div>
      </div>
    </footer>
  )
}
