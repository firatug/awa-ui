import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-[var(--radius-full)] px-2 py-0.5 text-[var(--text-caption)] font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-neutral-soft)] text-[var(--color-neutral)]',
        primary: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]',
        secondary: 'bg-[var(--color-secondary-soft)] text-[var(--color-secondary)]',
        success: 'bg-[var(--color-success-soft)] text-[var(--color-success)]',
        warning: 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]',
        danger: 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]',
        info: 'bg-[var(--color-info-soft)] text-[var(--color-info)]',
        outline: 'border border-[var(--color-border)] text-[var(--color-text-secondary)]',
      },
      size: {
        sm: 'text-[10px] px-1.5 py-px',
        md: '',
        lg: 'px-2.5 py-1 text-[var(--text-body-sm)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({
  className,
  variant,
  size,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot ? (
        <span
          className="size-1.5 rounded-full bg-current"
          aria-hidden
        />
      ) : null}
      {children}
    </span>
  )
}

export { badgeVariants }
