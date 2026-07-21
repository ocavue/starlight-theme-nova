import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerRemoveNotationEscape,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import type { ShikiTransformer } from '@shikijs/types'
import type { ShikiConfig } from 'astro'

import { transformerContainer } from './shiki-transformer-container'

/**
 * The Shiki config without twoslash. Safe to import from `.astro` components:
 * this module must never import twoslash, which pulls in the CommonJS
 * `typescript` package that cannot be bundled into ESM prerender chunks.
 */
export function createBaseShikiConfig(
  extraTransformers: ShikiTransformer[] = [],
): ShikiConfig {
  return {
    themes: {
      light: 'one-light',
      dark: 'github-dark-dimmed',
    },
    defaultColor: false,
    transformers: [
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerRemoveNotationEscape(),

      transformerContainer(),
      ...extraTransformers,
    ],
  }
}
