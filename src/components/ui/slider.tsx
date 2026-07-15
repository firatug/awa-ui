import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps
  extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string
  showValue?: boolean
  formatValue?: (value: number) => string
}

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      label,
      showValue = false,
      formatValue = (v) => String(v),
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const displayValue = value?.[0] ?? defaultValue?.[0] ?? props.min ?? 0

    return (
      <div className="flex w-full flex-col gap-2">
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
                {formatValue(displayValue)}
              </span>
            ) : null}
          </div>
        ) : null}
        <SliderPrimitive.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            className,
          )}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-surface-sunken)]">
            <SliderPrimitive.Range className="absolute h-full bg-[var(--color-primary)]" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block size-5 rounded-[var(--radius-full)] border-2 border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-[box-shadow] duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:pointer-events-none disabled:opacity-50" />
        </SliderPrimitive.Root>
      </div>
    )
  },
)
Slider.displayName = SliderPrimitive.Root.displayName
