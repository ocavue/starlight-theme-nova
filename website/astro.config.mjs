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
              label: 'Docs',
              href: '/guide/getting-started/',
            },
            {
              label: 'Starlight',
              href: 'https://starlight.astro.build',
            },
          ],
        }),
      ],

      title: 'Starlight Nova',
      social: {
        blueSky: 'https://bsky.app/profile/ocavue.bsky.social',
        github: 'https://github.com/ocavue/starlight-theme-nova',
      },

      sidebar: [
        {
          label: 'Guide',
          autogenerate: { directory: 'guide' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
    }),
  ],

  devToolbar: { enabled: false },
})
