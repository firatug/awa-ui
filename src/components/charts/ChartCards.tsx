import type { ReactNode } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  getChartAxisStyle,
  getChartColors,
  getChartGridStyle,
  getChartTooltipStyle,
} from './chart-theme'
import { cn } from '@/lib/utils'

interface ChartCardProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
  height?: number
  children: ReactNode
}

function ChartCard({ title, description, action, className, height = 280, children }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader title={title} description={description} action={action} />
      <CardContent>
        <div style={{ height }}>{children}</div>
      </CardContent>
    </Card>
  )
}

export function RevenueAreaChart({
  data,
  title = 'Revenue vs Expenses',
  className,
}: {
  data: { month: string; revenue: number; expenses: number }[]
  title?: string
  className?: string
}) {
  const colors = getChartColors()
  const gridStyle = getChartGridStyle()
  const axisStyle = getChartAxisStyle()
  const tooltipStyle = getChartTooltipStyle()

  return (
    <ChartCard title={title} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid {...gridStyle} />
          <XAxis dataKey="month" tick={axisStyle.tick} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle.tick} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip contentStyle={tooltipStyle.contentStyle} />
          <Legend />
          <Area type="monotone" dataKey="revenue" stroke={colors.primary} fill={colors.primary} fillOpacity={0.15} name="Revenue" />
          <Area type="monotone" dataKey="expenses" stroke={colors.warning} fill={colors.warning} fillOpacity={0.1} name="Expenses" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function TrafficLineChart({
  data,
  title = 'Traffic Overview',
  className,
}: {
  data: { day: string; visitors: number; pageViews: number }[]
  title?: string
  className?: string
}) {
  const colors = getChartColors()
  const gridStyle = getChartGridStyle()
  const axisStyle = getChartAxisStyle()
  const tooltipStyle = getChartTooltipStyle()

  return (
    <ChartCard title={title} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid {...gridStyle} />
          <XAxis dataKey="day" tick={axisStyle.tick} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle.tick} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle.contentStyle} />
          <Legend />
          <Line type="monotone" dataKey="visitors" stroke={colors.primary} strokeWidth={2} dot={false} name="Visitors" />
          <Line type="monotone" dataKey="pageViews" stroke={colors.secondary} strokeWidth={2} dot={false} name="Page Views" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function CategoryPieChart({
  data,
  title = 'Category Breakdown',
  className,
}: {
  data: { name: string; value: number; color: string }[]
  title?: string
  className?: string
}) {
  const tooltipStyle = getChartTooltipStyle()

  return (
    <ChartCard title={title} className={className} height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle.contentStyle} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function SimpleBarChart({
  data,
  dataKey,
  xKey,
  title,
  color,
  className,
}: {
  data: Record<string, string | number>[]
  dataKey: string
  xKey: string
  title: string
  color?: string
  className?: string
}) {
  const colors = getChartColors()
  const gridStyle = getChartGridStyle()
  const axisStyle = getChartAxisStyle()
  const tooltipStyle = getChartTooltipStyle()
  const barColor = color ?? colors.primary

  return (
    <ChartCard title={title} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid {...gridStyle} />
          <XAxis dataKey={xKey} tick={axisStyle.tick} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle.tick} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle.contentStyle} />
          <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function StackedBarChart({
  data,
  keys,
  xKey,
  title,
  className,
}: {
  data: Record<string, string | number>[]
  keys: { key: string; color: string; name: string }[]
  xKey: string
  title: string
  className?: string
}) {
  const gridStyle = getChartGridStyle()
  const axisStyle = getChartAxisStyle()
  const tooltipStyle = getChartTooltipStyle()

  return (
    <ChartCard title={title} className={cn(className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid {...gridStyle} />
          <XAxis dataKey={xKey} tick={axisStyle.tick} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle.tick} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle.contentStyle} />
          <Legend />
          {keys.map((k) => (
            <Bar key={k.key} dataKey={k.key} stackId="a" fill={k.color} name={k.name} radius={[0, 0, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
