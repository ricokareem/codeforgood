import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Import translations directly
import enTranslation from "./public/locales/en/translation.json"
import deTranslation from "./public/locales/de/translation.json"
import esTranslation from "./public/locales/es/translation.json"

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: ["en", "de", "es"],
  resources: {
    en: {
      translation: enTranslation,
    },
    de: {
      translation: deTranslation,
    },
    es: {
      translation: esTranslation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
