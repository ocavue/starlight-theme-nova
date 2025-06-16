import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerRemoveNotationEscape,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/twoslash'
import type { ShikiTransformer } from '@shikijs/types'
import type { ShikiConfig } from 'astro'
import { createRenderer } from 'shiki-twoslash-renderer'

import { transformerContainer } from './shiki-transformer-container'

export function createShikiConfig(options: { twoslash: boolean }): ShikiConfig {
  const transformers: ShikiTransformer[] = [
    transformerMetaHighlight(),
    transformerMetaWordHighlight(),
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
    transformerRemoveNotationEscape(),

    transformerContainer(),
    options.twoslash
      ? transformerTwoslash({
          renderer: createRenderer(),
          explicitTrigger: true,
        })
      : undefined,
  ].filter((x) => !!x)

  return {
    themes: {
      light: 'one-light',
      dark: 'github-dark-dimmed',
    },
    defaultColor: false,
    transformers: transformers,
  }
}
