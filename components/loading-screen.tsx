"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

const quotes = [
  "The problem isn't how to make the world more technological. It's about how to make the world more humane again.",
  "When you use other people's software you live in somebody else's dream.",
]

interface LoadingScreenProps {
  onFinish: () => void
  dismiss?: boolean
}

export default function LoadingScreen({ onFinish, dismiss }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"visible" | "exiting" | "hidden">("visible")
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!dismiss) return
    const timer = setTimeout(() => setPhase("exiting"), 1000)
    return () => clearTimeout(timer)
  }, [dismiss])

  useEffect(() => {
    if (phase !== "exiting") return
    const timer = setTimeout(() => {
      setPhase("hidden")
      onFinish()
    }, 1200)
    return () => clearTimeout(timer)
  }, [phase, onFinish])

  useEffect(() => {
    if (phase !== "visible") return
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % quotes.length)
        setFading(false)
      }, 600)
    }, 2500)
    return () => clearInterval(timer)
  }, [phase])

  if (phase === "hidden") return null

  return (
    <motion.div
      initial={false}
      animate={{ opacity: phase === "exiting" ? 0 : 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        isolation: "isolate",
        willChange: "transform",
      }}
    >
      <div className="max-w-2xl px-8 text-center text-xl sm:text-2xl md:text-4xl font-overusedGrotesk">
        <span
          style={{
            color: "#000",
            opacity: fading ? 0 : 1,
            transition: "opacity 0.6s ease",
          }}
        >
          {quotes[quoteIndex]}
        </span>
      </div>
    </motion.div>
  )
}
