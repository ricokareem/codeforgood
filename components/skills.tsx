"use client"

import { motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useRef, useEffect, useState } from "react"

type Skill = {
  name: string
  color: string
}

type SkillsProps = {
  highlightedSkills: string[]
  highlightColor: string
  onSkillToggle: (skill: string) => void
  filteredSkills: string[]
  isSoundOn: boolean
}

export default function Skills({
  highlightedSkills,
  highlightColor,
  onSkillToggle,
  filteredSkills,
  isSoundOn,
}: SkillsProps) {
  const { t } = useTranslation("translation")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioLoaded, setAudioLoaded] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Space%201999%20Main%20Mission%20to%20Eagle%20by%20Tormy-qgfokpdMz4MmaY4d35hHYedkfGbD4s.wav",
    )
    audioRef.current.volume = 0.5 // Set volume to 50%

    audioRef.current.addEventListener("canplaythrough", () => {
      console.log("Audio file loaded successfully")
      setAudioLoaded(true)
    })

    audioRef.current.addEventListener("error", (e) => {
      console.error("Error loading audio file:", e)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.remove()
      }
    }
  }, [])

  const playClickSound = () => {
    console.log("Attempting to play sound. isSoundOn:", isSoundOn, "audioLoaded:", audioLoaded)
    if (audioRef.current && isSoundOn && audioLoaded) {
      audioRef.current.currentTime = 0 // Reset to start
      audioRef.current
        .play()
        .then(() => console.log("Audio played successfully"))
        .catch((e) => console.error("Audio play failed:", e))
    } else {
      console.log("Audio not played. Reasons:", {
        audioRef: !!audioRef.current,
        isSoundOn,
        audioLoaded,
      })
    }
  }

  const handleSkillClick = (skill: string) => {
    console.log("Skill clicked:", skill)
    playClickSound()
    onSkillToggle(skill)
  }

  const skills: Skill[] = [
    { name: "JavaScript", color: "#FFB800" },
    { name: "TypeScript", color: "#00B2FF" },
    { name: "React", color: "#FF647C" },
    { name: "Next.js", color: "#4ADE80" },
    { name: "Node.js", color: "#FFB800" },
    { name: "Remix", color: "#FF647C" },
    { name: "React Native", color: "#00B2FF" },
    { name: "Prisma ORM", color: "#4ADE80" },
    { name: "Redis", color: "#FF647C" },
    { name: "Elasticsearch", color: "#00B2FF" },
    { name: "ThreeJS", color: "#FFB800" },
    { name: "React Three Fiber", color: "#4ADE80" },
    { name: "React VR", color: "#FF647C" },
    { name: "Zustand", color: "#00B2FF" },
    { name: "React Query", color: "#FFB800" },
    { name: "Swift", color: "#4ADE80" },
    { name: "UIKit", color: "#FF647C" },
    { name: "SwiftUI", color: "#00B2FF" },
    { name: "Core Data", color: "#FFB800" },
    { name: "Hotwire", color: "#4ADE80" },
    { name: "RSpec", color: "#FF647C" },
    { name: "Python", color: "#FFB800" },
    { name: "Ruby on Rails", color: "#00B2FF" },
    { name: "Django", color: "#00B2FF" },
    { name: "Flask", color: "#FFB800" },
    { name: "Sketch Plugins", color: "#4ADE80" },
    { name: "Redux", color: "#FF647C" },
    { name: "KnockoutJS", color: "#00B2FF" },
    { name: "Sinatra", color: "#FFB800" },
    { name: "Express.js", color: "#4ADE80" },
    { name: "MongoDB", color: "#FF647C" },
    { name: "PostgreSQL", color: "#4ADE80" },
    { name: "GraphQL", color: "#FFB800" },
    { name: "Docker", color: "#4ADE80" },
    { name: "AWS", color: "#FFB800" },
    { name: "Java", color: "#FF647C" },
    { name: "Accessibility", color: "#FFB800" },
    { name: "CMS Integration", color: "#4ADE80" },
    { name: "Build Automation", color: "#FFB800" },
    { name: "Pipelines", color: "#00B2FF" },
    { name: "JSP", color: "#4ADE80" },
    { name: "Maven", color: "#FFB800" },
    { name: "Jenkins", color: "#00B2FF" },
    { name: "Project Management", color: "#4ADE80" },
  ]

  return (
    <section id="skills" className="py-20">
      <h2 className="text-5xl font-bold text-[#FFB800] mb-12">{t("skills")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => handleSkillClick(skill.name)}
          >
            <div
              className="absolute inset-0 rounded-lg transform scale-105 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 overflow-hidden"
              style={{
                backgroundColor: filteredSkills.includes(skill.name)
                  ? "#00B2FF"
                  : highlightedSkills.includes(skill.name)
                    ? highlightColor
                    : "rgba(203, 213, 224, 0.7)", // Light gray for light mode
                opacity: filteredSkills.includes(skill.name) || highlightedSkills.includes(skill.name) ? 1 : 0.7,
                borderRadius: "0.5rem",
              }}
            />
            <div
              className="relative bg-white/90 dark:bg-[#1C2333]/90 backdrop-blur-sm p-3 rounded-lg border border-gray-200 dark:border-white/10 transform transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
              style={{
                borderRadius: "0.5rem",
              }}
            >
              <span className="text-sm font-medium text-gray-800 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {skill.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

