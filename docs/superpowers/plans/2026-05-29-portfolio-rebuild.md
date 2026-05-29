# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio website for Luca Garofolo — replace all demo pages with a single-page portfolio featuring loading screen, hero with text rotation, highlighted about section, project marquee, contact section, sticky footer, navbar, about page, and project detail pages.

**Architecture:** Next.js 16 App Router, all client components. Pages: `/` (home with loading overlay), `/about`, `/projects/[slug]`. Fancy components from registry for animations. Lenis for smooth scroll. Tailwind v4 for styling.

**Tech Stack:** Next.js 16.2.6, React 19, Motion 12.40, Tailwind CSS v4, Lenis, fancycomponents.dev registry.

---

### Task 1: Install fonts and update globals.css + layout.tsx

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `app/fonts/` (for self-hosted font files)

**Note:** Calendas Plus and Overused Grotesk are not on Google Fonts. We need to self-host them.

- [ ] **Step 1: Download and place font files**

Download the Calendas Plus Roman (or similar) and Overused Grotesk Regular WOFF2 files into `app/fonts/`.

```bash
mkdir -p app/fonts
# Download Overused Grotesk from GitHub releases
curl -L "https://github.com/RandomMaerks/Overused-Grotesk/raw/main/fonts/OverusedGrotesk-Book.woff2" -o app/fonts/OverusedGrotesk-Book.woff2
# Calendas: need to download manually or use alternative
```

For Calendas, use a Google Fonts alternative: **Playfair Display** (elegant serif, available on Google Fonts).

- [ ] **Step 2: Update `app/globals.css` with new palette and font tokens**

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-calendas: var(--font-calendas);
  --font-overusedGrotesk: var(--font-overused-grotesk);

  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.555 0.163 48.998);
  --primary-foreground: oklch(0.987 0.022 95.277);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.837 0.128 66.29);
  --chart-2: oklch(0.705 0.213 47.604);
  --chart-3: oklch(0.646 0.222 41.116);
  --chart-4: oklch(0.553 0.195 38.402);
  --chart-5: oklch(0.47 0.157 37.304);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.666 0.179 58.318);
  --sidebar-primary-foreground: oklch(0.987 0.022 95.277);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.473 0.137 46.201);
  --primary-foreground: oklch(0.987 0.022 95.277);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.837 0.128 66.29);
  --chart-2: oklch(0.705 0.213 47.604);
  --chart-3: oklch(0.646 0.222 41.116);
  --chart-4: oklch(0.553 0.195 38.402);
  --chart-5: oklch(0.47 0.157 37.304);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.769 0.188 70.08);
  --sidebar-primary-foreground: oklch(0.279 0.077 45.635);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-overusedGrotesk;
  }
}
```

- [ ] **Step 3: Update `app/layout.tsx` with new fonts**

```tsx
import { Playfair_Display } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Run typecheck to verify**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx app/fonts/ app/fonts/
git commit -m "feat: update fonts, colors, and layout with Calendas and Overused Grotesk"
```

---

### Task 2: Remove old demo pages

**Files:**
- Delete: `app/page.tsx` (old index page)
- Delete: `app/text-highlighter/`
- Delete: `app/weekly-mix/`
- Delete: `app/media-chair/`
- Delete: `app/gravity-demo/`
- Delete: `app/typewriter-demo/`
- Delete: `app/text-along-path/`
- Delete: `app/scramble-hover/`
- Delete: `app/text-rotate/`
- Delete: `app/text-rotate-quotes/`
- Delete: `app/portfolio-demo/`

- [ ] **Step 1: Remove all demo route directories**

```bash
rm -rf app/text-highlighter app/weekly-mix app/media-chair app/gravity-demo app/typewriter-demo app/text-along-path app/scramble-hover app/text-rotate app/text-rotate-quotes app/portfolio-demo
```

- [ ] **Step 2: Verify cleanup**

Run: `ls app/`
Expected: `favicon.ico`, `globals.css`, `layout.tsx`, `fonts/` (no demo route folders)

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: remove old demo pages"
```

---

### Task 3: Create Navbar component

**Files:**
- Create: `components/navbar.tsx`

- [ ] **Step 1: Create `components/navbar.tsx`**

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-black/5 shadow-sm">
      <div className="flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-overusedGrotesk transition-colors duration-200",
              pathname === link.href
                ? "text-black font-medium"
                : "text-neutral-500 hover:text-black"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link
        href="/about"
        className="text-sm font-overusedGrotesk px-4 py-1.5 rounded-full bg-[#ff5941] text-white hover:bg-[#ff5941]/90 transition-colors duration-200"
      >
        Contact Me
      </Link>
    </nav>
  )
}
```

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/navbar.tsx && git commit -m "feat: add navbar component"
```

---

### Task 4: Create LoadingScreen component

**Files:**
- Create: `components/loading-screen.tsx`

- [ ] **Step 1: Create `components/loading-screen.tsx`**

```tsx
"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import TextRotate from "@/components/fancy/text/text-rotate"

const quotes = [
  "Design is not just what it looks like. Design is how it works.",
  "The details are not the details. They make the design.",
  "Simplicity is the ultimate sophistication.",
  "Make it work, make it right, make it fast.",
  "Good design is as little design as possible.",
]

interface LoadingScreenProps {
  onFinish: () => void
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [show, setShow] = useState(true)
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onFinish, 800)
    }, 2500)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-lg px-8 text-center">
            <TextRotate
              texts={[randomQuote]}
              mainClassName="text-white text-lg sm:text-xl md:text-2xl font-overusedGrotesk leading-relaxed"
              staggerFrom={"random"}
              splitBy="characters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={10000}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/loading-screen.tsx && git commit -m "feat: add loading screen component"
```

---

### Task 5: Create home page (loading + hero + about + projects + contact + footer)

**Files:**
- Create: `app/page.tsx`
- Create: `data/projects.ts`

- [ ] **Step 1: Create project data file `data/projects.ts`**

```ts
export interface Project {
  slug: string
  title: string
  tag: string
  year: string
  description: string
  images: string[]
}

export const projects: Project[] = [
  {
    slug: "orbit",
    title: "Orbit",
    tag: "Web App",
    year: "2026",
    description: "A real-time collaborative dashboard for tracking orbital debris and satellite trajectories. Built with WebSocket streaming and WebGL visualization.",
    images: [
      "https://cdn.cosmos.so/b9909337-7a53-48bc-9672-33fbd0f040a1?format=jpeg",
      "https://cdn.cosmos.so/ecdc9dd7-2862-4c28-abb1-dcc0947390f3?format=jpeg",
      "https://cdn.cosmos.so/79de41ec-baa4-4ac0-a9a4-c090005ca640?format=jpeg",
    ],
  },
  {
    slug: "nexus",
    title: "Nexus",
    tag: "Brand Identity",
    year: "2025",
    description: "Complete brand identity for a tech startup connecting distributed teams. Logo, typography system, color palette, and design language.",
    images: [
      "https://cdn.cosmos.so/1a18b312-21cd-4484-bce5-9fb7ed1c5e01?format=jpeg",
      "https://cdn.cosmos.so/d765f64f-7a66-462f-8b2d-3d7bc8d7db55?format=jpeg",
      "https://cdn.cosmos.so/6b9f08ea-f0c5-471f-a620-71221ff1fb65?format=jpeg",
    ],
  },
  {
    slug: "echo",
    title: "Echo",
    tag: "Full-Stack",
    year: "2025",
    description: "A social audio platform for async voice conversations. Features include voice rooms, transcripts, and AI-powered summarization.",
    images: [
      "https://cdn.cosmos.so/40a09525-4b00-4666-86f0-3c45f5d77605?format=jpeg",
      "https://cdn.cosmos.so/14f05ab6-b4d0-4605-9007-8a2190a249d0?format=jpeg",
      "https://cdn.cosmos.so/d05009a2-a2f8-4a4c-a0de-e1b0379dddb8?format=jpeg",
    ],
  },
  {
    slug: "lumen",
    title: "Lumen",
    tag: "UI/UX",
    year: "2024",
    description: "Lighting control interface for smart buildings. Focus on intuitive gesture controls and adaptive brightness algorithms.",
    images: [
      "https://cdn.cosmos.so/ba646e35-efc2-494a-961b-b40f597e6fc9?format=jpeg",
      "https://cdn.cosmos.so/e899f9c3-ed48-4899-8c16-fbd5a60705da?format=jpeg",
      "https://cdn.cosmos.so/24e83c11-c607-45cd-88fb-5059960b56a0?format=jpeg",
    ],
  },
]
```

- [ ] **Step 2: Create `app/page.tsx`**

```tsx
"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import Lenis from "lenis"
import Link from "next/link"

import TextRotate from "@/components/fancy/text/text-rotate"
import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import MarqueeAlongSvgPath from "@/components/fancy/blocks/marquee-along-svg-path"
import LoadingScreen from "@/components/loading-screen"
import { projects } from "@/data/projects"

const path =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"

const highlightTransition = { type: "spring", duration: 1, bounce: 0 } as const
const highlightClass = "rounded-[0.15em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, amount: 0.3 }

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      autoRaf: true,
      wrapper: containerRef.current,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleLoadingFinish = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <LoadingScreen onFinish={handleLoadingFinish} />}

      <div
        className="w-dvw h-dvh bg-[#fefefe] overflow-y-auto overflow-x-hidden"
        ref={containerRef}
      >
        <div className="relative z-10 min-h-[calc(100dvh+20rem)]">
          {/* Hero */}
          <div className="max-w-3xl mx-auto px-8 pt-32 sm:pt-40 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-calendas tracking-tight text-black leading-[0.9] mb-4">
                hey there,
                <br />
                meet
              </h1>
              <div className="flex items-center gap-3 text-3xl sm:text-4xl md:text-6xl font-calendas tracking-tight text-black leading-[0.9] flex-wrap mt-4">
                <TextRotate
                  texts={[
                    "Luca Garofolo ✦",
                    "a developer ⚡",
                    "a designer ✽",
                    "a dreamer ✦",
                    "a creator 🚀",
                  ]}
                  mainClassName="text-white px-3 sm:px-4 bg-[#ff5941] overflow-hidden py-1 sm:py-1.5 justify-center rounded-xl"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2200}
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-500 text-base sm:text-lg font-overusedGrotesk max-w-xl leading-relaxed mt-8 mb-24"
            >
              I build things for the web that are functional, playful, and
              human-centered. Based in Italy, making ideas come to life.
            </motion.p>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-24"
            >
              <h2 className="text-sm font-overusedGrotesk text-neutral-400 mb-6 tracking-wider uppercase">
                ✽ About
              </h2>
              <div className="leading-relaxed space-y-4 font-overusedGrotesk text-neutral-600 text-base sm:text-lg max-w-xl">
                <p>
                  I&apos;m a full-stack developer and designer who loves{" "}
                  <TextHighlighter
                    className={highlightClass}
                    transition={highlightTransition}
                    highlightColor={highlightColor}
                    useInViewOptions={inViewOptions}
                  >
                    turning complex problems into simple, beautiful experiences
                  </TextHighlighter>
                  . Every project starts with a question: how can this feel good
                  to use?
                </p>
                <p>
                  I believe in{" "}
                  <TextHighlighter
                    className={highlightClass}
                    transition={highlightTransition}
                    highlightColor={highlightColor}
                    useInViewOptions={inViewOptions}
                  >
                    minimal, playful, human-centered design
                  </TextHighlighter>
                  . Whether I&apos;m building a web app, a brand identity, or a
                  design system, I care deeply about the details.
                </p>
              </div>
            </motion.div>

            {/* Projects Marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-sm font-overusedGrotesk text-neutral-400 mb-8 tracking-wider uppercase">
                ✦ Featured Projects
              </h2>

              <MarqueeAlongSvgPath
                path={path}
                viewBox="0 0 996 330"
                baseVelocity={8}
                slowdownOnHover
                draggable
                repeat={2}
                dragSensitivity={0.1}
                className="w-full scale-105"
                responsive
                grabCursor
              >
                {projects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <div className="w-14 h-full hover:scale-150 duration-300 ease-in-out">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-lg"
                        draggable={false}
                      />
                    </div>
                  </Link>
                ))}
              </MarqueeAlongSvgPath>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="mt-32 mb-32 text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-calendas tracking-tight text-black mb-6">
                Let&apos;s work together
              </h2>
              <p className="text-neutral-500 font-overusedGrotesk max-w-md mx-auto mb-8">
                Have a project in mind? I&apos;d love to hear about it.
              </p>
              <a
                href="mailto:luca@example.com"
                className="inline-block px-6 py-3 rounded-full bg-[#ff5941] text-white font-overusedGrotesk text-sm hover:bg-[#ff5941]/90 transition-colors"
              >
                Get in touch
              </a>
            </motion.div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky z-0 bottom-0 left-0 w-full h-80 bg-white flex justify-center items-center">
          <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-[#ff5941]">
            <div className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl">
              <ul className="space-y-1">
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <Link href="/projects">Projects</Link>
                </li>
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <Link href="/about">About</Link>
                </li>
              </ul>
              <ul className="space-y-1">
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </li>
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
              </ul>
            </div>
            <h2 className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-[#ff5941] font-calendas leading-none select-none">
              Luca
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx data/projects.ts && git commit -m "feat: add home page with hero, about, marquee, contact, footer"
```

---

### Task 6: Create about page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create `app/about/page.tsx`**

```tsx
"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import { Transition } from "motion"

const transition = { type: "spring", duration: 1, bounce: 0 } as Transition
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, amount: 0.1 }

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      autoRaf: true,
      wrapper: containerRef.current,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="w-dvw h-dvh bg-[#fefefe] relative p-0">
      <div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-50% via-[#fefefe]/50 to-transparent pointer-events-none isolate z-10" />

      <div
        className="h-full w-full z-10 bg-[#fefefe] overflow-scroll pt-20"
        ref={containerRef}
      >
        <div className="max-w-md mx-auto px-4 mt-24 pb-64 text-black">
          <h1 className="text-4xl font-calendas tracking-tight mb-12">
            About Me
          </h1>

          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Luca Garofolo"
              className="w-32 h-32 rounded-full object-cover float-left mr-6 mb-4 shape-outside-circle"
            />
          </div>

          <div className="leading-normal space-y-4 font-overusedGrotesk text-neutral-700">
            <p>
              I&apos;m Luca Garofolo, a{" "}
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                full-stack developer and designer
              </TextHighlighter>{" "}
              based in Italy. I&apos;ve been building for the web for over 5 years,
              working with startups, agencies, and direct clients to create
              digital experiences that are both functional and delightful.
            </p>

            <p>
              My approach is rooted in{" "}
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                simplicity, clarity, and purpose
              </TextHighlighter>
              . I believe the best interfaces are invisible — they let users
              focus on what matters without getting in the way.
            </p>

            <p>
              I specialize in{" "}
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                React, Next.js, and design systems
              </TextHighlighter>
              , but I&apos;m always exploring new tools and techniques. I love
              the intersection of code and creativity, and I&apos;m constantly
              pushing myself to make things that are a little bit better than
              yesterday.
            </p>

            <p>
              When I&apos;m not coding, you&apos;ll find me{" "}
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                experimenting with type design, photography, or reading about
                cognitive science
              </TextHighlighter>
              . I think the best designers are curious about everything.
            </p>

            <p>
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                Every project is a chance to learn something new
              </TextHighlighter>
              . If that sounds like your kind of collaboration,{" "}
              <a
                href="mailto:luca@example.com"
                className="text-[#ff5941] hover:underline"
              >
                let&apos;s talk
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/about/ && git commit -m "feat: add about page"
```

---

### Task 7: Create project detail page

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `app/projects/[slug]/page.tsx`**

```tsx
"use client"

import { useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, stagger, useAnimate } from "motion/react"
import Lenis from "lenis"
import { notFound } from "next/navigation"

import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating"
import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import { projects } from "@/data/projects"
import { Transition } from "motion"

const transition = { type: "spring", duration: 1, bounce: 0 } as Transition
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, amount: 0.1 }

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projects.find((p) => p.slug === slug)
  const [scope, animate] = useAnimate()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    )
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      autoRaf: true,
      wrapper: containerRef.current,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  if (!project) {
    notFound()
  }

  return (
    <div className="w-dvw h-dvh bg-[#fefefe]" ref={containerRef}>
      {/* Parallax Section */}
      <div className="w-full h-screen relative overflow-hidden bg-black">
        <div
          className="flex w-full h-full justify-center items-center overflow-hidden"
          ref={scope}
        >
          <motion.div
            className="z-50 text-center space-y-4 items-center flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.88, delay: 1.5 }}
          >
            <p className="text-4xl md:text-6xl z-50 text-white font-calendas italic">
              {project.title}
            </p>
            <p className="text-xs z-50 text-neutral-400 font-overusedGrotesk">
              {project.tag} — {project.year}
            </p>
          </motion.div>

          <Floating sensitivity={-1} className="overflow-hidden">
            {project.images.map((img, i) => {
              const positions = [
                { depth: 0.5, className: "top-[8%] left-[11%]" },
                { depth: 1, className: "top-[10%] left-[32%]" },
                { depth: 2, className: "top-[2%] left-[53%]" },
                { depth: 1, className: "top-[40%] left-[2%]" },
                { depth: 4, className: "top-[73%] left-[15%]" },
                { depth: 1, className: "top-[80%] left-[50%]" },
              ]
              const pos = positions[i % positions.length]
              const sizes = [
                "w-24 h-24 md:w-32 md:h-32",
                "w-20 h-20 md:w-28 md:h-28",
                "w-28 h-40 md:w-40 md:h-52",
                "w-28 h-28 md:w-36 md:h-36",
                "w-40 md:w-52 h-full",
                "w-24 h-24 md:w-32 md:h-32",
              ]
              return (
                <FloatingElement
                  key={i}
                  depth={pos.depth}
                  className={pos.className}
                >
                  <motion.img
                    initial={{ opacity: 0 }}
                    src={img}
                    className={`${sizes[i % sizes.length]} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg`}
                  />
                </FloatingElement>
              )
            })}
          </Floating>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 bg-[#fefefe]">
        <div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-50% via-[#fefefe]/50 to-transparent pointer-events-none isolate" />

        <div className="max-w-md mx-auto px-4 pb-64 text-black">
          <div className="leading-normal space-y-4 font-overusedGrotesk text-neutral-700 pt-16">
            <p>
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                {project.title}
              </TextHighlighter>{" "}
              is a {project.tag} project from {project.year}. {project.description}
            </p>

            <p>
              This project was built with a focus on{" "}
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                performance, accessibility, and clean code
              </TextHighlighter>
              . Every decision was made with the end user in mind.
            </p>

            <p>
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                The result
              </TextHighlighter>{" "}
              is a product that feels intuitive and responsive, designed to
              scale and adapt to future needs.
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/about"
              className="text-sm font-overusedGrotesk text-[#ff5941] hover:underline"
            >
              Learn more about me →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/projects/ && git commit -m "feat: add project detail page with parallax"
```

---

### Task 8: Create projects index page

**Files:**
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Create `app/projects/page.tsx`**

```tsx
"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { projects } from "@/data/projects"

export default function Projects() {
  return (
    <div className="w-dvw min-h-dvh bg-[#fefefe] pt-28 px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-calendas tracking-tight text-black mb-4"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-500 font-overusedGrotesk mb-12 max-w-md"
        >
          A selection of things I&apos;ve built.
        </motion.p>

        <div className="grid gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * (i + 1), ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block group"
              >
                <div className="rounded-2xl p-6 border border-black/5 bg-white hover:shadow-lg hover:shadow-[#ff5941]/5 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-calendas tracking-tight text-black group-hover:text-[#ff5941] transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-neutral-500 text-sm font-overusedGrotesk mt-1">
                        {project.tag}
                      </p>
                    </div>
                    <span className="text-neutral-400 text-sm font-overusedGrotesk">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-neutral-600 text-sm font-overusedGrotesk mt-3 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx && git commit -m "feat: add projects index page"
```

---

### Task 9: Final verification

- [ ] **Step 1: Run full typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 2: Run lint**

Run: `pnpm lint`
Expected: No errors

- [ ] **Step 3: Start dev server and verify**

Run: `pnpm dev`
Expected: Server starts on localhost:3000
Check: Loading screen appears → home page renders → about page → projects → project detail

- [ ] **Step 4: Commit any remaining changes**

```bash
git add -A && git commit -m "chore: final cleanup and polish"
```
