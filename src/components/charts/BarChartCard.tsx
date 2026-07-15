import type { ReactNode } from 'react'
import {
  Bar,
  BarChart,
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

export interface BarChartSeries {
  dataKey: string
  name?: string
  color?: string
  stackId?: string
  radius?: [number, number, number, number]
}

export interface BarChartCardProps {
  title?: ReactNode
  description?: ReactNode
  data: Record<string, string | number>[]
  xKey: string
  series: BarChartSeries[]
  height?: number
  showGrid?: boolean
  showYAxis?: boolean
  layout?: 'horizontal' | 'vertical'
  action?: ReactNode
  className?: string
  valueFormatter?: (value: number) => string
}

export function BarChartCard({
  title,
  description,
  data,
  xKey,
  series,
  height = CHART_DEFAULT_HEIGHT,
  showGrid = true,
  showYAxis = true,
  layout = 'horizontal',
  action,
  className,
  valueFormatter,
}: BarChartCardProps) {
  const colors = getChartColors()
  const axisStyle = getChartAxisStyle()
  const tooltipStyle = getChartTooltipStyle()
  const isVertical = layout === 'vertical'

  return (
    <Card className={cn(className)}>
      {(title || description) ? (
        <CardHeader title={title} description={description} action={action} />
      ) : null}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            layout={isVertical ? 'vertical' : 'horizontal'}
            margin={getChartMargin({ top: 8, right: 12, left: isVertical ? 8 : 0, bottom: 0 })}
          >
            {showGrid ? <CartesianGrid {...getChartGridStyle()} /> : null}
            {isVertical ? (
              <>
                <XAxis type="number" {...axisStyle} tickFormatter={valueFormatter ? (v) => valueFormatter(Number(v)) : undefined} />
                <YAxis type="category" dataKey={xKey} {...axisStyle} width={80} />
              </>
            ) : (
              <>
                <XAxis dataKey={xKey} {...axisStyle} dy={8} />
                {showYAxis ? (
                  <YAxis
                    {...axisStyle}
                    width={48}
                    tickFormatter={valueFormatter ? (v) => valueFormatter(Number(v)) : undefined}
                  />
                ) : null}
              </>
            )}
            <Tooltip
              contentStyle={tooltipStyle.contentStyle}
              labelStyle={tooltipStyle.labelStyle}
              itemStyle={tooltipStyle.itemStyle}
              cursor={{ fill: tooltipStyle.cursor.fill }}
              formatter={
                valueFormatter
                  ? (value) => [valueFormatter(Number(value)), '']
                  : undefined
              }
            />
            {series.map((s, index) => {
              const color = s.color ?? colors.series[index % colors.series.length]!
              return (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  stackId={s.stackId}
                  fill={color}
                  radius={s.radius ?? [4, 4, 0, 0]}
                  maxBarSize={48}
                />
              )
            })}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
