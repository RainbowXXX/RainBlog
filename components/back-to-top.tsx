"use client"

import * as React from "react"
import {ArrowUp} from "lucide-react"
import {Button} from "@/components/ui/button"

export function BackToTop() {
    const [isVisible, setIsVisible] = React.useState(false)

    // Show button when page is scrolled down
    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <>
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full p-0 shadow-md bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-300"
                    aria-label="返回顶部"
                >
                    <ArrowUp className="h-5 w-5"/>
                </Button>
            )}
        </>
    )
}

