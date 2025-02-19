"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Modal from "./modal"
import { useTranslation } from "react-i18next"

export default function Experience({ onHover, onHoverEnd, onClick, onModalClose, filteredSkills }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [activeExperience, setActiveExperience] = useState(null)
  const { t } = useTranslation("translation")

  const experiences = [
    {
      title: t("experience1.title"),
      company: t("experience1.company"),
      period: t("experience1.period"),
      description: [
        t("experience1.description1"),
        t("experience1.description2"),
        t("experience1.description3"),
        t("experience1.description4"),
      ],
      color: "#FF647C",
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "React Native",
        "Remix",
        "Enzyme",
        "React Testing Library",
        "Prisma ORM",
        "Redis",
        "Elasticsearch",
        "AWS",
        "PostgreSQL",
        "Accessibility",
        "ThreeJS",
        "React Three Fiber",
        "ReactVR",
        "Zustand",
        "React Query",
        "Swift",
        "UIKit",
        "SwiftUI",
        "Combine",
        "Core Data",
        "Ruby on Rails",
        "Hotwire",
        "Turbo",
        "Stimulus",
        "Strada",
        "ViewComponents",
        "RSpec",
        "Docker",
        "Python",
        "Django",
        "Flask",
        "Numpy",
        "Jupyter",
      ],
    },
    {
      title: t("experience2.title"),
      company: t("experience2.company"),
      period: t("experience2.period"),
      description: [t("experience2.description1"), t("experience2.description2"), t("experience2.description3")],
      color: "#00B2FF",
      skills: [
        "JavaScript",
        "React",
        "TypeScript",
        "Redux",
        "Jest",
        "KnockoutJS",
        "Python",
        "Flask",
        "Django",
        "Ruby on Rails",
        "Sketch",
        "Sketch Plugins",
        "Redis",
        "PostgreSQL",
        "Accessibility",
        "WCAG",
        "GraphQL",
      ],
    },
    {
      title: t("experience3.title"),
      company: t("experience3.company"),
      period: t("experience3.period"),
      description: [t("experience3.description1"), t("experience3.description2"), t("experience3.description3")],
      color: "#FFB800",
      skills: [
        "JavaScript",
        "Node.js",
        "Ruby on Rails",
        "RSpec",
        "Sinatra",
        "MongoDB",
        "Express.js",
        "CMS Integration",
      ],
    },
    {
      title: t("experience4.title"),
      company: t("experience4.company"),
      period: t("experience4.period"),
      description: [t("experience4.description1"), t("experience4.description2")],
      color: "#4ADE80",
      skills: ["Build Automation", "Pipelines", "Version Control (CVS, SVN)"],
    },
    {
      title: t("experience5.title"),
      company: t("experience5.company"),
      period: t("experience5.period"),
      description: [t("experience5.description1"), t("experience5.description2")],
      color: "#FF647C",
      skills: ["Java", "JSP", "Maven", "Jenkins", "Continuous Integration", "Project Management", "ITIL"],
    },
  ]

  const handleExperienceClick = (exp) => {
    setSelectedExperience(exp)
    setActiveExperience(exp)
    onClick(exp.skills, exp.color)
  }

  const handleModalClose = () => {
    setSelectedExperience(null)
    setActiveExperience(null)
    onModalClose()
  }

  const handleExperienceHover = (exp) => {
    if (!selectedExperience) {
      onHover(exp.skills, exp.color)
    }
  }

  const handleExperienceHoverEnd = () => {
    if (!selectedExperience) {
      onHoverEnd()
    }
  }

  return (
    <section id="experience" ref={ref} className="py-20">
      <h2 className="text-5xl font-bold text-[#00B2FF] mb-12">{t("experience")}</h2>
      <div className="space-y-6">
        <AnimatePresence>
          {experiences
            .filter((exp) => filteredSkills.length === 0 || exp.skills.some((skill) => filteredSkills.includes(skill)))
            .map((exp, index) => (
              <motion.div
                key={index}
                className={`relative group cursor-pointer ${activeExperience === exp ? "ring-2 ring-offset-2" : ""}`}
                style={{ ringColor: exp.color, ringOffsetColor: "#1C2333" }}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onClick={() => handleExperienceClick(exp)}
                onMouseEnter={() => handleExperienceHover(exp)}
                onMouseLeave={handleExperienceHoverEnd}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleExperienceClick(exp)
                  }
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r rounded-2xl transform scale-105 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
                  style={{ background: `linear-gradient(to right, ${exp.color}, ${exp.color}66)` }}
                />
                <div className="relative bg-[#1C2333]/90 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold mb-2" style={{ color: exp.color }}>
                    {exp.title}
                  </h3>
                  <p className="text-[#00B2FF] mb-2 font-bold">
                    {exp.company} | {exp.period}
                  </p>
                  <p className="text-gray-300">
                    {exp.description[0].slice(0, 150)}...
                    <span className="text-[#00B2FF] hover:underline focus:outline-none ml-1">{t("more")}</span>
                  </p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      {selectedExperience && <Modal experience={selectedExperience} onClose={handleModalClose} />}
    </section>
  )
}

