import { presetWind3, defineConfig, type UserConfig, presetIcons } from 'unocss'
import { colors } from 'unocss/preset-mini'
import { presetAnimations } from 'unocss-preset-animations'

const internalShortcut = {
  'border-hairline': 'border-[var(--sl-color-hairline)]',

  'border-sl-gray-1': 'border-[var(--sl-color-gray-1)]',
  'border-sl-gray-2': 'border-[var(--sl-color-gray-2)]',
  'border-sl-gray-3': 'border-[var(--sl-color-gray-3)]',
  'border-sl-gray-4': 'border-[var(--sl-color-gray-4)]',
  'border-sl-gray-5': 'border-[var(--sl-color-gray-5)]',
  'border-sl-gray-6': 'border-[var(--sl-color-gray-6)]',
  'border-sl-gray-7': 'border-[var(--sl-color-gray-7)]',
}

const shortcut = {
  'nova-page-frame': 'flex flex-col min-h-screen',

  'nova-page-frame-header': [
    'box-border border-b-1 border-solid border-0 border-hairline',
    'backdrop-blur bg-white/80 dark:bg-gray-950/50',
    'w-full fixed inset-0',
    'h-[--sl-nav-height] z-[--sl-z-index-navbar]',
    'py-[--sl-nav-pad-y] px-[--sl-nav-pad-x] pe-[--sl-nav-pad-x] [[data-has-sidebar]_&]:pe-[calc(var(--sl-nav-gap)+var(--sl-nav-pad-x)+var(--sl-menu-button-size))]',
  ],

  'nova-header': 'flex items-center gap-2 h-full box-border',

  'nova-header-title': [
    /* Prevent long titles overflowing and covering the search and menu buttons on narrow viewports. */
    'overflow-clip',
    /* Avoid clipping focus ring around link inside title wrapper. */
    'p-1 -m-1',
    'min-w-0',
    'flex',
  ],

  'nova-header-search': 'flex print:hidden md:flex-1 md:max-w-60',

  'nova-header-actions': 'hidden md:flex print:hidden items-center gap-2',

  'nova-code-copy-button':
    'size-6 absolute right-2 top-2 m-0 p-1 transition rounded border-1 border-solid border-sl-gray-5 backdrop-blur-sm text-black dark:text-white active:scale-90 bg-gray-100/30 dark:bg-gray-600/30 hover:bg-gray-200/50 hover:dark:bg-gray-500/50',

  'nova-code-copy-button-icon-clipboard':
    'w-full h-full block i-lucide-clipboard',
  'nova-code-copy-button-icon-check': 'w-full h-full block i-lucide-check',

  'nova-code-container':
    'relative [&_.nova-code-copy-button]:opacity-0 [&:hover_.nova-code-copy-button]:opacity-100',

    'nova-theme-select': "size-8 p-2 rounded-md color-[var(--sl-color-text)] hover:bg-gray-400/30 transition-colors",

    "nova-social-icons-link": "flex p-2 transition hover:bg-gray-400/30 rounded-md size-8 color-[var(--sl-color-text)]", 
}

const css = String.raw

const preflight = css`
  :root {
    --sl-content-width: 50rem;
  }

  /* Dark mode Starlight theme variables. */
  :root {
    --sl-color-white: white;
    --sl-color-gray-1: ${colors.gray[200]};
    --sl-color-gray-2: ${colors.gray[300]};
    --sl-color-gray-3: ${colors.gray[400]};
    --sl-color-gray-4: ${colors.gray[600]};
    --sl-color-gray-5: ${colors.gray[700]};
    --sl-color-gray-6: ${colors.gray[800]};
    --sl-color-black: ${colors.gray[950]};
    --sl-color-accent-low: ${colors.gray[950]};
    --sl-color-accent: ${colors.gray[600]};
    --sl-color-accent-high: ${colors.gray[100]};
  }

  /* Light mode Starlight theme variables */
  :root[data-theme='light'] {
    --sl-color-white: ${colors.gray[900]};
    --sl-color-gray-1: ${colors.gray[800]};
    --sl-color-gray-2: ${colors.gray[700]};
    --sl-color-gray-3: ${colors.gray[500]};
    --sl-color-gray-4: ${colors.gray[400]};
    --sl-color-gray-5: ${colors.gray[300]};
    --sl-color-gray-6: ${colors.gray[200]};
    --sl-color-gray-7: ${colors.gray[100]};
    --sl-color-black: white;
    --sl-color-accent-low: ${colors.gray[200]};
    --sl-color-accent: ${colors.gray[800]};
    --sl-color-accent-high: ${colors.gray[900]};
  }

  /* Style the Markdown heading links. */
  .sl-markdown-content
    :is(h1, h2, h3, h4, h5, h6):not(:where(.not-content *))
    > a {
    color: var(--sl-color-white);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const config: UserConfig = defineConfig({
  presets: [
    presetWind3({
      variablePrefix: 'nova-',
      preflight: true,
    }),
    presetIcons(),
    presetAnimations(),
  ],
  shortcuts: [internalShortcut, shortcut],
  cli: {
    entry: [
      {
        patterns: ['./src/**/*.{astro,ts}'],
        outFile: './lib/styles.gen.css',
      },
    ],
  },
  theme: {
    breakpoints: {
      // Match Starlight breakpoints
      // https://github.com/withastro/starlight/blob/893be3b4a106ab75b706142bbd06b00268ccc298/packages/starlight/style/util.css#L22-L43
      sm: '30rem',
      md: '50rem',
      lg: '72rem',
      xl: '90rem',
      '2xl': '120rem',
    },
  },
  preflights: [{ getCSS: () => preflight }],
})

export default config
