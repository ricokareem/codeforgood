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
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([])
  const [highlightColor, setHighlightColor] = useState("")
  const [highlightedFromSkill, setHighlightedFromSkill] = useState("")
  const [isSoundOn, setIsSoundOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const toggleSoundRef = useRef<HTMLAudioElement | null>(null)
  const { theme, setTheme } = useTheme()

  // All experiences data for skill lookup
  const experiences = [
    {
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
      color: "#4ADE80",
      skills: ["Build Automation", "Pipelines", "Version Control (CVS, SVN)"],
    },
    {
      color: "#FF647C",
      skills: ["Java", "JSP", "Maven", "Jenkins", "Continuous Integration", "Project Management", "ITIL"],
    },
  ]

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Computer%20Chirp%202-D1CqZh4bVXk2eytmorcFbO.wav",
    )
    audioRef.current.volume = 0.5

    toggleSoundRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Computer%20Chirp%202-D1CqZh4bVXk20OAwebK2eytmorcFbO.wav",
    )
    toggleSoundRef.current.volume = 0.5

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
