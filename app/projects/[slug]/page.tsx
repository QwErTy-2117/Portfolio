"use client"

import { useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, stagger, useAnimate } from "motion/react"
import Lenis from "lenis"
import { notFound } from "next/navigation"

import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import { projects } from "@/data/projects"
import { Transition } from "motion"

const transition = { type: "spring", duration: 1, delay: 0.4, bounce: 0 } as Transition
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, initial: true, amount: 0.1 }

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projects.find((p) => p.slug === slug)
  const containerRef = useRef<HTMLDivElement | null>(null)

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
      <div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-50% via-[#fefefe]/50 to-transparent pointer-events-none isolate z-20" />

      <div className="relative z-10 bg-[#fefefe]">
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
            <p>
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                {project.title}
              </TextHighlighter>{" "}
              is a {project.tag} project from {project.year}. {project.description}
            </p>

            <p>
              This project was built with a focus on{" "}
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                performance, accessibility, and clean code
              </TextHighlighter>
              . Every decision was made with the end user in mind.
            </p>

            {project.images.slice(1, 2).map((img, i) => (
              <div key={i} className="my-8">
                <img
                  src={img}
                  alt={`${project.title} screenshot`}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            ))}

            <p>
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                The result
              </TextHighlighter>{" "}
              is a product that feels intuitive and responsive, designed to
              scale and adapt to future needs. The approach combines modern
              tooling with timeless design principles.
            </p>

            {project.images.slice(2).map((img, i) => (
              <div key={i} className="my-8">
                <img
                  src={img}
                  alt={`${project.title} detail`}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            ))}

            <p>
              Every project is an opportunity to{" "}
              <TextHighlighter
                className={highlightClass}
                transition={transition}
                highlightColor={highlightColor}
                useInViewOptions={inViewOptions}
              >
                learn something new and push boundaries
              </TextHighlighter>
              . This one was no different — it challenged conventions and
              delivered something meaningful.
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="text-sm font-overusedGrotesk text-[#ff5941] hover:underline"
            >
              ← Back to projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
