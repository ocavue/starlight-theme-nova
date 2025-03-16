// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeNova from 'starlight-theme-nova'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightThemeNova({
          nav: [
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'About',
              href: '/about',
            },
          ],
        }),
      ],

      title: 'Starlight Nova',
      social: {
        blueSky: 'https://bsky.app/profile/ocavue',
        github: 'https://github.com/ocavue/starlight-theme-nova',
      },

      // Sidebar — mostly dummy links just to demonstrate some structure
      sidebar: [
        {
          label: 'Start Here',
          items: [{ label: 'Getting Started', link: '/getting-started/' }],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },

        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
      ],
    }),
  ],

  // Toolbar disabled so it doesn’t appear in screenshots
  devToolbar: { enabled: false },
})
