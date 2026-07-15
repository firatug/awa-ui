import { Toaster as SonnerToaster, toast } from 'sonner'
import type { ComponentProps, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export interface ToasterProps extends ComponentProps<typeof SonnerToaster> {}

export function Toaster({ className, toastOptions, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className={cn('toaster group', className)}
      position="top-right"
      closeButton
      richColors={false}
      toastOptions={{
        classNames: {
          toast:
            'group toast flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text-primary)] shadow-[var(--shadow-md)]',
          title: 'text-[var(--text-body-sm)] font-medium text-[var(--color-text-primary)]',
          description: 'text-[var(--text-caption)] text-[var(--color-text-secondary)]',
          actionButton:
            'rounded-[var(--radius-control)] bg-[var(--color-primary)] px-3 py-1 text-[var(--text-caption)] font-medium text-[var(--color-primary-foreground)]',
          cancelButton:
            'rounded-[var(--radius-control)] border border-[var(--color-border)] bg-transparent px-3 py-1 text-[var(--text-caption)] text-[var(--color-text-secondary)]',
          closeButton:
            'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]',
          success:
            'border-[var(--color-success)]/20 bg-[var(--color-success-soft)] [&_[data-title]]:text-[var(--color-success)]',
          error:
            'border-[var(--color-danger)]/20 bg-[var(--color-danger-soft)] [&_[data-title]]:text-[var(--color-danger)]',
          warning:
            'border-[var(--color-warning)]/20 bg-[var(--color-warning-soft)] [&_[data-title]]:text-[var(--color-warning)]',
          info: 'border-[var(--color-info)]/20 bg-[var(--color-info-soft)] [&_[data-title]]:text-[var(--color-info)]',
        },
        ...toastOptions,
      }}
      style={
        {
          '--normal-bg': 'var(--color-surface)',
          '--normal-border': 'var(--color-border)',
          '--normal-text': 'var(--color-text-primary)',
          '--success-bg': 'var(--color-success-soft)',
          '--success-border': 'var(--color-success)',
          '--success-text': 'var(--color-success)',
          '--error-bg': 'var(--color-danger-soft)',
          '--error-border': 'var(--color-danger)',
          '--error-text': 'var(--color-danger)',
          '--warning-bg': 'var(--color-warning-soft)',
          '--warning-border': 'var(--color-warning)',
          '--warning-text': 'var(--color-warning)',
          '--info-bg': 'var(--color-info-soft)',
          '--info-border': 'var(--color-info)',
          '--info-text': 'var(--color-info)',
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { toast }
