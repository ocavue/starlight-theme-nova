// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeNova from 'starlight-theme-nova'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeNova()],

      title: 'Demo Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
      },

      // Sidebar — mostly dummy links just to demonstrate some structure
      sidebar: [
        { slug: 'splash', label: 'Home' },
        {
          label: 'Guides',
          items: [
            { label: 'Example Guide', slug: 'index' },
            { label: 'Installation', link: '#' },
            { label: 'Testing', link: '#', badge: 'New' },
          ],
        },
        {
          label: 'Constellations',
          items: [
            { label: 'Carina', link: '#' },
            { label: 'Centaurus', link: '#' },
            {
              label: 'Seasonal',
              items: [
                { label: 'Andromeda', link: '#' },
                { label: 'Orion', link: '#' },
                { label: 'Ursa Minor', link: '#' },
              ],
            },
          ],
        },
        { label: 'Playground', link: '#' },
        {
          label: 'Blog',
          link: '#',
          badge: { text: 'WIP', variant: 'caution' },
        },
      ],
    }),
  ],

  // Toolbar disabled so it doesn’t appear in screenshots
  devToolbar: { enabled: false },
})
