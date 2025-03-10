import 'astro/client'
import '@astrojs/starlight'

// This is a workaround to avoid type checking errors.
declare module 'astro:content' {
  export interface RenderResult {
    Content: {
      isAstroComponentFactory?: boolean
    }
  }
}
