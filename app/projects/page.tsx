"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating"
import { projects } from "@/data/projects"

const positions = [
  { depth: 1, className: "top-[10%] left-[20%]" },
  { depth: 2, className: "top-[15%] left-[50%]" },
  { depth: 1, className: "top-[20%] left-[80%]" },
  { depth: 0.75, className: "top-[45%] left-[25%]" },
  { depth: 2, className: "top-[55%] left-[70%]" },
  { depth: 1, className: "top-[70%] left-[15%]" },
  { depth: 3, className: "top-[75%] left-[55%]" },
  { depth: 2, className: "top-[85%] left-[35%]" },
]

const sizes = [
  "w-20 h-20 md:w-28 md:h-28",
  "w-16 h-16 md:w-20 md:h-20",
  "w-24 h-24 md:w-32 md:h-32",
  "w-28 h-36 md:w-36 md:h-44",
  "w-20 h-20 md:w-24 md:h-24",
  "w-24 h-24 md:w-28 md:h-28",
  "w-16 h-16 md:w-20 md:h-20",
  "w-32 h-20 md:w-48 md:h-28",
]

export default function Projects() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    )
  }, [animate])

  return (
    <div
      className="flex w-dvw h-dvh justify-center items-center bg-black overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-50 text-center space-y-6 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl text-white font-calendas italic leading-none">
          Projects
        </p>
        <p className="text-neutral-400 font-overusedGrotesk max-w-md">
          A selection of things I&apos;ve built.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link
            href="/about"
            className="text-sm font-overusedGrotesk px-6 py-2.5 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-overusedGrotesk px-6 py-2.5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Contact
          </Link>
        </div>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        {projects.slice(0, 8).map((project, i) => (
          <FloatingElement key={project.slug} depth={positions[i % positions.length].depth} className={positions[i % positions.length].className}>
            <Link href={`/projects/${project.slug}`}>
              <motion.img
                initial={{ opacity: 0 }}
                src={project.images[0]}
                alt={project.title}
                className={`${sizes[i % sizes.length]} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg`}
              />
            </Link>
          </FloatingElement>
        ))}
      </Floating>
    </div>
  )
}
