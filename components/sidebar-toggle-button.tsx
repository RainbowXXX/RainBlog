"use client"

import { Menu, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarToggleButton() {
  const { state, toggleSidebar } = useSidebar()
  const isExpanded = state === "expanded"

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-md transition-all duration-300 hover:bg-muted"
      onClick={toggleSidebar}
      aria-label={isExpanded ? "收起侧边栏" : "展开侧边栏"}
    >
      {isExpanded ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  )
}

