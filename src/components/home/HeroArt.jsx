import { site } from '../../content/texts.ar'

function StarOrnament({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="15" y="15" width="34" height="34" />
      <rect x="15" y="15" width="34" height="34" transform="rotate(45 32 32)" />
      <circle cx="32" cy="32" r="4.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function HeroArt() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="absolute -inset-5 rounded-[3rem] bg-gold/15 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-gold/50 bg-green p-3 shadow-lift">
        <div className="bg-star-pattern-light relative overflow-hidden rounded-[1.55rem] border border-gold/30">
          <div className="relative flex aspect-[4/5] flex-col items-center justify-center px-6 text-center">
            <div
              className="absolute inset-x-8 top-9 bottom-0 rounded-t-full border border-gold/30"
              aria-hidden="true"
            />
            <div
              className="absolute -end-14 -top-14 size-40 rounded-full border border-gold/20"
              aria-hidden="true"
            />

            <p className="relative font-latin text-xs font-semibold uppercase tracking-[0.4em] text-gold-soft">
              {site.latinName}
            </p>

            <p className="relative mt-3 font-latin text-[6.5rem] font-semibold leading-none tracking-tight text-ivory sm:text-[7.5rem]">
              31
            </p>
            <p className="relative mt-1 text-2xl font-bold text-gold-soft">أكتوبر</p>
            <p className="relative mt-1 font-latin text-[0.65rem] tracking-[0.35em] text-ivory/55">
              OCTOBER
            </p>

            <StarOrnament className="relative my-5 size-10 text-gold/80" />

            <p className="relative text-sm text-ivory/80">أول احتفال رسمي</p>
            <p className="relative mt-1 text-base font-bold text-white">
              السبت 31 أكتوبر 2026
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 start-5 end-5 rounded-2xl border border-gold/40 bg-white p-4 shadow-card sm:start-6 sm:end-auto sm:w-64">
        <p className="text-[0.68rem] font-bold uppercase tracking-wider text-red">
          بلاغ الديوان الملكي
        </p>
        <p className="mt-1 text-sm font-bold text-ink">4 نونبر 2025</p>
        <p className="mt-1 text-xs leading-5 text-ink-soft">
          إعلان العيد وتسميته «عيد الوحدة»
        </p>
      </div>
    </div>
  )
}
