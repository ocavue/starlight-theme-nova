import type {
  StarlightPlugin,
  StarlightUserConfig,
} from '@astrojs/starlight/types'
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
            ...(config.customCss || []),
            // Including nova styles *after* any user CSS, so that @layer nova
            // can have a higher precedence.
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
