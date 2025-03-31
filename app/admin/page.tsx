import { AdminDashboardCards } from "@/components/admin/dashboard-cards"
import { RecentPosts } from "@/components/admin/recent-posts"
import { TrafficChart } from "@/components/admin/traffic-chart"
import { statsAPI } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminDashboard() {
  // Fetch dashboard data using the API
  const dashboardData = await statsAPI.getDashboardData()

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">仪表盘</h1>
          <p className="text-muted-foreground mt-1">查看您的博客平台概览</p>
        </div>
      </div>

      <AdminDashboardCards data={dashboardData.cards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>流量概览</CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficChart data={dashboardData.trafficData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最近文章</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentPosts posts={dashboardData.recentPosts} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

