import { presetWind3, defineConfig, type UserConfig, presetIcons } from 'unocss'
import { colors } from 'unocss/preset-mini'
import { presetAnimations } from 'unocss-preset-animations'

const shortcut = {
  'nova-page-frame': 'flex flex-col min-h-screen',

  'nova-page-frame-header': [
    'box-border border-b-1 border-solid border-0 border-sl-hairline',
    'backdrop-blur bg-sl-bg-nav',
    'w-full fixed inset-0',
    'h-[--sl-nav-height] z-[--sl-z-index-navbar]',
    'py-[--sl-nav-pad-y] px-[--sl-nav-pad-x] max-md:[[data-has-sidebar]_&]:pe-[calc(var(--sl-nav-gap)+var(--sl-nav-pad-x)+var(--sl-menu-button-size))]',
  ],

  'nova-site-title': '[&_*]:text-sl-text [&_*]:font-semibold [&_*]:text-lg',

  'nova-header': 'flex items-center gap-2 h-full box-border',

  'nova-header-title': [
    /* Prevent long titles overflowing and covering the search and menu buttons on narrow viewports. */
    'overflow-clip',
    /* Avoid clipping focus ring around link inside title wrapper. */
    'p-1 -m-1',
    'min-w-0',
    'flex',
  ],

  'nova-header-nav':
    'flex flex-row flex-1 gap-4 xl:gap-6 pl-4 xl:pl-6 pr-4 text-sm font-medium max-md:[&_*]:hidden overflow-x-auto',

  'nova-header-nav-link': 'no-underline text-sl-gray-3 hover:text-sl-white',

  'nova-header-search': 'flex print:hidden md:flex-1 md:max-w-60',

  'nova-header-actions': 'hidden md:flex print:hidden items-center gap-2',

  'nova-code-copy-button':
    'size-6 absolute right-2 top-2 m-0 p-1 transition rounded border-1 border-solid border-sl-gray-5 backdrop-blur-sm text-black dark:text-white active:scale-90 bg-gray-100/30 dark:bg-gray-600/30 hover:bg-gray-200/50 hover:dark:bg-gray-500/50',

  'nova-code-copy-button-icon-clipboard':
    'w-full h-full block i-lucide-clipboard',
  'nova-code-copy-button-icon-check': 'w-full h-full block i-lucide-check',

  'nova-code-title':
    'border-b-1 border-b-solid px-4 py-2 border-b-sl-gray-5 font-mono font-semibold text-sm bg-sl-bg hidden [div[data-nova-code-container][data-nova-code-title]_&]:block',

  'nova-code-container':
    'relative [&_.nova-code-copy-button]:opacity-0 [&:hover_.nova-code-copy-button]:opacity-100',

  'nova-theme-select':
    'size-8 p-2 rounded-md text-sl-text hover:bg-gray-400/30 transition-colors',
  'nova-theme-select-icon-light': 'i-tabler-sun-high-filled',
  'nova-theme-select-icon-dark': 'i-tabler-moon-filled',

  'nova-social-icons-link':
    'flex p-2 transition hover:bg-gray-400/30 rounded-md size-8 text-sl-text',

  'nova-page-frame-sidebar-pane':
    'md:border-r border-0 border-solid border-sl-hairline',

  'nova-link-card': [
    'flex flex-col px-5 py-4 rounded-xl relative gap-2',
    'transition duration-200 shadow-sm hover:shadow-md',
    'border-1 border-solid border-sl-gray-5',
    'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
    'text-gray-700 dark:text-gray-200',
    'active:translate-x-1',
  ],

  'nova-link-card-link': [
    'inline-flex items-center justify-between no-underline font-semibold text-lg text-gray-700 dark:text-gray-200',

    /* a11y fix for https://github.com/withastro/starlight/issues/487 */
    "before:content-[''] before:absolute before:inset-0",
  ],

  'nova-link-card-icon':
    'i-lucide-arrow-right ml-2 size-5 transition-all [.nova-link-card:hover_&]:translate-x-1',

  'nova-link-button': [
    'inline-flex items-center justify-between px-6 py-3 rounded-xl me-2 mt-2 mb-2 gap-2',
    'transition duration-200 no-underline border-1 border-solid border-transparent',
    'font-medium',
    'active:translate-x-1',
  ],

  'nova-link-button-primary': [
    'bg-black hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-300',
    'shadow-sm hover:shadow-md',
    'text-white dark:text-gray-900',
  ],

  'nova-link-button-secondary': [
    'border-sl-gray-5',
    'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
    'shadow-sm hover:shadow-md',
    'text-gray-700 dark:text-gray-200',
  ],

  'nova-link-button-minimal': ['text-gray-700 dark:text-gray-200'],

  'nova-link-button-icon':
    'i-lucide-arrow-right size-5 transition-all [.nova-link-button:hover_&]:translate-x-1',

  'nova-pagination':
    'flex gap-2 justify-between flex-row items-stretch pt-0 pb-6 px-1 min-w-full',

  'nova-pagination-divider': 'flex-1',

  'nova-pagination-link': [
    'flex items-center justify-end p-2 rounded-xl m-0 gap-2',
    'text-sl-gray-2 hover:text-sl-white no-underline md:text-lg font-medium',

    'transition duration-100',
    'data-[side="left"]:active:-translate-x-1',
    'data-[side="right"]:active:translate-x-1',

    '[&[rel="prev"]]:flex-row-reverse',
    '[&[rel="next"]]:flex-row',
  ],
  'nova-pagination-link-icon-right':
    'min-w-5 min-h-5 transition block i-lucide-chevron-right',
  'nova-pagination-link-icon-left':
    'min-w-5 min-h-5 transition block i-lucide-chevron-left',

  'nova-mobile-table-of-contents':
    '[&_nav]:backdrop-blur [&_summary]:border-b-sl-hairline',
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

    --sl-color-bg-inline-code: ${colors.gray[800]};
    --sl-color-border-inline-code: ${colors.gray[700]};
    --sl-color-bg-nav: color-mix(in srgb, ${colors.gray[950]} 50%, transparent);

    --sl-color-orange-low: ${colors.amber[950]};
    --sl-color-orange: ${colors.amber[900]};
    --sl-color-orange-high: ${colors.amber[200]};

    --sl-color-green-low: ${colors.green[950]};
    --sl-color-green: ${colors.green[900]};
    --sl-color-green-high: ${colors.green[200]};

    --sl-color-blue-low: ${colors.blue[950]};
    --sl-color-blue: ${colors.blue[900]};
    --sl-color-blue-high: ${colors.blue[200]};

    --sl-color-purple-low: ${colors.purple[950]};
    --sl-color-purple: ${colors.purple[900]};
    --sl-color-purple-high: ${colors.purple[200]};

    --sl-color-red-low: ${colors.red[950]};
    --sl-color-red: ${colors.red[900]};
    --sl-color-red-high: ${colors.red[200]};

    --nano-color-highlight: var(--sl-color-gray-5);
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

    --sl-color-bg-inline-code: ${colors.gray[100]};
    --sl-color-border-inline-code: ${colors.gray[300]};
    --sl-color-bg-nav: color-mix(in srgb, ${colors.white} 80%, transparent);

    --sl-color-orange-low: ${colors.amber[100]};
    --sl-color-orange: ${colors.amber[400]};
    --sl-color-orange-high: ${colors.amber[800]};

    --sl-color-green-low: ${colors.green[100]};
    --sl-color-green: ${colors.green[400]};
    --sl-color-green-high: ${colors.green[800]};

    --sl-color-blue-low: ${colors.blue[100]};
    --sl-color-blue: ${colors.blue[400]};
    --sl-color-blue-high: ${colors.blue[800]};

    --sl-color-purple-low: ${colors.purple[100]};
    --sl-color-purple: ${colors.purple[400]};
    --sl-color-purple-high: ${colors.purple[800]};

    --sl-color-red-low: ${colors.red[100]};
    --sl-color-red: ${colors.red[400]};
    --sl-color-red-high: ${colors.red[800]};

    --nano-color-highlight: var(--sl-color-gray-6);
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
  shortcuts: [shortcut],
  cli: {
    entry: [
      {
        patterns: ['this_file_does_not_exist'],
        outFile: './lib/styles.gen.css',
      },
    ],
  },
  safelist: Object.keys(shortcut),
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
    colors: {
      'sl-text': 'var(--sl-color-text)',
      'sl-white': 'var(--sl-color-white)',
      'sl-gray-1': 'var(--sl-color-gray-1)',
      'sl-gray-2': 'var(--sl-color-gray-2)',
      'sl-gray-3': 'var(--sl-color-gray-3)',
      'sl-gray-4': 'var(--sl-color-gray-4)',
      'sl-gray-5': 'var(--sl-color-gray-5)',
      'sl-gray-6': 'var(--sl-color-gray-6)',
      'sl-black': 'var(--sl-color-black)',
      'sl-bg-nav': 'var(--sl-color-bg-nav)',
      'sl-hairline': 'var(--sl-color-hairline)',
      'sl-bg': 'var(--sl-color-bg)',
    },
  },
  preflights: [{ getCSS: () => preflight }],
})

export default config
