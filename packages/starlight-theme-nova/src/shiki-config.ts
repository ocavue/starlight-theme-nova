import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/twoslash'
import type { ShikiTransformer } from '@shikijs/types'
import type { ShikiConfig } from 'astro'

import { transformerCopyButton } from './shiki-transformer-copy-button'

export function createShikiConfig(options: { twoslash: boolean }): ShikiConfig {
  const transformers: ShikiTransformer[] = [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerMetaHighlight(),
    transformerCopyButton(),
    options.twoslash
      ? transformerTwoslash({
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
    // @ts-expect-error: Astro is using outdated Shiki v1
    transformers: transformers,
  }
}
