"use client"

import { useEffect, useState } from "react"

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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      style={{
        opacity: phase === "exiting" ? 0 : 1,
        transition: phase === "exiting" ? "opacity 1.2s ease" : undefined,
      }}
    >
      <div className="max-w-2xl px-8 text-center text-xl sm:text-2xl md:text-4xl text-black">
        {quotes[0]}
      </div>
    </div>
  )
}
