import * as ProgressPrimitive from '@radix-ui/react-progress'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps
  extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, label, showValue = false, size = 'md', ...props }, ref) => {
  const clampedValue = Math.min(100, Math.max(0, value ?? 0))

  return (
    <div className="flex w-full flex-col gap-1.5">
      {(label || showValue) ? (
        <div className="flex items-center justify-between gap-2">
          {label ? (
            <span className="text-[var(--text-label)] text-[var(--color-text-primary)]">
              {label}
            </span>
          ) : (
            <span />
          )}
          {showValue ? (
            <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
              {Math.round(clampedValue)}%
            </span>
          ) : null}
        </div>
      ) : null}
      <ProgressPrimitive.Root
        ref={ref}
        value={clampedValue}
        className={cn(
          'relative w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-surface-sunken)]',
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 rounded-[var(--radius-full)] bg-[var(--color-primary)] transition-transform duration-[var(--duration-slow)] ease-[var(--easing-standard)]"
          style={{ transform: `translateX(-${100 - clampedValue}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export interface CircularProgressProps {
  value?: number
  size?: number
  strokeWidth?: number
  label?: string
  showValue?: boolean
  className?: string
}

export function CircularProgress({
  value = 0,
  size = 48,
  strokeWidth = 4,
  label,
  showValue = false,
  className,
}: CircularProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clampedValue / 100) * circumference

  return (
    <div
      className={cn('inline-flex flex-col items-center gap-2', className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="relative inline-flex" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-surface-sunken)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-[var(--duration-slow)] ease-[var(--easing-standard)]"
          />
        </svg>
        {showValue ? (
          <span className="absolute inset-0 flex items-center justify-center text-[var(--text-caption)] font-medium text-[var(--color-text-primary)]">
            {Math.round(clampedValue)}%
          </span>
        ) : null}
      </div>
      {label ? (
        <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
          {label}
        </span>
      ) : null}
    </div>
  )
}
