import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative flex gap-3 rounded-[var(--radius-lg)] border p-4 text-[var(--text-body-sm)] shadow-[var(--shadow-xs)]',
  {
    variants: {
      variant: {
        info: 'border-[var(--color-info)]/20 bg-[var(--color-info-soft)] text-[var(--color-text-primary)]',
        success:
          'border-[var(--color-success)]/20 bg-[var(--color-success-soft)] text-[var(--color-text-primary)]',
        warning:
          'border-[var(--color-warning)]/20 bg-[var(--color-warning-soft)] text-[var(--color-text-primary)]',
        danger:
          'border-[var(--color-danger)]/20 bg-[var(--color-danger-soft)] text-[var(--color-text-primary)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
} as const

const iconColorMap = {
  info: 'text-[var(--color-info)]',
  success: 'text-[var(--color-success)]',
  warning: 'text-[var(--color-warning)]',
  danger: 'text-[var(--color-danger)]',
} as const

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  icon?: ReactNode
  hideIcon?: boolean
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      icon,
      hideIcon = false,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedVariant = variant ?? 'info'
    const Icon = iconMap[resolvedVariant]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant: resolvedVariant }), className)}
        {...props}
      >
        {!hideIcon ? (
          <span className={cn('shrink-0', iconColorMap[resolvedVariant])}>
            {icon ?? <Icon className="size-[var(--icon-md)]" aria-hidden />}
          </span>
        ) : null}
        <div className="min-w-0 space-y-1">
          {title ? (
            <p className="font-semibold text-[var(--color-text-primary)]">{title}</p>
          ) : null}
          {children ? (
            <div className="text-[var(--color-text-secondary)]">{children}</div>
          ) : null}
        </div>
      </div>
    )
  },
)
Alert.displayName = 'Alert'

export { alertVariants }
