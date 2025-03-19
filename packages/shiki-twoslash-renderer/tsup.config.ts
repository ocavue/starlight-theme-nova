import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/elements.ts', 'src/style.css'],
  tsconfig: './tsconfig.build.json',
  format: 'esm',
  experimentalDts: true,
})
