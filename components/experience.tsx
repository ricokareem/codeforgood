"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Modal from "./modal"

export default function Experience({ onHover, onHoverEnd, onClick, onModalClose, filteredSkills }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [activeExperience, setActiveExperience] = useState(null)

  const experiences = [
    {
      title: "SENIOR PRINCIPAL SOFTWARE ENGINEER",
      company: "WEST MONROE",
      period: "January 2022 - May 2024",
      description: [
        "Transformed engineering practices by implementing agile methodologies across multiple teams, earning stakeholder trust and driving adoption through demonstrated success and measurable improvements in delivery speed",
        "Successfully mentored West Monroe engineers located both in the US and in Costa Rica as a career advisor, with 3 of 5 engineers achieving promotions to Senior or Principal positions through focused guidance and technical leadership",
        "Architected greenfield pricing and estimation platform that slashed project onboarding from months to days, significantly reducing overhead and accelerating sales cycles across the organization",
        "Delivered high-impact technical solutions for key clients: Slingshot Aerospace (3D orbital dynamics visualization platform), Forge Global (private equity trading system), and Sisu/Snowflake (B2B machine learning analytics tool)",
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
      title: "SENIOR SOFTWARE ENGINEER",
      company: "CARBON FIVE",
      period: "March 2018 - January 2022",
      description: [
        "Partnered with startups and enterprise clients to architect and launch mission-critical products, while mentoring engineering teams and establishing agile practices that elevated team performance",
        "Led critical modernization projects at Hulu, driving SOX compliance pre-Disney acquisition and executing full-stack upgrades from Python 2 to 3 and KnockoutJS to React, including team training and knowledge transfer",
        "Successfully upgraded PBS/ITVS platform to achieve WCAG AA certification, while delivering high-impact projects for Fender (React Hooks modernization, Storybook component library), Team Coco (GraphQL frontend architecture), and Swell Investing (ACATS brokerage integration, custom Sketch Plugins development)",
      ],
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
      title: "SENIOR SOFTWARE ENGINEER",
      company: "YP",
      period: "July 2010 - December 2017",
      description: [
        "Full-stack Engineer, part of a small team making solutions for Yellowpages.com, yp.com, m.yp.com (desktop & mobile platforms) serving at the time 60M+ monthly users",
        "Within first month, spearheaded company-wide version control transformation from Subversion to Git, created documentation and conducted hands-on training sessions for 25+ developers, resulting in 40% faster code integration and deployment cycles",
        "Working solo, migrated main site's Admin Tool, used to create feature flags and embed content from Marketing's CMS (Radiant) host, from Ruby on Rails to NodeJS, allowing for instant updates, and a codebase that could be worked on by the entire team instead of only 1 or 2 Ruby specialists and reducing technical debt",
      ],
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
      title: "SOFTWARE CONFIGURATION ENGINEER",
      company: "YAHOO!",
      period: "October 2007 - July 2010",
      description: [
        'Built and optimized build-automation pipelines that drastically reduced release cycle times and made way for "set it and forget it" code staging and production Pipelines to multiple CDN\'s across the globe',
        "Led migration from CVS to Subversion, created conversion scripts and training materials that enabled smooth transition for development teams",
      ],
      color: "#4ADE80",
      skills: ["Build Automation", "Pipelines", "Version Control (CVS, SVN)"],
    },
    {
      title: "SOFTWARE ENGINEER",
      company: "EARTHLINK, INC",
      period: "November 1998 - September 2007",
      description: [
        "Responsible for building and deploying Enterprise Java web applications and maintained CI infrastructure (Maven, Jenkins), driving development efficiency for 3 product teams",
        "Drove version control modernization from CVS to Subversion while achieving ITIL certification and completing project management training",
      ],
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
      <h2 className="text-5xl font-bold text-[#00B2FF] mb-12">EXPERIENCE</h2>
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
                    <span className="text-[#00B2FF] hover:underline focus:outline-none ml-1">more</span>
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

