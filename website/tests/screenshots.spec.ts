import { expect, test } from '@playwright/test'

const pages = [
  '/',
  '/guide/markdown/',
  '/components/aside/',
  '/components/badge/',
  '/components/code/',
  '/components/code-file/',
  '/components/code-package-managers/',
  '/components/code-tabs/',
  '/components/link-button/',
  '/components/link-card/',
  '/zh-cn/',
]

for (const path of pages) {
  const name = path === '/' ? 'home' : path.slice(1, -1).replace(/\//g, '-')

  test(`screenshot ${name}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true })
  })
}
