declare module 'virtual:starlight-theme-nova/user-config' {
  const config: import('./user-options').ConfigSerialized
  export default config
}
declare module 'virtual:starlight/components/Search' {
  const Search: typeof import('./components/Search.astro').default
  export default Search
}
declare module 'virtual:starlight/components/SiteTitle' {
  const SiteTitle: typeof import('./components/SiteTitle.astro').default
  export default SiteTitle
}
declare module 'virtual:starlight/components/SocialIcons' {
  const SocialIcons: typeof import('./components/SocialIcons.astro').default
  export default SocialIcons
}
declare module 'virtual:starlight/components/ThemeSelect' {
  const ThemeSelect: typeof import('./components/ThemeSelect.astro').default
  export default ThemeSelect
}
declare module 'virtual:starlight/components/LanguageSelect' {
  const LanguageSelect: typeof import('./components/LanguageSelect.astro').default
  export default LanguageSelect
}
declare module 'virtual:starlight/components/MobileMenuFooter' {
  const MobileMenuFooter: typeof import('./components/MobileMenuFooter.astro').default
  export default MobileMenuFooter
}
