"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating"
import { projects } from "@/data/projects"

const positions = [
  { depth: 1.5, className: "top-[16%] left-[22%]" },
  { depth: 2.5, className: "top-[11%] left-[55%]" },
  { depth: 1, className: "top-[23%] left-[80%]" },
  { depth: 2, className: "top-[42%] left-[18%]" },
  { depth: 3, className: "top-[37%] left-[82%]" },
  { depth: 1.5, className: "top-[68%] left-[20%]" },
  { depth: 2, className: "top-[74%] left-[55%]" },
  { depth: 1, className: "top-[64%] left-[78%]" },
]

const sizes = [
  "w-28 h-28 md:w-36 md:h-36",
  "w-32 h-20 md:w-40 md:h-28",
  "w-24 h-24 md:w-32 md:h-32",
  "w-32 h-32 md:w-40 md:h-40",
  "w-20 h-20 md:w-28 md:h-28",
  "w-28 h-20 md:w-36 md:h-28",
  "w-24 h-32 md:w-32 md:h-40",
  "w-32 h-24 md:w-44 md:h-32",
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
            className="text-sm font-overusedGrotesk px-6 py-3 rounded-full bg-[#ff5941] text-white hover:bg-[#ff5941]/90 transition-colors"
          >
            About
          </Link>
          <Link
            href="mailto:garofololuca7@gmail.com"
            className="text-sm font-overusedGrotesk px-6 py-3 rounded-full border border-[#ff5941] text-[#ff5941] hover:bg-[#ff5941] hover:text-white transition-colors"
          >
            Contact Me
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
                className={`${sizes[i % sizes.length]} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg -translate-x-1/2 -translate-y-1/2`}
              />
            </Link>
          </FloatingElement>
        ))}
      </Floating>
    </div>
  )
}
