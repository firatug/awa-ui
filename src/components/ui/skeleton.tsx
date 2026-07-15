import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'rectangular',
      width,
      height,
      style,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'animate-pulse bg-[var(--color-surface-sunken)]',
        variant === 'text' && 'h-4 w-full rounded-[var(--radius-sm)]',
        variant === 'circular' && 'rounded-[var(--radius-full)]',
        variant === 'rectangular' && 'rounded-[var(--radius-md)]',
        className,
      )}
      style={{
        width: width ?? (variant === 'text' ? '100%' : undefined),
        height: height ?? (variant === 'text' ? undefined : variant === 'circular' ? width : '1rem'),
        ...style,
      }}
      {...props}
    />
  ),
)
Skeleton.displayName = 'Skeleton'
