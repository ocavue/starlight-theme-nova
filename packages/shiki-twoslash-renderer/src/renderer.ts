import type { RendererRichOptions, TwoslashRenderer } from '@shikijs/twoslash'
import { rendererRich } from '@shikijs/twoslash'
import type { Element, Text } from 'hast'

export interface RendererOptions extends Omit<RendererRichOptions, 'hast'> {}

export function createRenderer(
  options: RendererOptions = {},
): TwoslashRenderer {
  return rendererRich({
    ...options,
    hast: {
      hoverToken: { tagName: 'twoslash-root' },
      hoverPopup: { tagName: 'twoslash-content' },
      hoverCompose: compose,

      queryToken: { tagName: 'twoslash-root' },
      queryPopup: { tagName: 'twoslash-content' },
      queryCompose: compose,

      errorToken: { tagName: 'twoslash-root' },
      errorPopup: { tagName: 'twoslash-content' },
      errorCompose: compose,
    },
  })
}

function compose(parts: { token: Element | Text; popup: Element }): Element[] {
  return [
    {
      type: 'element',
      tagName: 'twoslash-trigger',
      properties: {},
      children: [parts.token],
    },
    parts.popup,
  ]
}
