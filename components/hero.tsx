"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Mail, Globe, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("translation");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = ev;
      ref.current.style.setProperty("--x", `${clientX}px`);
      ref.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    setTitle(t("title"));
    setAbout(t("about"));
  }, [t]);

  return (
    <section
      id="about"
      className="py-32 min-h-screen flex items-center relative bg-background"
      ref={ref}
    >
      <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d-wall.jpg-kTNp9iGlmZRCDKNicouRCL3pc449Qp.jpeg')] bg-cover bg-center opacity-20 dark:opacity-10" />
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="w-80 h-80 mx-auto">
              <Image
                src="/img/hero.jpeg"
                alt="Rico Rodriquez Collins"
                width={400}
                height={400}
                className="rounded-2xl w-full h-full object-cover shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <h1
              className="text-3xl md:text-5xl figure-heading"
              style={{ lineHeight: "1.75" }}
            >
              RICO COLLINS
            </h1>
            <h2 className="text-2xl md:text-3xl figure-heading">
              {title}
            </h2>
            <p
              className="text-lg figure-text max-w-2xl"
              style={{
                color: "white",
                backgroundColor: "hsl(var(--figure-blue))",
                paddingLeft: "10px",
              }}
            >
              {about}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                Icon: Mail,
                text: "hello.world@codeforgood.com",
                href: "mailto:hello.world@codeforgood.com",
              },
              {
                Icon: Globe,
                text: "www.linkedin.com/in/ricocollins",
                href: "https://www.linkedin.com/in/ricocollins",
              },
              {
                Icon: MapPin,
                text: "Los Angeles, California, United States",
                href: "https://www.google.com/maps/place/Los+Angeles,+CA",
              },
            ].map(({ Icon, text, href }) => (
              <Link
                key={text}
                href={href}
                target={href.startsWith("mailto") ? "_self" : "_blank"}
                rel={href.startsWith("mailto") ? "" : "noopener noreferrer"}
                className="block"
              >
                <motion.div
                  className="flex items-center p-4 rounded-xl professional-card group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 mr-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
                  <span className="text-foreground group-hover:text-blue-600 transition-colors">
                    {text}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
