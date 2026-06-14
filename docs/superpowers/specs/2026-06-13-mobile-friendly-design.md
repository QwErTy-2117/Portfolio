# Mobile-Friendly Design

Date: 2026-06-13

## Goal

Make the portfolio website fully usable and visually coherent on all mobile devices (320px+), maintaining the existing design intent and animations where possible, while simplifying or adjusting sections that break at narrow viewports.

## Approach

Incremental responsive fix-up — add/refine responsive Tailwind classes section-by-section. No structural re-architecting. Base styles target desktop; overrides at `sm:` (640px) and below handle mobile.

## Sections

### Navbar
**Problems:** Fixed centered nav pill and fixed "Contact Me" button at `top-8 right-8` overlap on small screens.
**Fix:** On `<sm`, shrink nav pill padding, shrink contact button. Move contact button below the nav bar vertically (e.g. `top-24`) to avoid overlap.

### Hero Section
**Problems:** `text-6xl` (~60px) headings are large for 320px. TextRotate phrases may overflow.
**Fix:** Reduce base heading sizes at small breakpoints. Ensure TextRotate container has `overflow-hidden` and `max-w-full`. CTA buttons already wrap naturally.

### Marquee / Projects Section
**Problems:** 3D perspective transform (`rotateX(45deg) rotateY(-15deg) rotateZ(35deg)`) on `w-[150%]` makes cards tiny and distorted on mobile. Section `h-[700px]` is excessive. Edge blur gradients `w-96` (384px) cover most of a 320px screen.
**Fix:** Remove 3D transform on mobile. Use flat horizontal scroll row instead. Reduce section height to `h-[400px]` on small screens. Shrink edge gradients to `w-16` on mobile.

### Services Section
**Problems:** Three SVG path texts with `viewBox="0 0 1000 600"` and hardcoded bezier curves don't scale to narrow viewports.
**Fix:** On mobile, replace SVG path text with simple stacked centered `<p>` elements, keeping the same color/style hierarchy. Keep scroll-reveal as a basic fade-in. Desktop retains the SVG path animations.

### About Page — Gravity Physics
**Problems:** MatterBody pills at `x/y` percentages (e.g. `x="75%"`) go off-screen on narrow viewports. `px-6 py-3` makes some pills too wide.
**Fix:** Adjust MatterBody `x` positions to stay within visible bounds (max `x="60%"` on mobile). Reduce pill padding to `px-4 py-2` on small screens.

### Footer (All Pages)
**Problems:** Side-by-side link lists with `space-x-12` and `text-[80px]` Luca watermark cause overflow on 320px.
**Fix:** Stack link lists vertically (`flex-col`) on mobile. Reduce Luca text to `text-[48px]` or `text-[60px]`. Adjust footer padding and height.

### Projects Page — Stacking Cards
**Problems:** Card padding `px-8 py-10` and 3D-like styling may be tight on small screens.
**Fix:** Reduce padding to `px-4 py-6` on mobile. Shrink title to `text-xl`. Layout already uses `flex-col sm:flex-row` and `w-11/12` which are responsive.

### Project Detail Page
**Problems:** Minor spacing/tightness at 320px.
**Fix:** Mostly OK as-is. Ensure padding/margins hold at smallest breakpoint.

## Files to Modify

- `app/page.tsx` — hero, marquee, services, footer
- `app/about/page.tsx` — gravity pill positions and sizing
- `app/projects/page.tsx` — stacking card padding, footer
- `app/projects/[slug]/page.tsx` — spacing tweaks
- `components/navbar.tsx` — mobile layout
