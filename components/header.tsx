"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import Cookies from "js-cookie"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, i18n } = useTranslation("translation")

  useEffect(() => {
    const savedLanguage = Cookies.get("selectedLanguage")
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    Cookies.set("selectedLanguage", lang, { expires: 2 }) // 2 days expiration
  }

  const menuItems = [
    { key: "about", label: t("menu.about") },
    { key: "experience", label: t("menu.experience") },
    { key: "skills", label: t("menu.skills") },
    { key: "projects", label: t("menu.projects") },
    { key: "education", label: t("menu.education") },
    { key: "community", label: t("menu.community") },
  ]

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          CFG
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="appearance-none bg-white/10 text-white py-2 pl-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B2FF]"
              style={{ width: "140px", height: "40px" }}
              aria-label={t("menu.selectLanguage")}
            >
              <option value="en">ENGLISH 🇬🇧</option>
              <option value="de">DEUTSCH 🇩🇪</option>
              <option value="es">ESPAÑOL 🇪🇸</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
          <ul className={`md:flex space-x-4 ${isMenuOpen ? "block" : "hidden"}`}>
            {menuItems.map((item) => (
              <li key={item.key}>
                <a
                  href={`#${item.key}`}
                  className="text-gray-200 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(item.key)
                    if (element) {
                      const yOffset = -100
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                      window.scrollTo({ top: y, behavior: "smooth" })
                    }
                    setIsMenuOpen(false)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

