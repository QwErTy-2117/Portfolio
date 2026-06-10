"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import TextRotate from "@/components/fancy/text/text-rotate"

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
      <div className="max-w-2xl px-8 text-center" style={{ color: "#000" }}>
        <TextRotate
          texts={quotes}
          mainClassName="text-xl sm:text-2xl md:text-4xl font-overusedGrotesk overflow-hidden"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2500}
          auto
        />
      </div>
    </motion.div>
  )
}
