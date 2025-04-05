---
'starlight-theme-nova': minor
---

Add the ability to override some components from the theme.

For example, if you don't like the `<ThemeSelect>` component provided by the theme (perhaps you want to have a "auto" option), you can override it to Starlight's default.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightThemeNova from 'starlight-theme-nova'

export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeNova()],
      components: {
        // Note: To override `<ThemeSelect>` you also need to override `<ThemeProvider>`.
        ThemeProvider: '@astrojs/starlight/components/ThemeProvider.astro',
        ThemeSelect: '@astrojs/starlight/components/ThemeSelect.astro',
      },
      // ...
    }),
  ],
})
```
