"use client"

import { useEffect, useState } from "react"

export default function MobileGate() {
  const [line1Count, setLine1Count] = useState(0)
  const [line2Count, setLine2Count] = useState(0)
  const [line3Count, setLine3Count] = useState(0)
  const [erasing, setErasing] = useState(false)
  const [showLine2, setShowLine2] = useState(false)
  const [showLine3, setShowLine3] = useState(false)

  const TYPE_SPEED = 55
  const ERASE_SPEED = 30

  const line1 = "Nice phone."
  const line2 = "This portfolio needs a bigger screen."
  const line3 = "SEE YOU ON DESKTOP"

  useEffect(() => {
    if (showLine2) return
    if (!erasing) {
      if (line1Count < line1.length) {
        const timer = setTimeout(() => setLine1Count((c) => c + 1), TYPE_SPEED)
        return () => clearTimeout(timer)
      }
      const timer = setTimeout(() => setErasing(true), 600)
      return () => clearTimeout(timer)
    }
    if (line1Count > 0) {
      const timer = setTimeout(() => setLine1Count((c) => c - 1), ERASE_SPEED)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setErasing(false)
      setLine1Count(0)
      setShowLine2(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [line1Count, erasing, showLine2, line1.length])

  useEffect(() => {
    if (!showLine2 || showLine3) return
    if (line2Count < line2.length) {
      const timer = setTimeout(() => setLine2Count((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setShowLine3(true), 600)
    return () => clearTimeout(timer)
  }, [showLine2, showLine3, line2Count, line2.length])

  useEffect(() => {
    if (!showLine3) return
    if (line3Count < line3.length) {
      const timer = setTimeout(() => setLine3Count((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
  }, [showLine3, line3Count, line3.length])

  const cursor = (key: string) => (
    <span
      key={key}
      className="inline-block w-[2px] h-[1em] bg-black ml-0.5 align-middle animate-pulse"
    />
  )

  return (
    <div className="fixed inset-0 bg-white px-8 sm:px-12 md:px-16 py-16 sm:py-20" style={{ zIndex: 9999 }}>
      <div
        className="max-w-2xl mx-auto text-left"
        style={{ fontFamily: "var(--font-overused-grotesk)" }}
      >
        <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed min-h-[1.4em]">
          {line1.slice(0, line1Count)}
          {!showLine2 && line1Count < line1.length && cursor("c1")}
          {erasing && line1Count > 0 && cursor("c1e")}
        </p>

        {showLine2 && (
          <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed min-h-[1.4em]">
            {line2.slice(0, showLine3 ? line2.length : line2Count)}
            {!showLine3 && line2Count < line2.length && cursor("c2")}
          </p>
        )}

        {showLine3 && (
          <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed min-h-[1.4em]">
            {line3.slice(0, line3Count)}
            {line3Count < line3.length && cursor("c3")}
          </p>
        )}
      </div>
    </div>
  )
}
