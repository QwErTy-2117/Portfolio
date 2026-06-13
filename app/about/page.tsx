"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Lenis from "lenis"

import { TextHighlighter, type TextHighlighterRef } from "@/components/fancy/text/text-highlighter"
import { motion, Transition } from "motion/react"
import Gravity, { MatterBody } from "@/components/fancy/physics/gravity"

const transition = { type: "spring", duration: 1, bounce: 0 } as Transition
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, amount: 0.1 }

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const aiHighlightRef = useRef<TextHighlighterRef>(null)
  const designHighlightRef = useRef<TextHighlighterRef>(null)

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

  useEffect(() => {
    const timer = setTimeout(() => {
      aiHighlightRef.current?.animate()
      designHighlightRef.current?.animate()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="w-dvw h-dvh bg-[#fefefe] relative p-0 overflow-y-auto"
      ref={containerRef}
    >
      <div className="relative z-10 bg-[#fefefe] pt-20 min-h-screen">
        <Gravity gravity={{ x: 0, y: 1 }} className="!absolute !inset-x-0 !top-0 !h-dvh !w-full !z-10" resetOnResize={true}>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="20%"
            y="15%"
            onClick={() => window.open("mailto:garofololuca7@gmail.com")}
          >
            <div className="text-base sm:text-lg bg-[#ff5941] text-white rounded-full px-6 py-3 hover:cursor-grab select-none font-overusedGrotesk">
              garofololuca7@gmail.com
            </div>
          </MatterBody>

          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="60%"
            y="25%"
            onClick={() => window.open("https://github.com/QwErTy-2117", "_blank")}
          >
            <div className="text-base sm:text-lg bg-neutral-800 text-white rounded-full px-6 py-3 hover:cursor-grab select-none font-overusedGrotesk">
              GitHub
            </div>
          </MatterBody>

          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="75%"
            y="35%"
          >
            <div className="text-base sm:text-lg bg-[#0a66c2] text-white rounded-full px-6 py-3 hover:cursor-grab select-none font-overusedGrotesk">
              Endless Curiosity
            </div>
          </MatterBody>

          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="40%"
            y="20%"
            angle={5}
          >
            <div className="text-base sm:text-lg bg-neutral-100 text-neutral-700 rounded-full px-5 py-3 hover:cursor-grab select-none font-overusedGrotesk border border-neutral-200">
              Based in Italy
            </div>
          </MatterBody>

          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="80%"
            y="15%"
            angle={-8}
          >
            <div className="text-base sm:text-lg bg-white text-[#ff5941] rounded-full px-5 py-3 hover:cursor-grab select-none font-overusedGrotesk border border-[#ff5941]">
              5+ Years Experience
            </div>
          </MatterBody>

          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="30%"
            y="35%"
            angle={3}
          >
            <div className="text-base sm:text-lg bg-[#1f464d] text-white rounded-full px-5 py-3 hover:cursor-grab select-none font-overusedGrotesk">
              React · Next.js
            </div>
          </MatterBody>

          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="50%"
            y="30%"
            angle={-5}
          >
            <div className="text-base sm:text-lg bg-[#e794da] text-white rounded-full px-5 py-3 hover:cursor-grab select-none font-overusedGrotesk">
              Design Systems
            </div>
          </MatterBody>

          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="65%"
            y="45%"
            angle={7}
          >
            <div className="text-base sm:text-lg bg-[#f97316] text-white rounded-full px-5 py-3 hover:cursor-grab select-none font-overusedGrotesk">
              UI/UX Design
            </div>
          </MatterBody>
        </Gravity>

        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 pb-16 text-black pt-24">
          <h1 className="text-4xl font-calendas tracking-tight mb-12">
            About Me
          </h1>

          <div className="mb-12">
            <img
              src="/images/profile.svg"
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
                I help people improve the efficiency and productivity of their work by{" "}
                <TextHighlighter
                  ref={aiHighlightRef}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                  highlightTextColor="#fff"
                  useInViewOptions={inViewOptions}
                >
                  introducing AI into it
                </TextHighlighter>
                , through agentic systems or automated workflows. If you&apos;re completely new to this space, I&apos;ll guide you through everything you need to know.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p>
                For me, the experience is as vital as the technology—if it isn&apos;t designed well, it doesn&apos;t matter how clean the code is. I approach every project with a{" "}
                <TextHighlighter
                  ref={designHighlightRef}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                  highlightTextColor="#fff"
                  useInViewOptions={inViewOptions}
                >
                  design-first sensibility
                </TextHighlighter>
                , ensuring that the output is actually intuitive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p>
                My curiosity is probably too broad for my own good. I&apos;m as likely to be reading Deleuze, Plato, or Pirandello as I am to be digging into design history or mathematics. I find that the best systems are often inspired by the most unrelated disciplines.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p>
                I think long, move fast, and prefer building things that actually work over talking about how they might work. If you&apos;re looking for someone to ship a vision without the corporate friction,{" "}
                <a
                  href="mailto:garofololuca7@gmail.com"
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

      <div className="sticky z-0 bottom-0 w-full h-80 bg-white flex justify-center items-center">
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
                <a href="https://github.com/QwErTy-2117" target="_blank" rel="noopener noreferrer">GitHub</a>
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
  )
}
