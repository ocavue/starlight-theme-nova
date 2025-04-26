import { defineConfig } from 'tsdown'
import LightningCSS from 'unplugin-lightningcss/rolldown'

export default defineConfig({
  entry: ['src/index.ts', 'src/elements.ts', 'src/style.css'],
  format: 'esm',
  dts: true,
  plugins: [
    LightningCSS({
      options: {
        targets: {
          chrome: 100,
        },
      },
    }),
  ],
})
