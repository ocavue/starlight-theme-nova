import type { ShikiTransformer } from '@shikijs/types'

import { CODE_PROPERTY_TITLE } from './constants'

export function parseTitleString(meta: string): string | null {
  if (!meta) return null
  const match = meta.match(/title="([^"]+)"/)
  if (!match) return null
  return match[1]
}

const name = 'starlight-theme-nova-shiki-transformer-meta-title'

/**
 * Allow using `title="index.ts"` in the code snippet meta to add an extra file title.
 */
export function transformerMetaTitle(): ShikiTransformer {
  return {
    name,
    pre(pre) {
      const meta = this.options.meta?.__raw
      const title = meta && parseTitleString(meta)

      if (!title) {
        return
      }

      return {
        ...pre,
        properties: {
          ...pre.properties,
          [CODE_PROPERTY_TITLE]: title,
        },

        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: {
              class: 'nova-code-title',
            },
            children: [
              {
                type: 'text',
                value: title,
              },
            ],
          },
          ...pre.children,
        ],
      }
    },
  }
}
