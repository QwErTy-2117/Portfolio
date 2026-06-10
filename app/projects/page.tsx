"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards"
import { projects } from "@/data/projects"

const projectColors = [
  "bg-[#f97316]",
  "bg-[#0015ff]",
  "bg-[#ff5941]",
  "bg-[#1f464d]",
  "bg-[#0015ff]",
]

export default function Projects() {
  const container = useRef<HTMLDivElement>(null)

  return (
    <div
      className="h-dvh bg-black overflow-auto text-white"
      ref={container}
    >
      <div className="relative z-10 bg-black">
        <StackingCards
          totalCards={projects.length}
          scrollOptions={{ container: container }}
        >
          <div className="relative font-calendas h-dvh w-full flex flex-col justify-center items-center whitespace-pre">
            <p className="text-5xl md:text-7xl text-white font-calendas italic leading-none mb-4">
              Projects
            </p>
            <p className="text-neutral-400 font-overusedGrotesk text-base md:text-lg max-w-md text-center">
              A selection of things I&apos;ve built.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
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
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-sm font-overusedGrotesk text-neutral-500">
                Scroll down
              </span>
              <span className="text-2xl text-neutral-500">↓</span>
            </div>
          </div>

          {projects.map((project, index) => (
            <StackingCardItem key={project.slug} index={index} className="h-dvh">
              <div
                className={cn(
                  projectColors[index % projectColors.length],
                  "h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative"
                )}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-sm font-overusedGrotesk opacity-80 mb-2">
                    {project.tag} &middot; {project.year}
                  </span>
                  <h3 className="font-bold text-2xl mb-5">{project.title}</h3>
                  <p className="font-overusedGrotesk text-sm sm:text-base max-w-md">
                    {project.description}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-6 text-sm font-overusedGrotesk px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors w-fit font-semibold"
                  >
                    View Project
                  </Link>
                </div>

                <div className="w-full sm:w-1/2 rounded-xl aspect-video relative overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    className="object-cover"
                    fill
                  />
                </div>
              </div>
            </StackingCardItem>
          ))}
        </StackingCards>
      </div>

      <div className="sticky z-0 bottom-0 w-full h-80 bg-black flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-[#ff5941]">
          <div className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl">
            <ul className="space-y-1">
              <li className="hover:underline cursor-pointer text-neutral-500 hover:text-[#ff5941] transition-colors">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:underline cursor-pointer text-neutral-500 hover:text-[#ff5941] transition-colors">
                <Link href="/projects">Projects</Link>
              </li>
              <li className="hover:underline cursor-pointer text-neutral-500 hover:text-[#ff5941] transition-colors">
                <Link href="/about">About</Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li className="hover:underline cursor-pointer text-neutral-500 hover:text-[#ff5941] transition-colors">
                <a href="https://github.com/QwErTy-2117" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li className="hover:underline cursor-pointer text-neutral-500 hover:text-[#ff5941] transition-colors">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </li>
              <li className="hover:underline cursor-pointer text-neutral-500 hover:text-[#ff5941] transition-colors">
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
