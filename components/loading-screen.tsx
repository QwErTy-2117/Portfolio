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
  const [visible, setVisible] = useState(true)
  const textRotateRef = useRef<TextRotateRef>(null)

  useEffect(() => {
    if (!dismiss) return
    setVisible(false)
  }, [dismiss])

  useEffect(() => {
    if (visible) return
    const timer = setTimeout(onFinish, 1200)
    return () => clearTimeout(timer)
  }, [visible, onFinish])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="max-w-xl px-8 text-center">
        <TextRotate
          ref={textRotateRef}
          texts={quotes}
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
  )
}
