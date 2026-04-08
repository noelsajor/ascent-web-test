# UI & UX Standards

This project utilizes a conversion-focused design system. When replicating or extending this architecture, maintain these strict user interface (UI) and user experience (UX) guidelines.

## 1. Visual Hierarchy & Conversion

### The "F-Pattern" Scanning
Users scan screens in an F-pattern. 
- Primary value propositions must be top-left (or top-center on mobile).
- Primary Call to Action (CTA) must stand out with highest contrast against the background and sit in the top right (navigation) and directly under the hero text.

### Frictionless Forms
- Limit forms (`contact.astro`) to 3-5 fields maximum.
- Use `type="email"` for email fields and `type="tel"` for phone fields to trigger correct mobile keyboards.
- Remove captcha puzzles if possible, opting for invisible honeypots.

## 2. Accessibility (WCAG 2.1 AA Compliance)

A site that isn't accessible is penalizable by SEO and excludes users.
- **Color Contrast**: Ensure text has a contrast ratio of at least `4.5:1` against its background. Verify the footer and subtitle text carefully.
- **Interactive Elements**: Every `<a>` and `<button>` must have an `aria-label` if the text isn't explicitly clear (e.g., social media icon links).
- **Focus States**: Do **not** apply `outline: none;` without providing an alternative focus state. Keyboard navigators rely on this.
  ```css
  /* Good Practice */
  a:focus-visible, button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  ```

## 3. Responsive Breakpoints Strategy

Adopt a strict Mobile-First approach. Write CSS for mobile by default, then scale up using `min-width` media queries in `src/styles/global.css`.

- **Mobile Default**: $< 768px$ (Single column stacks)
- **Tablet (`@media (min-width: 768px)`)**: $768px - 1024px$ (Two columns for grids)
- **Desktop (`@media (min-width: 1024px)`)**: $> 1024px$ (Multi-columns, complex layouts)
- **Ultra-Wide (`@media (min-width: 1440px)`)**: Max-width constraints on the `.container` class to prevent extreme stretching.

## 4. Typography & Spacing

### Font Scaling (Fluid Typography)
Avoid rigid pixel sizes. Use `rem` units for standard scaling, or `clamp()` for fluid fluid typography that adjusts to viewport width automatically.

```css
/* Example Fluid H1 */
h1 {
  font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
}
```

### Spacing Tokens
Always use CSS custom properties for padding and margins instead of arbitrary numbers to maintain rhythm.
```css
:root {
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
}
```

## 5. Micro-Interactions & Animations

Animations should guide the eye, not distract.
- **Hover States**: Apply subtle transforms (e.g., `transform: translateY(-2px)`) and fast transitions (`transition: 0.2s ease`) on interactive cards and buttons to make the site feel "alive".
- **Reveal Animations**: Scroll animations (currently handled by the vanilla `reveal.js` script) should be set to `opacity: 0` to `1` with a short upward transform. Avoid complex timing durations over `600ms`.
- **Prefers-Reduced-Motion**: Always respect user OS settings.
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
