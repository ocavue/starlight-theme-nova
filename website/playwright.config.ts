import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  snapshotPathTemplate:
    '{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{platform}/{projectName}/{arg}{ext}',
  projects: [
    {
      name: 'desktop-light',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'light',
      },
    },
    {
      name: 'desktop-dark',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
      },
    },
    {
      name: 'mobile-light',
      use: {
        ...devices['Pixel 5'],
        colorScheme: 'light',
      },
    },
    {
      name: 'mobile-dark',
      use: {
        ...devices['Pixel 5'],
        colorScheme: 'dark',
      },
    },
  ],
  webServer: {
    command: process.env.CI
      ? 'pnpm run preview'
      : 'pnpm run build && pnpm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
})
