import { transformerTwoslash } from '@shikijs/twoslash'
import type { ShikiConfig } from 'astro'
import { createRenderer } from 'shiki-twoslash-renderer'

import { createBaseShikiConfig } from './shiki-config-base'

export function createShikiConfig(options: { twoslash: boolean }): ShikiConfig {
  return createBaseShikiConfig(
    options.twoslash
      ? [
          transformerTwoslash({
            renderer: createRenderer(),
            explicitTrigger: true,
            twoslashOptions: {
              compilerOptions: {
                noUncheckedSideEffectImports: false,
              },
            },
          }),
        ]
      : [],
  )
}
