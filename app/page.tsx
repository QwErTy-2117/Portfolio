"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { LayoutGroup, motion, Variants } from "motion/react"
import Lenis from "lenis"
import Link from "next/link"

import TextRotate, { type TextRotateRef } from "@/components/fancy/text/text-rotate"
import {
  TextHighlighter,
  type TextHighlighterRef,
} from "@/components/fancy/text/text-highlighter"
import SimpleMarquee from "@/components/fancy/blocks/simple-marquee"
import AnimatedPathText from "@/components/fancy/text/text-along-path"
import LoadingScreen from "@/components/loading-screen"
import { cn } from "@/lib/utils"
import { projects } from "@/data/projects"

const highlightTransition = { type: "spring", duration: 1, bounce: 0 } as const
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, initial: false, amount: 0.1 }

function MarqueeItem({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const variants = {
    initial: { y: "0px", x: "0px", scale: 1, opacity: 1 },
    hover: {
      y: "-12px",
      x: "-12px",
      scale: 1.05,
      transition: { duration: 0.15, ease: "easeOut" },
    },
  }

  const textVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.15, ease: "easeOut" },
    },
  }

  const imageVariants = {
    initial: { opacity: 1 },
    hover: {
      opacity: 0.45,
      transition: { duration: 0.15, ease: "easeOut" },
    },
  }

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        className={cn(
          "mx-2 sm:mx-3 md:mx-4 cursor-pointer",
          "h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48",
          "relative flex shadow-white/20 shadow-md",
          "overflow-hidden flex-col transform-gpu bg-black rounded-lg"
        )}
        initial="initial"
        whileHover="hover"
        variants={variants as Variants}
      >
        <motion.div
          className="justify-end p-2 sm:p-2.5 md:p-3 h-full flex items-start flex-col leading-tight"
          variants={textVariants as Variants}
        >
          <h3 className="text-white text-sm sm:text-base md:text-lg font-medium z-30">
            {project.title}
          </h3>
          <p className="text-neutral-300 text-xs sm:text-sm md:text-base z-30">
            {project.tag}
          </p>
        </motion.div>
        <motion.img
          src={project.images[0]}
          alt={project.title}
          draggable={false}
          className="object-cover w-full h-full shadow-2xl absolute"
          variants={imageVariants as Variants}
        />
      </motion.div>
    </Link>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [dismissLoading, setDismissLoading] = useState(false)
  const [reveal, setReveal] = useState<"idle" | "white" | "fading" | "done">("idle")
  const textRotateRef = useRef<TextRotateRef>(null)
  const heroHighlightRef = useRef<TextHighlighterRef>(null)
  const aboutHighlightRef = useRef<TextHighlighterRef>(null)
  const servicesRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    const nav = (window as any).navigation
    if (nav?.currentEntry?.index > 0) {
      setReveal("done")
      setLoading(false)
      setDismissLoading(true)
    }
  }, [])

  useEffect(() => {
    if (loading) return
    heroHighlightRef.current?.animate()
    aboutHighlightRef.current?.animate()
  }, [loading])

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
      setDismissLoading(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleLoadingFinish = useCallback(() => {
    setLoading(false)
    setReveal("white")
    setTimeout(() => setReveal("fading"), 50)
    setTimeout(() => setReveal("done"), 1500)
  }, [])

  useEffect(() => {
    if (loading) return
    let intervalId: ReturnType<typeof setInterval> | undefined
    const firstTimer = setTimeout(() => {
      textRotateRef.current?.next()
      intervalId = setInterval(() => {
        textRotateRef.current?.next()
      }, 2000)
    }, 500)
    return () => {
      clearTimeout(firstTimer)
      if (intervalId) clearInterval(intervalId)
    }
  }, [loading])

  const firstRow = projects.slice(0, Math.floor(projects.length / 2))
  const secondRow = projects.slice(Math.floor(projects.length / 2))

  return (
    <>
      {loading && <LoadingScreen onFinish={handleLoadingFinish} dismiss={dismissLoading} />}

      {reveal !== "done" && (
        <div
          className="fixed inset-0 bg-white"
          style={{
            zIndex: 100,
            opacity: reveal === "fading" ? 0 : 1,
            transition: "opacity 1.5s ease",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        className="w-dvw h-dvh bg-[#fefefe] overflow-y-auto overflow-x-clip relative"
        ref={containerRef}
      >
        <div className="relative z-10 bg-[#fefefe]">
          {/* Hero */}
          <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40">
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-calendas tracking-tight text-black leading-[0.9] mb-8 sm:mb-10">
                hey there,
              </h1>
              <LayoutGroup>
                <motion.div
                  className="flex whitespace-pre text-3xl sm:text-4xl md:text-6xl font-calendas tracking-tight text-black leading-[0.9]"
                  layout
                >
                  <motion.span
                    className="pt-0.5 sm:pt-1 md:pt-2"
                    layout
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  >
                    meet{" "}
                  </motion.span>
                  <TextRotate
                    ref={textRotateRef}
                    texts={[
                      "a dreamer ✦",
                      "a developer ⚡",
                      "a designer ✽",
                      "Luca Garofolo ✦",
                      "a creator 🚀",
                    ]}
                    mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#ff5941] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                    auto={false}
                  />
                </motion.div>
              </LayoutGroup>
            </div>

            <p className="text-neutral-500 text-base sm:text-lg font-overusedGrotesk max-w-xl leading-relaxed mt-8 mb-24">
              I build things for the web that are{" "}
              <TextHighlighter
                ref={heroHighlightRef}
                triggerType="ref"
                className={highlightClass}
                transition={highlightTransition}
                highlightColor={highlightColor}
                highlightTextColor="#fff"
                useInViewOptions={inViewOptions}
              >
                functional, playful, and human-centered
              </TextHighlighter>
              . Based in Italy, making ideas come to life.
            </p>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="leading-relaxed space-y-4 font-overusedGrotesk text-neutral-600 text-base sm:text-lg max-w-xl">
                <p>
                  I&apos;m a developer and designer with a passion for creating
                  digital experiences that are{" "}
                  <TextHighlighter
                    ref={aboutHighlightRef}
                    triggerType="ref"
                    className={highlightClass}
                    transition={highlightTransition}
                    highlightColor={highlightColor}
                    highlightTextColor="#fff"
                    useInViewOptions={inViewOptions}
                  >
                    minimal, playful, human-centered design
                  </TextHighlighter>
                  . Whether I&apos;m building a web app, a brand identity, or a
                  design system, I care deeply about the details.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/projects"
                  className="inline-block px-6 py-3 rounded-full border border-[#ff5941] text-[#ff5941] font-overusedGrotesk text-sm hover:bg-[#ff5941] hover:text-white transition-colors"
                >
                  My Projects
                </Link>
                <Link
                  href="/about"
                  className="inline-block px-6 py-3 rounded-full bg-[#ff5941] text-white font-overusedGrotesk text-sm hover:bg-[#ff5941]/90 transition-colors"
                >
                  Learn more about me
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Projects Marquee */}
          <div className="relative w-full overflow-hidden h-[700px] mb-52">
            <h2 className="absolute text-center text-3xl sm:text-5xl md:text-6xl top-[22%] left-1/2 -translate-x-1/2 text-black font-calendas z-10">
              My Projects
            </h2>

            {/* Edge fade gradients */}
            <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#fefefe] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#fefefe] to-transparent z-10 pointer-events-none" />

            <div
              className="absolute h-1/2 sm:h-full w-[150%] -left-[25%] top-56 flex flex-col space-y-2 sm:space-y-3 md:space-y-4"
              style={{
                transform:
                  "rotateX(45deg) rotateY(-15deg) rotateZ(35deg) translateZ(-200px)",
              }}
            >
                <SimpleMarquee
                  className="w-full"
                  baseVelocity={10}
                  repeat={24}
                  draggable={false}
                  scrollSpringConfig={{ damping: 50, stiffness: 400 }}
                  slowDownFactor={0.2}
                  slowdownOnHover
                  slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
                  scrollAwareDirection
                  scrollContainer={containerRef}
                  useScrollVelocity
                  direction="left"
                >
                  {firstRow.map((project, i) => (
                    <MarqueeItem key={project.slug} project={project} index={i} />
                  ))}
                </SimpleMarquee>

                <SimpleMarquee
                  className="w-full"
                  baseVelocity={10}
                  repeat={24}
                  draggable={false}
                  scrollSpringConfig={{ damping: 50, stiffness: 400 }}
                  slowDownFactor={0.2}
                  slowdownOnHover
                  slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
                  scrollAwareDirection
                  scrollContainer={containerRef}
                  useScrollVelocity
                  direction="right"
                >
                  {secondRow.map((project, i) => (
                    <MarqueeItem key={project.slug} project={project} index={i} />
                  ))}
                </SimpleMarquee>
              </div>
          </div>

          {/* Services */}
          <section ref={servicesRef} className="relative h-[300vh] bg-[#fefefe]">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center pt-28">
              <h2 className="text-center text-3xl sm:text-5xl md:text-6xl font-calendas tracking-tight text-black mb-2 z-10">
                What I Do
              </h2>
              <div className="relative w-full flex-1">
                <AnimatedPathText
                  path="M -100 250 C 150 150, 350 350, 600 250 C 850 150, 1000 300, 1100 250"
                  scrollContainer={containerRef}
                  scrollTarget={servicesRef}
                  animationType="scroll"
                  svgClassName="absolute inset-0 w-full h-full"
                  viewBox="0 0 1000 600"
                  text="Web Development  ·  UI/UX Design  ·  Brand Identity"
                  textClassName="font-calendas text-xl sm:text-2xl md:text-3xl fill-[#ff5941]"
                  scrollTransformValues={[-130, 95]}
                  textAnchor="start"
                  scrollOffset={["start end", "end start"]}
                />
                <AnimatedPathText
                  path="M -100 350 C 150 450, 350 250, 600 350 C 850 450, 1000 200, 1100 350"
                  scrollContainer={containerRef}
                  scrollTarget={servicesRef}
                  animationType="scroll"
                  svgClassName="absolute inset-0 w-full h-full"
                  viewBox="0 0 1000 600"
                  text="Creative Consulting  ·  Full-Stack Development  ·  Performance"
                  textClassName="font-calendas text-xl sm:text-2xl md:text-3xl fill-black"
                  scrollTransformValues={[-130, 95]}
                  textAnchor="start"
                  scrollOffset={["start end", "end start"]}
                />
                <AnimatedPathText
                  path="M -100 450 C 150 350, 350 550, 600 450 C 850 350, 1000 500, 1100 450"
                  scrollContainer={containerRef}
                  scrollTarget={servicesRef}
                  animationType="scroll"
                  svgClassName="absolute inset-0 w-full h-full"
                  viewBox="0 0 1000 600"
                  text="Custom Applications  ·  Responsive Design  ·  Accessibility"
                  textClassName="font-calendas text-xl sm:text-2xl md:text-3xl fill-neutral-400"
                  scrollTransformValues={[-130, 95]}
                  textAnchor="start"
                  scrollOffset={["start end", "end start"]}
                />
              </div>
            </div>
          </section>

          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="mt-16 mb-32 text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-calendas tracking-tight text-black mb-6">
                Let&apos;s work together
              </h2>
              <p className="text-neutral-500 font-overusedGrotesk max-w-md mx-auto mb-8">
                <TextHighlighter
                  className={highlightClass}
                  transition={highlightTransition}
                  highlightColor={highlightColor}
                  highlightTextColor="#fff"
                  useInViewOptions={inViewOptions}
                >
                  Have a project in mind?
                </TextHighlighter>{" "}
                I&apos;d love to hear about it.
              </p>
              <a
                href="mailto:garofololuca7@gmail.com"
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
    </>
  )
}
