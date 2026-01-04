"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  color: string;
};

interface SkillCloudProps {
  skills: Skill[];
  highlightedSkills: string[];
  highlightColor: string;
  onSkillHover: (skill: string) => void;
  onSkillHoverEnd: () => void;
  playHoverSound: () => void;
}

// Skill weights based on how many experiences use them
// Heavy skills (core technologies used across 3+ experiences)
const heavySkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Ruby on Rails",
  "Python",
  "PostgreSQL",
];

// Medium skills (used in 2 experiences)
const mediumSkills = [
  "Next.js",
  "Redux",
  "Redis",
  "Flask",
  "Django",
  "Accessibility",
  "RSpec",
  "Node.js",
];

function getSkillSize(skillName: string): "lg" | "md" | "sm" {
  if (heavySkills.includes(skillName)) return "lg";
  if (mediumSkills.includes(skillName)) return "md";
  return "sm";
}

const sizeClasses = {
  lg: "text-base px-4 py-2.5 font-semibold",
  md: "text-sm px-3 py-2 font-medium",
  sm: "text-xs px-2.5 py-1.5 font-medium",
};

export default function SkillCloud({
  skills,
  highlightedSkills,
  highlightColor,
  onSkillHover,
  onSkillHoverEnd,
  playHoverSound,
}: SkillCloudProps) {
  // Randomize order but keep it stable
  const shuffledSkills = useMemo(() => {
    const arr = [...skills];
    // Use a seeded shuffle for consistent layout
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [skills]);

  const handleSkillClick = (skill: string) => {
    playHoverSound();
    onSkillHover(skill);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 py-4">
      {shuffledSkills.map((skill, index) => {
        const size = getSkillSize(skill.name);
        const isHighlighted = highlightedSkills.includes(skill.name);

        // Add slight variations for organic feel
        const rotation = ((index % 5) - 2) * 1.5;
        const marginOffset = (index % 3) * 2;

        return (
          <motion.button
            key={skill.name}
            className={`
              rounded-full transition-all duration-200 touch-feedback
              ${sizeClasses[size]}
              ${isHighlighted ? "shadow-lg" : "shadow-sm"}
            `}
            style={{
              backgroundColor: isHighlighted ? highlightColor : `${skill.color}20`,
              color: isHighlighted ? "white" : skill.color,
              borderWidth: "1.5px",
              borderColor: isHighlighted ? highlightColor : `${skill.color}40`,
              transform: `rotate(${rotation}deg)`,
              marginTop: `${marginOffset}px`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: isHighlighted ? 1.1 : 1,
            }}
            transition={{
              duration: 0.2,
              delay: index * 0.02,
              scale: { type: "spring", stiffness: 400, damping: 20 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSkillClick(skill.name)}
            onMouseEnter={() => {
              playHoverSound();
              onSkillHover(skill.name);
            }}
            onMouseLeave={onSkillHoverEnd}
            onTouchStart={() => handleSkillClick(skill.name)}
            aria-pressed={isHighlighted}
          >
            {skill.name}
          </motion.button>
        );
      })}
    </div>
  );
}
