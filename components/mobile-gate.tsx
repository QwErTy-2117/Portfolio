"use client"

import { useEffect, useState } from "react"

export default function MobileGate() {
  const [line1Count, setLine1Count] = useState(0)
  const [line2Count, setLine2Count] = useState(0)
  const [line3Count, setLine3Count] = useState(0)
  const [phase, setPhase] = useState(0)

  const TYPE_SPEED = 55
  const PAUSE = 800
  const cursorW = <span className="inline-block w-[2px] h-[1em]" />

  const line1 = "Nice phone,"
  const line2 = "but this portfolio needs a bigger screen."
  const line3 = "SEE YOU ON DESKTOP"

  useEffect(() => {
    if (phase !== 0) return
    if (line1Count < line1.length) {
      const timer = setTimeout(() => setLine1Count((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setPhase(1), PAUSE)
    return () => clearTimeout(timer)
  }, [phase, line1Count, line1.length])

  useEffect(() => {
    if (phase !== 1) return
    if (line2Count < line2.length) {
      const timer = setTimeout(() => setLine2Count((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setPhase(2), PAUSE)
    return () => clearTimeout(timer)
  }, [phase, line2Count, line2.length])

  useEffect(() => {
    if (phase !== 2) return
    if (line3Count < line3.length) {
      const timer = setTimeout(() => setLine3Count((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(timer)
    }
  }, [phase, line3Count, line3.length])

  const cursor = (
    <span className="inline-block w-[2px] h-[1em] bg-black ml-0.5 align-middle animate-pulse" />
  )

  return (
    <div className="fixed inset-0 bg-white px-8 sm:px-12 md:px-16 py-16 sm:py-20" style={{ zIndex: 9999 }}>
      <div
        className="max-w-2xl mx-auto text-left"
        style={{ fontFamily: "var(--font-overused-grotesk)" }}
      >
        <div className="relative">
          <div className="invisible" aria-hidden="true">
            <p className="text-3xl sm:text-4xl md:text-5xl leading-relaxed">{line1}</p>
            <p className="text-3xl sm:text-4xl md:text-5xl leading-relaxed">{line2}</p>
            <p className="text-3xl sm:text-4xl md:text-5xl leading-relaxed">{line3}</p>
          </div>

          <div className="absolute inset-0">
            <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed">
              {line1.slice(0, line1Count)}
              {phase === 0 ? cursor : cursorW}
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed">
              {line2.slice(0, line2Count)}
              {phase === 1 ? cursor : cursorW}
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl text-black leading-relaxed">
              {line3.slice(0, line3Count)}
              {phase === 2 ? cursor : cursorW}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
