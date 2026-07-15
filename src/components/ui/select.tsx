import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { fieldControlClasses, fieldShellClasses } from '@/lib/field-styles'

export const Select = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-[var(--control-h-sm)] text-[var(--text-body-sm)]',
  md: 'h-[var(--control-h-md)] text-[var(--text-body)]',
  lg: 'h-[var(--control-h-lg)] text-[var(--text-body)]',
}

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      className,
      children,
      label,
      helperText,
      error,
      fullWidth = true,
      size = 'md',
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const triggerId = id
    const describedBy = error
      ? `${triggerId}-error`
      : helperText
        ? `${triggerId}-helper`
        : undefined

    const trigger = (
      <SelectPrimitive.Trigger
        ref={ref}
        id={triggerId}
        disabled={disabled}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={cn(
          'flex items-center justify-between gap-2 rounded-[var(--radius-control)] px-3 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-surface-sunken)] [&>span]:line-clamp-1',
          fieldShellClasses(error ? 'error' : 'default'),
          fieldControlClasses,
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="size-[var(--icon-sm)] shrink-0 text-[var(--color-text-muted)]" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    )

    if (!label && !helperText && !error) return trigger

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label ? (
          <label
            htmlFor={triggerId}
            className="text-[var(--text-label)] font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        ) : null}
        {trigger}
        {error ? (
          <p
            id={`${triggerId}-error`}
            className="text-[var(--text-caption)] text-[var(--color-danger)]"
            role="alert"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${triggerId}-helper`}
            className="text-[var(--text-caption)] text-[var(--color-text-muted)]"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    )
  },
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

export const SelectScrollUpButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 text-[var(--color-text-muted)]',
      className,
    )}
    {...props}
  >
    <ChevronUp className="size-[var(--icon-sm)]" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

export const SelectScrollDownButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 text-[var(--color-text-muted)]',
      className,
    )}
    {...props}
  >
    <ChevronDown className="size-[var(--icon-sm)]" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

export const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'relative z-[var(--z-dropdown)] max-h-96 min-w-[8rem] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-md)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

export const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-[var(--text-caption)] font-medium text-[var(--color-text-muted)]',
      className,
    )}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

export interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  icon?: ReactNode
}

export const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, icon, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center gap-2 rounded-[var(--radius-sm)] py-1.5 ps-8 pe-2 text-[var(--text-body-sm)] outline-none transition-colors duration-[var(--duration-fast)] focus:bg-[var(--color-surface-sunken)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute start-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-[var(--icon-sm)] text-[var(--color-primary)]" />
      </SelectPrimitive.ItemIndicator>
    </span>
    {icon ? <span className="text-[var(--color-text-muted)]">{icon}</span> : null}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-[var(--color-border-subtle)]', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName
