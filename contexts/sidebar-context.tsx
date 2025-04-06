"use client"

import type React from "react"
import {createContext, useContext, useEffect, useState} from "react"

type SidebarState = "expanded" | "collapsed"

interface SidebarContextType {
    state: SidebarState
    toggleSidebar: () => void
    expandSidebar: () => void
    collapseSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
    children: React.ReactNode
    defaultState?: SidebarState
    storageKey?: string
}

export function SidebarProvider({
                                    children,
                                    defaultState = "expanded",
                                    storageKey = "sidebar-state",
                                }: SidebarProviderProps) {
    const [state, setState] = useState<SidebarState>(defaultState)

    // Initialize state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem(storageKey) as SidebarState | null
        if (savedState && (savedState === "expanded" || savedState === "collapsed")) {
            setState(savedState)
        }
    }, [storageKey])

    // Save state to localStorage when it changes
    useEffect(() => {
        localStorage.setItem(storageKey, state)
    }, [state, storageKey])

    const toggleSidebar = () => {
        setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"))
    }

    const expandSidebar = () => {
        setState("expanded")
    }

    const collapseSidebar = () => {
        setState("collapsed")
    }

    const value = {
        state,
        toggleSidebar,
        expandSidebar,
        collapseSidebar,
    }

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

// Update the index.ts to include the new context

