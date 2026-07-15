import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { KpiMetric } from '@/data/dashboard'

interface KpiCardProps {
  metric: KpiMetric
  className?: string
}

export function KpiCard({ metric, className }: KpiCardProps) {
  const TrendIcon =
    metric.trend === 'up' ? ArrowUpRight : metric.trend === 'down' ? ArrowDownRight : Minus

  const trendColor =
    metric.trend === 'up'
      ? 'text-[var(--color-success)]'
      : metric.trend === 'down'
        ? 'text-[var(--color-danger)]'
        : 'text-[var(--color-text-muted)]'

  return (
    <Card className={cn('', className)}>
      <CardContent>
        <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
          {metric.label}
        </p>
        <p className="mt-2 text-[var(--text-h3)] font-semibold text-[var(--color-text-primary)]">
          {metric.value}
        </p>
        <div className={cn('mt-2 flex items-center gap-1 text-[var(--text-caption)]', trendColor)}>
          <TrendIcon className="size-3.5" aria-hidden />
          <span>
            {metric.change > 0 ? '+' : ''}
            {metric.change}%
          </span>
          <span className="text-[var(--color-text-muted)]">{metric.changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function KpiGrid({ metrics, className }: { metrics: KpiMetric[]; className?: string }) {
  return (
    <div className={cn('grid gap-[var(--density-gap)] sm:grid-cols-2 xl:grid-cols-4', className)}>
      {metrics.map((metric) => (
        <KpiCard key={metric.id} metric={metric} />
      ))}
    </div>
  )
}
