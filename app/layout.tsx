import { Playfair_Display, Caveat } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import PageTransition from "@/components/page-transition"
import MobileGateWrapper from "@/components/mobile-gate-wrapper"

const calendas = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-calendas",
  weight: "500",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: "400",
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
        caveat.variable,
        overusedGrotesk.variable,
        "font-overusedGrotesk"
      )}
    >
      <body>
        <MobileGateWrapper>
          <ThemeProvider>
            <Navbar />
            <PageTransition>{children}</PageTransition>
          </ThemeProvider>
        </MobileGateWrapper>
      </body>
    </html>
  )
}
