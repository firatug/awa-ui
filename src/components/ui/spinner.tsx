import { Loader2 } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends HTMLAttributes<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeClasses = {
  sm: 'size-[var(--icon-sm)]',
  md: 'size-[var(--icon-md)]',
  lg: 'size-[var(--icon-lg)]',
}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = 'md', label = 'Loading', ...props }, ref) => (
    <Loader2
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(
        'animate-spin text-[var(--color-primary)]',
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
)
Spinner.displayName = 'Spinner'
