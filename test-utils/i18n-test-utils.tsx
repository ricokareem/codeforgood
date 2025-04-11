import type React from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Create a test instance of i18next
const createTestI18n = (language: string, resources: any) => {
  const i18nInstance = i18n.createInstance()
  i18nInstance.use(initReactI18next).init({
    lng: language,
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  })
  return i18nInstance
}

// Wrapper component for testing with i18n
export const TestI18nProvider = ({
  children,
  language = "en",
  resources,
}: {
  children: React.ReactNode
  language?: string
  resources: any
}) => {
  const i18nInstance = createTestI18n(language, resources)
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
