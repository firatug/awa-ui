import type { LucideIcon } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatPercent } from '@/lib/format'
import { Sparkline } from '@/components/charts/Sparkline'

export interface KpiCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: ReactNode
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  sparklineData?: { value: number }[]
  sparklineColor?: string
  loading?: boolean
}

export function KpiCard({
  className,
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  sparklineData,
  sparklineColor,
  loading = false,
  ...props
}: KpiCardProps) {
  const { t } = useTranslation()
  const isPositive = change !== undefined && change >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card className={cn('relative overflow-hidden', className)} {...props}>
      <CardHeader
        title={title}
        action={
          Icon ? (
            <div className="flex size-10 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Icon className="size-[var(--icon-lg)]" aria-hidden />
            </div>
          ) : null
        }
      />
      <CardContent>
        {loading ? (
          <div className="h-8 w-24 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface-sunken)]" />
        ) : (
          <p className="text-[var(--text-h3)] font-bold tracking-tight text-[var(--color-text-primary)]">
            {value}
          </p>
        )}

        <div className="mt-3 flex items-end justify-between gap-3">
          {change !== undefined ? (
            <div className="flex items-center gap-2">
              <Badge
                variant={isPositive ? 'success' : 'danger'}
                className="gap-1"
              >
                <TrendIcon className="size-3" aria-hidden />
                {formatPercent(Math.abs(change))}
              </Badge>
              {changeLabel ? (
                <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                  {changeLabel}
                </span>
              ) : (
                <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                  {t('common.lastMonth')}
                </span>
              )}
            </div>
          ) : (
            <span />
          )}

          {sparklineData && sparklineData.length > 0 ? (
            <Sparkline
              data={sparklineData}
              color={sparklineColor}
              height={36}
              width={96}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
