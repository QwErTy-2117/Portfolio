"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

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

  useEffect(() => {
    if (!dismiss) return
    const timer = setTimeout(() => setPhase("exiting"), 1000)
    return () => clearTimeout(timer)
  }, [dismiss])

  useEffect(() => {
    if (phase !== "visible") return
    const timer = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== "exiting") return
    const timer = setTimeout(() => {
      setPhase("hidden")
      onFinish()
    }, 1200)
    return () => clearTimeout(timer)
  }, [phase, onFinish])

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
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: "#000" }}
          >
            {quotes[quoteIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
