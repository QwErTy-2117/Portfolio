# Mobile-Friendly Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio fully usable on mobile devices (320px+) via responsive Tailwind classes and minimal structural tweaks.

**Architecture:** Five files modified section-by-section. No new components. Desktop experience unchanged — all changes scoped to `sm:` and lower breakpoints.

**Tech Stack:** Next.js 16, Tailwind CSS v4, motion/react, Lenis

---

### Task 1: Navbar — Mobile Layout

**Files:**
- Modify: `components/navbar.tsx`

- [ ] **Step 1: Shrink nav pill and move contact button on mobile**

```tsx
// components/navbar.tsx
// Change nav container top spacing on mobile
className={cn(
  "fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1 rounded-full backdrop-blur-xl",
  ...
)}
// Change nav link padding on mobile — add max-sm:px-3 max-sm:py-1.5 max-sm:text-sm
className={cn(
  "relative z-10 px-4 py-2 max-sm:px-3 max-sm:py-1.5 max-sm:text-sm font-overusedGrotesk rounded-[40px] transition-colors duration-200",
  ...
)}
// Change contact button container — move it below nav on mobile
// Change: fixed top-8 right-8  → fixed top-4 right-4 sm:top-8 sm:right-8
<div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50 w-fit h-fit inline-flex rounded-full overflow-hidden">
  ...
  // Also shrink contact button on mobile
  className="relative z-10 m-[1px] rounded-full bg-[#ff5941] text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-overusedGrotesk ..."
</div>
```

Edit to apply: add `max-sm:px-3 max-sm:py-1.5 max-sm:text-sm` to nav link classes; change nav `top-8` to `top-4 sm:top-8`; change contact button container from `top-8 right-8` to `top-4 right-4 sm:top-8 sm:right-8`; shrink contact button padding.

- [ ] **Step 2: Verify the navbar fits on 320px**

No test — visually verify that nav pills + contact button don't overlap. Run dev server and check.

- [ ] **Step 3: Commit**

```bash
git add components/navbar.tsx
git commit -m "fix: adjust navbar spacing for mobile screens"
```

---

### Task 2: Hero Section — Responsive Typography

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Reduce heading sizes and fix text-rotate overflow on mobile**

```tsx
// app/page.tsx line 194 — hero heading
// Change: text-6xl sm:text-7xl md:text-8xl
// To:     text-5xl sm:text-6xl sm:text-7xl md:text-8xl
<h1 className="text-5xl sm:text-6xl sm:text-7xl md:text-8xl font-calendas tracking-tight text-black leading-[0.9] mb-6 sm:mb-8 sm:mb-10">
  hey there,
</h1>

// Line 199 — text-rotate container
// Add max-sm:flex-col and max-sm:items-start to prevent overflow
<motion.div
  className="flex max-sm:flex-col max-sm:items-start whitespace-pre text-2xl sm:text-4xl md:text-6xl font-calendas tracking-tight text-black leading-[0.9]"
  layout
>

// Line 218 — text-rotate mainClassName — reduce padding on mobile
// Change: px-2 sm:px-2 md:px-3 → px-1.5 sm:px-2 md:px-3
mainClassName="text-white px-1.5 sm:px-2 md:px-3 bg-[#ff5941] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"

// Line 296-313 — CTA buttons — reduce padding on mobile
// "My Projects" button: px-6 py-3 → px-5 py-2.5 sm:px-6 sm:py-3 text-sm → text-xs sm:text-sm
<Link
  href="/projects"
  className="relative inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#ff5941] text-[#ff5941] font-overusedGrotesk text-xs sm:text-sm group overflow-hidden hover:text-white transition-colors duration-500"
>

// "Learn more about me" button: h-12 → h-10 sm:h-12, padding adjust
<Link
  href="/about"
  className="relative text-xs sm:text-sm font-medium rounded-full h-10 sm:h-12 p-1 ps-5 sm:ps-6 pe-12 sm:pe-14 group transition-all duration-500 ..."
>
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "fix: responsive hero typography and CTA buttons for mobile"
```

---

### Task 3: Marquee Section — Remove 3D Transform on Mobile

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Fix edge blur gradients and marquee layout on mobile**

```tsx
// Line 325-326 — Edge gradients: shrink from w-96 to w-16 on mobile
// And reduce height
<div className="absolute top-0 left-0 w-16 sm:w-96 h-full sm:h-[1200px] bg-gradient-to-r from-[#fefefe] to-transparent z-10 pointer-events-none" />
<div className="absolute top-0 right-0 w-16 sm:w-96 h-full sm:h-[1200px] bg-gradient-to-l from-[#fefefe] to-transparent z-10 pointer-events-none" />

// Line 319 — section height: h-[700px] → h-[400px] sm:h-[700px]
<div className="relative w-full overflow-x-clip h-[400px] sm:h-[700px] mb-16 sm:mb-52">

// Line 329 — 3D transform wrapper: remove 3D transform on mobile
// Replace the inline style with a conditional approach
// Remove the 3D transform from the style, apply only on sm+ via a class
<div
  className="absolute h-1/2 sm:h-full w-full sm:w-[150%] sm:-left-[25%] top-32 sm:top-56 flex flex-col space-y-2 sm:space-y-3 md:space-y-4"
  style={{}}
>
// Remove the transform style entirely on mobile by removing the inline style prop

// Line 320 — section title: reduce size on mobile
// text-3xl sm:text-5xl md:text-6xl → text-2xl sm:text-5xl md:text-6xl
<h2 className="absolute text-center text-2xl sm:text-5xl md:text-6xl top-[18%] sm:top-[22%] left-1/2 -translate-x-1/2 text-black font-calendas z-10">
```

Note: The 3D transform style is on line 332-333:
```
transform: "rotateX(45deg) rotateY(-15deg) rotateZ(35deg) translateZ(-200px)",
```
On mobile, we remove this by conditionally omitting the transform. Use a media-query-aware approach:
```tsx
// Add a useState for mobile detection or use CSS-only approach
// Since Tailwind can't set transform values conditionally in v4, use a simple CSS class approach:
// Add this to globals.css:
// @media (max-width: 639px) { .marquee-3d { transform: none !important; } }
// Or better, just remove the style prop and use a class instead.
```

Simplest approach: remove the inline `style` and add a CSS class for the 3D transform on `sm:` only. Add to `globals.css`:
```css
@media (min-width: 640px) {
  .marquee-3d {
    transform: rotateX(45deg) rotateY(-15deg) rotateZ(35deg) translateZ(-200px);
  }
}
```

And change the div to:
```tsx
<div
  className="absolute h-1/2 sm:h-full w-full sm:w-[150%] sm:-left-[25%] top-32 sm:top-56 flex flex-col space-y-2 sm:space-y-3 md:space-y-4 marquee-3d"
>
```

- [ ] **Step 2: Adjust marquee card sizes on mobile**

```tsx
// Line 62-63 — MarqueeItem card sizing
// Change: h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48
// To:     h-28 w-28 sm:h-40 sm:w-40 md:h-48 md:w-48
className={cn(
  "mx-2 sm:mx-3 md:mx-4 cursor-pointer",
  "h-28 w-28 sm:h-40 sm:w-40 md:h-48 md:w-48",
  ...
)}
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "fix: make marquee section usable on mobile — remove 3D transform, shrink gradients, resize cards"
```

---

### Task 4: Services Section — Stacked Text on Mobile

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add mobile-friendly alternatives for the SVG path text**

The services section uses three `<AnimatedPathText>` components with SVG paths. On mobile these don't scale. We'll add plain text overlays visible only on mobile, and hide the SVG path text on mobile.

```tsx
// In the services section, wrap each AnimatedPathText in a container
// Add a mobile-only text fallback above the SVG animations

// Replace lines 376-422 with:

<section ref={servicesRef} className="relative h-[300vh] bg-[#fefefe]">
  <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center pt-16 sm:pt-28">
    <h2 className="text-center text-2xl sm:text-5xl md:text-6xl font-calendas tracking-tight text-black mb-2 z-10">
      What I Do
    </h2>
    {/* Mobile: stacked text labels */}
    <div className="flex sm:hidden flex-col items-center gap-3 mt-8 px-4">
      <span className="font-calendas text-lg text-[#ff5941]">AI Integration · Agentic Systems · Workflow Automation</span>
      <span className="font-calendas text-lg text-black">Vibe Coding · Product Development · Technical Writing</span>
      <span className="font-calendas text-lg text-neutral-400">AI Consulting · AI Education · Custom AI Solutions</span>
    </div>
    <div className="hidden sm:block relative w-full flex-1">
      <AnimatedPathText
        path="M -100 250 C 150 150, 350 350, 600 250 C 850 150, 1000 300, 1100 250"
        scrollContainer={containerRef}
        scrollTarget={servicesRef}
        animationType="scroll"
        svgClassName="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        text="AI Integration · Agentic Systems · Workflow Automation"
        textClassName="font-calendas text-xl sm:text-2xl md:text-3xl fill-[#ff5941]"
        scrollTransformValues={[-30, 95]}
        textAnchor="start"
        scrollOffset={["start end", "end start"]}
      />
      <AnimatedPathText
        path="M -100 350 C 150 450, 350 250, 600 350 C 850 450, 1000 200, 1100 350"
        scrollContainer={containerRef}
        scrollTarget={servicesRef}
        animationType="scroll"
        svgClassName="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        text="Vibe Coding · Product Development · Technical Writing"
        textClassName="font-calendas text-xl sm:text-2xl md:text-3xl fill-black"
        scrollTransformValues={[-30, 95]}
        textAnchor="start"
        scrollOffset={["start end", "end start"]}
      />
      <AnimatedPathText
        path="M -100 450 C 150 350, 350 550, 600 450 C 850 350, 1000 500, 1100 450"
        scrollContainer={containerRef}
        scrollTarget={servicesRef}
        animationType="scroll"
        svgClassName="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        text="AI Consulting · AI Education · Custom AI Solutions"
        textClassName="font-calendas text-xl sm:text-2xl md:text-3xl fill-neutral-400"
        scrollTransformValues={[-30, 95]}
        textAnchor="start"
        scrollOffset={["start end", "end start"]}
      />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "fix: show stacked service labels on mobile, keep SVG path animations on desktop"
```

---

### Task 5: About Page — Gravity Pills Positioning

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Adjust MatterBody positions and sizing for mobile**

The gravity pills use absolute % positions. On mobile they need to be clustered closer to center. Also reduce pill padding.

```tsx
// For each MatterBody, add max-sm overrides where needed
// Strategy: use responsive x/y props or adjust the values to work at narrow widths
// MatterBody x/y accept string percentages. We can't do responsive there directly.
// Instead: shift positions to be more centered and use padding reduction.

// Change pill positions to be more mobile-friendly (all within 15%-70% x range)
// Line 57: x="20%" → x="20%" (OK, keep)
// Line 67: x="60%" → x="55%"
// Line 78: x="75%" → x="60%"
// Line 89: x="40%" → x="35%"
// Line 99: x="80%" → x="70%"
// Line 110: x="30%" → x="25%" (OK)
// Line 120: x="50%" → x="45%"
// Line 132: x="65%" → x="55%"

// Reduce pill padding on mobile via responsive classes
// Line 60: px-6 py-3 → px-4 sm:px-6 py-2 sm:py-3
// Apply to all pill divs

// Specific changes:
// Email pill: <div className="text-xs sm:text-base bg-[#ff5941]... px-4 sm:px-6 py-2 sm:py-3">
// GitHub pill: <div className="text-xs sm:text-base bg-neutral-800... px-4 sm:px-6 py-2 sm:py-3">
// Endless Curiosity: <div className="text-xs sm:text-base bg-[#0a66c2]... px-4 sm:px-6 py-2 sm:py-3">
// Based in Italy: <div className="text-xs sm:text-base bg-neutral-100... px-4 sm:px-5 py-2 sm:py-3">
// 5+ Years: <div className="text-xs sm:text-base bg-white... px-4 sm:px-5 py-2 sm:py-3">
// React · Next.js: <div className="text-xs sm:text-base bg-[#1f464d]... px-4 sm:px-5 py-2 sm:py-3">
// Design Systems: <div className="text-xs sm:text-base bg-[#e794da]... px-4 sm:px-5 py-2 sm:py-3">
// UI/UX Design: <div className="text-xs sm:text-base bg-[#f97316]... px-4 sm:px-5 py-2 sm:py-3">
```

- [ ] **Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "fix: adjust gravity pill positions and sizing for mobile screens"
```

---

### Task 6: Footer — All Pages

**Files:**
- Modify: `app/page.tsx` (home page footer)
- Modify: `app/about/page.tsx` (about page footer)
- Modify: `app/projects/page.tsx` (projects page footer)

- [ ] **Step 1: Make footer responsive on all pages**

Same change applies to all three files. The footer appears at the bottom of each page.

```tsx
// Change footer height: h-80 → h-64 sm:h-80
<div className="sticky z-0 bottom-0 left-0 w-full h-64 sm:h-80 bg-[#fefefe]/bg-white flex justify-center items-center">

// Stack links vertically on mobile, reduce space
// Change: flex-row space-x-12 sm:space-x-16 md:space-x-24
// To:     flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-16 md:space-x-24
<div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl">

// Reduce Luca watermark text on mobile
// Change: text-[80px] sm:text-[192px]
// To:     text-[48px] sm:text-[80px] sm:text-[192px]
<h2 className="absolute bottom-0 left-0 translate-y-1/3 text-[48px] sm:text-[80px] sm:text-[192px] text-[#ff5941] font-calendas leading-none select-none">
  Luca
</h2>
```

Note: On home page the footer uses `text-[#ff5941]` with `bg-white`. On projects page it uses `text-[#ff5941]` with `bg-black`. On about page it uses `text-[#ff5941]` with `bg-white`. The same structural changes apply to all three.

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx app/about/page.tsx app/projects/page.tsx
git commit -m "fix: responsive footer layout for mobile — stack links vertically, reduce watermark size"
```

---

### Task 7: Projects Page — Stacking Card Sizing

**Files:**
- Modify: `app/projects/page.tsx`

- [ ] **Step 1: Reduce card padding and text sizes on mobile**

```tsx
// Line 69 — card container
// Change: px-8 py-10 → px-4 sm:px-8 py-6 sm:py-10
// Also keep flex-col (already there)
className={cn(
  projectColors[index % projectColors.length],
  "h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video px-4 sm:px-8 py-6 sm:py-10 flex w-11/12 rounded-3xl mx-auto relative"
)}

// Line 76 — project title
// Change: text-2xl → text-xl sm:text-2xl
<h3 className="font-bold text-xl sm:text-2xl mb-5">{project.title}</h3>

// Line 77 — project description
// Already has text-sm sm:text-base — OK

// Line 35 — section header
// Change: text-5xl md:text-7xl → text-4xl sm:text-5xl md:text-7xl
<p className="text-4xl sm:text-5xl md:text-7xl text-white font-calendas italic leading-none mb-4">
  Projects
</p>
```

- [ ] **Step 2: Commit**

```bash
git add app/projects/page.tsx
git commit -m "fix: reduce stacking card padding and text sizes on mobile"
```

---

### Task 8: Project Detail Page — Minor Spacing

**Files:**
- Modify: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Tighten padding on mobile**

```tsx
// Line 51 — container
// Change: px-6 sm:px-8 → px-4 sm:px-8
<div className="max-w-3xl mx-auto px-4 sm:px-8 pb-64 text-black pt-24">

// Line 56 — title
// Change: text-4xl → text-3xl sm:text-4xl
className="text-3xl sm:text-4xl font-medium mb-12 font-calendas tracking-tight"
```

- [ ] **Step 2: Commit**

```bash
git add app/projects/[slug]/page.tsx
git commit -m "fix: tighten project detail page padding on mobile"
```
