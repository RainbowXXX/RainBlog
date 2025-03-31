"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Home,
  LayoutDashboard,
  Mail,
  Search,
  Settings,
  Users,
  FileText,
  BarChart2,
  ChevronRight,
  Bell,
  LogOut,
  User,
} from "lucide-react"
import { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MainSidebar() {
  const pathname = usePathname()
  // 跟踪展开的菜单项
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => {
    return pathname === path
  }

  // 切换菜单项的展开状态
  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  // 检查菜单项是否展开
  const isExpanded = (title: string) => {
    return expandedItems.includes(title)
  }

  // 博客前台导航项
  const blogNavItems = [
    { href: "/", icon: <Home className="h-5 w-5" />, label: "首页" },
    { href: "/blog", icon: <BookOpen className="h-5 w-5" />, label: "博客" },
    { href: "/search", icon: <Search className="h-5 w-5" />, label: "搜索" },
    { href: "/newsletter", icon: <Mail className="h-5 w-5" />, label: "订阅" },
  ]

  // 管理功能导航项
  const adminNavItems = [
    {
      title: "仪表盘",
      icon: <LayoutDashboard className="h-5 w-5" />,
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

  // 模拟用户登录状态
  const isLoggedIn = true
  const isAdmin = true

  return (
    <Sidebar collapsible="icon">
      {/* 侧边栏头部 */}
      {isCollapsed ? (
        <div className="flex h-16 items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">B</span>
          </div>
        </div>
      ) : (
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">博客平台</span>
              <span className="text-xs text-muted-foreground">专业内容创作</span>
            </div>
          </div>
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="搜索..." className="pl-8" />
            </div>
          </div>
        </SidebarHeader>
      )}

      {/* 侧边栏内容 */}
      <SidebarContent>
        <SidebarMenu>
          {/* 博客前台导航 */}
          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel>博客</SidebarGroupLabel>}
            <SidebarGroupContent>
              {blogNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={isCollapsed ? item.label : undefined}
                  >
                    <Link href={item.href} className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}>
                      {item.icon}
                      {!isCollapsed && <span className="ml-3">{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>

          {/* 管理功能导航 - 仅对管理员显示 */}
          {isAdmin && (
            <SidebarGroup>
              {!isCollapsed && <SidebarGroupLabel>管理</SidebarGroupLabel>}
              <SidebarGroupContent>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.href ? (
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={isCollapsed ? item.title : undefined}
                      >
                        <Link href={item.href} className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}>
                          {item.icon}
                          {!isCollapsed && <span className="ml-3">{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
                        onClick={() => toggleExpanded(item.title)}
                        data-state={isExpanded(item.title) ? "open" : "closed"}
                        tooltip={isCollapsed ? item.title : undefined}
                      >
                        {item.icon}
                        {!isCollapsed && (
                          <>
                            <span className="ml-3 flex-1">{item.title}</span>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${isExpanded(item.title) ? "rotate-90" : ""}`}
                            />
                          </>
                        )}
                      </SidebarMenuButton>
                    )}

                    {item.items && !isCollapsed && (
                      <SidebarMenuSub className={isExpanded(item.title) ? "block" : "hidden"}>
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
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarMenu>
      </SidebarContent>

      {/* 侧边栏底部 */}
      <SidebarFooter>
        {isLoggedIn ? (
          isCollapsed ? (
            <div className="flex justify-center p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="用户头像" />
                <AvatarFallback>用</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="px-4 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="用户头像" />
                      <AvatarFallback>用</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">管理员</span>
                      <span className="text-xs text-muted-foreground">admin@example.com</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
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
          )
        ) : isCollapsed ? (
          <div className="flex justify-center p-2">
            <User className="h-5 w-5" />
          </div>
        ) : (
          <div className="space-y-3 px-4 py-2">
            <Link href="/login">
              <Button variant="outline" className="w-full justify-start gap-2">
                <span>登录</span>
              </Button>
            </Link>
            <Link href="/register">
              <Button className="w-full justify-start gap-2">
                <span>注册</span>
              </Button>
            </Link>
          </div>
        )}

        {!isCollapsed && (
          <div className="px-4 py-2 flex justify-between">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
              <span className="sr-only">通知</span>
            </Button>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

