import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Calendar, FileText, TrendingUp, Users} from "lucide-react"

interface DashboardCard {
    title: string
    description: string
    value: string
    change: string
    changeType: "positive" | "negative" | "neutral"
}

interface DashboardCardsProps {
    data: DashboardCard[]
}

export function AdminDashboardCards({data}: DashboardCardsProps) {
    const icons = [
        <TrendingUp key="trending" className="h-4 w-4 text-muted-foreground"/>,
        <FileText key="file" className="h-4 w-4 text-muted-foreground"/>,
        <Users key="users" className="h-4 w-4 text-muted-foreground"/>,
        <Calendar key="calendar" className="h-4 w-4 text-muted-foreground"/>,
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((card, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </div>
                        {icons[index]}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        <p
                            className={`text-xs ${
                                card.changeType === "positive"
                                    ? "text-green-500 dark:text-green-400"
                                    : card.changeType === "negative"
                                        ? "text-red-500 dark:text-red-400"
                                        : "text-muted-foreground"
                            } mt-1`}
                        >
                            {card.change}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

