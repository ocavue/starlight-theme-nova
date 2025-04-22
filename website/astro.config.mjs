// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeNova from 'starlight-theme-nova'

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    plugins: [
      starlightThemeNova({
        nav: [
          {
            label: 'Docs',
            href: '/guide/getting-started/',
          },
          {
            label: 'Changelog',
            href: 'https://github.com/ocavue/starlight-theme-nova/blob/master/packages/starlight-theme-nova/CHANGELOG.md',
          },
          {
            label: 'Starlight',
            href: 'https://starlight.astro.build',
          },
        ],
      }),
    ],

    title: 'Starlight Nova',
    social: [
      {
        icon: 'blueSky',
        label: 'BlueSky',
        href: 'https://bsky.app/profile/ocavue.bsky.social',
      },
      {
        icon: 'github',
        label: 'GitHub',
        href: 'https://github.com/ocavue/starlight-theme-nova',
      },
    ],

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
  }), react()],

  devToolbar: { enabled: false },
})