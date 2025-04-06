import type React from "react"
import {Inter} from "next/font/google"
import "./globals.css"
import {RefinedLayout} from "@/components/refined-layout"
import {Providers} from "@/contexts"
import './globals.css'

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="zh" suppressHydrationWarning>
        <body className={inter.className}>
        <Providers>
            <RefinedLayout>{children}</RefinedLayout>
        </Providers>
        </body>
        </html>
    )
}

export const metadata = {
    generator: "v0.dev",
}


