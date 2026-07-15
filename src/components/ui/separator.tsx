import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface SeparatorProps
  extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  label?: string
}

export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = 'horizontal', decorative = true, label, ...props }, ref) => {
  if (label) {
    return (
      <div
        className={cn(
          'flex items-center gap-3',
          orientation === 'vertical' && 'h-full flex-col',
          className,
        )}
      >
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(
            'shrink-0 bg-[var(--color-border-subtle)]',
            orientation === 'horizontal' ? 'h-px flex-1' : 'w-px flex-1',
          )}
          {...props}
        />
        <span className="shrink-0 text-[var(--text-caption)] text-[var(--color-text-muted)]">
          {label}
        </span>
        <SeparatorPrimitive.Root
          decorative={decorative}
          orientation={orientation}
          className={cn(
            'shrink-0 bg-[var(--color-border-subtle)]',
            orientation === 'horizontal' ? 'h-px flex-1' : 'w-px flex-1',
          )}
        />
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-[var(--color-border-subtle)]',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
})
Separator.displayName = SeparatorPrimitive.Root.displayName
