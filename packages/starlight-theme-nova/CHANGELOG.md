# starlight-theme-nova

## 0.7.4

### Patch Changes

- abce0ab: Fix an issue where Nova styles were not being applied after user `@astrojs/starlight-tailwind`.

## 0.7.3

### Patch Changes

- becc4aa: Update dependencies.
- Updated dependencies [becc4aa]
  - shiki-twoslash-renderer@0.0.4

## 0.7.2

### Patch Changes

- 9d154c3: Adjust inline code background color inside asides.

## 0.7.1

### Patch Changes

- 0f9c6f1: Fix a bug where the code blocks have double borders.

## 0.7.0

### Minor Changes

- f902875: Groups all of the Nova theme CSS declarations into a single `nova` [cascade layer](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers).

## 0.6.1

### Patch Changes

- 2f3d2cb: Update twoslash renderer colors.
- Updated dependencies [2f3d2cb]
  - shiki-twoslash-renderer@0.0.3

## 0.6.0

### Minor Changes

- 43c9c80: Improve button active animations.
- 43c9c80: Decrease heading font size.

## 0.5.0

### Minor Changes

- 1a954fd: Support the new `social` configuration syntax for Starlight v0.33.0.

  See the Starlight changelog for details: https://github.com/withastro/starlight/blob/cf3cec1b/packages/starlight/CHANGELOG.md#0330

## 0.4.0

### Minor Changes

- 0dd1733: Add `<CodeFile>` component to display code from local files.

## 0.3.0

### Minor Changes

- effb232: Now you can add a title to your code blocks.

  ````md
  ```ts title="index.ts"
  function foo() {
    console.log('Hello, world!')
  }
  ```
  ````

## 0.2.1

### Patch Changes

- 0c1d7a0: Update the icons in the theme select button.

## 0.2.0

### Minor Changes

- dc83307: Add the ability to override some components from the theme.

  For example, if you don't like the `<ThemeSelect>` component provided by the theme (perhaps you prefer to have an "auto" option), you can override it to Starlight's default.

  ```js
  // astro.config.mjs
  import { defineConfig } from 'astro/config'
  import starlight from '@astrojs/starlight'
  import starlightThemeNova from 'starlight-theme-nova'

  export default defineConfig({
    integrations: [
      starlight({
        plugins: [starlightThemeNova()],
        components: {
          // Note: To override `<ThemeSelect>` you also need to override `<ThemeProvider>`.
          ThemeProvider: '@astrojs/starlight/components/ThemeProvider.astro',
          ThemeSelect: '@astrojs/starlight/components/ThemeSelect.astro',
        },
        // ...
      }),
    ],
  })
  ```

## 0.1.1

### Patch Changes

- 0cfd165: Update search styles.

## 0.1.0

### Minor Changes

- 27becd4: Release v0.1.0.
