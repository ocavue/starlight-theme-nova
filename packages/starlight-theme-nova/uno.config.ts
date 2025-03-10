import { presetWind3, defineConfig, type UserConfig } from 'unocss'

const config: UserConfig = defineConfig({
  presets: [
    presetWind3({
      preflight: false,
    }),
  ],
  shortcuts: [
    {
      'sl-nova-header': 'bg-blue-500 text-white px-4 py-2 rounded-md',
    },
  ],
})

export default config
