"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "next-i18next"

export default function Education({ isSoundOn }: { isSoundOn: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useTranslation("translation")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spacey%20Cricket%20Click-DlSLodgcdvrAjUskn7lVAFDf0DUxqC.wav",
    )
    audioRef.current.volume = 0.5

    return () => {
      if (audioRef.current) {
        audioRef.current.remove()
      }
    }
  }, [])

  const playHoverSound = () => {
    if (audioRef.current && isSoundOn) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
    }
  }

  const educations = [
    {
      school: "USC Viterbi School of Engineering",
      degree: "Bachelor of Science (BS), Biomedical Engineering",
      period: "Spring 2007",
    },
    {
      school: "Stanton College Preparatory School",
      period: "Shout out to Mu Alpha Theta",
    },
  ]

  return (
    <section id="education" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl figure-heading mb-12">{t("education")}</h2>
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              className="professional-card p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={playHoverSound}
              onFocus={playHoverSound}
            >
              <h3 className="text-xl font-semibold mb-2 figure-subheading">{edu.school}</h3>
              {edu.degree && <p className="figure-text font-medium mb-1">{edu.degree}</p>}
              <p className="figure-text">{edu.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
