"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import { motion, Transition } from "motion/react"

const transition = { type: "spring", duration: 1, bounce: 0 } as Transition
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, amount: 0.1 }

export default function About() {
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

  return (
    <div className="w-dvw h-dvh bg-[#fefefe] relative p-0">
      <div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-50% via-[#fefefe]/50 to-transparent pointer-events-none isolate z-10" />

      <div
        className="h-full w-full z-10 bg-[#fefefe] overflow-scroll pt-20"
        ref={containerRef}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8 mt-24 pb-64 text-black pt-24">
          <h1 className="text-4xl font-calendas tracking-tight mb-12">
            About Me
          </h1>

          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Luca Garofolo"
              className="w-32 h-32 rounded-full object-cover float-left mr-6 mb-4"
            />
          </div>

          <div className="leading-normal space-y-4 font-overusedGrotesk text-neutral-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p>
                I&apos;m Luca Garofolo, a{" "}
                <TextHighlighter
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                  useInViewOptions={inViewOptions}
                >
                  full-stack developer and designer
                </TextHighlighter>{" "}
                based in Italy. I&apos;ve been building for the web for over 5 years,
                working with startups, agencies, and direct clients to create
                digital experiences that are both functional and delightful.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p>
                My approach is rooted in{" "}
                <TextHighlighter
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                  useInViewOptions={inViewOptions}
                >
                  simplicity, clarity, and purpose
                </TextHighlighter>
                . I believe the best interfaces are invisible — they let users
                focus on what matters without getting in the way.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p>
                I specialize in{" "}
                <TextHighlighter
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                  useInViewOptions={inViewOptions}
                >
                  React, Next.js, and design systems
                </TextHighlighter>
                , but I&apos;m always exploring new tools and techniques. I love
                the intersection of code and creativity, and I&apos;m constantly
                pushing myself to make things that are a little bit better than
                yesterday.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p>
                When I&apos;m not coding, you&apos;ll find me{" "}
                <TextHighlighter
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                  useInViewOptions={inViewOptions}
                >
                  experimenting with type design, photography, or reading about
                  cognitive science
                </TextHighlighter>
                . I think the best designers are curious about everything.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p>
                <TextHighlighter
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                  useInViewOptions={inViewOptions}
                >
                  Every project is a chance to learn something new
                </TextHighlighter>
                . If that sounds like your kind of collaboration,{" "}
                <a
                  href="mailto:luca@example.com"
                  className="text-[#ff5941] hover:underline"
                >
                  let&apos;s talk
                </a>
                .
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
