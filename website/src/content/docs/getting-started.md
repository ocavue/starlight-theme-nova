---
title: Getting Started
description: Learn how to use the Starlight Nova theme in your documentation.
---

A [Starlight](https://starlight.astro.build) theme. Check out the various
[examples](/examples/asides/) to see the theme in action.

## Prerequisites

You will need to have a Starlight website set up.

If you don't have one yet, you can follow the ["Getting Started"](https://starlight.astro.build/getting-started) guide in the Starlight docs to create one.

## Installation

import { Steps } from '@astrojs/starlight/components'
import CodePackageManagers from 'starlight-theme-nova/components/CodePackageManagers.astro'

<Steps>

1. The Starlight Nova theme is a Starlight [plugin](https://starlight.astro.build/reference/plugins/) that you can install using your favorite package manager:

   <CodePackageManagers packages="starlight-theme-nova" />

2. Configure the plugin in your Starlight [configuration](https://starlight.astro.build/reference/configuration/#plugins) in the `astro.config.mjs` file.

   ```diff lang="js"
   // astro.config.mjs
   import starlight from '@astrojs/starlight'
   import { defineConfig } from 'astro/config'
   import starlightThemeNova from 'starlight-theme-nova'

   export default defineConfig({
     integrations: [
       starlight({
   +     plugins: [starlightThemeNova()],
         title: 'My Docs',
       }),
     ],
   })
   ```

3. [Start the development server](https://starlight.astro.build/getting-started/#start-the-development-server) to preview the theme in action.

</Steps>

That's it! You should now see the Starlight Nova theme applied to your Starlight website.
