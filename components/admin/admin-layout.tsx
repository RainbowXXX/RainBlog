"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart2, FileText, Home, Settings, Users, ChevronRight, Search, Bell, User, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  // Define navigation structure with nested items
  const navItems = [
    {
      title: "仪表盘",
      icon: <Home className="h-5 w-5" />,
      href: "/admin",
      isActive: pathname === "/admin",
    },
    {
      title: "内容管理",
      icon: <FileText className="h-5 w-5" />,
      items: [
        {
          title: "所有文章",
          href: "/admin/posts",
          isActive: pathname === "/admin/posts",
        },
        {
          title: "新建文章",
          href: "/admin/posts/new",
          isActive: pathname === "/admin/posts/new",
        },
        {
          title: "分类管理",
          href: "/admin/categories",
          isActive: pathname === "/admin/categories",
        },
        {
          title: "标签管理",
          href: "/admin/tags",
          isActive: pathname === "/admin/tags",
        },
      ],
    },
    {
      title: "用户管理",
      icon: <Users className="h-5 w-5" />,
      items: [
        {
          title: "所有用户",
          href: "/admin/users",
          isActive: pathname === "/admin/users",
        },
        {
          title: "角色权限",
          href: "/admin/roles",
          isActive: pathname === "/admin/roles",
        },
      ],
    },
    {
      title: "统计分析",
      icon: <BarChart2 className="h-5 w-5" />,
      href: "/admin/stats",
      isActive: pathname === "/admin/stats",
    },
    {
      title: "系统设置",
      icon: <Settings className="h-5 w-5" />,
      items: [
        {
          title: "基本设置",
          href: "/admin/settings/general",
          isActive: pathname === "/admin/settings/general",
        },
        {
          title: "外观设置",
          href: "/admin/settings/appearance",
          isActive: pathname === "/admin/settings/appearance",
        },
        {
          title: "SEO设置",
          href: "/admin/settings/seo",
          isActive: pathname === "/admin/settings/seo",
        },
      ],
    },
  ]

  // Get current page title for breadcrumb
  const getCurrentPageTitle = () => {
    const currentItem = navItems.find(
      (item) => item.href === pathname || (item.items && item.items.some((subItem) => subItem.href === pathname)),
    )

    if (currentItem) {
      if (currentItem.href === pathname) {
        return currentItem.title
      } else if (currentItem.items) {
        const currentSubItem = currentItem.items.find((subItem) => subItem.href === pathname)
        return {
          parent: currentItem.title,
          current: currentSubItem?.title || "",
        }
      }
    }

    return "仪表盘"
  }

  const currentPage = getCurrentPageTitle()
  const pageTitle = typeof currentPage === "string" ? currentPage : currentPage.current
  const parentTitle = typeof currentPage === "string" ? null : currentPage.parent

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">博客管理系统</span>
              <span className="text-xs text-muted-foreground">专业内容管理平台</span>
            </div>
          </div>
          <form>
            <SidebarGroup className="py-0">
              <SidebarGroupContent className="relative">
                <SidebarInput id="search" placeholder="搜索..." className="pl-8" />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
              </SidebarGroupContent>
            </SidebarGroup>
          </form>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.href ? (
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.href} className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton className="flex items-center gap-3 font-medium">
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform [&[data-state=open]>svg]:rotate-90" />
                  </SidebarMenuButton>
                )}

                {item.items && (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <Link href={subItem.href}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mx-2 h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">管理系统</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {parentTitle && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">{parentTitle}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
              <span className="sr-only">通知</span>
            </Button>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="管理员" />
                    <AvatarFallback>管</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">管理员</p>
                    <p className="text-xs text-muted-foreground">admin@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>个人资料</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings/general" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>系统设置</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <span>退出登录</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

