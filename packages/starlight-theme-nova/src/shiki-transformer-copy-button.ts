import type { ShikiTransformer } from '@shikijs/types'

const name = 'starlight-theme-nova-shiki-transformer-copy-button'

/**
 * A transformer that adds a copy button to code blocks.
 */
export function transformerCopyButton(): ShikiTransformer {
  return {
    name: name,
    pre(node) {
      return {
        ...node,
        children: [
          ...node.children,
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
        ],
      }
    },
  }
}
