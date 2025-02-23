import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "../components/i18n-provider"
import { GoogleAnalytics } from "@next/third-parties/google"
import { ThemeProvider } from "@/components/theme-provider"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

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
    <html lang="en" suppressHydrationWarning>
      <I18nProvider>
        <body className={`${outfit.variable} ${outfit.className}`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <GoogleAnalytics gaId="G-K5XKE6L8VJ" />
          </ThemeProvider>
        </body>
      </I18nProvider>
    </html>
  )
}

