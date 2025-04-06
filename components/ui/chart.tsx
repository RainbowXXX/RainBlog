import type React from "react"

export const PieChart = ({ children }: { children: React.ReactNode }) => {
  return <div className="recharts-pie-chart">{children}</div>
}

export const Pie = ({
  children,
  data,
  cx,
  cy,
  outerRadius,
  fill,
  dataKey,
  label,
}: {
  children?: React.ReactNode
  data?: any[]
  cx?: string
  cy?: string
  outerRadius?: number
  fill?: string
  dataKey?: string
  label?: any
}) => {
  return <div className="recharts-pie">{children}</div>
}

export const Cell = ({ fill }: { fill?: string }) => {
  return <div className="recharts-cell"></div>
}

export const ResponsiveContainer = ({
  children,
  width,
  height,
}: { children: React.ReactNode; width?: string | number; height?: string | number }) => {
  return <div className="recharts-responsive-container">{children}</div>
}

export const Legend = () => {
  return <div className="recharts-legend"></div>
}

export const Tooltip = () => {
  return <div className="recharts-tooltip"></div>
}

export const LineChart = ({ children }: { children: React.ReactNode }) => {
  return <div className="recharts-line-chart">{children}</div>
}

export const Line = ({
  type,
  dataKey,
  stroke,
  activeDot,
  name,
}: { type?: string; dataKey?: string; stroke?: string; activeDot?: any; name?: string }) => {
  return <div className="recharts-line"></div>
}

export const XAxis = ({ dataKey }: { dataKey?: string }) => {
  return <div className="recharts-xaxis"></div>
}

export const YAxis = () => {
  return <div className="recharts-yaxis"></div>
}

export const CartesianGrid = ({ strokeDasharray, stroke }: { strokeDasharray?: string; stroke?: string }) => {
  return <div className="recharts-cartesian-grid"></div>
}

export const BarChart = ({ children }: { children: React.ReactNode }) => {
  return <div className="recharts-bar-chart">{children}</div>
}

export const Bar = ({ dataKey, fill, name }: { dataKey?: string; fill?: string; name?: string }) => {
  return <div className="recharts-bar"></div>
}

