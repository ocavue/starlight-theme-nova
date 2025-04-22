import type {
  StarlightPlugin,
  StarlightUserConfig,
} from '@astrojs/starlight/types'

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
} as const

export type { ThemeNovaOptions }

export default function starlightThemeNova(
  options: ThemeNovaOptions = {},
): StarlightPlugin {
  return {
    name: 'starlight-theme-nova',
    hooks: {
      setup({ config, updateConfig, addIntegration, astroConfig }) {
        const newConfig = {
          customCss: [
            // Including any user CSS *after* our own.
            'starlight-theme-nova/styles.css',
            ...(config.customCss || []),
          ],
          components: {
            // Including any user components *after* our own.
            ...components,
            ...config.components,
          },
          expressiveCode: {
            removeUnusedThemes: false,
          }
        } satisfies Partial<StarlightUserConfig>

        updateConfig(newConfig)

        addIntegration({
          name: 'starlight-theme-nova-integration',
          hooks: {
            'astro:config:setup': ({ updateConfig }) => {
              updateConfig({
                // markdown: {
                //   shikiConfig: createShikiConfig({ twoslash: true }),
                // },
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
