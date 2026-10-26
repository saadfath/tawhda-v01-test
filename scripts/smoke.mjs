import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import { findChromium } from './chromium.mjs'

const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:4173'

const results = []
const consoleErrors = []

function pass(name) {
  results.push(name)
  console.log(`PASS  ${name}`)
}

async function main() {
  const browser = await chromium.launch({
    executablePath: findChromium(),
    args: ['--no-sandbox'],
  })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: 'ar-MA',
  })
  const page = await context.newPage()

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => consoleErrors.push(error.message))

  // T1 — home page renders.
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })
  assert.match(await page.title(), /تَوْحَدَة/)
  assert.equal(await page.locator('h1').count(), 1)
  assert.match(await page.locator('h1').innerText(), /عيد الوحدة/)
  pass('T1 home renders with a single h1')

  // T2 — client-side navigation and active link.
  await page.getByRole('link', { name: 'عن العيد' }).first().click()
  await page.waitForURL('**/info')
  assert.equal(await page.locator('h1').count(), 1)
  assert.match(await page.locator('h1').innerText(), /عن عيد الوحدة/)
  pass('T2 navigation to /info works')

  // Info page depth + references.
  const referenceLinks = page.locator('#references ul a')
  assert.equal(await referenceLinks.count(), 6)
  pass('Info page lists 6 references')

  // T3/T4/T5 — quiz loads, selection works, next is gated.
  await page.goto(`${BASE_URL}/quiz`, { waitUntil: 'networkidle' })
  await page.getByRole('heading', { name: 'اختبر معلوماتك' }).waitFor()
  assert.equal(await page.getByRole('radio').count(), 4)
  const next = page.getByRole('button', { name: 'التالي' })
  assert.equal(await next.isDisabled(), true)
  await page.locator('fieldset label').first().click()
  assert.equal(await next.isEnabled(), true)
  pass('T3–T5 quiz loads and Next is gated by a selection')

  // T6 — answer all questions correctly (demo keys).
  const correctIndexes = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2]
  for (let index = 0; index < correctIndexes.length; index += 1) {
    await page.locator('fieldset label').nth(correctIndexes[index]).click()
    if (index < correctIndexes.length - 1) {
      await page.getByRole('button', { name: 'التالي' }).click()
    }
  }
  await page.getByRole('button', { name: 'إرسال الإجابات' }).click()
  await page.getByRole('heading', { name: 'نتيجتك' }).waitFor()
  assert.match(await page.locator('body').innerText(), /10\/10/)
  assert.match(await page.locator('body').innerText(), /100%/)
  assert.equal(await page.locator('article').count() >= 10, true)
  pass('T6 score accuracy — all-correct attempt returns 10/10 (100%)')

  // T20 — restart resets state.
  await page.getByRole('button', { name: 'إعادة الاختبار' }).click()
  await page.getByRole('heading', { name: 'اختبر معلوماتك' }).waitFor()
  assert.equal(await page.getByRole('button', { name: 'التالي' }).isDisabled(), true)
  pass('T20 restart clears state')

  // T19 — unknown route.
  await page.goto(`${BASE_URL}/nope`, { waitUntil: 'networkidle' })
  assert.match(await page.locator('body').innerText(), /الصفحة غير موجودة/)
  pass('T19 unknown route shows 404 page')

  // T15 — mobile layout has no horizontal overflow.
  await page.setViewportSize({ width: 360, height: 800 })
  for (const path of ['/', '/info', '/quiz']) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' })
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    )
    assert.ok(overflow <= 1, `${path} overflows by ${overflow}px`)
  }
  pass('T15 no horizontal overflow at 360px')

  // T16 — RTL and Arabic document language.
  const direction = await page.evaluate(() => document.documentElement.dir)
  const language = await page.evaluate(() => document.documentElement.lang)
  assert.equal(direction, 'rtl')
  assert.equal(language, 'ar')
  pass('T16 RTL and lang=ar are set')

  // T21 — keyboard focus on the first quiz option.
  await page.goto(`${BASE_URL}/quiz`, { waitUntil: 'networkidle' })
  await page.getByRole('heading', { name: 'اختبر معلوماتك' }).waitFor()
  await page.getByRole('radio').first().focus()
  const focused = await page.evaluate(
    () => document.activeElement?.getAttribute('type') ?? '',
  )
  assert.equal(focused, 'radio')
  pass('T21 quiz options are keyboard focusable')

  assert.deepEqual(consoleErrors, [])
  pass('No console or page errors')

  await browser.close()
  console.log(`\n${results.length} checks passed.`)
}

main().catch(async (error) => {
  console.error('\nSMOKE TEST FAILED')
  console.error(error)
  if (consoleErrors.length) {
    console.error('Console errors:', consoleErrors)
  }
  process.exit(1)
})
