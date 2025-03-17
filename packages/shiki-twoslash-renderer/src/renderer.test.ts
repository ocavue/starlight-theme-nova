import { transformerTwoslash } from '@shikijs/twoslash'
import { codeToHtml } from 'shiki'
import { describe, expect, it } from 'vitest'

import { createRenderer } from './renderer'

const source = `
let foo = 1
//   ^?
`.trim()

function formatHTML(html: string) {
  const inputLines = html.replaceAll('<', '\n<').split('\n')
  const outputLines: string[] = []
  const indent = '    '
  let indentLevel = 0

  for (const line of inputLines) {
    if (line.startsWith('</')) {
      indentLevel = Math.max(indentLevel - 1, 0)
      outputLines.push(indent.repeat(indentLevel) + line)
    } else if (line.startsWith('<')) {
      outputLines.push(indent.repeat(indentLevel) + line)
      indentLevel++
    } else {
      outputLines.push(indent.repeat(indentLevel) + line)
    }
  }

  return outputLines.join('\n')
}

describe('shiki-twoslash-renderer', () => {
  it('should render', async () => {
    const html = await codeToHtml(source, {
      lang: 'ts',
      theme: 'vitesse-dark',
      transformers: [
        transformerTwoslash({
          renderer: createRenderer(),
        }),
      ],
    })

    expect(formatHTML(html)).toMatchInlineSnapshot(`
      "
      <pre class="shiki vitesse-dark twoslash lsp" style="background-color:#121212;color:#dbd7caee" tabindex="0">
          <code>
              <span class="line">
                  <span style="color:#CB7676">let 
                  </span>
                  <span style="color:#BD976A">
                      <twoslash-root class="twoslash-hover twoslash-query-presisted">
                          <twoslash-trigger>foo
                          </twoslash-trigger>
                          <twoslash-content class="twoslash-popup-container">
                              <div class="twoslash-popup-arrow">
                              </div>
                              <code class="twoslash-popup-code">
                                  <span style="color:#CB7676">let 
                                  </span>
                                  <span style="color:#BD976A">foo
                                  </span>
                                  <span style="color:#666666">: 
                                  </span>
                                  <span style="color:#5DA994">number
                                  </span>
                              </code>
                          </twoslash-content>
                      </twoslash-root>
                  </span>
                  <span style="color:#666666"> =
                  </span>
                  <span style="color:#4C9A91"> 1
                  </span>
              </span>
              
              <span class="line">
              </span>
          </code>
      </pre>"
    `)
  })
})
