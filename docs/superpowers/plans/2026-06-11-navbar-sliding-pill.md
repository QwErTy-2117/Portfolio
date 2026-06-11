# Navbar Sliding Pill + Page Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replicate phantom.land's glassmorphism pill navbar with a sliding white indicator and full-screen page transitions.

**Architecture:** 3 files — modify `navbar.tsx` to add animated active pill indicator, create `page-transition.tsx` for AnimatePresence wrapper, modify `layout.tsx` to use it.

**Tech Stack:** Next.js 16, motion (framer-motion v12), Tailwind v4

---

### Task 1: Create PageTransition component

**Files:**
- Create: `components/page-transition.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: No errors

---

### Task 2: Modify Navbar with sliding pill

**Files:**
- Modify: `components/navbar.tsx`

- [ ] **Step 1: Replace file contents with pill-indicator version**

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center px-7 py-3 rounded-full bg-white/30 backdrop-blur-lg border border-white/10">
        <div className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative z-10 px-4 py-1.5 text-base font-overusedGrotesk rounded-full transition-colors duration-200",
                  pathname === "/projects"
                    ? isActive
                      ? "text-black"
                      : "text-neutral-400 hover:text-white"
                    : isActive
                      ? "text-black"
                      : "text-neutral-500 hover:text-black"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="indicator"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <Link
        href="mailto:garofololuca7@gmail.com"
        className="fixed top-8 right-8 z-50 text-base font-overusedGrotesk px-6 py-3 rounded-full bg-[#ff5941] text-white hover:bg-[#ff5941]/90 transition-colors duration-200 shadow-sm"
      >
        Contact Me
      </Link>
    </>
  )
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: No errors

---

### Task 3: Wire PageTransition in layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and wrap children with PageTransition**

```tsx
import { Playfair_Display } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import PageTransition from "@/components/page-transition"

const calendas = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-calendas",
  weight: "500",
})

const overusedGrotesk = localFont({
  src: "./fonts/OverusedGrotesk-Book.woff2",
  variable: "--font-overused-grotesk",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        calendas.variable,
        overusedGrotesk.variable,
        "font-overusedGrotesk"
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: No errors

---

### Verification

- [ ] Start dev server: `npm run dev`
- [ ] Navigate between Home, Projects, About pages
- [ ] Confirm the white pill slides smoothly between active links
- [ ] Confirm the page fade/vertical-slide transition occurs on route change
- [ ] Check both dark-page (/projects) and light-page (/, /about) backgrounds for correct text contrast
