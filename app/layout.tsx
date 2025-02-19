import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "../components/i18n-provider"
import { GoogleAnalytics } from "@next/third-parties/google"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rico Rodriquez Collins - Full Stack & Mobile Engineer",
  description: "Experienced Full Stack & Mobile Engineer portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <I18nProvider>
        <body className={outfit.className}>
          {children}
          <GoogleAnalytics gaId="G-K5XKE6L8VJ" />
        </body>
      </I18nProvider>
    </html>
  )
}

