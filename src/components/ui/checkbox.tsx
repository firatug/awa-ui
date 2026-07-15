import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'checked'> {
  label?: string
  description?: string
  checked?: boolean | 'indeterminate'
}

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, id, checked, disabled, ...props }, ref) => {
  const checkboxId = id ?? props.name
  const isIndeterminate = checked === 'indeterminate'

  return (
    <div className="flex items-start gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        checked={isIndeterminate ? 'indeterminate' : checked}
        disabled={disabled}
        className={cn(
          'group peer size-[var(--icon-md)] shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)] transition-[background-color,border-color,box-shadow] duration-[var(--duration-base)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[var(--color-primary)] data-[state=checked]:bg-[var(--color-primary)] data-[state=checked]:text-[var(--color-primary-foreground)] data-[state=indeterminate]:border-[var(--color-primary)] data-[state=indeterminate]:bg-[var(--color-primary)] data-[state=indeterminate]:text-[var(--color-primary-foreground)]',
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <Check className="size-[var(--icon-xs)] group-data-[state=indeterminate]:hidden" strokeWidth={3} />
          <Minus className="hidden size-[var(--icon-xs)] group-data-[state=indeterminate]:block" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {(label || description) ? (
        <div className="grid gap-0.5 leading-none">
          {label ? (
            <label
              htmlFor={checkboxId}
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
Checkbox.displayName = CheckboxPrimitive.Root.displayName
