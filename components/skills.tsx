"use client";

import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useRef, useEffect, useState } from "react";

type Skill = {
  name: string;
  color: string;
};

type SkillsProps = {
  highlightedSkills: string[];
  highlightColor: string;
  onSkillHover: (skill: string) => void;
  onSkillHoverEnd: () => void;
  isSoundOn: boolean;
};

export default function Skills({
  highlightedSkills,
  highlightColor,
  onSkillHover,
  onSkillHoverEnd,
  isSoundOn,
}: SkillsProps) {
  const { t } = useTranslation("translation");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [skillsLabel, setSkillsLabel] = useState("");

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spacey%20Cricket%20Click-DlSLodgcdvrAjUskn7lVAFDf0DUxqC.wav"
    );
    audioRef.current.volume = 0.3; // Lower volume for hover sounds

    audioRef.current.addEventListener("canplaythrough", () => {
      setAudioLoaded(true);
    });

    audioRef.current.addEventListener("error", (e) => {
      console.error("Error loading audio file:", e);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    setSkillsLabel(t("skills"));
  }, [t]);

  const playHoverSound = () => {
    if (audioRef.current && isSoundOn && audioLoaded) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => console.log("Hover audio played successfully"))
        .catch((e) => console.error("Audio play failed:", e));
    }
  };

  const handleSkillHover = (skill: string) => {
    playHoverSound();
    onSkillHover(skill);
  };

  const skills: Skill[] = [
    { name: "JavaScript", color: "#FFB800" },
    { name: "TypeScript", color: "#00B2FF" },
    { name: "React", color: "#FF647C" },
    { name: "React Native", color: "#00B2FF" },
    { name: "Next.js", color: "#4ADE80" },
    { name: "Remix", color: "#FF647C" },
    { name: "Swift", color: "#4ADE80" },
    { name: "Node.js", color: "#FFB800" },
    { name: "Prisma ORM", color: "#4ADE80" },
    { name: "Redis", color: "#FF647C" },
    { name: "Elasticsearch", color: "#00B2FF" },
    { name: "ThreeJS", color: "#FFB800" },
    { name: "React Three Fiber", color: "#4ADE80" },
    { name: "Zustand", color: "#00B2FF" },
    { name: "Tanstack Query", color: "#FFB800" },
    { name: "Redux", color: "#FF647C" },
    { name: "Ruby on Rails", color: "#00B2FF" },
    { name: "RSpec", color: "#FF647C" },
    { name: "Hotwire", color: "#4ADE80" },
    { name: "Sinatra", color: "#FFB800" },
    { name: "Python", color: "#FFB800" },
    { name: "Django", color: "#00B2FF" },
    { name: "Flask", color: "#FFB800" },
    { name: "Accessibility", color: "#FFB800" },
    { name: "KnockoutJS", color: "#00B2FF" },
    { name: "Express.js", color: "#4ADE80" },
    { name: "MongoDB", color: "#FF647C" },
    { name: "PostgreSQL", color: "#4ADE80" },
    { name: "Apollo GraphQL", color: "#FFB800" },
    { name: "Docker", color: "#4ADE80" },
    { name: "AWS", color: "#FFB800" },
    { name: "CMS Integration", color: "#4ADE80" },
    { name: "Build Automation", color: "#FFB800" },
    { name: "Pipelines", color: "#00B2FF" },
    { name: "Java", color: "#FF647C" },
    { name: "JSP", color: "#4ADE80" },
    { name: "Maven", color: "#FFB800" },
    { name: "Jenkins", color: "#00B2FF" },
  ];

  return (
    <section id="skills" className="py-20">
      <h2 className="md:text-5xl mb-12">
        <span className="text-4xl figure-heading">{skillsLabel}</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onMouseEnter={() => handleSkillHover(skill.name)}
            onMouseLeave={onSkillHoverEnd}
          >
            <div
              className="professional-card p-3 rounded-lg relative transition-all duration-200"
              style={{
                backgroundColor: highlightedSkills.includes(skill.name)
                  ? highlightColor
                  : undefined,
              }}
            >
              <span
                className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200"
                style={{
                  color: highlightedSkills.includes(skill.name)
                    ? "white"
                    : undefined,
                }}
              >
                {skill.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
