# Mobile Gate — Design Spec

## Problem

Visitors opening this portfolio on a mobile device see a desktop-oriented layout that isn't optimized for small screens. Instead of showing a broken or cramped experience, mobile users should see a single screen with a playful message that matches the brand's loading screen aesthetic.

## Solution

A `MobileGate` component that renders exclusively on mobile viewports (`xs` and `sm` breakpoints, i.e. below 768px). It displays the message:

> "Nice phone. This portfolio needs a bigger screen. See you on desktop."

...animated character-by-character with the same blur/stagger effect used by the existing `LoadingScreen`. On desktop (`md` and above), the normal site renders unchanged.

## Component: `MobileGate`

- **File:** `components/mobile-gate.tsx`
- **Rendering:** Full-screen (`fixed inset-0`), white background, `z-index: 50`
- **Centering:** `flex items-center justify-center`, max-width constrained text container
- **Animation:** `TextRotate` with same config as loading screen:
  - `splitBy: "characters"`
  - `initial: { filter: "blur(20px)", opacity: 0 }`
  - `animate: { filter: "blur(0px)", opacity: 1 }`
  - `staggerFrom: "random"`, `staggerDuration: 0.01`
  - No loop, no auto-rotate — plays once
- **No dismiss mechanism** — the message persists indefinitely

## Integration: `app/layout.tsx`

- Import `useScreenSize` hook (`hooks/use-screen-size.ts`)
- If screen is `xs` or `sm` → render `<MobileGate />` instead of standard layout
- If `md` or larger → render Navbar + PageTransition + children as normal
- The hook fires on resize, so rotating to landscape on a device that crosses 768px would show the desktop site (acceptable behavior)

## Files changed

| File | Action |
|------|--------|
| `components/mobile-gate.tsx` | Create |
| `app/layout.tsx` | Edit — add mobile detection and conditional render |

## Non-goals

- No responsive layout adaptation for mobile
- No dismiss/escape hatch
- No mobile navigation or alternate UI
