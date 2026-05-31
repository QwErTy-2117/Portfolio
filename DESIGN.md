# Design System

## Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#fefefe` / `oklch(1 0 0)` | Page background (warm off-white) |
| `--foreground` | `#000` / `oklch(0.145 0 0)` | Body text |
| `--accent` | `#ff5941` | Highlight color, primary accent (vibrant red-orange) |

Primary in `globals.css` is already close to `#ff5941` (`oklch(0.555 0.163 48.998)`).

## Typography

### Calendas Plus
- **Usage**: Headings (`font-calendas`)
- **Style**: Elegant serif, slightly condensed, warm character
- **Setup**: Add via `next/font/google` — available on Google Fonts as **Calendas**. Or self-host from source.
- **Weight used**: `500` (medium)

```ts
// layout.tsx
const calendas = Calendas({ subsets: ["latin"], variable: "--font-calendas" })
```
```css
/* globals.css */
@theme inline {
  --font-calendas: var(--font-calendas);
}
```

### Overused Grotesk
- **Usage**: Body text (`font-overusedGrotesk`)
- **Style**: Modern sans-serif, geometric grotesk (similar to SF Pro / Helvetica Neue)
- **Setup**: Self-host or add via `next/font/google` as **Overused Grotesk** (available on Google Fonts) or download from [github.com/RandomMaerks/Overused-Grotesk](https://github.com/RandomMaerks/Overused-Grotesk)
- **Weight used**: `400` (regular)

```ts
// layout.tsx
const overused = Overused_Grotesk({ subsets: ["latin"], variable: "--font-overused-grotesk" })
```
```css
/* globals.css */
@theme inline {
  --font-overused-grotesk: var(--font-overused-grotesk);
}
```

### Tracking / Letter-spacing
- Headings: `tracking-tight`

## Layout & Spacing

- **Content max-width**: `max-w-md` (~448px)
- **Horizontal padding**: `px-4`
- **Top offset**: `mt-40` (headings from top)
- **Bottom padding**: `pb-64`
- **Paragraph spacing**: `space-y-4`
- **Line height**: `leading-normal`

## Effects & Animation

### Smooth Scrolling (Lenis)
```ts
import Lenis from "lenis"

const lenis = new Lenis({
  autoRaf: true,
  duration: 1.2,
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  touchMultiplier: 2,
})
```

### Text Highlight (TextHighlighter)
Uses `@/components/fancy/text/text-highlighter` from fancycomponents.

| Prop | Value |
|------|-------|
| `transition` | `{ type: "spring", duration: 1, delay: 0.4, bounce: 0 }` |
| `highlightColor` | `#F2AD91` |
| `useInViewOptions` | `{ once: true, initial: true, amount: 0.1 }` |
| `className` | `rounded-[0.3em] px-px` |

Triggered on scroll (`triggerType: "inView"` by default). Animates a background highlight from left to right.

## Bottom Fade Gradient
```tsx
<div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-50% via-[#fefefe]/50 to-transparent pointer-events-none isolate" />
```
Creates a smooth fade-out at the bottom of scrollable content.

## Implementation Checklist

1. Install font packages (calendas, overused-grotesk)
2. Add `--font-calendas` and `--font-overused-grotesk` to `@theme inline {}` in `globals.css`
3. Load fonts in `layout.tsx` via `next/font/google`
4. Classnames: `font-calendas` for headings, `font-overusedGrotesk` for body (Tailwind uses kebab-case: `font-calendas`, `font-overused-grotesk`)
5. Install `lenis` for smooth scrolling
