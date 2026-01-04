"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  color: string;
  skills: string[];
}

interface ExperienceCarouselProps {
  experiences: Experience[];
  onHover: (skills: string[], color: string) => void;
  onHoverEnd: () => void;
  onClick: (exp: Experience) => void;
  highlightedFromSkill: string;
  moreLabel: string;
  playHoverSound: () => void;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

export default function ExperienceCarousel({
  experiences,
  onHover,
  onHoverEnd,
  onClick,
  highlightedFromSkill,
  moreLabel,
  playHoverSound,
}: ExperienceCarouselProps) {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < experiences.length) {
      setPage([newIndex, newDirection]);
      playHoverSound();
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const currentExp = experiences[currentIndex];
  const isHighlightedFromSkill =
    highlightedFromSkill && currentExp.skills.includes(highlightedFromSkill);

  return (
    <div className="relative" ref={containerRef}>
      {/* Carousel container */}
      <div className="overflow-hidden relative min-h-[280px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div
              className={`professional-card p-6 rounded-xl h-full transition-all duration-300 touch-feedback`}
              style={{
                borderColor: isHighlightedFromSkill ? currentExp.color : undefined,
                backgroundColor: isHighlightedFromSkill
                  ? `${currentExp.color}15`
                  : undefined,
                borderWidth: isHighlightedFromSkill ? "2px" : undefined,
                boxShadow: isHighlightedFromSkill
                  ? `0 8px 25px ${currentExp.color}25`
                  : undefined,
              }}
              onClick={() => onClick(currentExp)}
              onTouchStart={() => onHover(currentExp.skills, currentExp.color)}
              onTouchEnd={onHoverEnd}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onClick(currentExp);
                }
              }}
            >
              {/* Color indicator bar */}
              <div
                className="w-12 h-1 rounded-full mb-4"
                style={{ backgroundColor: currentExp.color }}
              />

              <h3 className="text-xl font-semibold mb-2 figure-subheading">
                {currentExp.title}
              </h3>
              <p className="figure-subheading mb-3 font-medium text-sm">
                {currentExp.company}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                {currentExp.period}
              </p>
              <p className="figure-text text-sm leading-relaxed">
                {currentExp.description[0].slice(0, 180)}...
                <span className="text-blue-500 hover:text-blue-600 ml-1 font-medium">
                  {moreLabel}
                </span>
              </p>

              {/* Skills preview */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {currentExp.skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
                {currentExp.skills.length > 4 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{currentExp.skills.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-between items-center mt-4 px-2">
        <motion.button
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed touch-feedback"
          whileTap={{ scale: 0.95 }}
          aria-label="Previous experience"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {experiences.map((exp, index) => (
            <motion.button
              key={index}
              onClick={() => {
                const dir = index > currentIndex ? 1 : -1;
                setPage([index, dir]);
                playHoverSound();
              }}
              className="w-2.5 h-2.5 rounded-full transition-all duration-200 touch-feedback"
              style={{
                backgroundColor:
                  index === currentIndex ? exp.color : "hsl(var(--muted))",
                transform: index === currentIndex ? "scale(1.3)" : "scale(1)",
              }}
              whileTap={{ scale: 0.8 }}
              aria-label={`Go to experience ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>

        <motion.button
          onClick={() => paginate(1)}
          disabled={currentIndex === experiences.length - 1}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed touch-feedback"
          whileTap={{ scale: 0.95 }}
          aria-label="Next experience"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Swipe hint - shows briefly on first visit */}
      <p className="text-center text-xs text-muted-foreground mt-3">
        Swipe or tap dots to navigate
      </p>
    </div>
  );
}
