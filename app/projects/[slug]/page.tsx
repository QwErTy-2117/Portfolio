"use client"

import { useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "motion/react"
import Lenis from "lenis"
import { notFound } from "next/navigation"

import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import { projects } from "@/data/projects"
import { Transition } from "motion"
import InteractiveHoverButton from "@/components/shadcn-space/button/button-19"

const transition = { type: "spring", duration: 1, delay: 0.4, bounce: 0 } as Transition
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, initial: true, amount: 0.1 }

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projects.find((p) => p.slug === slug)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      autoRaf: true,
      wrapper: containerRef.current,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  if (!project) {
    notFound()
  }

  return (
    <div className="w-dvw h-dvh bg-[#fefefe] overflow-y-auto overflow-x-hidden" ref={containerRef}>
      <div className="bg-[#fefefe]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 pb-64 text-black pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-medium mb-12 font-calendas tracking-tight"
          >
            {project.title}
          </motion.h1>

          <div className="leading-normal space-y-4 font-overusedGrotesk text-neutral-700">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i}>
                {para.split(/(\*\*.*?\*\*)/).map((part, j) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <TextHighlighter
                        key={j}
                        className={highlightClass}
                        transition={transition}
                        highlightColor={highlightColor}
                        highlightTextColor="#fff"
                        useInViewOptions={inViewOptions}
                      >
                        {part.slice(2, -2)}
                      </TextHighlighter>
                    )
                  }
                  return part
                })}
              </p>
            ))}

            {project.slug === "kitchen-unit" && project.images.slice(1, 2).map((img, i) => (
              <div key={i} className="my-8">
                <img
                  src={img}
                  alt={`${project.title} screenshot`}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            ))}

            {project.slug === "kitchen-unit" && project.images.slice(2).map((img, i) => (
              <div key={i} className="my-8">
                <img
                  src={img}
                  alt={`${project.title} detail`}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <InteractiveHoverButton
              text="Back to projects"
              onClick={() => router.push("/projects")}
              className="text-sm font-overusedGrotesk !border-[#ff5941] text-[#ff5941] hover:!border-[#ff5941] hover:text-[#ff5941]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
