"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects = [
    {
      title: "Fender : Fender Play",
      description: "Forget 'Mary Had A Little Lamb'. Pick any guitar, and learn how to play your favorite song.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fender-play-2-5ij4cFMYlbyfhxTs370U7yNkmwQ57I.gif",
      link: "https://www.fender.com/play",
      color: "#FF647C",
      buttonColor: "#D14D63",
      altText: "Animated demonstration of Fender Play app interface, showing guitar lessons and interactive features",
    },
    {
      title: "Slingshot Aerospace : Slingshot Laboratory",
      description: "Learn the fundamentals of astrodynamics and experiment.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slingshot-laboratory-a3MSO5bP5mYS6qWby0toQCdgC4xuEE.gif",
      link: "https://www.slingshot.space/solutions/applications#laboratory",
      color: "#00B2FF",
      buttonColor: "#0090CC",
      altText:
        "Animated visualization of Slingshot Laboratory's 3D space environment, displaying orbital mechanics and satellite trajectories",
    },
    {
      title: "Team Coco : Conan Classic",
      description: "The best clips from over 25 years of cutting-edge television.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conan-classic-3-U8w9fl0h7o70wQh7v0Y64ZEnv8cV1s.gif",
      link: "https://conanclassic.com",
      color: "#FFB800",
      buttonColor: "#CC9300",
      altText: "Animated showcase of Conan Classic website, featuring clips and highlights from Conan O'Brien's shows",
    },
  ]

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-[#FF647C] mb-12">PAST PROJECTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="absolute inset-0 rounded-2xl transform scale-105 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                style={{ backgroundColor: project.color }}
              />
              <div className="relative bg-[#1C2333]/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
                <div className="relative h-48">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.altText}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: project.color }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-xl text-white transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                    style={{ backgroundColor: project.buttonColor }}
                  >
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

