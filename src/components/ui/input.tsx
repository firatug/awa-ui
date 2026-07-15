import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { fieldControlClasses, fieldShellClasses } from '@/lib/field-styles'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  success?: string
  leftAddon?: ReactNode
  rightAddon?: ReactNode
  clearable?: boolean
  onClear?: () => void
  fullWidth?: boolean
  inputSize?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-[var(--control-h-sm)] text-[var(--text-body-sm)]',
  md: 'h-[var(--control-h-md)] text-[var(--text-body)]',
  lg: 'h-[var(--control-h-lg)] text-[var(--text-body)]',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      leftAddon,
      rightAddon,
      clearable,
      onClear,
      fullWidth = true,
      inputSize = 'md',
      id,
      disabled,
      readOnly,
      required,
      value,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? props.name
    const describedBy = error
      ? `${inputId}-error`
      : success
        ? `${inputId}-success`
        : helperText
          ? `${inputId}-helper`
          : undefined

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-[var(--text-label)] font-medium text-[var(--color-text-primary)]"
          >
            {label}
            {required ? (
              <span className="ms-1 text-[var(--color-danger)]" aria-hidden>
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <div
          className={cn(
            'flex items-center gap-2 rounded-[var(--radius-control)] px-3',
            fieldShellClasses(error ? 'error' : success ? 'success' : 'default'),
            disabled && 'opacity-50 cursor-not-allowed bg-[var(--color-surface-sunken)]',
            sizeClasses[inputSize],
          )}
        >
          {leftAddon ? (
            <span className="shrink-0 text-[var(--color-text-muted)]">{leftAddon}</span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            value={value}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={describedBy}
            className={cn(
              'min-w-0 flex-1 placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed',
              fieldControlClasses,
              className,
            )}
            {...props}
          />
          {clearable && value && !disabled && !readOnly ? (
            <button
              type="button"
              onClick={onClear}
              className="shrink-0 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              aria-label="Clear"
            >
              <X className="size-[var(--icon-sm)]" />
            </button>
          ) : null}
          {rightAddon ? (
            <span className="shrink-0 text-[var(--color-text-muted)]">{rightAddon}</span>
          ) : null}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-[var(--text-caption)] text-[var(--color-danger)]" role="alert">
            {error}
          </p>
        ) : success ? (
          <p id={`${inputId}-success`} className="text-[var(--text-caption)] text-[var(--color-success)]">
            {success}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
            {helperText}
          </p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
