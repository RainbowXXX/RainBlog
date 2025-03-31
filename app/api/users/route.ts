import { type NextRequest, NextResponse } from "next/server"
import { users } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""

    // 根据搜索和角色过滤用户
    let filteredUsers = [...users]

    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role.toLowerCase() === role.toLowerCase())
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    // 返回响应
    return NextResponse.json({
      users: paginatedUsers,
      meta: {
        total: filteredUsers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    })
  } catch (error) {
    console.error("获取用户时出错:", error)
    return NextResponse.json({ error: "获取用户失败" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 在实际应用中，您会验证请求体
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json({ error: "姓名、邮箱和角色是必需的" }, { status: 400 })
    }

    // 在实际应用中，您会检查邮箱是否已被使用
    if (users.some((user) => user.email === body.email)) {
      return NextResponse.json({ error: "邮箱已被使用" }, { status: 400 })
    }

    // 创建新用户
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
      role: body.role,
      status: body.status || "active",
      joinedDate: new Date().toISOString().split("T")[0],
    }

    // 在实际应用中，您会将用户添加到数据库
    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error("创建用户时出错:", error)
    return NextResponse.json({ error: "创建用户失败" }, { status: 500 })
  }
}

