"use client"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "@/contexts"
import {Button} from "@/components/ui/button"

export function ThemeToggle() {
    const {theme, setTheme} = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            className="transition-all duration-300"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" && <Sun className="h-5 w-5"/>}
            {theme === "dark" && <Moon className="h-5 w-5"/>}
            <span className="sr-only">切换主题</span>
        </Button>
    )
}

