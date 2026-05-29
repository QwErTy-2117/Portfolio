"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import Lenis from "lenis"
import Link from "next/link"

import TextRotate from "@/components/fancy/text/text-rotate"
import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import MarqueeAlongSvgPath from "@/components/fancy/blocks/marquee-along-svg-path"
import LoadingScreen from "@/components/loading-screen"
import { projects } from "@/data/projects"

const path =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"

const highlightTransition = { type: "spring", duration: 1, bounce: 0 } as const
const highlightClass = "rounded-[0.15em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, amount: 0.3 }

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)

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

  const handleLoadingFinish = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <LoadingScreen onFinish={handleLoadingFinish} />}

      <div
        className="w-dvw h-dvh bg-[#fefefe] overflow-y-auto overflow-x-hidden"
        ref={containerRef}
      >
        <div className="relative z-10 min-h-[calc(100dvh+20rem)]">
          {/* Hero */}
          <div className="max-w-3xl mx-auto px-8 pt-32 sm:pt-40 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-calendas tracking-tight text-black leading-[0.9] mb-4">
                hey there,
                <br />
                meet
              </h1>
              <div className="flex items-center gap-3 text-3xl sm:text-4xl md:text-6xl font-calendas tracking-tight text-black leading-[0.9] flex-wrap mt-4">
                <TextRotate
                  texts={[
                    "Luca Garofolo ✦",
                    "a developer ⚡",
                    "a designer ✽",
                    "a dreamer ✦",
                    "a creator 🚀",
                  ]}
                  mainClassName="text-white px-3 sm:px-4 bg-[#ff5941] overflow-hidden py-1 sm:py-1.5 justify-center rounded-xl"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2200}
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-500 text-base sm:text-lg font-overusedGrotesk max-w-xl leading-relaxed mt-8 mb-24"
            >
              I build things for the web that are functional, playful, and
              human-centered. Based in Italy, making ideas come to life.
            </motion.p>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-24"
            >
              <h2 className="text-sm font-overusedGrotesk text-neutral-400 mb-6 tracking-wider uppercase">
                ✽ About
              </h2>
              <div className="leading-relaxed space-y-4 font-overusedGrotesk text-neutral-600 text-base sm:text-lg max-w-xl">
                <p>
                  I&apos;m a full-stack developer and designer who loves{" "}
                  <TextHighlighter
                    className={highlightClass}
                    transition={highlightTransition}
                    highlightColor={highlightColor}
                    useInViewOptions={inViewOptions}
                  >
                    turning complex problems into simple, beautiful experiences
                  </TextHighlighter>
                  . Every project starts with a question: how can this feel good
                  to use?
                </p>
                <p>
                  I believe in{" "}
                  <TextHighlighter
                    className={highlightClass}
                    transition={highlightTransition}
                    highlightColor={highlightColor}
                    useInViewOptions={inViewOptions}
                  >
                    minimal, playful, human-centered design
                  </TextHighlighter>
                  . Whether I&apos;m building a web app, a brand identity, or a
                  design system, I care deeply about the details.
                </p>
              </div>
            </motion.div>

            {/* Projects Marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-sm font-overusedGrotesk text-neutral-400 mb-8 tracking-wider uppercase">
                ✦ Featured Projects
              </h2>

              <MarqueeAlongSvgPath
                path={path}
                viewBox="0 0 996 330"
                baseVelocity={8}
                slowdownOnHover
                draggable
                repeat={2}
                dragSensitivity={0.1}
                className="w-full scale-105"
                responsive
                grabCursor
              >
                {projects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <div className="w-14 h-full hover:scale-150 duration-300 ease-in-out">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-lg"
                        draggable={false}
                      />
                    </div>
                  </Link>
                ))}
              </MarqueeAlongSvgPath>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="mt-32 mb-32 text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-calendas tracking-tight text-black mb-6">
                Let&apos;s work together
              </h2>
              <p className="text-neutral-500 font-overusedGrotesk max-w-md mx-auto mb-8">
                Have a project in mind? I&apos;d love to hear about it.
              </p>
              <a
                href="mailto:luca@example.com"
                className="inline-block px-6 py-3 rounded-full bg-[#ff5941] text-white font-overusedGrotesk text-sm hover:bg-[#ff5941]/90 transition-colors"
              >
                Get in touch
              </a>
            </motion.div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky z-0 bottom-0 left-0 w-full h-80 bg-white flex justify-center items-center">
          <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-[#ff5941]">
            <div className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl">
              <ul className="space-y-1">
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <Link href="/projects">Projects</Link>
                </li>
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <Link href="/about">About</Link>
                </li>
              </ul>
              <ul className="space-y-1">
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </li>
                <li className="hover:underline cursor-pointer text-neutral-600 hover:text-[#ff5941] transition-colors">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
              </ul>
            </div>
            <h2 className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-[#ff5941] font-calendas leading-none select-none">
              Luca
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}
