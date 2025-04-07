import type { ShikiTransformer } from '@shikijs/types'
import type { ElementContent, RootContent } from 'hast'
import { isElement } from 'hast-util-is-element'

import { CODE_PROPERTY_CONTAINER, CODE_PROPERTY_TITLE } from './constants'
import { parseTitleString } from './shiki-meta-title'

const name = 'starlight-theme-nova-shiki-transformer-container'

/**
 * A transformer to wrap code blocks in a container.
 */
export function transformerContainer(): ShikiTransformer {
  return {
    name: name,
    root(node) {
      if (node.children.length === 0) {
        throw new Error(`[${name}] Expected at least one child`)
      }

      const pre = node.children.find((child) => isElement(child, 'pre'))

      if (!pre) {
        throw new Error(
          `[${name}] Expected a <pre> element in the root node but got ${JSON.stringify(node)}`,
        )
      }

      const title = parseTitleString(this.options.meta?.__raw || '')

      const children: ElementContent[] = normalizeContent(node.children)

      if (title) {
        children.unshift({
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
        })
      }

      node.children = [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            [CODE_PROPERTY_CONTAINER]: '',
            [CODE_PROPERTY_TITLE]: title || undefined,
            class: 'nova-code-container not-content',
          },
          children,
        },
      ]

      return node
    },
  }
}

// A simple function to make typescript happy
function normalizeContent(children: RootContent[]): ElementContent[] {
  return children.filter((child) => child.type !== 'doctype')
}
