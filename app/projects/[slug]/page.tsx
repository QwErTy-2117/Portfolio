"use client"

import { useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, stagger, useAnimate } from "motion/react"
import Lenis from "lenis"
import { notFound } from "next/navigation"

import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating"
import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import { projects } from "@/data/projects"
import { Transition } from "motion"

const transition = { type: "spring", duration: 1, bounce: 0 } as Transition
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, amount: 0.1 }

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projects.find((p) => p.slug === slug)
  const [scope, animate] = useAnimate()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    )
  }, [])

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
    <div className="w-dvw h-dvh bg-[#fefefe]" ref={containerRef}>
      {/* Parallax Section */}
      <div className="w-full h-screen relative overflow-hidden bg-black">
        <div
          className="flex w-full h-full justify-center items-center overflow-hidden"
          ref={scope}
        >
          <motion.div
            className="z-50 text-center space-y-4 items-center flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.88, delay: 1.5 }}
          >
            <p className="text-4xl md:text-6xl z-50 text-white font-calendas italic">
              {project.title}
            </p>
            <p className="text-xs z-50 text-neutral-400 font-overusedGrotesk">
              {project.tag} — {project.year}
            </p>
          </motion.div>

          <Floating sensitivity={-1} className="overflow-hidden">
            {project.images.map((img, i) => {
              const positions = [
                { depth: 0.5, className: "top-[8%] left-[11%]" },
                { depth: 1, className: "top-[10%] left-[32%]" },
                { depth: 2, className: "top-[2%] left-[53%]" },
                { depth: 1, className: "top-[40%] left-[2%]" },
                { depth: 4, className: "top-[73%] left-[15%]" },
                { depth: 1, className: "top-[80%] left-[50%]" },
              ]
              const pos = positions[i % positions.length]
              const sizes = [
                "w-24 h-24 md:w-32 md:h-32",
                "w-20 h-20 md:w-28 md:h-28",
                "w-28 h-40 md:w-40 md:h-52",
                "w-28 h-28 md:w-36 md:h-36",
                "w-40 md:w-52 h-full",
                "w-24 h-24 md:w-32 md:h-32",
              ]
              return (
                <FloatingElement
                  key={i}
                  depth={pos.depth}
                  className={pos.className}
                >
                  <motion.img
                    initial={{ opacity: 0 }}
                    src={img}
                    className={`${sizes[i % sizes.length]} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg`}
                  />
                </FloatingElement>
              )
            })}
          </Floating>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 bg-[#fefefe]">
        <div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-50% via-[#fefefe]/50 to-transparent pointer-events-none isolate" />

        <div className="max-w-md mx-auto px-4 pb-64 text-black">
          <div className="leading-normal space-y-4 font-overusedGrotesk text-neutral-700 pt-16">
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
              scale and adapt to future needs.
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/about"
              className="text-sm font-overusedGrotesk text-[#ff5941] hover:underline"
            >
              Learn more about me →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
