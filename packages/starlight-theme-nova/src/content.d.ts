declare module 'astro:content' {
  export interface RenderResult {
    Content: import('astro/runtime/server/index.js').AstroComponentFactory
    headings: import('astro').MarkdownHeading[]
    remarkPluginFrontmatter: Record<string, any>
  }
  interface Render {
    '.md': Promise<RenderResult>
  }

  export interface RenderedContent {
    html: string
    metadata?: {
      imagePaths: Array<string>
      [key: string]: unknown
    }
  }
}

declare module 'astro:content' {
  type Flatten<T> = T extends { [K: string]: infer U } ? U : never

  export type CollectionKey = keyof AnyEntryMap
  export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>

  export type ContentCollectionKey = keyof ContentEntryMap
  export type DataCollectionKey = keyof DataEntryMap

  type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T
  type InferEntrySchema<C extends keyof AnyEntryMap> =
    import('astro/zod').infer<
      ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
    >

  type DataEntryMap = {
    docs: Record<
      string,
      {
        id: string
        body?: string
        collection: 'docs'
        data: InferEntrySchema<'docs'>
        rendered?: RenderedContent
        filePath?: string
      }
    >
  }

  type AnyEntryMap = DataEntryMap

  import { docsLoader } from '@astrojs/starlight/loaders'
  import { docsSchema } from '@astrojs/starlight/schema'
  import { defineCollection } from 'astro:content'

  const collections = {
    docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  }

  const content = {
    collections,
  }

  export type ContentConfig = typeof content
}
