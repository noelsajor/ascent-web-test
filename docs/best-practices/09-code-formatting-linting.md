# 09 Code Formatting & Linting Standards

When deploying AI agents to write code or collaborating with multiple developers, code style can quickly degrade. You must adhere to strict formatting rules so the codebase remains legible and maintainable.

## 1. General Formatting Rules 

All code additions must respect the following standards. (If using an AI Agent like Cursor, explicitly instruct it to conform to these rules):

- **Indentation**: 2 spaces (No tabs).
- **Quotes**: Use single quotes (`'`) for JavaScript/TypeScript strings. Use double quotes (`"`) for JSX/Astro HTML attributes.
- **Semicolons**: Always use semicolons at the end of JavaScript statements.
- **Trailing Commas**: Always use trailing commas in multiline objects and arrays (ES5 standard) to keep Git diffs clean.
- **Line Length**: Max 100 characters per line for logic. It is acceptable to exceed this in HTML/Astro templates if breaking the line makes the DOM structure harder to read.

## 2. Astro Specific Rules

Astro files (`.astro`) combine HTML, CSS, and JS/TS. Keeping them organized is crucial.

- **Frontmatter Fence (`---`)**: 
  - Imports must be at the absolute top.
  - Component variable assignments go beneath imports.
  - Leave one empty line before the closing `---` fence.
- **Component Props**: Always define an `interface Props` to strictly type the data your component expects, even if it is not a `.ts` file explicitly.
- **No Inline Styles**: Avoid `<div style="...">` unless calculating a purely dynamic value (e.g., `style={{ width: `${progress}%` }}`). All static styling belongs in the scoped `<style>` block.

## 3. CSS Conventions

- **Variable Access**: Use the global custom properties defined in `src/styles/global.css` for any colors, spacing, or typography. 
  - *Incorrect*: `color: #FF5733;`
  - *Correct*: `color: var(--color-primary);`
- **Class Naming**: Prefer descriptive, layout-based class names (e.g., `.feature-grid`, `.hero-text-wrapper`). Because CSS is scoped to the component in Astro, you do not need complex BEM (`.hero__wrapper--dark`) methodologies.

## 4. Console Logging

- Under no circumstances should `console.log()`, `console.warn()`, or `console.error()` be left inside the source code when opening a Pull Request or pushing to `main`. 
- Clean up all debugging artifacts before completing a task.
