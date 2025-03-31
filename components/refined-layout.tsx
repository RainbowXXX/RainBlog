"use client"

import React from "react"
import { useRouter, usePathname } from "next/navigation"
import { MainSidebar } from "@/components/main-sidebar"
import { BackToTop } from "@/components/back-to-top"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface RefinedLayoutProps {
  children: React.ReactNode
}

export function RefinedLayout({ children }: RefinedLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const isHomePage = pathname === "/"
  const isAdminSection = pathname?.startsWith("/admin")

  // 获取当前页面的面包屑信息
  const getBreadcrumbs = () => {
    if (!pathname) return []

    // Special case for root route
    if (pathname === "/") {
      return [
        {
          name: "首页",
          path: "/",
          isLast: true,
        },
      ]
    }

    const paths = pathname.split("/").filter(Boolean)
    let currentPath = ""

    return paths.map((path, i) => {
      currentPath += `/${path}`

      // 为路径部分创建更友好的名称
      let name = path.charAt(0).toUpperCase() + path.slice(1)
      if (path === "admin") name = "管理"
      if (path === "posts") name = "文章"
      if (path === "users") name = "用户"
      if (path === "stats") name = "统计"
      if (path === "categories") name = "分类"
      if (path === "tags") name = "标签"
      if (path === "settings") name = "设置"
      if (path === "general") name = "基本设置"
      if (path === "appearance") name = "外观设置"
      if (path === "seo") name = "SEO设置"

      return {
        name,
        path: currentPath,
        isLast: i === paths.length - 1,
      }
    })
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-6 transition-all duration-300">
          <div className="flex items-center gap-2">
            <SidebarTrigger />

            {/* 显示面包屑导航 */}
            <Breadcrumb>
              <BreadcrumbList>
                {pathname !== "/" && (
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">首页</BreadcrumbLink>
                  </BreadcrumbItem>
                )}

                {pathname !== "/" && breadcrumbs.length > 0 && <BreadcrumbSeparator />}

                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={i}>
                    {crumb.isLast ? (
                      <BreadcrumbItem>
                        <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                      </BreadcrumbItem>
                    ) : (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink href={crumb.path}>{crumb.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 bg-background">
          <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:px-8 animate-fadeIn">{children}</div>
        </main>

        <BackToTop />
      </SidebarInset>
    </SidebarProvider>
  )
}

