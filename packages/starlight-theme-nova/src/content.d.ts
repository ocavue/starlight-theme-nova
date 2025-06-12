/**
 * This file contains some types by simplifying and modifying the generated
 * files `.astro/content.d.ts`.
 *
 * Normally, Astro will generate a `.astro/content.d.ts` file for an Astro app
 * project. However, since starlight-theme-nova is a library instead of an app,
 * we don't have those auto-generated files.
 */

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
