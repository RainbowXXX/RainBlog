import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "@/components/ui/chart"

interface DeviceData {
  device: string
  percentage: number
}

interface DeviceBreakdownProps {
  data: DeviceData[]
}

export function DeviceBreakdown({ data }: DeviceBreakdownProps) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="percentage"
          label={({ device, percentage }) => `${device} ${percentage}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

