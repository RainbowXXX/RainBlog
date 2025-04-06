import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { RefinedLayout } from "@/components/refined-layout"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <RefinedLayout>{children}</RefinedLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
