# Mobile Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Block mobile visitors with a full-screen animated message matching the loading screen aesthetic.

**Architecture:** New `MobileGate` component renders in `layout.tsx` when viewport is xs/sm (below 768px). Uses the same `TextRotate` blur animation as the existing `LoadingScreen`. Desktop is unaffected.

**Tech Stack:** Next.js 16, React 19, motion (framer-motion v12), Tailwind v4, TextRotate component

---

### Task 1: Create MobileGate component

**Files:**
- Create: `components/mobile-gate.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client"

import TextRotate from "@/components/fancy/text/text-rotate"

export default function MobileGate() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white" style={{ zIndex: 50 }}>
      <div className="max-w-xl px-8 text-center" style={{ color: "#000" }}>
        <TextRotate
          texts={["Nice phone. This portfolio needs a bigger screen. See you on desktop."]}
          mainClassName="md:leading-10 flex whitespace-pre text-lg sm:text-xl md:text-5xl max-w-xl text-center"
          staggerFrom="random"
          animatePresenceMode="wait"
          animatePresenceInitial
          splitBy="characters"
          initial={[
            { filter: "blur(20px)", opacity: 0 },
          ]}
          animate={[
            { filter: "blur(0px)", opacity: 1 },
          ]}
          staggerDuration={0.01}
          splitLevelClassName=""
          elementLevelClassName="md:py-[4px]"
          transition={{ ease: [0.909, 0.151, 0.153, 0.86], duration: 1 }}
          rotationInterval={4000}
          auto={false}
          loop={false}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify the file was created**

Run: `ls -la components/mobile-gate.tsx`
Expected: file exists

---

### Task 2: Integrate MobileGate into layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Read current layout to understand structure**

Run: `cat app/layout.tsx`

- [ ] **Step 2: Edit layout to add mobile detection**

Import `useScreenSize` at the top, then conditionally render `<MobileGate />` when screen size is `xs` or `sm`.

```tsx
import useScreenSize from "@/hooks/use-screen-size"
import MobileGate from "@/components/mobile-gate"
```

And inside the component body (before the return or wrapping children):

```tsx
const screenSize = useScreenSize()

if (screenSize.lessThan("md")) {
  return <MobileGate />
}
```

This goes after the ThemeProvider is set up but before rendering Navbar/children.

- [ ] **Step 3: Build the project to verify no errors**

Run: `npm run build` (or `npx next build` if no build script)
Expected: Build succeeds, no type errors

- [ ] **Step 4: Commit**

```bash
git add components/mobile-gate.tsx app/layout.tsx
git commit -m "feat: add mobile gate with sarcastic entry animation"
```
