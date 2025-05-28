"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "next-i18next";

export default function Education({ isSoundOn }: { isSoundOn: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation("translation");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spacey%20Cricket%20Click-DlSLodgcdvrAjUskn7lVAFDf0DUxqC.wav"
    );
    audioRef.current.volume = 0.5; // Set volume to 50%

    return () => {
      if (audioRef.current) {
        audioRef.current.remove();
      }
    };
  }, []);

  const playHoverSound = () => {
    if (audioRef.current && isSoundOn) {
      audioRef.current.currentTime = 0; // Reset to start
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
      color: "#FF647C",
    },
    {
      school: "Stanton College Preparatory School",
      period: "Shout out to Mu Alpha Theta",
      color: "#00B2FF",
    },
  ];

  return (
    <section id="education" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-[#FFB800] mb-12">
          {t("education")}
        </h2>
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={playHoverSound}
              onFocus={playHoverSound}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r rounded-2xl transform scale-105 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
                style={{
                  background: `linear-gradient(to right, ${edu.color}, ${edu.color}66)`,
                }}
              />
              <div className="relative bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: edu.color }}
                >
                  {edu.school}
                </h3>
                {edu.degree && (
                  <p className="text-primary mb-1">{edu.degree}</p>
                )}
                <p className="text-muted-foreground">{edu.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
