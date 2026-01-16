import { expect, test } from '@playwright/test'

const pages = [
  '/',
  '/guide/getting-started/',
  '/guide/css-and-styling/',
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
  '/zh-cn/guide/getting-started/',
  '/zh-cn/guide/css-and-styling/',
  '/zh-cn/guide/markdown/',
  '/zh-cn/components/aside/',
  '/zh-cn/components/badge/',
  '/zh-cn/components/code/',
  '/zh-cn/components/code-file/',
  '/zh-cn/components/code-package-managers/',
  '/zh-cn/components/code-tabs/',
  '/zh-cn/components/link-button/',
  '/zh-cn/components/link-card/',
]

for (const path of pages) {
  const name = path === '/' ? 'home' : path.slice(1, -1).replace(/\//g, '-')

  test(`screenshot ${name}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true })
  })
}
