"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Projects({ isSoundOn }: { isSoundOn: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref as unknown as React.RefObject<Element>, { once: true, amount: 0.2 });
  const { t } = useTranslation("translation");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [projectsLabel, setProjectsLabel] = useState("");
  const [viewProjectLabel, setViewProjectLabel] = useState("");
  const [projects, setProjects] = useState<Array<{
    title: string;
    description: string;
    image: string;
    link: string;
    altText: string;
  }>>([]);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spacey%20Cricket%20Click-DlSLodgcdvrAjUskn7lVAFDf0DUxqC.wav"
    );
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    setProjectsLabel(t("projects"));
    setViewProjectLabel(t("viewProject"));
    setProjects([
      {
        title: t("project1.title"),
        description: t("project1.description"),
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fender-play-2-5ij4cFMYlbyfhxTs370U7yNkmwQ57I.gif",
        link: "https://www.fender.com/play",
        altText: t("project1.altText"),
      },
      {
        title: t("project2.title"),
        description: t("project2.description"),
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slingshot-laboratory-a3MSO5bP5mYS6qWby0toQCdgC4xuEE.gif",
        link: "https://www.slingshot.space/solutions/applications#laboratory",
        altText: t("project2.altText"),
      },
      {
        title: t("project3.title"),
        description: t("project3.description"),
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conan-classic-3-U8w9fl0h7o70wQh7v0Y64ZEnv8cV1s.gif",
        link: "https://conanclassic.com",
        altText: t("project3.altText"),
      },
    ]);
  }, [t]);

  const playHoverSound = () => {
    if (audioRef.current && isSoundOn) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.error("Audio play failed:", e));
    }
  };

  return (
    <section
      id="projects"
      className="py-20 bg-gray-50 dark:bg-gray-900"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <h2 className="md:text-5xl mb-12">
          <span className="text-4xl figure-heading">{projectsLabel}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="professional-card rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={playHoverSound}
              onFocus={playHoverSound}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.altText}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 figure-subheading">
                  {project.title}
                </h3>
                <p className="figure-text mb-6">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="figure-button inline-block text-center"
                >
                  {viewProjectLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
