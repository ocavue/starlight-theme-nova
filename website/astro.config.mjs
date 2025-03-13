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

      title: 'Demo Docs',
      social: {
        github: 'https://github.com/ocavue/starlight-theme-nova',
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
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
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
