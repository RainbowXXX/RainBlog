import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "@/components/ui/chart"

interface StatsData {
    name: string
    views: number
    visitors: number
}

interface StatsChartProps {
    data: StatsData[]
}

export function StatsChart({data}: StatsChartProps) {
    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{r: 8}} name="浏览量"/>
                    <Line type="monotone" dataKey="visitors" stroke="#82ca9d" name="访问者"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

