import { type NextRequest, NextResponse } from "next/server"
import { stats } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "month" // day, week, month, year

    // 在实际应用中，您会根据周期过滤数据

    return NextResponse.json(stats)
  } catch (error) {
    console.error("获取统计数据时出错:", error)
    return NextResponse.json({ error: "获取统计数据失败" }, { status: 500 })
  }
}

