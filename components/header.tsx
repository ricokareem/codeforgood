"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import MobileDrawer from "./mobile-drawer";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation("translation");
  const [menuItems, setMenuItems] = useState([
    { key: "about", label: "" },
    { key: "experience", label: "" },
    { key: "skills", label: "" },
    { key: "projects", label: "" },
    { key: "education", label: "" },
    { key: "community", label: "" },
  ]);

  useEffect(() => {
    const savedLanguage = Cookies.get("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    setMenuItems([
      { key: "about", label: t("menu.about") },
      { key: "experience", label: t("menu.experience") },
      { key: "skills", label: t("menu.skills") },
      { key: "projects", label: t("menu.projects") },
      { key: "education", label: t("menu.education") },
      { key: "community", label: t("menu.community") },
    ]);
  }, [t]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    Cookies.set("selectedLanguage", lang, { expires: 2 });
  };

  const handleMenuItemClick = (key: string) => {
    const element = document.getElementById(key);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const LanguageSelector = (
    <div className="relative w-full">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="appearance-none w-full bg-background/80 backdrop-blur-sm border border-border text-foreground py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-foreground">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );

  const HeaderLanguageSelector = (
    <div className="relative">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="appearance-none bg-background/80 backdrop-blur-sm border border-border text-foreground py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ width: "98px", height: "40px", marginLeft: "10px" }}
        aria-label="Select language"
      >
        <option value="en">EN</option>
        <option value="de">DE</option>
        <option value="es">ES</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed w-full bg-background/60 backdrop-blur-xl z-50 border-b border-border/50 safe-top">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-transparent"></div>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
          <Link href="/" className="text-2xl font-bold figure-heading-logo">
            CodeForGood
          </Link>
          <div className="flex items-center space-x-4">
            {/* Language selector - visible on desktop only */}
            <div className="hidden md:block">
              {HeaderLanguageSelector}
            </div>

            {/* Hamburger button - mobile only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors touch-feedback"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop menu */}
            <ul className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={`#${item.key}`}
                    className="text-muted-foreground hover:text-blue-500 transition-colors font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuItemClick(item.key);
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

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        onMenuItemClick={handleMenuItemClick}
        languageSelector={LanguageSelector}
      />
    </>
  );
}
