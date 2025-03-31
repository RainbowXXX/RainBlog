import { posts, users, stats, dashboardData, chartData, categories, tags, roles } from "@/lib/mock"

// Check if DEBUG mode is enabled
const isDebugMode = () => {
  // In client components, we need to check if the variable is prefixed with NEXT_PUBLIC_
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_DEBUG === "true"
  }
  // In server components
  return process.env.DEBUG === "true"
}

// Base API URL - would be set in environment variables in a real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

// TODO(dev) replace the type of options from any to other specific type
// Generic fetch function with error handling
async function fetchAPI(endpoint: string, options: any = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API fetch error:", error)
    throw error
  }
}

// Posts API
export const postsAPI = {
  getAllPosts: async (page = 1, limit = 10) => {
    if (isDebugMode()) {
      return {
        posts: posts,
        meta: {
          total: posts.length,
          page,
          limit,
          totalPages: Math.ceil(posts.length / limit),
        },
      }
    }
    return fetchAPI(`/posts?page=${page}&limit=${limit}`)
  },

  getPostBySlug: async (slug: string) => {
    if (isDebugMode()) {
      const post = posts.find((p) => p.slug === slug)
      return post || null
    }
    return fetchAPI(`/posts/slug/${slug}`)
  },

  getPostById: async (id: number) => {
    if (isDebugMode()) {
      const post = posts.find((p) => p.id === id)
      return post || null
    }
    return fetchAPI(`/posts/${id}`)
  },

  createPost: async (postData: any) => {
    if (isDebugMode()) {
      // Simulate creating a post with mock data
      const newPost = {
        id: posts.length + 1,
        ...postData,
        date: new Date().toISOString().split("T")[0],
      }
      return newPost
    }
    return fetchAPI("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    })
  },

  updatePost: async (id: number, postData: any) => {
    if (isDebugMode()) {
      // Simulate updating a post with mock data
      const postIndex = posts.findIndex((p) => p.id === id)
      if (postIndex === -1) return null

      const updatedPost = {
        ...posts[postIndex],
        ...postData,
      }
      return updatedPost
    }
    return fetchAPI(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    })
  },

  deletePost: async (id: number) => {
    if (isDebugMode()) {
      // Simulate deleting a post
      const postIndex = posts.findIndex((p) => p.id === id)
      if (postIndex === -1) return { success: false }

      return { success: true }
    }
    return fetchAPI(`/posts/${id}`, {
      method: "DELETE",
    })
  },
}

// Users API
export const usersAPI = {
  getAllUsers: async (page = 1, limit = 10) => {
    if (isDebugMode()) {
      return {
        users: users,
        meta: {
          total: users.length,
          page,
          limit,
          totalPages: Math.ceil(users.length / limit),
        },
      }
    }
    return fetchAPI(`/users?page=${page}&limit=${limit}`)
  },

  getUserById: async (id: number) => {
    if (isDebugMode()) {
      const user = users.find((u) => u.id === id)
      return user || null
    }
    return fetchAPI(`/users/${id}`)
  },

  createUser: async (userData: any) => {
    if (isDebugMode()) {
      // Simulate creating a user with mock data
      const newUser = {
        id: users.length + 1,
        ...userData,
        joinedDate: new Date().toISOString().split("T")[0],
      }
      return newUser
    }
    return fetchAPI("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  updateUser: async (id: number, userData: any) => {
    if (isDebugMode()) {
      // Simulate updating a user with mock data
      const userIndex = users.findIndex((u) => u.id === id)
      if (userIndex === -1) return null

      const updatedUser = {
        ...users[userIndex],
        ...userData,
      }
      return updatedUser
    }
    return fetchAPI(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },

  deleteUser: async (id: number) => {
    if (isDebugMode()) {
      // Simulate deleting a user
      const userIndex = users.findIndex((u) => u.id === id)
      if (userIndex === -1) return { success: false }

      return { success: true }
    }
    return fetchAPI(`/users/${id}`, {
      method: "DELETE",
    })
  },
}

// Stats API
export const statsAPI = {
  getStats: async () => {
    if (isDebugMode()) {
      return stats
    }
    return fetchAPI("/stats")
  },

  getDashboardData: async () => {
    if (isDebugMode()) {
      return dashboardData
    }
    return fetchAPI("/dashboard")
  },

  getChartData: async () => {
    if (isDebugMode()) {
      return chartData
    }
    return fetchAPI("/charts")
  },
}

// Categories API
export const categoriesAPI = {
  getAllCategories: async () => {
    if (isDebugMode()) {
      return categories
    }
    return fetchAPI("/categories")
  },

  getCategoryById: async (id: number) => {
    if (isDebugMode()) {
      const category = categories.find((c) => c.id === id)
      return category || null
    }
    return fetchAPI(`/categories/${id}`)
  },

  createCategory: async (categoryData: any) => {
    if (isDebugMode()) {
      // Simulate creating a category with mock data
      const newCategory = {
        id: categories.length + 1,
        ...categoryData,
      }
      return newCategory
    }
    return fetchAPI("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  },

  updateCategory: async (id: number, categoryData: any) => {
    if (isDebugMode()) {
      // Simulate updating a category with mock data
      const categoryIndex = categories.findIndex((c) => c.id === id)
      if (categoryIndex === -1) return null

      const updatedCategory = {
        ...categories[categoryIndex],
        ...categoryData,
      }
      return updatedCategory
    }
    return fetchAPI(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    })
  },

  deleteCategory: async (id: number) => {
    if (isDebugMode()) {
      // Simulate deleting a category
      const categoryIndex = categories.findIndex((c) => c.id === id)
      if (categoryIndex === -1) return { success: false }

      return { success: true }
    }
    return fetchAPI(`/categories/${id}`, {
      method: "DELETE",
    })
  },
}

// Tags API
export const tagsAPI = {
  getAllTags: async () => {
    if (isDebugMode()) {
      return tags
    }
    return fetchAPI("/tags")
  },

  getTagById: async (id: number) => {
    if (isDebugMode()) {
      const tag = tags.find((t) => t.id === id)
      return tag || null
    }
    return fetchAPI(`/tags/${id}`)
  },
}

// Roles API
export const rolesAPI = {
  getAllRoles: async () => {
    if (isDebugMode()) {
      return roles
    }
    return fetchAPI("/roles")
  },

  getRoleById: async (id: number) => {
    if (isDebugMode()) {
      const role = roles.find((r) => r.id === id)
      return role || null
    }
    return fetchAPI(`/roles/${id}`)
  },
}

// Newsletter API
export const newsletterAPI = {
  subscribe: async (email: string) => {
    if (isDebugMode()) {
      // Simulate newsletter subscription
      return { success: true, message: "成功订阅通讯" }
    }
    return fetchAPI("/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },
}

