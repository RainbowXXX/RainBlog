"use client"

import type React from "react"
import {ThemeProvider} from "./theme-context"
import {AuthProvider} from "./auth-context"
import {SidebarProvider} from "./sidebar-context"
import {ToastProvider} from "./toast-context"

interface ProvidersProps {
    children: React.ReactNode
}

export function Providers({children}: ProvidersProps) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <SidebarProvider>
                    <ToastProvider>{children}</ToastProvider>
                </SidebarProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

