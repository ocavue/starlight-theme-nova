import { expect, test } from '@playwright/test'
import slugify from '@sindresorhus/slugify'

const paths = [
  '/',
  '/guide/markdown/',
  '/components/aside/',
  '/components/badge/',
  '/components/code/',
  '/components/code-package-managers/',
  '/components/code-tabs/',
  '/components/link-button/',
  '/components/link-card/',
  '/zh-cn/',
]

for (const path of paths) {
  const name = path === '/' ? 'home' : slugify(path)
  test(`screenshot ${name}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true })
  })
}
