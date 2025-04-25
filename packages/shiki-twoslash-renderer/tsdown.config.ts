import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/elements.ts', 'src/style.css'],
  format: 'esm',
  dts: true,
})
