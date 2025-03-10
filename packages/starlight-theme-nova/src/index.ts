import { fileURLToPath } from 'node:url'

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
          components: {
            ...config.components,
          },
          expressiveCode: {},
        } satisfies Partial<StarlightUserConfig>

        if (!config.components?.Header) {
          newConfig.components.Header = fileURLToPath(
            new URL('./components/Header.astro', import.meta.url),
          )
        }
        updateConfig(newConfig)
      },
    },
  }
}
