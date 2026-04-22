"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useTypedInView } from "@/hooks/use-typed-in-view";
import { AUDIO_URLS } from "@/lib/audio";

export default function Education({ isSoundOn }: { isSoundOn: boolean }) {
  const { ref, isInView } = useTypedInView({ once: true, amount: 0.2 });
  const { t } = useTranslation("translation");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isSoundOn) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(AUDIO_URLS.hoverClick);
      audioRef.current.volume = 0.5;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, [isSoundOn]);

  const playHoverSound = () => {
    if (audioRef.current && isSoundOn) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.error("Audio play failed:", e));
    }
  };

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
  ];

  return (
    <section id="education" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="md:text-5xl mb-12">
          <span className="text-4xl figure-heading">{t("education")} </span>
        </h2>
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
              <h3 className="text-xl font-semibold mb-2 figure-subheading">
                {edu.school}
              </h3>
              {edu.degree && (
                <p className="figure-text font-medium mb-1">{edu.degree}</p>
              )}
              <p className="figure-text">{edu.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
