"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Community({ isSoundOn }: { isSoundOn: boolean }) {
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

  const communityItems = [
    {
      title: t("community.item1.title"),
      description: t("community.item1.description"),
      color: "#FF647C",
    },
    {
      title: t("community.item2.title"),
      description: t("community.item2.description"),
      color: "#00B2FF",
      link: "https://www.meetup.com/Gay-Geeks-Gay-and-Lesbian-Software-Developers",
    },
    {
      title: t("community.item3.title"),
      description: t("community.item3.description"),
      color: "#FFB800",
      link: "https://www.smpride.com/",
    },
  ];

  return (
    <section id="community" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-[#4ADE80] mb-12">
          {t("community.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communityItems.map((item, index) => (
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
                  background: `linear-gradient(to right, ${item.color}, ${item.color}66)`,
                }}
              />
              <div className="relative bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-opacity hover:opacity-80"
                  >
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </a>
                ) : (
                  <>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
