"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const educations = [
    {
      school: "USC Viterbi School of Engineering",
      degree: "Bachelor of Science (BS), Biomedical Engineering",
      period: "Spring 2007",
      color: "#FF647C",
    },
    {
      school: "Stanton College Preparatory School",
      period: "Shout out to Mu Alpha Theta",
      color: "#00B2FF", // Using a different color for variety
    },
  ]

  return (
    <section id="education" className="py-20 bg-[#161B28]" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-[#4ADE80] mb-12">EDUCATION</h2>
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r rounded-2xl transform scale-105 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
                style={{ background: `linear-gradient(to right, ${edu.color}, ${edu.color}66)` }}
              />
              <div className="relative bg-[#1C2333]/90 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-2" style={{ color: edu.color }}>
                  {edu.school}
                </h3>
                {edu.degree && <p className="text-[#00B2FF] mb-1">{edu.degree}</p>}
                <p className="text-gray-300">{edu.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

