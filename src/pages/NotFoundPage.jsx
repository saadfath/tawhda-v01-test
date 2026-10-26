import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { common, notFound } from '../content/texts.ar'
import { usePageTitle } from '../hooks/usePageTitle'

export function NotFoundPage() {
  usePageTitle(notFound.title)

  return (
    <section className="relative overflow-hidden">
      <div
        className="bg-star-pattern pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="container-site relative flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <p
          className="font-latin text-[7rem] font-bold leading-none text-gold-ink sm:text-[9rem]"
          aria-hidden="true"
        >
          {notFound.code}
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
          {notFound.title}
        </h1>
        <p className="mt-3 max-w-md text-base leading-8 text-ink-soft">
          {notFound.body}
        </p>
        <Button to="/" className="mt-8">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {common.backHome}
        </Button>
      </div>
    </section>
  )
}
