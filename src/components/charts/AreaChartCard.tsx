import type { ReactNode } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  CHART_DEFAULT_HEIGHT,
  getChartAxisStyle,
  getChartColors,
  getChartGridStyle,
  getChartMargin,
  getChartTooltipStyle,
} from './chart-theme'

export interface AreaChartSeries {
  dataKey: string
  name?: string
  color?: string
  stackId?: string
}

export interface AreaChartCardProps {
  title?: ReactNode
  description?: ReactNode
  data: Record<string, string | number>[]
  xKey: string
  series: AreaChartSeries[]
  height?: number
  showGrid?: boolean
  showYAxis?: boolean
  action?: ReactNode
  className?: string
  valueFormatter?: (value: number) => string
}

export function AreaChartCard({
  title,
  description,
  data,
  xKey,
  series,
  height = CHART_DEFAULT_HEIGHT,
  showGrid = true,
  showYAxis = true,
  action,
  className,
  valueFormatter,
}: AreaChartCardProps) {
  const colors = getChartColors()
  const axisStyle = getChartAxisStyle()
  const tooltipStyle = getChartTooltipStyle()

  return (
    <Card className={cn(className)}>
      {(title || description) ? (
        <CardHeader title={title} description={description} action={action} />
      ) : null}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={getChartMargin({ top: 8, right: 12, left: showYAxis ? 0 : 0, bottom: 0 })}>
            {showGrid ? <CartesianGrid {...getChartGridStyle()} /> : null}
            <XAxis dataKey={xKey} {...axisStyle} dy={8} />
            {showYAxis ? (
              <YAxis
                {...axisStyle}
                width={48}
                tickFormatter={valueFormatter ? (v) => valueFormatter(Number(v)) : undefined}
              />
            ) : null}
            <Tooltip
              contentStyle={tooltipStyle.contentStyle}
              labelStyle={tooltipStyle.labelStyle}
              itemStyle={tooltipStyle.itemStyle}
              cursor={tooltipStyle.cursor}
              formatter={
                valueFormatter
                  ? (value) => [valueFormatter(Number(value)), '']
                  : undefined
              }
            />
            {series.map((s, index) => {
              const color = s.color ?? colors.series[index % colors.series.length]!
              return (
                <Area
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  stackId={s.stackId}
                  stroke={color}
                  fill={color}
                  fillOpacity={s.stackId ? 0.6 : 0.15}
                  strokeWidth={2}
                />
              )
            })}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
