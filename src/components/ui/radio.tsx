import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface RadioGroupProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string
  error?: string
}

export const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, label, error, children, ...props }, ref) => (
  <div className="flex flex-col gap-2">
    {label ? (
      <span className="text-[var(--text-label)] font-medium text-[var(--color-text-primary)]">
        {label}
      </span>
    ) : null}
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn('grid gap-2', className)}
      aria-invalid={Boolean(error) || undefined}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
    {error ? (
      <p className="text-[var(--text-caption)] text-[var(--color-danger)]" role="alert">
        {error}
      </p>
    ) : null}
  </div>
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export interface RadioItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string
  description?: string
}

export const RadioItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, label, description, id, disabled, ...props }, ref) => {
  const itemId = id ?? props.value

  return (
    <div className="flex items-start gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        disabled={disabled}
        className={cn(
          'aspect-square size-[var(--icon-md)] shrink-0 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)] transition-[border-color,box-shadow] duration-[var(--duration-base)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[var(--color-primary)]',
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span className="size-2 rounded-full bg-[var(--color-primary)]" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {(label || description) ? (
        <div className="grid gap-0.5 leading-none">
          {label ? (
            <label
              htmlFor={itemId}
              className={cn(
                'text-[var(--text-body)] text-[var(--color-text-primary)] cursor-pointer',
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
RadioItem.displayName = RadioGroupPrimitive.Item.displayName
