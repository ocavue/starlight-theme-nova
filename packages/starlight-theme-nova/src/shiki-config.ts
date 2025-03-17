import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/twoslash'
import type { ShikiConfig } from 'astro'

import { transformerCopyButton } from './shiki-transformer-copy-button'

export function createShikiConfig(options: { twoslash: boolean }): ShikiConfig {
  return {
    themes: {
      light: 'one-light',
      dark: 'github-dark-dimmed',
    },
    defaultColor: false,
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerMetaHighlight(),
      transformerCopyButton(),
      options.twoslash ? transformerTwoslash() : undefined,
    ].filter((x) => !!x),
  }
}
