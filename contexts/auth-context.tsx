"use client"

import type React from "react"
import {createContext, useContext, useEffect, useState} from "react"
import type {User, UserRole} from "@/lib/api"
import {authAPI} from "@/lib/api"
import {toast} from "@/hooks/use-toast"

// Define the shape of our auth context
interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<boolean>
    register: (name: string, email: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
    updateUser: (userData: Partial<User>) => Promise<boolean>
    hasRole: (roles: UserRole | UserRole[]) => boolean
}

// Create the auth context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider props
interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const isAuthenticated = !!user

    // Initialize auth state on mount
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Check if we have a token in localStorage
                const token = localStorage.getItem("auth-token")

                if (token) {
                    // Fetch current user data
                    const userData = await authAPI.getCurrentUser()
                    setUser(userData)
                }
            } catch (error) {
                console.error("Failed to initialize auth:", error)
                // Clear potentially invalid auth data
                localStorage.removeItem("auth-token")
                localStorage.removeItem("user")
            } finally {
                setIsLoading(false)
            }
        }

        initializeAuth()
    }, [])

    // Login function
    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true)
        try {
            const response = await authAPI.login(email, password)

            if (response.success && response.user) {
                setUser(response.user)
                toast({
                    title: "登录成功",
                    description: "欢迎回来！",
                })
                return true
            } else {
                toast({
                    title: "登录失败",
                    description: response.message || "邮箱或密码不正确",
                    variant: "destructive",
                })
                return false
            }
        } catch (error) {
            toast({
                title: "登录失败",
                description: error instanceof Error ? error.message : "发生未知错误",
                variant: "destructive",
            })
            return false
        } finally {
            setIsLoading(false)
        }
    }

    // Register function
    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        setIsLoading(true)
        try {
            const response = await authAPI.register(name, email, password)

            if (response.success && response.user) {
                setUser(response.user)
                toast({
                    title: "注册成功",
                    description: "您的账号已创建成功！",
                })
                return true
            } else {
                toast({
                    title: "注册失败",
                    description: response.message || "创建账号时出错",
                    variant: "destructive",
                })
                return false
            }
        } catch (error) {
            toast({
                title: "注册失败",
                description: error instanceof Error ? error.message : "发生未知错误",
                variant: "destructive",
            })
            return false
        } finally {
            setIsLoading(false)
        }
    }

    // Logout function
    const logout = async (): Promise<void> => {
        setIsLoading(true)
        try {
            await authAPI.logout()
            setUser(null)
            toast({
                title: "已登出",
                description: "您已成功登出账户",
            })
        } catch (error) {
            toast({
                title: "登出失败",
                description: "请稍后再试",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Update user function
    const updateUser = async (userData: Partial<User>): Promise<boolean> => {
        if (!user) return false

        setIsLoading(true)
        try {
            // In a real app, you would call an API to update the user
            // For now, we'll just update the local state
            setUser({...user, ...userData})

            // Update user in localStorage
            localStorage.setItem("user", JSON.stringify({...user, ...userData}))

            toast({
                title: "个人资料已更新",
                description: "您的个人资料信息已成功保存",
            })
            return true
        } catch (error) {
            toast({
                title: "更新失败",
                description: error instanceof Error ? error.message : "发生未知错误",
                variant: "destructive",
            })
            return false
        } finally {
            setIsLoading(false)
        }
    }

    // Check if user has a specific role or roles
    const hasRole = (roles: UserRole | UserRole[]): boolean => {
        if (!user) return false

        if (Array.isArray(roles)) {
            return roles.includes(user.role)
        }

        return user.role === roles
    }

    // Create the context value object
    const contextValue: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        hasRole,
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}

