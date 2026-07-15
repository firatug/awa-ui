import { format } from 'date-fns'
import { enUS, tr } from 'date-fns/locale'
import type { LucideIcon } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp?: Date | string
  icon?: LucideIcon
  status?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  content?: ReactNode
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
  title?: string
  description?: string
  variant?: 'default' | 'compact'
}

const dateLocales = { en: enUS, tr } as const

const statusDotClasses = {
  default: 'bg-[var(--color-neutral)]',
  primary: 'bg-[var(--color-primary)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  danger: 'bg-[var(--color-danger)]',
  info: 'bg-[var(--color-info)]',
}

export function Timeline({
  className,
  items,
  title,
  description,
  variant = 'default',
  ...props
}: TimelineProps) {
  const { i18n } = useTranslation()
  const locale = dateLocales[i18n.language as keyof typeof dateLocales] ?? enUS

  return (
    <Card className={cn(className)} {...props}>
      {(title || description) ? (
        <CardHeader title={title} description={description} />
      ) : null}

      <CardContent>
        <ol className="relative space-y-0">
          {items.map((item, index) => {
            const Icon = item.icon
            const isLast = index === items.length - 1
            const time =
              item.timestamp
                ? typeof item.timestamp === 'string'
                  ? new Date(item.timestamp)
                  : item.timestamp
                : null

            return (
              <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
                {!isLast ? (
                  <span
                    className="absolute start-[15px] top-8 h-[calc(100%-1rem)] w-px bg-[var(--color-border)]"
                    aria-hidden
                  />
                ) : null}

                <div className="relative z-10 shrink-0">
                  {Icon ? (
                    <div
                      className={cn(
                        'flex items-center justify-center rounded-[var(--radius-full)] border-2 border-[var(--color-surface)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]',
                        variant === 'compact' ? 'size-8' : 'size-[30px]',
                      )}
                    >
                      <Icon
                        className={variant === 'compact' ? 'size-3.5' : 'size-4'}
                        aria-hidden
                      />
                    </div>
                  ) : (
                    <span
                      className={cn(
                        'block rounded-[var(--radius-full)] border-2 border-[var(--color-surface)] ring-4 ring-[var(--color-surface)]',
                        variant === 'compact' ? 'size-3 mt-2' : 'size-3.5 mt-2',
                        statusDotClasses[item.status ?? 'default'],
                      )}
                      aria-hidden
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-[var(--text-body-sm)] font-medium text-[var(--color-text-primary)]">
                      {item.title}
                    </h4>
                    {item.status && item.status !== 'default' ? (
                      <Badge variant={item.status} size="sm">
                        {item.status}
                      </Badge>
                    ) : null}
                  </div>
                  {time ? (
                    <time
                      className="mt-0.5 block text-[var(--text-caption)] text-[var(--color-text-muted)]"
                      dateTime={time.toISOString()}
                    >
                      {format(time, 'PPp', { locale })}
                    </time>
                  ) : null}
                  {item.description ? (
                    <p className="mt-1 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                      {item.description}
                    </p>
                  ) : null}
                  {item.content ? <div className="mt-2">{item.content}</div> : null}
                </div>
              </li>
            )
          })}
        </ol>
      </CardContent>
    </Card>
  )
}
