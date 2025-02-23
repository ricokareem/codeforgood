"use client"

import { useState, useEffect, useRef } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Community from "@/components/community"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import FloatingShapes from "@/components/floating-shapes"
import { Volume2, VolumeX, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function Home() {
  const [highlightedSkills, setHighlightedSkills] = useState([])
  const [highlightColor, setHighlightColor] = useState("")
  const [filteredSkills, setFilteredSkills] = useState([])
  const [isSoundOn, setIsSoundOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const toggleSoundRef = useRef<HTMLAudioElement | null>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Computer%20Chirp%202-D1CqZh4bVXk2eytmorcFbO.wav",
    )
    audioRef.current.volume = 0.5 // Set volume to 50%

    toggleSoundRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Computer%20Chirp%202-D1CqZh4bVXk20OAwebK2eytmorcFbO.wav",
    )
    toggleSoundRef.current.volume = 0.5 // Set volume to 50%

    const playSound = () => {
      if (audioRef.current && isSoundOn) {
        audioRef.current.play().catch((error) => console.error("Error playing sound:", error))
      }
    }

    if (isSoundOn) {
      playSound()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [isSoundOn])

  const toggleSound = () => {
    if (toggleSoundRef.current) {
      toggleSoundRef.current.currentTime = 0
      toggleSoundRef.current.play().catch((error) => console.error("Error playing toggle sound:", error))
    }
    setIsSoundOn(!isSoundOn)
  }

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
              filteredSkills={filteredSkills}
              isSoundOn={isSoundOn}
            />
            <Skills
              highlightedSkills={highlightedSkills}
              highlightColor={highlightColor}
              onSkillToggle={handleSkillToggle}
              filteredSkills={filteredSkills}
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

