import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css"

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
      <body className={outfit.className}>
        {children}
        <GoogleAnalytics gaId="G-K5XKE6L8VJ" />
      </body>
    </html>
  )
}
