"use client"

import {useEffect} from "react"
import {usePathname, useRouter} from "next/navigation"
import {useAuth} from "@/contexts/auth-context"
import type {UserRole} from "@/lib/api"

interface UseAuthGuardOptions {
    requiredRoles?: UserRole | UserRole[]
    redirectTo?: string
    redirectIfAuthenticated?: boolean
    redirectAuthenticatedTo?: string
}

export function useAuthGuard({
                                 requiredRoles,
                                 redirectTo = "/login",
                                 redirectIfAuthenticated = false,
                                 redirectAuthenticatedTo = "/",
                             }: UseAuthGuardOptions = {}) {
    const {isAuthenticated, isLoading, user, hasRole} = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Don't redirect while still loading
        if (isLoading) return

        // Handle redirect if authenticated
        if (redirectIfAuthenticated && isAuthenticated) {
            router.push(redirectAuthenticatedTo)
            return
        }

        // Handle redirect if not authenticated
        if (!redirectIfAuthenticated && !isAuthenticated) {
            // Add the current path as a redirect parameter
            const encodedRedirect = encodeURIComponent(pathname || "/")
            router.push(`${redirectTo}?redirect=${encodedRedirect}`)
            return
        }

        // Handle role-based access
        if (requiredRoles && isAuthenticated && !hasRole(requiredRoles)) {
            router.push("/unauthorized")
            return
        }
    }, [
        isAuthenticated,
        isLoading,
        redirectIfAuthenticated,
        redirectTo,
        redirectAuthenticatedTo,
        requiredRoles,
        hasRole,
        router,
        pathname,
        user,
    ])

    return {
        isAuthenticated,
        isLoading,
        user,
    }
}

