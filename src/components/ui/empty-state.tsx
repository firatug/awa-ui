import { Inbox } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: {
    wrapper: 'py-8',
    icon: 'size-[var(--icon-xl)]',
    title: 'text-[var(--text-body)]',
    description: 'text-[var(--text-caption)]',
  },
  md: {
    wrapper: 'py-12',
    icon: 'size-[var(--icon-2xl)]',
    title: 'text-[var(--text-h6)]',
    description: 'text-[var(--text-body-sm)]',
  },
  lg: {
    wrapper: 'py-16',
    icon: 'size-12',
    title: 'text-[var(--text-h5)]',
    description: 'text-[var(--text-body)]',
  },
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  size = 'md',
  ...props
}: EmptyStateProps) {
  const styles = sizeClasses[size]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        styles.wrapper,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'mb-4 flex items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] p-4 text-[var(--color-text-muted)]',
        )}
      >
        {icon ?? <Inbox className={styles.icon} aria-hidden />}
      </div>
      <h3
        className={cn(
          'font-semibold text-[var(--color-text-primary)]',
          styles.title,
        )}
      >
        {title}
      </h3>
      {description ? (
        <p
          className={cn(
            'mt-2 max-w-sm text-[var(--color-text-secondary)]',
            styles.description,
          )}
        >
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
