import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { appConfig } from '@/config/app.config'
import { cn } from '@/lib/utils'

interface AuthCardProps {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas)] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={appConfig.assets.logoMark} alt="" className="size-10" />
            <span className="text-[var(--text-h5)] font-semibold text-[var(--color-text-primary)]">
              {appConfig.name}
            </span>
          </Link>
        </div>
        <div
          className={cn(
            'rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-lg)]',
            className,
          )}
        >
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-[var(--text-h4)] font-semibold text-[var(--color-text-primary)]">
              {title}
            </h1>
            {description ? (
              <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                {description}
              </p>
            ) : null}
          </div>
          {children}
          {footer ? <div className="mt-6 text-center text-[var(--text-body-sm)]">{footer}</div> : null}
        </div>
        <p className="mt-6 text-center text-[var(--text-caption)] text-[var(--color-text-muted)]">
          {appConfig.copyright}
        </p>
      </div>
    </div>
  )
}

export function OtpInput({
  length = 6,
  value,
  onChange,
}: {
  length?: number
  value: string
  onChange: (value: string) => void
}) {
  const digits = value.padEnd(length, ' ').split('').slice(0, length)

  const handleChange = (index: number, char: string) => {
    if (char && !/^\d$/.test(char)) return
    const arr = digits.map((d) => (d === ' ' ? '' : d))
    arr[index] = char
    onChange(arr.join('').trim())
    if (char && index < length - 1) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`)
      prev?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i]?.trim() ?? ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="size-12 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] text-center text-[var(--text-h5)] font-semibold text-[var(--color-text-primary)] outline-none transition-[border-color,box-shadow] focus:border-[var(--color-primary)] focus:shadow-[var(--shadow-focus)]"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}
