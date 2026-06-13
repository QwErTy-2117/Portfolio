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

      <div className="fixed top-8 right-8 z-50 w-fit h-fit inline-flex rounded-full overflow-hidden">
        <span className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
          <span className={cn("absolute -inset-full animate-spin [animation-duration:4s]", pathname === "/projects" ? "bg-[conic-gradient(from_0deg,#fff_0deg,#fff_40deg,transparent_60deg)]" : "bg-[conic-gradient(from_0deg,#000_0deg,#000_40deg,transparent_60deg)]")} />
        </span>
        <Link
          href="mailto:garofololuca7@gmail.com"
          className="relative z-10 m-[1px] rounded-full bg-[#ff5941] text-white px-6 py-3 text-base font-overusedGrotesk transition-colors duration-200 shadow-sm inline-flex items-center"
        >
          Contact Me
        </Link>
      </div>
    </>
  )
}
