"use client"

import { useEffect, useState } from "react"
import useScreenSize from "@/hooks/use-screen-size"
import MobileGate from "@/components/mobile-gate"

export default function MobileGateWrapper({ children }: { children: React.ReactNode }) {
  const screenSize = useScreenSize()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setInitialized(true)
  }, [])

  if (!initialized) {
    return <>{children}</>
  }

  if (screenSize.lessThan("md")) {
    return <MobileGate />
  }

  return <>{children}</>
}
