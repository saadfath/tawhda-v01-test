import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { nav } from '../../content/texts.ar'

export function Layout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-green px-4 py-2 text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {nav.skip}
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
