import { formatDistanceToNow } from 'date-fns'
import { enUS, tr } from 'date-fns/locale'
import type { LucideIcon } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export interface ActivityItem {
  id: string
  title: string
  description?: string
  timestamp: Date | string
  user?: {
    name: string
    avatar?: string
  }
  icon?: LucideIcon
  badge?: {
    label: string
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }
  meta?: ReactNode
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[]
  title?: string
  description?: string
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  maxHeight?: number | string
  showViewAll?: boolean
  onViewAll?: () => void
}

const dateLocales = { en: enUS, tr } as const

export function ActivityFeed({
  className,
  items,
  title,
  description,
  loading = false,
  emptyTitle,
  emptyDescription,
  maxHeight = 400,
  showViewAll = false,
  onViewAll,
  ...props
}: ActivityFeedProps) {
  const { t, i18n } = useTranslation()
  const locale = dateLocales[i18n.language as keyof typeof dateLocales] ?? enUS

  return (
    <Card className={cn(className)} {...props}>
      {(title || description) ? (
        <CardHeader
          title={title}
          description={description}
          action={
            showViewAll ? (
              <Button variant="ghost" size="sm" onClick={onViewAll}>
                {t('actions.viewAll')}
              </Button>
            ) : null
          }
        />
      ) : null}

      <CardContent className="px-0">
        {loading ? (
          <div className="space-y-4 px-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" className="h-4 w-3/4" />
                  <Skeleton variant="text" className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title={emptyTitle ?? t('table.noData')}
            description={emptyDescription}
            size="sm"
          />
        ) : (
          <ScrollArea style={{ maxHeight }}>
            <ul className="divide-y divide-[var(--color-border-subtle)]">
              {items.map((item) => {
                const Icon = item.icon
                const time =
                  typeof item.timestamp === 'string'
                    ? new Date(item.timestamp)
                    : item.timestamp

                return (
                  <li
                    key={item.id}
                    className="flex gap-3 px-5 py-4 transition-colors hover:bg-[var(--color-surface-sunken)]/50"
                  >
                    {item.user ? (
                      <Avatar
                        name={item.user.name}
                        src={item.user.avatar}
                        size="md"
                      />
                    ) : Icon ? (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                        <Icon className="size-[var(--icon-md)]" aria-hidden />
                      </div>
                    ) : (
                      <div className="size-10 shrink-0 rounded-[var(--radius-full)] bg-[var(--color-surface-sunken)]" />
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="text-[var(--text-body-sm)] font-medium text-[var(--color-text-primary)]">
                          {item.title}
                        </p>
                        <time
                          className="shrink-0 text-[var(--text-caption)] text-[var(--color-text-muted)]"
                          dateTime={time.toISOString()}
                        >
                          {formatDistanceToNow(time, { addSuffix: true, locale })}
                        </time>
                      </div>
                      {item.description ? (
                        <p className="mt-0.5 text-[var(--text-caption)] text-[var(--color-text-secondary)]">
                          {item.description}
                        </p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {item.badge ? (
                          <Badge variant={item.badge.variant ?? 'default'} size="sm">
                            {item.badge.label}
                          </Badge>
                        ) : null}
                        {item.meta}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
