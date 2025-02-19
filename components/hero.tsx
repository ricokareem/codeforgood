"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Mail, Globe, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation("common")

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!ref.current) return
      const { clientX, clientY } = ev
      ref.current.style.setProperty("--x", `${clientX}px`)
      ref.current.style.setProperty("--y", `${clientY}px`)
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return (
    <section id="about" className="py-20 min-h-screen flex items-center relative" ref={ref}>
      <div
        className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d-wall.jpg-kTNp9iGlmZRCDKNicouRCL3pc449Qp.jpeg')] bg-cover bg-center opacity-20"
        style={{ backgroundPosition: "center 40%" }}
      />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF647C] to-[#00B2FF] rounded-3xl transform rotate-6 scale-105" />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4262.JPG-Pzije6asoS4EBzHaiyj3kofdy6sWO6.jpeg"
              alt="Rico Rodriquez Collins"
              width={400}
              height={400}
              className="rounded-3xl relative z-10 transform transition-transform duration-500 hover:scale-105 hover:rotate-3 object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 md:pl-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#FFB800] to-[#FF647C] bg-clip-text text-transparent mb-4">
            {t("name")}
          </h1>
          <h2 className="text-4xl text-[#00B2FF] mb-6">{t("title")}</h2>
          <p className="text-gray-300 mb-6 text-lg">{t("about")}</p>
          <div className="space-y-4">
            {[
              {
                Icon: Mail,
                text: "hello.world@codeforgood.com",
                color: "#FF647C",
                href: "mailto:hello.world@codeforgood.com",
              },
              {
                Icon: Globe,
                text: "www.linkedin.com/in/ricocollins",
                color: "#00B2FF",
                href: "https://www.linkedin.com/in/ricocollins",
              },
              {
                Icon: MapPin,
                text: "Los Angeles, California, United States",
                color: "#FFB800",
                href: "https://www.google.com/maps/place/Los+Angeles,+CA",
              },
            ].map(({ Icon, text, color, href }) => (
              <Link
                key={text}
                href={href}
                target={href.startsWith("mailto") ? "_self" : "_blank"}
                rel={href.startsWith("mailto") ? "" : "noopener noreferrer"}
                className="block"
              >
                <motion.div
                  className="flex items-center p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <Icon className="w-6 h-6 mr-3" style={{ color }} />
                  <span className="text-gray-200">{text}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

