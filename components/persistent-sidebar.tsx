"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, LayoutDashboard, LogIn, Mail, Search, UserPlus, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"

export function PersistentSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: "/", icon: <Home className="h-5 w-5" />, label: "首页" },
    { href: "/blog", icon: <BookOpen className="h-5 w-5" />, label: "博客" },
    { href: "/search", icon: <Search className="h-5 w-5" />, label: "搜索" },
    { href: "/newsletter", icon: <Mail className="h-5 w-5" />, label: "订阅" },
    { href: "/admin", icon: <LayoutDashboard className="h-5 w-5" />, label: "管理" },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-background md:flex transition-all duration-300">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 dark:bg-gray-200 transition-transform duration-300 hover:scale-105">
              <span className="text-lg font-bold text-white dark:text-gray-800">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">博客平台</span>
              <span className="text-xs text-muted-foreground">专业内容创作</span>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索..."
            className="pl-8 transition-all duration-300 focus:ring-2 focus:ring-gray-500/20"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
              isActive(item.href)
                ? "bg-gray-800/10 dark:bg-gray-200/10 text-gray-800 dark:text-gray-200 transform scale-[1.02]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1",
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        <div className="space-y-3 mb-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 transition-all duration-300 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-800"
            >
              <LogIn className="h-4 w-4" />
              <span>登录</span>
            </Button>
          </Link>

          <Link href="/register">
            <Button className="w-full justify-start gap-2 transition-all duration-300 bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300">
              <UserPlus className="h-4 w-4" />
              <span>注册</span>
            </Button>
          </Link>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-transform duration-300 hover:scale-110">
            <Users className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">用户账户</span>
            <span className="text-xs text-muted-foreground">个人资料</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

