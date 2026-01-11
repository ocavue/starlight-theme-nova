export interface NavItem {
  /**
   * The visible label for this item in the navigation. It could be a string or
   * a record of strings with the language code as the key.
   */
  label: string | Record<string, string>
  /**
   * The link to this item’s content. It could be a string or a record of
   * strings with the language code as the key.
   */
  href: string | Record<string, string>
}

export interface ThemeNovaOptions {
  nav?: NavItem[]

  /**
   * `starlight-theme-nova` supports two styling systems: pure CSS and Tailwind
   * CSS.
   *
   * By default, `starlight-theme-nova` will detect if Tailwind CSS is passed to
   * the Astro config, and use Tailwind CSS if it is. You can also force the
   * theme to use a specific styling system by setting the `stylingSystem`
   * option to `css` or `tailwind`.
   *
   * Check https://docs.astro.build/en/guides/styling/#tailwind for how to add
   * Tailwind CSS to your Astro project.
   * 
   * @default "detect"
   */
  stylingSystem?: 'css' | 'tailwind' | 'detect'
}

/**
 * @internal
 */
export interface ConfigSerialized {
  nav?: NavItem[]
  rootHref: string
}
