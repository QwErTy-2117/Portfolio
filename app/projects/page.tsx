"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { projects } from "@/data/projects"

export default function Projects() {
  return (
    <div className="w-dvw min-h-dvh bg-[#fefefe] pt-28 px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-calendas tracking-tight text-black mb-4"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-500 font-overusedGrotesk mb-12 max-w-md"
        >
          A selection of things I&apos;ve built.
        </motion.p>

        <div className="grid gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * (i + 1), ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block group"
              >
                <div className="rounded-2xl p-6 border border-black/5 bg-white hover:shadow-lg hover:shadow-[#ff5941]/5 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-calendas tracking-tight text-black group-hover:text-[#ff5941] transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-neutral-500 text-sm font-overusedGrotesk mt-1">
                        {project.tag}
                      </p>
                    </div>
                    <span className="text-neutral-400 text-sm font-overusedGrotesk">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-neutral-600 text-sm font-overusedGrotesk mt-3 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
