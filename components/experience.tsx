"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Modal from "./modal"
import { useTranslation } from "react-i18next"

export default function Experience({
  onHover,
  onHoverEnd,
  onClick,
  onModalClose,
  highlightedFromSkill,
  isSoundOn,
}: {
  onHover: (skills: string[], color: string) => void
  onHoverEnd: () => void
  onClick: (skills: string[], color: string) => void
  onModalClose: () => void
  highlightedFromSkill: string
  isSoundOn: boolean
}) {
  const ref = useRef(null)
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null)
  const modalAudioRef = useRef<HTMLAudioElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[0] | null>(null)
  const [activeExperience, setActiveExperience] = useState<(typeof experiences)[0] | null>(null)
  const { t } = useTranslation("translation")
  const [audioLoaded, setAudioLoaded] = useState(false)

  useEffect(() => {
    // Create audio elements
    hoverAudioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spacey%20Cricket%20Click-DlSLodgcdvrAjUskn7lVAFDf0DUxqC.wav",
    )
    modalAudioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plasma%20Blaster%20by%20BigDino1995-EoERfGPL2zXzASXAe7YgkPYneH4Dyi.wav",
    )
    hoverAudioRef.current.volume = 0.5
    modalAudioRef.current.volume = 0.5

    hoverAudioRef.current.addEventListener("canplaythrough", () => {
      setAudioLoaded(true)
    })

    return () => {
      if (hoverAudioRef.current) {
        hoverAudioRef.current.remove()
      }
      if (modalAudioRef.current) {
        modalAudioRef.current.remove()
      }
    }
  }, [])

  const playHoverSound = () => {
    if (hoverAudioRef.current && audioLoaded && isSoundOn) {
      hoverAudioRef.current.currentTime = 0
      hoverAudioRef.current
        .play()
        .then(() => {})
        .catch((e) => console.error("Hover audio play failed:", e))
    }
  }

  const playModalSound = () => {
    if (modalAudioRef.current && isSoundOn) {
      modalAudioRef.current.currentTime = 0
      modalAudioRef.current.play().catch((e) => console.error("Modal audio play failed:", e))
    }
  }

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
      color: "#00B2FF",
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
      color: "#FF647C",
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
      description: [t("experience3.description1"), t("experience3.description2")],
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

  const handleExperienceClick = (exp: (typeof experiences)[0]) => {
    setSelectedExperience(exp)
    setActiveExperience(exp)
    onClick(exp.skills, exp.color)
    playModalSound()
  }

  const handleModalClose = () => {
    setSelectedExperience(null)
    setActiveExperience(null)
    onModalClose()
  }

  const handleExperienceHover = (exp: (typeof experiences)[0]) => {
    if (!selectedExperience) {
      playHoverSound()
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
      <div className="container mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#FF647C] mb-12">{t("experience")}</h2>
        <div className="space-y-6">
          <AnimatePresence>
            {experiences.map((exp, index) => {
              const isHighlightedFromSkill = highlightedFromSkill && exp.skills.includes(highlightedFromSkill)

              return (
                <motion.div
                  key={index}
                  className={`professional-card p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeExperience === exp ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{
                    borderColor: isHighlightedFromSkill ? exp.color : undefined,
                    backgroundColor: isHighlightedFromSkill ? `${exp.color}15` : undefined,
                    transform: isHighlightedFromSkill ? "translateY(-2px)" : undefined,
                    boxShadow: isHighlightedFromSkill ? `0 8px 25px ${exp.color}25` : undefined,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleExperienceClick(exp)}
                  onMouseEnter={() => handleExperienceHover(exp)}
                  onMouseLeave={handleExperienceHoverEnd}
                  onFocus={() => handleExperienceHover(exp)}
                  onBlur={handleExperienceHoverEnd}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleExperienceClick(exp)
                    }
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2 figure-subheading">{exp.title}</h3>
                  <p className="figure-subheading mb-3 font-medium">
                    {exp.company} | {exp.period}
                  </p>
                  <p className="figure-text">
                    {exp.description[0].slice(0, 150)}...
                    <span className="text-blue-500 hover:text-blue-600 ml-1 font-medium">{t("more")}</span>
                  </p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
      {selectedExperience && <Modal experience={selectedExperience} onClose={handleModalClose} />}
    </section>
  )
}
