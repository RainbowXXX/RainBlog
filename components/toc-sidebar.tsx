"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { MobileTOC } from "@/components/mobile-toc"

interface Heading {
  id: string
  text: string
  level: number
}

interface TOCSidebarProps {
  contentSelector?: string
}

export function TOCSidebar({ contentSelector = "article" }: TOCSidebarProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from the content
  useEffect(() => {
    const content = document.querySelector(contentSelector)
    if (!content) return

    // Find all h2 and h3 elements
    const headingElements = content.querySelectorAll("h2, h3")

    const extractedHeadings: Heading[] = Array.from(headingElements).map((el) => {
      // If heading doesn't have an id, create one from its text content
      if (!el.id) {
        el.id =
          el.textContent?.trim().toLowerCase().replace(/\s+/g, "-") ||
          `heading-${Math.random().toString(36).substr(2, 9)}`
      }

      return {
        id: el.id,
        text: el.textContent || "",
        level: Number.parseInt(el.tagName.substring(1)), // Extract the number from h2, h3, etc.
      }
    })

    setHeadings(extractedHeadings)
  }, [contentSelector])

  // Track the active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0,
      },
    )

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) observer.unobserve(element)
      })
    }
  }, [headings])

  // Scroll to heading when clicked
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const offset = 80 // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  if (headings.length === 0) return null

  return (
    <>
      {/* Desktop TOC */}
      <div className="hidden lg:block fixed right-4 xl:right-8 top-1/3 max-w-[220px] max-h-[60vh] overflow-y-auto bg-background border rounded-lg p-4 shadow-sm toc-sidebar">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">在本文中</h4>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
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

      {/* Mobile TOC */}
      <MobileTOC headings={headings} activeId={activeId} onHeadingClick={scrollToHeading} />
    </>
  )
}

