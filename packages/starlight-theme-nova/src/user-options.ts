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
}

/**
 * @internal
 */
export interface ConfigSerialized {
  nav?: NavItem[]
  rootHref: string
}
