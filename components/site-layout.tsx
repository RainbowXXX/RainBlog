"use client"

import type * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { MainSidebar } from "@/components/main-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface SiteLayoutProps {
  children: React.ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center border-b px-6">
          <SidebarTrigger />
          <Button variant="ghost" size="icon" onClick={handleGoBack} className="ml-2" aria-label="返回">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Separator orientation="vertical" className="mx-4 h-6" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">博客平台</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

