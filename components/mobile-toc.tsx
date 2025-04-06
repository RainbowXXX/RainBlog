"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { List } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface Heading {
  id: string
  text: string
  level: number
}

interface MobileTOCProps {
  headings: Heading[]
  activeId: string
  onHeadingClick: (id: string) => void
}

export function MobileTOC({ headings, activeId, onHeadingClick }: MobileTOCProps) {
  const [open, setOpen] = useState(false)

  const handleHeadingClick = (id: string) => {
    onHeadingClick(id)
    setOpen(false)
  }

  if (headings.length === 0) return null

  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 shadow-md">
            <List className="h-5 w-5" />
            <span className="sr-only">目录</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[350px]">
          <div className="px-1 py-4">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">在本文中</h4>
            <nav className="space-y-1">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => handleHeadingClick(heading.id)}
                  className={cn(
                    "block text-sm py-1 px-2 rounded-md w-full text-left transition-colors hover:bg-muted",
                    heading.level === 2 ? "font-medium" : "pl-4 text-muted-foreground",
                    activeId === heading.id ? "bg-muted text-primary" : "text-foreground",
                  )}
                >
                  {heading.text}
                </button>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

