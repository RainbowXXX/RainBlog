import { type NextRequest, NextResponse } from "next/server"
import { posts } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const post = posts.find((p) => p.id === id)

    if (!post) {
      return NextResponse.json({ error: "未找到文章" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("获取文章时出错:", error)
    return NextResponse.json({ error: "获取文章失败" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const postIndex = posts.findIndex((p) => p.id === id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "未找到文章" }, { status: 404 })
    }

    const body = await request.json()

    // 在实际应用中，您会验证请求体

    // 更新文章
    const updatedPost = {
      ...posts[postIndex],
      ...body,
      id, // 确保ID不变
    }

    // 在实际应用中，您会在数据库中更新文章
    posts[postIndex] = updatedPost

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("更新文章时出错:", error)
    return NextResponse.json({ error: "更新文章失败" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const postIndex = posts.findIndex((p) => p.id === id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "未找到文章" }, { status: 404 })
    }

    // 在实际应用中，您会从数据库中删除文章
    const deletedPost = posts.splice(postIndex, 1)[0]

    return NextResponse.json({ success: true, deletedPost })
  } catch (error) {
    console.error("删除文章时出错:", error)
    return NextResponse.json({ error: "删除文章失败" }, { status: 500 })
  }
}

