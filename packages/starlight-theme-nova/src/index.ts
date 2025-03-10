import type {
  StarlightPlugin,
  StarlightUserConfig,
} from '@astrojs/starlight/types'

import { shikiConfig } from './shiki-config'

const components = {
  Header: 'starlight-theme-nova/components/Header.astro',
  Search: 'starlight-theme-nova/components/Search.astro',
  ThemeProvider: 'starlight-theme-nova/components/ThemeProvider.astro',
  ThemeSelect: 'starlight-theme-nova/components/ThemeSelect.astro',
  SocialIcons: 'starlight-theme-nova/components/SocialIcons.astro',
  SiteTitle: 'starlight-theme-nova/components/SiteTitle.astro',
  PageFrame: 'starlight-theme-nova/components/PageFrame.astro',
  MobileMenuToggle: 'starlight-theme-nova/components/MobileMenuToggle.astro',
  TwoColumnContent: 'starlight-theme-nova/components/TwoColumnContent.astro',
  MarkdownContent: 'starlight-theme-nova/components/MarkdownContent.astro',
} as const

export default function starlightThemeNova(): StarlightPlugin {
  return {
    name: 'starlight-theme-nova',
    hooks: {
      setup({ config, updateConfig, addIntegration }) {
        const newConfig = {
          customCss: [
            // Including any user CSS *after* our own.
            'starlight-theme-nova/styles.gen.css',
            'starlight-theme-nova/shiki.css',
            ...(config.customCss || []),
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
                  shikiConfig,
                },
              })
            },
          },
        })
      },
    },
  }
}
