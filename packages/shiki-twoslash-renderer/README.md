# shiki-twoslash-renderer

A custom renderer for [`@shikijs/twoslash`](https://shiki.style/packages/twoslash) that provides a clean, modern styling for TypeScript code insights.

## Features

- Creates custom HTML elements for twoslash hovers, errors, and queries
- Uses [@aria-ui/tooltip](https://www.npmjs.com/package/@aria-ui/tooltip) for accessible tooltips
- Provides a clean, modern styling for TypeScript code insights
- Supports all twoslash features:
  - Type hover information
  - Error messages
  - Query completion
  - Contextual highlights

## Installation

```bash
npm install shiki-twoslash-renderer @shikijs/twoslash shiki
```

## Usage

```ts
import { transformerTwoslash } from '@shikijs/twoslash'
import { codeToHtml } from 'shiki'
import { createRenderer } from 'shiki-twoslash-renderer'

const html = await codeToHtml(`console.log()`, {
  lang: 'ts',
  theme: 'vitesse-dark',
  transformers: [
    transformerTwoslash({
      renderer: createRenderer(),
    }),
  ],
})
```

You need to register the custom elements and import the styles in your browser-side code:

```ts
import 'shiki-twoslash-renderer/style.css'
import { register } from 'shiki-twoslash-renderer/elements'

register()
```

## License

MIT
