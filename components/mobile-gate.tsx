"use client"

import { useEffect, useState } from "react"

export default function MobileGate() {
  const [line1Count, setLine1Count] = useState(0)
  const [line2Count, setLine2Count] = useState(0)
  const [line3Count, setLine3Count] = useState(0)

  const TYPE_SPEED = 55

  const line1 = "Nice phone."
  const line2 = "This portfolio needs a bigger screen."
  const line3 = "SEE YOU ON DESKTOP"

  useEffect(() => {
    if (line1Count < line1.length) {
      const timer = setTimeout(() => setLine1Count((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
  }, [line1Count, line1.length])

  useEffect(() => {
    if (line1Count < line1.length) return
    if (line2Count < line2.length) {
      const timer = setTimeout(() => setLine2Count((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
  }, [line1Count, line2Count, line1.length, line2.length])

  useEffect(() => {
    if (line1Count < line1.length) return
    if (line2Count < line2.length) return
    if (line3Count < line3.length) {
      const timer = setTimeout(() => setLine3Count((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
  }, [line1Count, line2Count, line3Count, line1.length, line2.length, line3.length])

  const cursor = (
    <span className="inline-block w-[2px] h-[1em] bg-black ml-0.5 align-middle animate-pulse" />
  )

  return (
    <div className="fixed inset-0 bg-white px-8 sm:px-12 md:px-16 py-16 sm:py-20" style={{ zIndex: 9999 }}>
      <div
        className="max-w-2xl mx-auto text-left"
        style={{ fontFamily: "var(--font-overused-grotesk)" }}
      >
        <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed min-h-[1.4em]">
          {line1.slice(0, line1Count)}
          {line1Count < line1.length && cursor}
        </p>

        <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed min-h-[1.4em]">
          {line2.slice(0, line2Count)}
          {line1Count >= line1.length && line2Count < line2.length && cursor}
        </p>

        <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed min-h-[1.4em]">
          {line3.slice(0, line3Count)}
          {line2Count >= line2.length && line3Count < line3.length && cursor}
        </p>
      </div>
    </div>
  )
}
