// Type definitions for API responses and requests

// Post types
export interface PostAuthor {
    id: number
    name: string
    email: string
}

export interface Post {
    id: number
    title: string
    content: string
    excerpt: string
    slug: string
    date: string
    author: PostAuthor
    tags: string[]
    status: "published" | "draft" | "scheduled"
    categoryId?: string
    featuredImage?: string
    publishDate?: string
    allowComments?: boolean
    views?: number
}

export interface PostsResponse {
    posts: Post[]
    totalPosts: number
    totalPages: number
}

export interface PostCreateData {
    title: string
    content: string
    excerpt: string
    slug: string
    status: "published" | "draft" | "scheduled"
    categoryId?: string
    tags?: string[]
    featuredImage?: string
    publishDate?: string
    allowComments?: boolean
}

export interface PostUpdateData extends Partial<PostCreateData> {
}

export interface PostResponse {
    success: boolean
    post: Post
    message?: string
}

// User types
export type UserRole = "admin" | "author" | "editor" | "contributor" | "subscriber"
export type UserStatus = "active" | "inactive"

export interface User {
    id: number
    name: string
    email: string
    role: UserRole
    status: UserStatus
    joinedDate: string
}

export interface UsersResponse {
    users: User[]
    totalUsers: number
    totalPages: number
}

export interface UserCreateData {
    name: string
    email: string
    password: string
    role?: UserRole
    status?: UserStatus
}

export interface UserUpdateData extends Partial<UserCreateData> {
}

export interface UserResponse {
    success: boolean
    user: User
    message?: string
}

// Stats types
export interface PopularPost {
    id: number
    title: string
    views: number
    comments: number
    shares: number
}

export interface DeviceData {
    device: string
    percentage: number
}

export interface StatsData {
    totalPosts: number
    totalViews: number
    totalUsers: number
    totalComments: number
    totalSubscribers: number
    averageReadTime: string
    postsByMonth: Array<{ month: string; count: number }>
    viewsByDay: Array<{ date: string; views: number }>
    deviceBreakdown: DeviceData[]
    popularPosts: PopularPost[]
    userActivityByDay: Array<{ day: string; comments: number; signups: number }>
}

// Dashboard types
export interface DashboardCard {
    title: string
    description: string
    value: string
    change: string
    changeType: "positive" | "negative" | "neutral"
}

export interface RecentPost {
    id: number
    title: string
    author: string
    date: string
    views: number
}

export interface DashboardData {
    cards: DashboardCard[]
    recentPosts: RecentPost[]
    trafficData: Array<{ name: string; visits: number }>
}

// Chart types
export interface ChartData {
    trafficOverTime: Array<{ name: string; views: number; visitors: number }>
    userActivity: Array<{ name: string; comments: number; signups: number }>
}

// Category types
export interface Category {
    id: number
    name: string
    slug: string
    postCount: number
    description: string
}

export interface CategoryCreateData {
    name: string
    slug: string
    description?: string
}

export interface CategoryUpdateData extends Partial<CategoryCreateData> {
}

export interface CategoryResponse {
    success: boolean
    category: Category
    message?: string
}

// Tag types
export interface Tag {
    id: number
    name: string
    slug: string
    postCount: number
}

// Role types
export interface Role {
    id: number
    name: string
    slug: string
    userCount: number
    description: string
}

// Newsletter types
export interface NewsletterSubscribeData {
    email: string
}

export interface NewsletterResponse {
    success: boolean
    message: string
}

// Auth types
export interface LoginData {
    email: string
    password: string
}

export interface RegisterData {
    name: string
    email: string
    password: string
}

export interface AuthResponse {
    success: boolean
    token?: string
    user?: User
    message?: string
}

// Generic API response
export interface ApiResponse {
    success: boolean
    message: string
}

// Check if we're in development environment
const isDevelopment = process.env.NODE_ENV === "development"

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
        // Get auth token (if exists)
        let headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(options.headers as Record<string, string>),
        }

        // If in browser environment, add auth token
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("auth-token")
            if (token) {
                headers = {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                }
            }
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.error || `API error: ${response.status}`)
        }

        return (await response.json()) as T
    } catch (error) {
        console.error("API fetch error:", error)
        throw error
    }
}

// Posts API
export const postsAPI = {
    getAllPosts: async (page = 1, limit = 10, search = "", tag = ""): Promise<PostsResponse> => {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        })

        if (search) queryParams.append("search", search)
        if (tag) queryParams.append("tag", tag)

        return fetchAPI<PostsResponse>(`/api/posts?${queryParams.toString()}`)
    },

    getPostBySlug: async (slug: string): Promise<Post> => {
        return fetchAPI<Post>(`/api/posts/slug/${slug}`)
    },

    getPostById: async (id: number): Promise<Post> => {
        return fetchAPI<Post>(`/api/posts/${id}`)
    },

    createPost: async (postData: PostCreateData): Promise<PostResponse> => {
        return fetchAPI<PostResponse>("/api/posts", {
            method: "POST",
            body: JSON.stringify(postData),
        })
    },

    updatePost: async (id: number, postData: PostUpdateData): Promise<PostResponse> => {
        return fetchAPI<PostResponse>(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify(postData),
        })
    },

    deletePost: async (id: number): Promise<ApiResponse> => {
        return fetchAPI<ApiResponse>(`/api/posts/${id}`, {
            method: "DELETE",
        })
    },
}

// Users API
export const usersAPI = {
    getAllUsers: async (page = 1, limit = 10, search = "", role = ""): Promise<UsersResponse> => {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        })

        if (search) queryParams.append("search", search)
        if (role) queryParams.append("role", role)

        return fetchAPI<UsersResponse>(`/api/users?${queryParams.toString()}`)
    },

    getUserById: async (id: number): Promise<User> => {
        return fetchAPI<User>(`/api/users/${id}`)
    },

    createUser: async (userData: UserCreateData): Promise<UserResponse> => {
        return fetchAPI<UserResponse>("/api/users", {
            method: "POST",
            body: JSON.stringify(userData),
        })
    },

    updateUser: async (id: number, userData: UserUpdateData): Promise<UserResponse> => {
        return fetchAPI<UserResponse>(`/api/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        })
    },

    deleteUser: async (id: number): Promise<ApiResponse> => {
        return fetchAPI<ApiResponse>(`/api/users/${id}`, {
            method: "DELETE",
        })
    },
}

// Stats API
export const statsAPI = {
    getStats: async (period = "month"): Promise<StatsData> => {
        return fetchAPI<StatsData>(`/api/stats?period=${period}`)
    },

    getDashboardData: async (): Promise<DashboardData> => {
        return fetchAPI<DashboardData>("/api/dashboard")
    },

    getChartData: async (): Promise<ChartData> => {
        return fetchAPI<ChartData>("/api/charts")
    },
}

// Categories API
export const categoriesAPI = {
    getAllCategories: async (): Promise<Category[]> => {
        return fetchAPI<Category[]>("/api/categories")
    },

    getCategoryById: async (id: number): Promise<Category> => {
        return fetchAPI<Category>(`/api/categories/${id}`)
    },

    createCategory: async (categoryData: CategoryCreateData): Promise<CategoryResponse> => {
        return fetchAPI<CategoryResponse>("/api/categories", {
            method: "POST",
            body: JSON.stringify(categoryData),
        })
    },

    updateCategory: async (id: number, categoryData: CategoryUpdateData): Promise<CategoryResponse> => {
        return fetchAPI<CategoryResponse>(`/api/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify(categoryData),
        })
    },

    deleteCategory: async (id: number): Promise<ApiResponse> => {
        return fetchAPI<ApiResponse>(`/api/categories/${id}`, {
            method: "DELETE",
        })
    },
}

// Tags API
export const tagsAPI = {
    getAllTags: async (): Promise<Tag[]> => {
        return fetchAPI<Tag[]>("/api/tags")
    },

    getTagById: async (id: number): Promise<Tag> => {
        return fetchAPI<Tag>(`/api/tags/${id}`)
    },
}

// Roles API
export const rolesAPI = {
    getAllRoles: async (): Promise<Role[]> => {
        return fetchAPI<Role[]>("/api/roles")
    },

    getRoleById: async (id: number): Promise<Role> => {
        return fetchAPI<Role>(`/api/roles/${id}`)
    },
}

// Newsletter API
export const newsletterAPI = {
    subscribe: async (email: string): Promise<NewsletterResponse> => {
        return fetchAPI<NewsletterResponse>("/api/newsletter", {
            method: "POST",
            body: JSON.stringify({email}),
        })
    },
}

// Auth API
export const authAPI = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await fetchAPI<AuthResponse>("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
        })

        if (response.success && response.user) {
            // Save auth token to local storage
            localStorage.setItem("auth-token", response.token || "dummy-token")
            localStorage.setItem("user", JSON.stringify(response.user))
        }

        return response
    },

    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
        const response = await fetchAPI<AuthResponse>("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({name, email, password}),
        })

        if (response.success && response.user) {
            // Save auth token to local storage
            localStorage.setItem("auth-token", response.token || "dummy-token")
            localStorage.setItem("user", JSON.stringify(response.user))
        }

        return response
    },

    logout: async (): Promise<ApiResponse> => {
        const response = await fetchAPI<ApiResponse>("/api/auth/logout", {
            method: "POST",
        })

        // Clear auth info from local storage
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user")

        return response
    },

    getCurrentUser: async (): Promise<User> => {
        // First try to get user info from local storage
        if (typeof window !== "undefined") {
            const userJson = localStorage.getItem("user")
            if (userJson) {
                try {
                    return JSON.parse(userJson) as User
                } catch (error) {
                    console.error("Failed to parse user info:", error)
                }
            }
        }

        // If not in local storage or parsing failed, get from API
        // return fetchAPI<User>("/api/auth/me")
        return {
            id: 1,
            name: "张美丽",
            email: "zhang@example.com",
            role: "admin",
            status: "active",
            joinedDate: "2025-01-12",
        }
    },
}

