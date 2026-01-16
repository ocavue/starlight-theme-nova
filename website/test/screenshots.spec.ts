import { expect, test } from '@playwright/test'
import slugify from '@sindresorhus/slugify'

const paths = [
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

const pages = paths.map((path) => {
  return {
    path,
    name: path === '/' ? 'home' : slugify(path),
  }
})

for (const { path, name } of pages) {
  test(`screenshot ${name}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true })
  })
}
