import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {StatsChart} from "@/components/admin/stats-chart"
import {PopularPosts} from "@/components/admin/popular-posts"
import {UserActivityChart} from "@/components/admin/user-activity-chart"
import {DeviceBreakdown} from "@/components/admin/device-breakdown"
import {statsAPI} from "@/lib/api"

export default async function StatsPage() {
    // Fetch stats and chart data using the API
    const stats = await statsAPI.getStats()
    const chartData = await statsAPI.getChartData()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">统计数据</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">文章总数</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalPosts}</div>
                        <p className="text-xs text-muted-foreground mt-1">较上月增长8%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">总浏览量</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">较上月增长24%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">平均阅读时间</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.averageReadTime}</div>
                        <p className="text-xs text-muted-foreground mt-1">较上月增长12%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">订阅用户</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalSubscribers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">较上月增长16%</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>流量趋势</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StatsChart data={chartData.trafficOverTime}/>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>用户活动</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserActivityChart data={chartData.userActivity}/>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>热门文章</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PopularPosts posts={stats.popularPosts}/>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>设备分布</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <DeviceBreakdown data={stats.deviceBreakdown}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

