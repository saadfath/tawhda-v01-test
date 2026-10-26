import { AboutSection } from '../components/home/AboutSection'
import { Hero } from '../components/home/Hero'
import { Highlights } from '../components/home/Highlights'
import { QuizCta } from '../components/home/QuizCta'
import { QuoteBlock } from '../components/home/QuoteBlock'
import { usePageTitle } from '../hooks/usePageTitle'
import { site } from '../content/texts.ar'

export function HomePage() {
  usePageTitle(null)

  return (
    <>
      <Hero />
      <Highlights />
      <QuoteBlock />
      <AboutSection />
      <QuizCta />
      <p className="sr-only">{site.description}</p>
    </>
  )
}
