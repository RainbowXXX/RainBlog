import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 验证邮箱
    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json({ error: "需要有效的邮箱地址" }, { status: 400 })
    }

    // 在实际应用中，您会将邮箱添加到您的通讯服务
    // 例如Mailchimp、ConvertKit等

    return NextResponse.json({
      success: true,
      message: "成功订阅通讯",
    })
  } catch (error) {
    console.error("订阅通讯时出错:", error)
    return NextResponse.json({ error: "订阅通讯失败" }, { status: 500 })
  }
}

// 辅助函数验证邮箱
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

