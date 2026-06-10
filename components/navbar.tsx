"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center px-7 py-3 rounded-full bg-white/80 backdrop-blur-md border border-black/5 shadow-sm">
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base font-overusedGrotesk transition-colors duration-200",
                pathname === link.href
                  ? "text-black font-medium"
                  : "text-neutral-500 hover:text-black"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      <Link
        href="mailto:luca@example.com"
        className="fixed top-8 right-8 z-50 text-base font-overusedGrotesk px-6 py-3 rounded-full bg-[#ff5941] text-white hover:bg-[#ff5941]/90 transition-colors duration-200 shadow-sm"
      >
        Contact Me
      </Link>
    </>
  )
}
