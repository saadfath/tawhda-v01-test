import { existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { chromium } from 'playwright-core'

export function findChromium() {
  const candidates = [
    process.env.CHROME_PATH,
    chromium.executablePath(),
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
  ].filter(Boolean)

  const cache = join(homedir(), '.cache', 'ms-playwright')
  if (existsSync(cache)) {
    for (const entry of readdirSync(cache)) {
      if (!entry.startsWith('chromium-')) continue
      candidates.push(join(cache, entry, 'chrome-linux', 'chrome'))
      candidates.push(join(cache, entry, 'chrome-linux64', 'chrome'))
    }
  }

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error(
      'No Chromium binary found. Set CHROME_PATH or run: npx playwright install chromium',
    )
  }
  return found
}
