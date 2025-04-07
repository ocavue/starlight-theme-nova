import type { ShikiTransformer } from '@shikijs/types'
import { isElement } from 'hast-util-is-element'

const name = 'starlight-theme-nova-shiki-transformer-copy-button'

/**
 * A transformer that adds a copy button to code blocks.
 */
export function transformerCopyButton(): ShikiTransformer {
  return {
    name: name,
    root(node) {
      if (node.children.length !== 1) {
        throw new Error(`[${name}] Expected exactly one child`)
      }

      const pre = node.children[0]
      if (!isElement(pre, 'pre')) {
        throw new Error(
          `[${name}] Expected a <pre> element but got ${JSON.stringify(node)}`,
        )
      }

      node.children = [
        pre,
        {
          type: 'element',
          tagName: 'nova-code-copy-button',
          properties: {
            type: 'button',
            'data-code': this.source,
            title: 'Copy code',
            'aria-label': 'Copy code',
            class: 'nova-code-copy-button',
          },
          children: [],
        },
      ]
    },
  }
}
