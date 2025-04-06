import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// 用户角色类型
export type UserRole = "admin" | "author" | "editor" | "contributor" | "subscriber"

// 用户类型
export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  status: "active" | "inactive"
  joinedDate: string
}

// 检查用户是否已登录
export async function isAuthenticated() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth-token")
  return !!authToken
}

// 获取当前登录用户
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth-token")

  if (!authToken) {
    return null
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      next: { revalidate: 60 }, // 缓存60秒
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("获取当前用户失败:", error)
    return null
  }
}

// 检查用户是否有特定角色
export async function hasRole(roles: UserRole | UserRole[]): Promise<boolean> {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  if (Array.isArray(roles)) {
    return roles.includes(user.role)
  }

  return user.role === roles
}

// 路由守卫 - 需要登录
export async function requireAuth() {
  if (!isAuthenticated()) {
    redirect("/login?redirect=" + encodeURIComponent(window.location.pathname))
  }
}

// 路由守卫 - 需要特定角色
export async function requireRole(roles: UserRole | UserRole[]) {
  if (!isAuthenticated()) {
    redirect("/login?redirect=" + encodeURIComponent(window.location.pathname))
  }

  const hasRequiredRole = await hasRole(roles)
  if (!hasRequiredRole) {
    redirect("/unauthorized")
  }
}

// 路由守卫 - 已登录用户重定向
export async function redirectIfAuthenticated(redirectTo = "/") {
  if (await isAuthenticated()) {
    redirect(redirectTo)
  }
}

