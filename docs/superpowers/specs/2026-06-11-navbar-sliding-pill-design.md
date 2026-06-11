# Navbar Sliding Pill + Page Transitions

## Goal
Replicate phantom.land's navigation style: glassmorphism pill navbar with a sliding white indicator for the active link, plus full-screen page transition animations.

## Design

### 1. Navbar (components/navbar.tsx)
- **Position**: Keep `fixed top-8 left-1/2 -translate-x-1/2 z-50` (top, centered)
- **Style**: Pill shape (`rounded-full`), `bg-white/30 backdrop-blur-lg border border-white/10`
- **Sliding indicator**: Use motion `layoutId="indicator"` on a `motion.div` rendered inside the active `<Link>`'s wrapper. Each link wrapper is `relative z-10` so the pill positions behind the text.
  - Active indicator: white pill (`bg-white rounded-full absolute inset-0 -z-10`)
  - Inactive links: `text-neutral-500` with hover → `text-black`
  - Active links: `text-black`
- **Contact Me button**: Keep as separate `fixed top-8 right-8` element (unchanged)
- **Inactive link colors**: Use `text-neutral-500/70 hover:text-white` on dark-background pages (`/projects`), `text-neutral-500 hover:text-black` on light-background pages — preserves readability across both backgrounds

### 2. Page Transitions (components/page-transition.tsx + app/layout.tsx)
- Create a client component `PageTransition` that uses `usePathname()` and wraps children with `AnimatePresence mode="wait"`
- Transition: fade + slight vertical slide
  - Exit: `opacity: 0, y: -10`
  - Enter: `opacity: 1, y: 0`
  - Duration: 0.3s, easeInOut
- The nav bar and theme provider remain mounted during transitions

## Component Changes

### Modified: `components/navbar.tsx`
- Remove the conditional `pathname === "/projects"` text color logic
- Each link gets a relative wrapper with the layoutId indicator inside it
- Simplify: single unified text color scheme (black active, neutral-500 inactive)

### New: `components/page-transition.tsx`
- Client component (`"use client"`)
- Uses `usePathname()` and `AnimatePresence mode="wait"`
- Wraps children with a `motion.div` keyed on pathname

### Modified: `app/layout.tsx`
- Import and wrap `{children}` with `PageTransition` inside the `<body>`

## Files Changed
1. `components/navbar.tsx` — sliding pill indicator, simplified text colors
2. `components/page-transition.tsx` — new file, AnimatePresence wrapper
3. `app/layout.tsx` — add PageTransition wrapper
