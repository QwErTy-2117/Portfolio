"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { LayoutGroup, motion, Variants } from "motion/react"
import Lenis from "lenis"
import Link from "next/link"

import TextRotate from "@/components/fancy/text/text-rotate"
import { TextHighlighter } from "@/components/fancy/text/text-highlighter"
import SimpleMarquee from "@/components/fancy/blocks/simple-marquee"
import AnimatedPathText from "@/components/fancy/text/text-along-path"
import LoadingScreen from "@/components/loading-screen"
import { cn } from "@/lib/utils"
import { projects } from "@/data/projects"

const highlightTransition = { type: "spring", duration: 1, delay: 0.4, bounce: 0 } as const
const highlightClass = "rounded-[0.3em] px-px"
const highlightColor = "#ff5941"
const inViewOptions = { once: true, initial: true, amount: 0.1 }

const howIWorkPaths = [
  "M1 248C214 -47 582 158 679 -39",
  "M1 208C214 -87 582 118 679 -79",
  "M1 168C214 -127 582 78 679 -119",
]

const howIWorkTexts = [
  `REACT • NEXT.JS • TYPESCRIPT • NODE.JS • PYTHON • FIGMA • TAILWIND • MOTION`,
  `UX DESIGN • UI DESIGN • PROTOTYPING • DESIGN SYSTEMS • BRANDING • RESEARCH`,
  `FULL-STACK • FRONTEND • BACKEND • API • DATABASE • DEVOPS • CLOUD`,
]

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
  const [contentRevealed, setContentRevealed] = useState(false)

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
    setContentRevealed(true)
  }, [])

  const firstRow = projects.slice(0, Math.floor(projects.length / 2))
  const secondRow = projects.slice(Math.floor(projects.length / 2))

  return (
    <>
      {loading && <LoadingScreen onFinish={handleLoadingFinish} dismiss={dismissLoading} />}

      <div
        className="w-dvw h-dvh bg-[#fefefe] overflow-y-auto overflow-x-hidden relative"
        ref={containerRef}
      >
        <div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-50% via-[#fefefe]/50 to-transparent pointer-events-none isolate z-20" />

        <div
          className="relative z-10 bg-[#fefefe]"
          style={{
            filter: contentRevealed ? "blur(0px)" : "blur(20px)",
            transition: "filter 2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Hero */}
          <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
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
                    texts={[
                      "Luca Garofolo ✦",
                      "a developer ⚡",
                      "a designer ✽",
                      "a dreamer ✦",
                      "a creator 🚀",
                    ]}
                    mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#ff5941] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </motion.div>
              </LayoutGroup>
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <h2 className="text-sm font-overusedGrotesk text-neutral-400 mb-6 tracking-wider uppercase">
                ✽ About
              </h2>
              <div className="leading-relaxed space-y-4 font-overusedGrotesk text-neutral-600 text-base sm:text-lg max-w-xl">
                <p>
                  I&apos;m a developer and designer with a passion for creating
                  digital experiences that are{" "}
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

            {/* Projects Marquee — Isometric 3D */}
            <div className="mb-24 h-[500px] sm:h-[600px] relative overflow-hidden">
              <h2 className="absolute text-center text-3xl sm:text-5xl md:text-6xl top-[15%] left-1/2 -translate-x-1/2 text-black font-calendas z-10">
                My Projects
              </h2>

              <div
                className="absolute h-1/2 sm:h-full w-[200%] -left-3/4 top-28 flex flex-col space-y-2 sm:space-y-3 md:space-y-4 perspective-near"
                style={{
                  transform:
                    "rotateX(45deg) rotateY(-15deg) rotateZ(35deg) translateZ(-200px)",
                }}
              >
                <SimpleMarquee
                  className="w-full"
                  baseVelocity={10}
                  repeat={3}
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
                  repeat={3}
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

            {/* How I Work */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative w-full h-[400px] sm:h-[500px] mb-24 overflow-hidden"
            >
              <h2 className="text-sm font-overusedGrotesk text-neutral-400 mb-6 tracking-wider uppercase text-center">
                ✦ How I Work
              </h2>
              <div className="absolute w-full h-full">
                {howIWorkPaths.map((path, i) => (
                  <AnimatedPathText
                    key={`work-path-${i}`}
                    path={path}
                    pathId={`work-path-${i}`}
                    svgClassName="absolute -left-[100px] top-1/4 w-[calc(100%+200px)] h-full"
                    viewBox="0 0 680 250"
                    text={howIWorkTexts[i]}
                    textClassName="text font-thin text-neutral-400 text-xs sm:text-sm"
                    animationType="auto"
                    duration={i * 0.5 + 5}
                    textAnchor="start"
                  />
                ))}
              </div>
            </motion.div>

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
