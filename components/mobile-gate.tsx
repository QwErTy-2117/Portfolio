"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"

export default function MobileGate() {
  const [phase, setPhase] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [erasing, setErasing] = useState(false)

  const line1 = "Nice phone."
  const line2 = "This portfolio needs a bigger screen."
  const line3 = "SEE YOU ON DESKTOP"

  useEffect(() => {
    if (phase !== 0) return
    if (!erasing) {
      if (charCount < line1.length) {
        const timer = setTimeout(() => setCharCount((c) => c + 1), 90)
        return () => clearTimeout(timer)
      }
      const timer = setTimeout(() => setErasing(true), 800)
      return () => clearTimeout(timer)
    }
    if (charCount > 0) {
      const timer = setTimeout(() => setCharCount((c) => c - 1), 40)
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
    const timer = setTimeout(() => setPhase(2), 300)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 2) return
    if (charCount < line2.length) {
      const timer = setTimeout(() => setCharCount((c) => c + 1), 30)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setPhase(3), 1200)
    return () => clearTimeout(timer)
  }, [phase, charCount, line2.length])

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
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="text-3xl sm:text-4xl md:text-5xl text-black leading-tight min-h-[1.2em]"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              {line1.slice(0, charCount)}
              {phase === 0 && (
                <span
                  className="inline-block w-[2px] h-[1em] bg-black ml-0.5 align-middle animate-pulse"
                />
              )}
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 2 && (
          <motion.p
            key="line2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 3 ? 0.15 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl text-black leading-tight min-h-[1.2em]"
            style={{ fontFamily: "var(--font-overused-grotesk)" }}
          >
            {line2.slice(0, phase === 2 ? charCount : line2.length)}
            {phase === 2 && charCount < line2.length && (
              <span
                className="inline-block w-[2px] h-[1em] bg-black ml-0.5 align-middle animate-pulse"
              />
            )}
          </motion.p>
        )}

        {phase >= 3 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 1.6, opacity: 0, rotate: -20, y: -40 }}
              animate={{ scale: 1, opacity: 1, rotate: -3, y: 0 }}
              transition={{
                type: "spring",
                damping: 7,
                stiffness: 200,
                mass: 0.8,
              }}
              className="relative z-10"
            >
              <div className="bg-[#ffcc00] border-[3px] border-black px-6 py-3 sm:px-8 sm:py-4 shadow-xl">
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 8px,
                      #000 8px,
                      #000 10px
                    )`,
                  }}
                />
                <span
                  className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-wider leading-tight block"
                  style={{ fontFamily: "var(--font-overused-grotesk)" }}
                >
                  {line3}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
