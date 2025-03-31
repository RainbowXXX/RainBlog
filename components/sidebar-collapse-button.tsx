"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarCollapseButton() {
  const { state, toggleSidebar } = useSidebar()
  const isExpanded = state === "expanded"

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full p-0"
      onClick={toggleSidebar}
      aria-label={isExpanded ? "收起侧边栏" : "展开侧边栏"}
    >
      {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </Button>
  )
}

