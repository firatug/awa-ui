import type { ReactNode } from 'react'
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs'
import { cn } from '@/lib/utils'

export interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'mb-[var(--density-gap)] flex flex-col gap-4 border-b border-[var(--color-border-subtle)] pb-[var(--density-gap)] lg:flex-row lg:items-start lg:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-2">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs items={breadcrumbs} />
        ) : (
          <Breadcrumbs />
        )}
        <div className="space-y-1">
          <h1 className="text-[var(--text-h3)] font-semibold text-[var(--color-text-primary)]">
            {title}
          </h1>
          {description ? (
            <p className="max-w-3xl text-[var(--text-body)] text-[var(--color-text-secondary)]">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}
