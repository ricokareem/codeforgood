import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "../components/i18n-provider"
import { GoogleAnalytics } from "@next/third-parties/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Rico Rodriquez Collins - Full Stack & Mobile Engineer",
  description: "Experienced Full Stack & Mobile Engineer portfolio",
}

export const dynamic = "force-dynamic"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <I18nProvider>
        <body className={`${inter.variable} ${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <GoogleAnalytics gaId="G-K5XKE6L8VJ" />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </I18nProvider>
    </html>
  )
}
