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
      <nav
        className={cn(
          "fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1 rounded-full backdrop-blur-xl",
          pathname === "/projects"
            ? "bg-white/10 border border-white/10"
            : "bg-white/70 border border-black/5"
        )}
      >
        <div className="relative flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/projects" && pathname.startsWith("/projects") && pathname !== "/projects")
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative z-10 px-4 py-2 text-base font-overusedGrotesk rounded-[40px] transition-colors duration-200",
                  pathname === "/projects"
                    ? isActive
                      ? "text-black"
                      : "text-neutral-400 hover:text-white"
                    : isActive
                      ? "text-white"
                      : "text-neutral-500 hover:text-black"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="indicator"
                    className={cn(
                      "absolute inset-0 rounded-[40px] -z-10",
                      pathname === "/projects" ? "bg-white" : "bg-black"
                    )}
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
