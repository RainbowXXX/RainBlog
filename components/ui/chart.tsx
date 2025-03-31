import type React from "react"

export const PieChart = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export const Pie = () => {
  return null
}

export const Cell = () => {
  return null
}

export const ResponsiveContainer = ({
  children,
  width,
  height,
}: { children: React.ReactNode; width: string | number; height: string | number }) => {
  return <div style={{ width: width, height: height }}>{children}</div>
}

export const Legend = () => {
  return null
}

export const Tooltip = () => {
  return null
}

export const LineChart = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export const Line = () => {
  return null
}

export const XAxis = () => {
  return null
}

export const YAxis = () => {
  return null
}

export const CartesianGrid = () => {
  return null
}

export const BarChart = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export const Bar = () => {
  return null
}

