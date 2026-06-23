# starlight-theme-nova

[![NPM version](https://img.shields.io/npm/v/starlight-theme-nova?color=a1b858&label=)](https://www.npmjs.com/package/starlight-theme-nova)

A modern and beautiful theme for [Astro Starlight](https://starlight.astro.build).

[**Live demo and documentation →**](https://starlight-theme-nova.pages.dev)

## Features

- A clean, modern redesign of the default Starlight layout, with a top navigation bar.
- Configurable nav bar links, with optional per-locale labels and URLs.
- Polished light and dark modes.
- Optional [Tailwind CSS](https://tailwindcss.com) integration.
- Enhanced code blocks: file titles, a copy button, package-manager tabs, and [Twoslash](https://twoslash.netlify.app) type hovers.
- Extra Markdown components: link buttons, link cards, badges, asides, and steps.
- Custom heading IDs via `## Heading {#custom-id}`.

## Installation

Starlight Nova is a Starlight [plugin](https://starlight.astro.build/reference/plugins/). Install it with your package manager:

```bash
npm install starlight-theme-nova
```

Then add it to the Starlight `plugins` array in your `astro.config.mjs`:

```ts
// astro.config.mjs
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeNova from 'starlight-theme-nova'

export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeNova()],
      title: 'My Docs',
    }),
  ],
})
```

That's it. See the [documentation](https://starlight-theme-nova.pages.dev) for configuration options, the navigation bar, Tailwind CSS, and the available components.

## License

[MIT](./LICENSE) © [ocavue](https://github.com/ocavue)
