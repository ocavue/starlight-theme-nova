import {
  createShikiHighlighter,
  type ThemePresets,
} from '@astrojs/internal-helpers/shiki'
import type {
  LanguageRegistration,
  ShikiTransformer,
  ThemeRegistration,
  ThemeRegistrationRaw,
} from '@shikijs/types'
import { bundledLanguages } from 'shiki/langs'

type Theme = ThemePresets | ThemeRegistration | ThemeRegistrationRaw

export interface CodeHtmlOptions {
  /** The code to highlight. */
  code: string
  lang?: string | LanguageRegistration
  embeddedLangs?: string[]
  meta?: string
  theme?: Theme
  themes?: Record<string, Theme>
  defaultColor?: string | false
  wrap?: boolean | null
  inline?: boolean
  transformers?: ShikiTransformer[]
  /** Any other property is rendered as an attribute on the root code block element. */
  [attribute: string]: unknown
}

const CACHE_MAX_SIZE = 10_000

const cache = new Map<string, Promise<string>>()

/**
 * Highlights code in the same way as Astro's built-in `Code` component, with a
 * process-wide cache so that identical code blocks are only highlighted once
 * per build.
 */
export function renderCodeHtml(options: CodeHtmlOptions): Promise<string> {
  const key = getCacheKey(options)
  if (key == null) {
    return highlight(options)
  }
  let promise = cache.get(key)
  if (!promise) {
    if (cache.size >= CACHE_MAX_SIZE) {
      cache.clear()
    }
    promise = highlight(options)
    promise.catch(() => cache.delete(key))
    cache.set(key, promise)
  }
  return promise
}

/**
 * Returns undefined when the options cannot be cheaply and reliably
 * serialized (registration objects, or transformers without a `name`), in
 * which case the result is not cached. Transformers are keyed by name only,
 * so two transformers sharing a name must behave identically.
 */
function getCacheKey(options: CodeHtmlOptions): string | undefined {
  const {
    code,
    lang,
    embeddedLangs,
    meta,
    theme,
    themes,
    defaultColor,
    wrap,
    inline,
    transformers,
    ...attributes
  } = options
  if (lang != null && typeof lang !== 'string') {
    return undefined
  }
  if (theme != null && typeof theme !== 'string') {
    return undefined
  }
  for (const value of Object.values(themes ?? {})) {
    if (typeof value !== 'string') {
      return undefined
    }
  }
  const transformerNames: string[] = []
  for (const transformer of transformers ?? []) {
    if (!transformer.name) {
      return undefined
    }
    transformerNames.push(transformer.name)
  }
  return JSON.stringify([
    lang,
    embeddedLangs,
    meta,
    theme,
    themes,
    defaultColor,
    wrap,
    inline,
    transformerNames,
    attributes,
    code,
  ])
}

async function highlight(options: CodeHtmlOptions): Promise<string> {
  const {
    code,
    lang = 'plaintext',
    embeddedLangs = [],
    meta,
    theme = 'github-dark',
    themes = {},
    defaultColor = 'light',
    wrap = false,
    inline = false,
    transformers = [],
    ...attributes
  } = options

  // Shiki 1.0 compat, matching Astro's built-in `Code` component
  if (typeof lang === 'object') {
    const legacyLang = lang as LanguageRegistration & {
      id?: string
      grammar?: object
    }
    if (legacyLang.id) {
      legacyLang.name = legacyLang.id
    }
    if (legacyLang.grammar) {
      Object.assign(legacyLang, legacyLang.grammar)
    }
  }

  const highlighter = await createShikiHighlighter({
    langs: [
      typeof lang === 'string'
        ? Object.keys(bundledLanguages).includes(lang)
          ? lang
          : 'plaintext'
        : lang,
      ...embeddedLangs,
    ] as LanguageRegistration[],
    theme,
    themes,
  })

  return await highlighter.codeToHtml(
    code,
    typeof lang === 'string' ? lang : lang.name,
    {
      defaultColor,
      wrap,
      inline,
      meta,
      transformers,
      attributes: attributes as Record<string, string>,
    },
  )
}
