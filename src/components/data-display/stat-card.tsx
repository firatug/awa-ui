import type { LucideIcon } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: ReactNode
  description?: string
  icon?: LucideIcon
  trend?: ReactNode
  footer?: ReactNode
  variant?: 'default' | 'soft' | 'outline'
}

const variantClasses = {
  default: 'bg-[var(--color-surface)]',
  soft: 'bg-[var(--color-surface-sunken)] border-transparent',
  outline: 'bg-transparent',
}

export function StatCard({
  className,
  label,
  value,
  description,
  icon: Icon,
  trend,
  footer,
  variant = 'default',
  ...props
}: StatCardProps) {
  return (
    <Card
      padding="md"
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      <CardHeader
        title={
          <span className="text-[var(--text-body-sm)] font-medium text-[var(--color-text-secondary)]">
            {label}
          </span>
        }
        action={
          Icon ? (
            <Icon
              className="size-[var(--icon-md)] text-[var(--color-text-muted)]"
              aria-hidden
            />
          ) : null
        }
      />
      <CardContent>
        <div className="flex items-baseline gap-2">
          <p className="text-[var(--text-h4)] font-semibold text-[var(--color-text-primary)]">
            {value}
          </p>
          {trend}
        </div>
        {description ? (
          <p className="mt-1 text-[var(--text-caption)] text-[var(--color-text-muted)]">
            {description}
          </p>
        ) : null}
        {footer ? <div className="mt-3">{footer}</div> : null}
      </CardContent>
    </Card>
  )
}
