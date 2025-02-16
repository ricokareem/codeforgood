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
      description: "A revolutionary app that does amazing things.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fender-play-2-5ij4cFMYlbyfhxTs370U7yNkmwQ57I.gif",
      link: "https://www.fender.com/play",
      color: "#FF647C",
      unoptimized: true,
    },
    {
      title: "Slingshot Aerospace : Slingshot Laboratory",
      description: "An innovative solution for complex problems.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slingshot-laboratory-a3MSO5bP5mYS6qWby0toQCdgC4xuEE.gif",
      link: "https://www.slingshot.space/solutions/applications#laboratory",
      color: "#00B2FF",
      unoptimized: true,
    },
    {
      title: "Team Coco : Conan Classic",
      description: "Cutting-edge technology meets user-friendly design.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conan-classic-3-U8w9fl0h7o70wQh7v0Y64ZEnv8cV1s.gif",
      link: "https://conanclassic.com",
      color: "#FFB800",
      unoptimized: true,
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
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
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
                    style={{ backgroundColor: project.color }}
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

