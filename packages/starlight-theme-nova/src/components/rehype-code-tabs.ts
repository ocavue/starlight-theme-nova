import type { Element, ElementContent } from 'hast'
import { rehype } from 'rehype'

import { CODE_PROPERTY_CONTAINER, CODE_PROPERTY_TITLE } from '../constants'

// https://github.com/withastro/starlight/blob/bdb05e704a6cf06a029367f99b6bf2f575e5a5f3/packages/starlight/user-components/rehype-tabs.ts#L20
export const TabItemTagname = 'starlight-tab-item'

/**
 * Rehype processor to extract tab panel data and turn each
 * `<starlight-tab-item>` into a `<div>` with the necessary
 * attributes.
 */
const tabsProcessor = rehype()
  .data('settings', { fragment: true })
  .use(() => {
    return (tree: Element) => {
      return {
        ...tree,
        children: tree.children.map(replacePre),
      }
    }
  })

function replacePre(node: ElementContent): ElementContent {
  if (
    node.type === 'element' &&
    node.tagName === 'div' &&
    node.properties[CODE_PROPERTY_CONTAINER] != null
  ) {
    const title = node.properties[CODE_PROPERTY_TITLE]

    if (title) {
      node.properties[CODE_PROPERTY_TITLE] = undefined
      return {
        type: 'element',
        tagName: TabItemTagname,
        properties: {
          dataLabel: title,
        },
        children: [node],
      }
    }
  }

  return node
}

/**
 * Processes the children of the `<CodeTabs>` component to transform
 * any code blocks with "title" meta information into a <TabItem> component.
 */
export function processCodeTabs(html: string): string {
  const file = tabsProcessor.processSync({ value: html })
  return file.toString()
}
