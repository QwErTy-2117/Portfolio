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
    setTimeout(() => setPhase("exiting"), 1000)
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
      style={{ opacity: phase === "exiting" ? 0 : 1, transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div className="max-w-xl px-8 text-center text-lg sm:text-xl md:text-5xl text-black">
        {quotes[0]}
      </div>
    </div>
  )
}
