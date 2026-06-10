"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import TextRotate from "@/components/fancy/text/text-rotate"
import type { TextRotateRef } from "@/components/fancy/text/text-rotate"

const quotes = [
  "The problem isn't how to make the world more technological. It's about how to make the world more humane again.",
  "When you use other people's software you live in somebody else's dream.",
]

interface LoadingScreenProps {
  onFinish: () => void
  dismiss?: boolean
}

export default function LoadingScreen({ onFinish, dismiss }: LoadingScreenProps) {
  const [texts, setTexts] = useState(quotes)
  const textRotateRef = useRef<TextRotateRef>(null)
  const [phase, setPhase] = useState<"visible" | "exiting" | "hidden">("visible")

  useEffect(() => {
    if (!dismiss) return
    setTexts([...quotes, ""])
    setTimeout(() => textRotateRef.current?.jumpTo(2), 50)
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
    <>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-red-500 text-white text-2xl"
        style={{ opacity: 1 }}
      >
        LOADING...
      </div>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exiting" ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: phase === "exiting" ? "none" : "auto" }}
      >
      <div className="max-w-xl px-8 text-center">
        <TextRotate
          ref={textRotateRef}
          texts={texts}
          mainClassName="md:leading-10 flex whitespace-pre text-lg sm:text-xl md:text-5xl max-w-xl text-center"
          staggerFrom="random"
          animatePresenceMode="wait"
          animatePresenceInitial
          splitBy="characters"
          initial={[
            { filter: "blur(20px)", opacity: 0 },
          ]}
          animate={[
            { filter: "blur(0px)", opacity: 1 },
          ]}
          exit={[
            { filter: "blur(20px)", opacity: 0 },
          ]}
          loop
          staggerDuration={0.01}
          splitLevelClassName=""
          elementLevelClassName="md:py-[4px]"
          transition={{ ease: [0.909, 0.151, 0.153, 0.86], duration: 1 }}
          rotationInterval={4000}
        />
      </div>
    </motion.div>
    </>
  )
}
