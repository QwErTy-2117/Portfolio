# Portfolio Rebuild — Design Spec

## Overview

Complete rebuild of the portfolio website for **Luca Garofolo**. Remove all old demo pages and scaffolding (keep project config). Deliver a minimalistic, modern, elegant yet playful single-page portfolio with black/white/orange (`#ff5941`) palette.

## Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#fefefe` | Page background (warm off-white) |
| `--foreground` | `#000` | Body text |
| `--accent` | `#ff5941` | Highlight color, primary accent (vivid orange) |

## Typography

- **Calendas Plus** — headings (`font-calendas`), weight 500, via `next/font/google`
- **Overused Grotesk** — body (`font-overusedGrotesk`), weight 400, via `next/font/google`
- Headings: `tracking-tight`

## Pages & Routes

### `/` — Home (loading + hero + about + projects + contact + footer)

1. **Loading Screen** (full-screen, black bg, 2.5s)
   - TextRotate component shows one random quote from a curated list
   - Spring-based intro (`y: "100%" → 0`) and outro (`y: "-120%"`)
   - Auto-transitions to main content

2. **Hero Section**
   - "hey there," / "meet" text
   - TextRotate cycles: "Luca Garofolo" → "a developer ⚡" → "a designer ✽" → "a dreamer ✦" → "a creator 🚀"
   - Orange `#ff5941` pill background on rotating text
   - Spring animations, 2.2s rotation interval

3. **About Section** (via TextHighlighter)
   - 2-3 paragraphs about Luca with orange `#ff5941` highlight on key phrases
   - Spring transition, triggers on scroll (once, 30% visibility)
   - Lenis smooth scrolling

4. **Featured Projects Marquee** (via MarqueeAlongSvgPath)
   - Curved SVG path with project images
   - Draggable, hover slowdown, responsive
   - Click → navigates to `/projects/[slug]`

5. **Contact Section**
   - Brief contact CTA
   - Email/social links

6. **Sticky Footer**
   - Large "Luca" text in `#ff5941` bottom-left
   - Two link columns: pages (Home, Projects, About) and social (GitHub, Instagram, LinkedIn)
   - White bg, `z-0`, sticks at bottom behind scrollable content

### `/about` — About Page

- Lenis smooth-scroll container (same pattern as text-highlighter demo)
- TextHighlighter paragraphs about Luca's background, skills, philosophy
- Orange `#ff5941` highlights on key phrases
- Rounded image of Luca floated within content
- Bottom fade gradient

### `/projects/[slug]` — Project Detail Page

- **Top section**: ParallaxFloating image grid with images rotating around center "My Project" title
- **Bottom section**: TextHighlighter detailed project description
- Rounded corner images
- "Learn more about me →" link to `/about`

### Navigation

- Fixed top navbar, minimalistic
- Left: Home | Projects | About
- Right: Contact Me button (orange `#ff5941` outline/pill)
- Rounded corners, separated from browser edges
- Transparent/semi-transparent bg, subtle bottom border

### Route cleanup

- Remove all old demo routes: `/text-highlighter`, `/weekly-mix`, `/media-chair`, `/gravity-demo`, `/typewriter-demo`, `/text-along-path`, `/scramble-hover`, `/text-rotate`, `/text-rotate-quotes`, `/portfolio-demo`
- Replace home page (`app/page.tsx`) with new portfolio
- Add `/about` and `/projects/[slug]` routes

## Components Needed

### From fancycomponents.dev registry (install via shadcn)

- `marquee-along-svg-path` — project images carousel
- `parallax-floating` — project page image grid

### Already installed

- `text-rotate` — hero name/title rotation
- `text-highlighter` — about section highlights
- `simple-marquee` — (keep as fallback)

### To build

- Navbar component
- Loading screen wrapper
- Contact section
- Sticky footer
- Project data (static)

## Animation & Effects

- **Loading screen**: TextRotate with spring intro/outro (stiffness 400, damping 30)
- **Hero**: Fade-up motion on mount (duration 0.8s, ease [0.16, 1, 0.3, 1])
- **TextHighlighter**: Spring (duration 1, bounce 0, delay 0.4), triggers on scroll `{ once: true, amount: 0.3 }`
- **Marquee**: 8 base velocity, hover slowdown, draggable
- **Parallax floating**: Mouse-driven parallax with depth layers
- **Lenis**: Smooth scrolling on all content pages, 1.2s duration

## Dependencies

All already in `package.json`:
- `motion` ^12.40.0 (animations)
- `lenis` ^1.3.23 (smooth scroll)
- `next` 16.2.6
- `react` 19.2.4
- `tailwindcss` ^4

Need to install:
- `@fancy/marquee-along-svg-path`
- `@fancy/parallax-floating`
- `calendas` font (via next/font/google)
- `overused-grotesk` font (via next/font/google)

## Implementation Checklist

1. Install fonts (Calendas, Overused Grotesk) in layout.tsx and globals.css
2. Install fancy components: marquee-along-svg-path, parallax-floating
3. Update globals.css with black/white/orange palette
4. Create Navbar component
5. Create LoadingScreen component
6. Rewrite app/page.tsx with hero, about, marquee, contact, footer
7. Create app/about/page.tsx
8. Create app/projects/[slug]/page.tsx
9. Remove old demo pages
10. Update layout.tsx with Navbar
