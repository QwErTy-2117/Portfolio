# Portfolio Polish & Refactor Design

## Goal
Refine the portfolio UI to feel professional, cohesive, and production-ready — improving layout, spacing, animations, consistency, and fixing visual issues.

## Design Decisions

### Accent Color
- Keep `#ff5941` (vibrant red-orange) as used in all existing components
- Update DESIGN.md to match

### Navigation Bar
- Floating glassmorphism pill: `bg-white/80 backdrop-blur-md`, `border border-black/5`, `shadow-sm`
- Positioned `top-6` with horizontal margin from page edges
- Three nav links (Home, Projects, About) horizontally centered
- "Contact Me" pill button on the right, visually separated with `ml-auto`
- Active page highlighted (`text-black font-medium`)
- Non-active links: `text-neutral-500 hover:text-black`

### Marquee Section — Refined Isometric Tilt
- Keep `rotateX(45deg) rotateY(-15deg) rotateZ(35deg)` perspective
- Fix clipping: wrap tilted container in `overflow-hidden` parent, ensure no horizontal scrollbars
- Increase section height slightly to prevent card cut-off
- Add white gradient overlays on left/right edges for fade-in/out
- Keep scroll-aware direction and slowdown-on-hover behaviors

### Layout & Overflow
- Add `overflow-x-clip` to the root scrolling container
- Standardize content width: `max-w-3xl` with `px-6 sm:px-8` on all pages
- Unify about page and project detail page layouts with home page

### Micro-interactions
- Standard easing: `[0.16, 1, 0.3, 1]`
- Consistent `duration-200` on all interactable elements
- Pill-button style for all contact CTAs
