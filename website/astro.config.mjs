// @ts-check
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import minify from 'astro-minify-html-swc'
import starlightThemeNova from 'starlight-theme-nova'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      defaultLocale: 'root',
      customCss: ['./src/styles/global.css'],
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        'zh-CN': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },

      plugins: [
        starlightThemeNova({
          nav: [
            {
              label: {
                root: 'Docs',
                'zh-CN': '文档',
              },
              href: {
                root: '/guide/getting-started/',
                'zh-CN': '/zh-cn/guide/getting-started/',
              },
            },
            {
              label: {
                root: 'Changelog',
                'zh-CN': '更新日志',
              },
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
          translations: {
            'zh-CN': '向导',
          },
          autogenerate: { directory: 'guide' },
        },
        {
          label: 'Components',
          translations: {
            'zh-CN': '组件',
          },
          autogenerate: { directory: 'components' },
        },
      ],
    }),
    minify(),
  ],

  devToolbar: { enabled: false },
})
