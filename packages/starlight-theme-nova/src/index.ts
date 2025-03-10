import type {
  StarlightPlugin,
  StarlightUserConfig,
} from '@astrojs/starlight/types'

export default function starlightThemeNova(): StarlightPlugin {
  return {
    name: 'starlight-theme-nova',
    hooks: {
      setup({ config, updateConfig }) {
        // Register the theme’s custom CSS, including any user CSS *after* our own.
        const newConfig = {
          customCss: [
            ...(config.customCss || []),
            'starlight-theme-nova/styles.css',
          ],
          components: {
            ...config.components,
          },
          expressiveCode: {},
        } satisfies Partial<StarlightUserConfig>

        if (!config.components?.Header) {
          newConfig.components.Header =
            'starlight-theme-nova/components/Header.astro'
        }
        updateConfig(newConfig)
      },
    },
  }
}
