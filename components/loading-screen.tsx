"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import TextRotate from "@/components/fancy/text/text-rotate"

const quotes = [
  "Design is not just what it looks like. Design is how it works.",
  "The details are not the details. They make the design.",
  "Simplicity is the ultimate sophistication.",
  "Make it work, make it right, make it fast.",
  "Good design is as little design as possible.",
]

interface LoadingScreenProps {
  onFinish: () => void
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [show, setShow] = useState(true)
  const [randomQuote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onFinish, 800)
    }, 2500)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-lg px-8 text-center">
            <TextRotate
              texts={[randomQuote]}
              mainClassName="text-white text-lg sm:text-xl md:text-2xl font-overusedGrotesk leading-relaxed"
              staggerFrom={"random"}
              splitBy="characters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={10000}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
