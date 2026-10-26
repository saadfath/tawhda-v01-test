import { useEffect } from 'react'
import { site } from '../content/texts.ar'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : `${site.name} · ${site.subtitle}`
  }, [title])
}
