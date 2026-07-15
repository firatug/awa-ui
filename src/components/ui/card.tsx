import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  selected?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      padding = 'md',
      interactive = false,
      selected = false,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)]',
        padding === 'sm' && 'p-3',
        padding === 'md' && 'p-5',
        padding === 'lg' && 'p-6',
        padding === 'none' && 'p-0',
        interactive &&
          'transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)] cursor-pointer',
        selected && 'border-[var(--color-primary)] shadow-[var(--shadow-focus)]',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

export function CardHeader({
  className,
  title,
  description,
  action,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <div
      className={cn('mb-4 flex items-start justify-between gap-3', className)}
      {...props}
    >
      <div className="min-w-0 space-y-1">
        {title ? (
          <h3 className="text-[var(--text-h5)] font-semibold">{title}</h3>
        ) : null}
        {description ? (
          <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mt-4 flex items-center gap-2 border-t border-[var(--color-border-subtle)] pt-4',
        className,
      )}
      {...props}
    />
  )
}
