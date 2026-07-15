import type { ReactNode } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  CHART_DEFAULT_HEIGHT,
  getChartColors,
  getChartTooltipStyle,
} from './chart-theme'

export interface DonutChartSegment {
  name: string
  value: number
  color?: string
}

export interface DonutChartCardProps {
  title?: ReactNode
  description?: ReactNode
  data: DonutChartSegment[]
  height?: number
  innerRadius?: number | string
  outerRadius?: number | string
  centerLabel?: ReactNode
  showLegend?: boolean
  action?: ReactNode
  className?: string
  valueFormatter?: (value: number) => string
}

export function DonutChartCard({
  title,
  description,
  data,
  height = CHART_DEFAULT_HEIGHT,
  innerRadius = '58%',
  outerRadius = '78%',
  centerLabel,
  showLegend = true,
  action,
  className,
  valueFormatter,
}: DonutChartCardProps) {
  const colors = getChartColors()
  const tooltipStyle = getChartTooltipStyle()
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card className={cn(className)}>
      {(title || description) ? (
        <CardHeader title={title} description={description} action={action} />
      ) : null}
      <CardContent>
        <div className="relative" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                stroke="var(--color-surface)"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color ?? colors.series[index % colors.series.length]!}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle.contentStyle}
                labelStyle={tooltipStyle.labelStyle}
                itemStyle={tooltipStyle.itemStyle}
                formatter={
                  valueFormatter
                    ? (value) => [valueFormatter(Number(value)), '']
                    : undefined
                }
              />
            </PieChart>
          </ResponsiveContainer>

          {centerLabel ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              {centerLabel}
            </div>
          ) : null}
        </div>

        {showLegend ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {data.map((segment, index) => {
              const color = segment.color ?? colors.series[index % colors.series.length]!
              const pct = total > 0 ? Math.round((segment.value / total) * 100) : 0

              return (
                <li
                  key={segment.name}
                  className="flex items-center justify-between gap-2 text-[var(--text-body-sm)]"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className="size-2.5 shrink-0 rounded-[var(--radius-sm)]"
                      style={{ backgroundColor: color }}
                      aria-hidden
                    />
                    <span className="truncate text-[var(--color-text-secondary)]">
                      {segment.name}
                    </span>
                  </span>
                  <span className="shrink-0 font-medium text-[var(--color-text-primary)]">
                    {valueFormatter ? valueFormatter(segment.value) : segment.value}
                    <span className="ms-1 text-[var(--color-text-muted)]">({pct}%)</span>
                  </span>
                </li>
              )
            })}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  )
}
