export interface NavItem {
  label: string | Record<string, string>
  href: string
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
