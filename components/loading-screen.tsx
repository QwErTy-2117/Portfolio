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
      <div
        className="max-w-2xl px-8 text-center font-overusedGrotesk"
        style={{ color: "#000000", fontSize: "clamp(1.125rem, 4vw, 2.5rem)" }}
      >
        {quotes[0]}
      </div>
    </motion.div>
  )
}
