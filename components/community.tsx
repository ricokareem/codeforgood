"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "react-i18next"

export default function Community({ isSoundOn }: { isSoundOn: boolean }) {
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

  const communityItems = [
    {
      title: t("community.item1.title"),
      description: t("community.item1.description"),
    },
    {
      title: t("community.item2.title"),
      description: t("community.item2.description"),
      link: "https://www.meetup.com/Gay-Geeks-Gay-and-Lesbian-Software-Developers",
    },
    {
      title: t("community.item3.title"),
      description: t("community.item3.description"),
      link: "https://www.smpride.com/",
    },
  ]

  return (
    <section id="community" className="py-20 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl figure-heading mb-12">{t("community.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communityItems.map((item, index) => (
            <motion.div
              key={index}
              className="professional-card p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={playHoverSound}
              onFocus={playHoverSound}
            >
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                  <h3 className="text-xl font-semibold mb-3 figure-subheading group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="figure-text">{item.description}</p>
                </a>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-3 figure-subheading">{item.title}</h3>
                  <p className="figure-text">{item.description}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
