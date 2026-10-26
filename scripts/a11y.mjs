import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { findChromium } from './chromium.mjs'

const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:4173'
const AXE_PATH = fileURLToPath(
  new URL('../node_modules/axe-core/axe.min.js', import.meta.url),
)

async function scan(page, name) {
  await page.addScriptTag({ path: AXE_PATH })
  const results = await page.evaluate(async () =>
    window.axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    }),
  )

  const significant = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact),
  )

  for (const violation of results.violations) {
    const marker = ['serious', 'critical'].includes(violation.impact)
      ? 'FAIL'
      : 'warn'
    console.log(
      `${marker}  ${name}: ${violation.id} (${violation.impact}) — ${violation.help}`,
    )
    for (const node of violation.nodes.slice(0, 3)) {
      console.log(`       ${node.target.join(' ')}`)
    }
  }

  if (results.violations.length === 0) {
    console.log(`PASS  ${name}: no axe violations`)
  }

  return significant
}

async function main() {
  const browser = await chromium.launch({
    executablePath: findChromium(),
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

  const failures = []

  for (const path of ['/', '/info', '/quiz', '/nope']) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' })
    failures.push(...(await scan(page, path)))
  }

  // Results screen.
  await page.goto(`${BASE_URL}/quiz`, { waitUntil: 'networkidle' })
  await page.getByRole('heading', { name: 'اختبر معلوماتك' }).waitFor()
  const correctIndexes = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2]
  for (let index = 0; index < correctIndexes.length; index += 1) {
    await page.locator('fieldset label').nth(correctIndexes[index]).click()
    if (index < correctIndexes.length - 1) {
      await page.getByRole('button', { name: 'التالي' }).click()
    }
  }
  await page.getByRole('button', { name: 'إرسال الإجابات' }).click()
  await page.getByRole('heading', { name: 'نتيجتك' }).waitFor()
  failures.push(...(await scan(page, '/quiz results')))

  await browser.close()

  assert.equal(
    failures.length,
    0,
    `${failures.length} serious/critical accessibility violation(s)`,
  )
  console.log('\nAccessibility scan passed.')
}

main().catch((error) => {
  console.error('\nA11Y CHECK FAILED')
  console.error(error.message)
  process.exit(1)
})
