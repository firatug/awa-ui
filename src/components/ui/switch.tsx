import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string
  description?: string
}

/**
 * iOS-style sliding on/off switch:
 * blue track when checked, soft gray when off, white circular thumb.
 */
export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, description, id, disabled, ...props }, ref) => {
  const switchId = id ?? props.name

  return (
    <div className={cn('inline-flex items-start gap-3', !label && !description && 'items-center')}>
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        disabled={disabled}
        className={cn(
          'peer relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer items-center rounded-full',
          'border-0 bg-[var(--color-switch-off)] p-0.5',
          'transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(10,132,255,0.28)]',
          'disabled:cursor-not-allowed disabled:opacity-45',
          'data-[state=checked]:bg-[var(--color-switch-on)]',
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block size-[27px] rounded-full bg-white',
            'shadow-[0_1px_2px_rgba(0,0,0,0.18),0_1px_1px_rgba(0,0,0,0.08)]',
            'transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
            'translate-x-0 data-[state=checked]:translate-x-[20px]',
          )}
        />
      </SwitchPrimitive.Root>
      {label || description ? (
        <div className="grid gap-0.5 pt-1 leading-none">
          {label ? (
            <label
              htmlFor={switchId}
              className={cn(
                'cursor-pointer text-[var(--text-body)] text-[var(--color-text-primary)]',
                disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {label}
            </label>
          ) : null}
          {description ? (
            <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
})
Switch.displayName = SwitchPrimitive.Root.displayName
