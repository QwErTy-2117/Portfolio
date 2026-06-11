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
