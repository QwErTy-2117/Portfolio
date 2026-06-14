"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

export default function MobileGate() {
  const [phase, setPhase] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [erasing, setErasing] = useState(false)

  const TYPE_SPEED = 50
  const ERASE_SPEED = 30

  const line1 = "Nice phone."
  const line2 = "This portfolio needs a bigger screen."
  const line3 = "SEE YOU ON DESKTOP"

  useEffect(() => {
    if (phase !== 0) return
    if (!erasing) {
      if (charCount < line1.length) {
        const timer = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED)
        return () => clearTimeout(timer)
      }
      const timer = setTimeout(() => setErasing(true), 800)
      return () => clearTimeout(timer)
    }
    if (charCount > 0) {
      const timer = setTimeout(() => setCharCount((c) => c - 1), ERASE_SPEED)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setPhase(1)
      setErasing(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [phase, charCount, erasing, line1.length])

  useEffect(() => {
    if (phase !== 1) return
    setCharCount(0)
    const timer = setTimeout(() => setPhase(2), 300)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 2) return
    if (charCount < line2.length) {
      const timer = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setPhase(3)
      setCharCount(0)
    }, 800)
    return () => clearTimeout(timer)
  }, [phase, charCount, line2.length])

  useEffect(() => {
    if (phase !== 3) return
    if (charCount < line3.length) {
      const timer = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
  }, [phase, charCount, line3.length])

  const cursor = (
    <span className="inline-block w-[2px] h-[1em] bg-black ml-0.5 align-middle animate-pulse" />
  )

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-white px-6"
      style={{ zIndex: 9999 }}
    >
      <div className="max-w-xl w-full text-center relative flex flex-col items-center justify-center min-h-[200px]">
        <AnimatePresence mode="wait">
          {phase < 2 && (
            <motion.p
              key="line1"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="text-3xl sm:text-4xl md:text-5xl text-black leading-tight min-h-[1.2em]"
              style={{ fontFamily: "var(--font-overused-grotesk)" }}
            >
              {line1.slice(0, charCount)}
              {phase === 0 && cursor}
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 2 && (
          <motion.p
            key="line2"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 3 ? 0.12 : 1 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl text-black leading-tight min-h-[1.2em]"
            style={{ fontFamily: "var(--font-overused-grotesk)" }}
          >
            {phase === 3 ? line2 : line2.slice(0, charCount)}
            {phase === 2 && charCount < line2.length && cursor}
          </motion.p>
        )}

        {phase >= 3 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="text-3xl sm:text-4xl md:text-5xl text-black leading-tight"
              style={{ fontFamily: "var(--font-overused-grotesk)" }}
            >
              {line3.slice(0, charCount)}
              {charCount < line3.length && cursor}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
