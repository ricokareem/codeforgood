"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./modal";
import { useTranslation } from "react-i18next";
import { useMobile } from "@/hooks/use-mobile";
import { useTypedInView } from "@/hooks/use-typed-in-view";
import ExperienceCarousel from "./experience-carousel";
import { buildExperiences } from "@/lib/experiences";
import { AUDIO_URLS } from "@/lib/audio";
import type { Experience as ExperienceType } from "@/types";

export default function Experience({
  onHover,
  onHoverEnd,
  onClick,
  onModalClose,
  highlightedFromSkill,
  isSoundOn,
}: {
  onHover: (skills: string[], color: string) => void;
  onHoverEnd: () => void;
  onClick: (skills: string[], color: string) => void;
  onModalClose: () => void;
  highlightedFromSkill: string;
  isSoundOn: boolean;
}) {
  const { ref, isInView } = useTypedInView({ once: true, amount: 0.2 });
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const modalAudioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceType | null>(null);
  const [activeExperience, setActiveExperience] =
    useState<ExperienceType | null>(null);
  const { t } = useTranslation("translation");
  const [audioLoaded, setAudioLoaded] = useState(false);
  const isMobile = useMobile();

  const experiences = buildExperiences(t);

  // Only load audio when sound is enabled
  useEffect(() => {
    if (!isSoundOn) return;

    if (!hoverAudioRef.current) {
      hoverAudioRef.current = new Audio(AUDIO_URLS.hoverClick);
      hoverAudioRef.current.volume = 0.5;
      hoverAudioRef.current.addEventListener("canplaythrough", () => {
        setAudioLoaded(true);
      });
    }

    if (!modalAudioRef.current) {
      modalAudioRef.current = new Audio(AUDIO_URLS.modalOpen);
      modalAudioRef.current.volume = 0.5;
    }

    return () => {
      if (hoverAudioRef.current) {
        hoverAudioRef.current.remove();
        hoverAudioRef.current = null;
      }
      if (modalAudioRef.current) {
        modalAudioRef.current.remove();
        modalAudioRef.current = null;
      }
      setAudioLoaded(false);
    };
  }, [isSoundOn]);

  const playHoverSound = () => {
    if (hoverAudioRef.current && audioLoaded && isSoundOn) {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current
        .play()
        .then(() => {})
        .catch((e) => console.error("Hover audio play failed:", e));
    }
  };

  const playModalSound = () => {
    if (modalAudioRef.current && isSoundOn) {
      modalAudioRef.current.currentTime = 0;
      modalAudioRef.current
        .play()
        .catch((e) => console.error("Modal audio play failed:", e));
    }
  };

  const handleExperienceClick = (exp: ExperienceType) => {
    setSelectedExperience(exp);
    setActiveExperience(exp);
    onClick(exp.skills, exp.color);
    playModalSound();
  };

  const handleModalClose = () => {
    setSelectedExperience(null);
    setActiveExperience(null);
    onModalClose();
  };

  const handleExperienceHover = (exp: ExperienceType) => {
    if (!selectedExperience) {
      playHoverSound();
      onHover(exp.skills, exp.color);
    }
  };

  const handleExperienceHoverEnd = () => {
    if (!selectedExperience) {
      onHoverEnd();
    }
  };

  const handleCarouselHover = (skills: string[], color: string) => {
    if (!selectedExperience) {
      onHover(skills, color);
    }
  };

  return (
    <section id="experience" ref={ref} className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="md:text-5xl mb-12">
          <span className="text-4xl figure-heading">{t("experience")}</span>
        </h2>

        {isMobile ? (
          <ExperienceCarousel
            experiences={experiences}
            onHover={handleCarouselHover}
            onHoverEnd={handleExperienceHoverEnd}
            onClick={handleExperienceClick}
            highlightedFromSkill={highlightedFromSkill}
            moreLabel={t("more")}
            playHoverSound={playHoverSound}
          />
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {experiences.map((exp, index) => {
                const isHighlightedFromSkill =
                  highlightedFromSkill &&
                  exp.skills.includes(highlightedFromSkill);

                return (
                  <motion.div
                    key={index}
                    className={`professional-card p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeExperience === exp ? "ring-2 ring-blue-500" : ""
                    }`}
                    style={{
                      borderColor: isHighlightedFromSkill
                        ? exp.color
                        : undefined,
                      backgroundColor: isHighlightedFromSkill
                        ? `${exp.color}15`
                        : undefined,
                      transform: isHighlightedFromSkill
                        ? "translateY(-2px)"
                        : undefined,
                      boxShadow: isHighlightedFromSkill
                        ? `0 8px 25px ${exp.color}25`
                        : undefined,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => handleExperienceClick(exp)}
                    onMouseEnter={() => handleExperienceHover(exp)}
                    onMouseLeave={handleExperienceHoverEnd}
                    onFocus={() => handleExperienceHover(exp)}
                    onBlur={handleExperienceHoverEnd}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleExperienceClick(exp);
                      }
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-2 figure-subheading">
                      {exp.title}
                    </h3>
                    <p className="figure-subheading mb-3 font-medium">
                      {exp.company} | {exp.period}
                    </p>
                    <p className="figure-text">
                      {exp.description[0].slice(0, 150)}...
                      <span className="text-blue-500 hover:text-blue-600 ml-1 font-medium">
                        {t("more")}
                      </span>
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
      {selectedExperience && (
        <Modal experience={selectedExperience} onClose={handleModalClose} />
      )}
    </section>
  );
}
