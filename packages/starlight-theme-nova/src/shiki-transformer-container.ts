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
            class:
              'hidden border-b border-solid border-b-(--sl-color-gray-5) bg-(--sl-color-bg) px-4 py-2 font-mono text-sm text-(--sl-color-gray-3) [div[data-nova-code-container][data-nova-code-title]_&]:block',
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
            class:
              'not-content relative overflow-hidden [&_pre]:relative [&_nova-code-copy-button]:opacity-0 [&:hover_nova-code-copy-button]:opacity-100 border border-solid border-(--sl-color-gray-5) rounded-md',
          },
          children: [
            ...children,
            {
              type: 'element',
              tagName: 'nova-code-copy-button',
              properties: {
                type: 'button',
                'data-code': this.source,
                title: 'Copy code',
                'aria-label': 'Copy code',
                class:
                  'absolute top-2 right-2 m-0 size-6 rounded border border-solid border-(--sl-color-gray-5) bg-gray-100/30 p-1 text-black backdrop-blur-sm transition hover:bg-gray-200/50 active:scale-90 dark:bg-gray-600/30 dark:text-white hover:dark:bg-gray-500/50',
              },
              children: [],
            },
          ],
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
