import 'astro/client'
import '@astrojs/starlight'

declare module 'astro:content' {
  export interface RenderResult {
    Content: import('astro/runtime/server/index.js').AstroComponentFactory
  }
}

type ContentConfig = typeof import('./content.config.js')

type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T

export type StarlightRouteEntryData = import('astro/zod').infer<
  ReturnTypeOrOriginal<Required<ContentConfig['collections']['docs']>['schema']>
>
