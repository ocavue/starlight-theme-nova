import type {
  StarlightConfig,
  StarlightPlugin,
  StarlightUserConfig,
} from '@astrojs/starlight/types'
import type { AstroConfig } from 'astro'
import remarkCustomHeaderId from 'remark-custom-header-id'

import { createShikiConfig } from './shiki-config'
import type { ThemeNovaOptions } from './user-options'
import { vitePluginUserConfig } from './virtual-user-config'

const components = {
  Header: 'starlight-theme-nova/components/Header.astro',
  Search: 'starlight-theme-nova/components/Search.astro',
  ThemeProvider: 'starlight-theme-nova/components/ThemeProvider.astro',
  ThemeSelect: 'starlight-theme-nova/components/ThemeSelect.astro',
  SocialIcons: 'starlight-theme-nova/components/SocialIcons.astro',
  SiteTitle: 'starlight-theme-nova/components/SiteTitle.astro',
  PageFrame: 'starlight-theme-nova/components/PageFrame.astro',
  Pagination: 'starlight-theme-nova/components/Pagination.astro',
  MobileMenuToggle: 'starlight-theme-nova/components/MobileMenuToggle.astro',
  TwoColumnContent: 'starlight-theme-nova/components/TwoColumnContent.astro',
  MarkdownContent: 'starlight-theme-nova/components/MarkdownContent.astro',
  Hero: 'starlight-theme-nova/components/Hero.astro',
  MobileTableOfContents:
    'starlight-theme-nova/components/MobileTableOfContents.astro',
  MobileMenuFooter: 'starlight-theme-nova/components/MobileMenuFooter.astro',
  LanguageSelect: 'starlight-theme-nova/components/LanguageSelect.astro',
} as const satisfies Partial<StarlightConfig['components']>

export type { ThemeNovaOptions }

export default function starlightThemeNova(
  options: ThemeNovaOptions = {},
): StarlightPlugin {
  return {
    name: 'starlight-theme-nova',
    hooks: {
      setup: async ({ config, updateConfig, addIntegration, astroConfig }) => {
        let useTailwind: boolean

        if (options.stylingSystem === 'css') {
          useTailwind = false
        } else if (options.stylingSystem === 'tailwind') {
          useTailwind = true
        } else {
          const hasTailwindcss = await checkHasTailwindcss(
            astroConfig.vite?.plugins,
          )
          useTailwind = hasTailwindcss
        }

        const newConfig = {
          customCss: [
            // Ensure Tailwind is loaded before any user CSS, so that the
            // Tailwind specific directives like `@source` in user CSS will take
            // effect.
            useTailwind
              ? 'starlight-theme-nova/tailwind.css'
              : 'starlight-theme-nova/tailwind.gen.css',
            ...(config.customCss || []),

            'starlight-theme-nova/styles.css',
          ],
          components: {
            // Including any user components *after* our own.
            ...components,
            ...config.components,
          },
          expressiveCode: config.expressiveCode ?? false,
        } satisfies Partial<StarlightUserConfig>

        updateConfig(newConfig)

        addIntegration({
          name: 'starlight-theme-nova-integration',
          hooks: {
            'astro:config:setup': ({ updateConfig }) => {
              updateConfig({
                markdown: {
                  shikiConfig: createShikiConfig({ twoslash: true }),
                  remarkPlugins: [remarkCustomHeaderId],
                },
                vite: {
                  plugins: [
                    vitePluginUserConfig({
                      nav: options.nav,
                      rootHref: astroConfig.root.toString(),
                    }),
                  ],
                },
              })
            },
          },
        })
      },
    },
  }
}

type ViteUserConfig = AstroConfig['vite']
type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]

async function checkHasTailwindcss(
  plugin: VitePlugin | Promise<VitePlugin>,
): Promise<boolean> {
  const awaited = await plugin

  if (!awaited) {
    return false
  }
  if (Array.isArray(awaited)) {
    for (const p of awaited) {
      if (await checkHasTailwindcss(p)) {
        return true
      }
    }
    return false
  }
  let name = awaited.name || ''
  return name.includes('tailwind')
}
