import { type NextRequest, NextResponse } from "next/server"
import { posts } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const tag = searchParams.get("tag") || ""

    // 根据搜索和标签过滤文章
    let filteredPosts = [...posts]

    if (search) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (tag) {
      filteredPosts = filteredPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    // 返回响应
    return NextResponse.json({
      posts: paginatedPosts,
      meta: {
        total: filteredPosts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredPosts.length / limit),
      },
    })
  } catch (error) {
    console.error("获取文章时出错:", error)
    return NextResponse.json({ error: "获取文章失败" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 在实际应用中，您会在这里验证请求体
    if (!body.title || !body.content) {
      return NextResponse.json({ error: "标题和内容是必需的" }, { status: 400 })
    }

    // 在实际应用中，您会将文章保存到数据库
    const newPost = {
      id: posts.length + 1,
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 120) + "...",
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
      date: new Date().toISOString().split("T")[0],
      author: {
        id: body.authorId || 1,
        name: "张美丽", // 在实际应用中，您会查找作者
        email: "zhang@example.com",
      },
      tags: body.tags || [],
      status: body.status || "draft",
    }

    // 在实际应用中，您会将文章添加到数据库
    posts.push(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("创建文章时出错:", error)
    return NextResponse.json({ error: "创建文章失败" }, { status: 500 })
  }
}

