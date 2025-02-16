"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import FloatingShapes from "@/components/floating-shapes"

export default function Home() {
  const [highlightedSkills, setHighlightedSkills] = useState([])
  const [highlightColor, setHighlightColor] = useState("")
  const [filteredSkills, setFilteredSkills] = useState([])

  const handleExperienceHover = (skills, color) => {
    if (filteredSkills.length === 0) {
      setHighlightedSkills(skills)
      setHighlightColor(color)
    }
  }

  const handleExperienceHoverEnd = () => {
    if (filteredSkills.length === 0) {
      setHighlightedSkills([])
      setHighlightColor("")
    }
  }

  const handleExperienceClick = (skills, color) => {
    if (filteredSkills.length === 0) {
      setHighlightedSkills(skills)
      setHighlightColor(color)
    }
  }

  const handleModalClose = () => {
    if (filteredSkills.length === 0) {
      setHighlightedSkills([])
      setHighlightColor("")
    }
  }

  const handleSkillToggle = (skill) => {
    setFilteredSkills((prev) => {
      if (prev.includes(skill)) {
        const newFilteredSkills = prev.filter((s) => s !== skill)
        if (newFilteredSkills.length === 0) {
          setHighlightedSkills([])
          setHighlightColor("")
        }
        return newFilteredSkills
      } else {
        setHighlightedSkills([])
        setHighlightColor("")
        return [...prev, skill]
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#1C2333] text-white overflow-hidden">
      <CustomCursor />
      <FloatingShapes />
      <Header />
      <main>
        <Hero />
        <div className="container mx-auto px-4">
          <div id="experience-skills-container" className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Experience
              onHover={handleExperienceHover}
              onHoverEnd={handleExperienceHoverEnd}
              onClick={handleExperienceClick}
              onModalClose={handleModalClose}
              filteredSkills={filteredSkills}
            />
            <Skills
              highlightedSkills={highlightedSkills}
              highlightColor={highlightColor}
              onSkillToggle={handleSkillToggle}
              filteredSkills={filteredSkills}
            />
          </div>
        </div>
        <Projects />
        <Education />
      </main>
      <Footer />
    </div>
  )
}

