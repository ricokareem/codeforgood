"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import { Volume2, VolumeX, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { EXPERIENCE_SKILLS } from "@/lib/experiences"
import { AUDIO_URLS } from "@/lib/audio"

// Lazy load below-the-fold components
const Projects = dynamic(() => import("@/components/projects"), { ssr: true })
const Education = dynamic(() => import("@/components/education"), { ssr: true })
const Community = dynamic(() => import("@/components/community"), { ssr: true })
const Footer = dynamic(() => import("@/components/footer"), { ssr: true })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })
const FloatingShapes = dynamic(() => import("@/components/floating-shapes"), { ssr: false })

export default function Home() {
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([])
  const [highlightColor, setHighlightColor] = useState("")
  const [highlightedFromSkill, setHighlightedFromSkill] = useState("")
  const [isSoundOn, setIsSoundOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const toggleSoundRef = useRef<HTMLAudioElement | null>(null)
  const { theme, setTheme } = useTheme()

  // Skill lookup uses the shared experience data
  const experiences = EXPERIENCE_SKILLS;

  useEffect(() => {
    // Only load audio when sound is enabled
    if (isSoundOn && !audioRef.current) {
      audioRef.current = new Audio(AUDIO_URLS.ambientChirp)
      audioRef.current.volume = 0.5
      audioRef.current.play().catch((error) => console.error("Error playing sound:", error))
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [isSoundOn])

  const toggleSound = () => {
    // Lazy load toggle sound on first interaction
    if (!toggleSoundRef.current) {
      toggleSoundRef.current = new Audio(AUDIO_URLS.toggleClick)
      toggleSoundRef.current.volume = 0.5
    }

    toggleSoundRef.current.currentTime = 0
    toggleSoundRef.current.play().catch((error) => console.error("Error playing toggle sound:", error))
    setIsSoundOn(!isSoundOn)
  }

  const handleExperienceHover = (skills: string[], color: string) => {
    setHighlightedSkills(skills as string[])
    setHighlightColor(color)
  }

  const handleExperienceHoverEnd = () => {
    setHighlightedSkills([])
    setHighlightColor("")
  }

  const handleExperienceClick = (skills: string[], color: string) => {
    setHighlightedSkills(skills as string[])
    setHighlightColor(color)
  }

  const handleModalClose = () => {
    setHighlightedSkills([])
    setHighlightColor("")
  }

  const handleSkillHover = (skill: string) => {
    setHighlightedFromSkill(skill)
    // Find which experiences contain this skill and highlight the skill with the first matching experience's color
    const matchingExperience = experiences.find((exp) => exp.skills.includes(skill))
    if (matchingExperience) {
      setHighlightedSkills([skill])
      setHighlightColor(matchingExperience.color)
    }
  }

  const handleSkillHoverEnd = () => {
    setHighlightedFromSkill("")
    setHighlightedSkills([])
    setHighlightColor("")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              highlightedFromSkill={highlightedFromSkill}
              isSoundOn={isSoundOn}
            />
            <Skills
              highlightedSkills={highlightedSkills}
              highlightColor={highlightColor}
              onSkillHover={handleSkillHover}
              onSkillHoverEnd={handleSkillHoverEnd}
              isSoundOn={isSoundOn}
            />
          </div>
        </div>
        <Projects isSoundOn={isSoundOn} />
        <Education isSoundOn={isSoundOn} />
        <Community isSoundOn={isSoundOn} />
      </main>
      <Footer />
      <div className="fixed bottom-4 left-4 flex flex-col space-y-2">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="bg-accent hover:bg-accent/80 text-accent-foreground p-2 rounded-full transition-colors duration-200"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        <button
          onClick={toggleSound}
          className="bg-accent hover:bg-accent/80 text-accent-foreground p-2 rounded-full transition-colors duration-200"
          aria-label={isSoundOn ? "Mute sound" : "Unmute sound"}
        >
          {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
    </div>
  )
}
