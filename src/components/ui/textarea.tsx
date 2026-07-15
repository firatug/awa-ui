import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'
import { fieldControlClasses, fieldShellClasses } from '@/lib/field-styles'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  success?: string
  fullWidth?: boolean
  autoResize?: boolean
  minRows?: number
  maxRows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      fullWidth = true,
      autoResize = false,
      minRows = 3,
      maxRows,
      id,
      disabled,
      readOnly,
      required,
      value,
      onChange,
      rows,
      ...props
    },
    ref,
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const inputId = id ?? props.name
    const describedBy = error
      ? `${inputId}-error`
      : success
        ? `${inputId}-success`
        : helperText
          ? `${inputId}-helper`
          : undefined

    useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    const resize = useCallback(() => {
      const el = textareaRef.current
      if (!el || !autoResize) return

      el.style.height = 'auto'
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20
      const padding =
        parseFloat(getComputedStyle(el).paddingTop) +
        parseFloat(getComputedStyle(el).paddingBottom)
      const minHeight = lineHeight * minRows + padding
      const maxHeight = maxRows ? lineHeight * maxRows + padding : Infinity
      const nextHeight = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight)
      el.style.height = `${nextHeight}px`
      el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden'
    }, [autoResize, minRows, maxRows])

    useEffect(() => {
      resize()
    }, [resize, value])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)
      if (autoResize) resize()
    }

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
        <textarea
          ref={textareaRef}
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          value={value}
          rows={autoResize ? minRows : rows ?? minRows}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
          className={cn(
            'w-full rounded-[var(--radius-control)] px-3 py-2 text-[var(--text-body)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-surface-sunken)] resize-y min-h-[var(--control-h-md)]',
            fieldShellClasses(error ? 'error' : success ? 'success' : 'default'),
            fieldControlClasses,
            autoResize && 'resize-none overflow-hidden',
            className,
          )}
          {...props}
        />
        {error ? (
          <p
            id={`${inputId}-error`}
            className="text-[var(--text-caption)] text-[var(--color-danger)]"
            role="alert"
          >
            {error}
          </p>
        ) : success ? (
          <p
            id={`${inputId}-success`}
            className="text-[var(--text-caption)] text-[var(--color-success)]"
          >
            {success}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="text-[var(--text-caption)] text-[var(--color-text-muted)]"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
