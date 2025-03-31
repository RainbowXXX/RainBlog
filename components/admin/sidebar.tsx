import type React from "react"
import Link from "next/link"
import { BarChart2, FileText, Home, Settings, Users } from "lucide-react"

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">博客管理</h1>
      </div>

      <nav className="space-y-1">
        <SidebarLink href="/admin" icon={<Home size={20} />} label="仪表盘" />
        <SidebarLink href="/admin/posts" icon={<FileText size={20} />} label="文章" />
        <SidebarLink href="/admin/users" icon={<Users size={20} />} label="用户" />
        <SidebarLink href="/admin/stats" icon={<BarChart2 size={20} />} label="统计" />
        <SidebarLink href="/admin/settings" icon={<Settings size={20} />} label="设置" />
      </nav>

      <div className="mt-auto pt-8">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
        >
          查看博客
        </Link>
      </div>
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SidebarLink({ href, icon, label }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-4 px-4 py-3 rounded hover:bg-gray-800 transition-colors">
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  )
}

