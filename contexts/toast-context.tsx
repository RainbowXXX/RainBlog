"use client"

import type React from "react"
import {createContext, useContext, useState} from "react"
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider as RadixToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"

export interface ToastProps {
    id: string
    title?: string
    description?: string
    action?: React.ReactNode
    variant?: "default" | "destructive"
}

interface ToastContextType {
    toasts: ToastProps[]
    addToast: (toast: Omit<ToastProps, "id">) => void
    dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({children}: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastProps[]>([])

    const addToast = (toast: Omit<ToastProps, "id">) => {
        const id = Math.random().toString(36).substring(2, 9)
        setToasts((prev) => [...prev, {id, ...toast}])

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            dismissToast(id)
        }, 5000)
    }

    const dismissToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{toasts, addToast, dismissToast}}>
            <RadixToastProvider>
                {children}
                {toasts.map(({id, title, description, variant, action}) => (
                    <Toast key={id} variant={variant}>
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && <ToastDescription>{description}</ToastDescription>}
                        {action}
                        <ToastClose onClick={() => dismissToast(id)}/>
                    </Toast>
                ))}
                <ToastViewport/>
            </RadixToastProvider>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }

    return {
        toast: context.addToast,
        dismiss: context.dismissToast,
        toasts: context.toasts,
    }
}

// Add to index.ts

