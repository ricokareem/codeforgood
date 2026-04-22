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
  description:
    "Technical leader who champions sustainable engineering practices through empathy and collaboration. Full Stack & Mobile Engineer with expertise in React, TypeScript, Ruby on Rails, and Swift.",
  metadataBase: new URL("https://www.codeforgood.com"),
  openGraph: {
    title: "Rico Rodriquez Collins - Full Stack & Mobile Engineer",
    description:
      "Technical leader who champions sustainable engineering practices through empathy and collaboration.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rico Rodriquez Collins - Full Stack & Mobile Engineer",
    description:
      "Technical leader who champions sustainable engineering practices through empathy and collaboration.",
    creator: "@ricokareem",
  },
}

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
            {process.env.NEXT_PUBLIC_GA_ID && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            )}
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </I18nProvider>
    </html>
  )
}
