import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "@/components/ui/chart"

interface UserActivityData {
    name: string
    comments: number
    signups: number
}

interface UserActivityChartProps {
    data: UserActivityData[]
}

export function UserActivityChart({data}: UserActivityChartProps) {
    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="comments" fill="#8884d8" name="评论"/>
                    <Bar dataKey="signups" fill="#82ca9d" name="注册"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

