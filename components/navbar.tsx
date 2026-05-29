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
