import { cn } from '@/lib/utils'

type FieldState = 'default' | 'error' | 'success'

/** Shared shell styles for text inputs, selects, textareas */
export function fieldShellClasses(state: FieldState = 'default') {
  return cn(
    'awa-field-shell border bg-[var(--color-surface)]',
    'transition-[box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--easing-standard)]',
    state === 'error' && 'border-[var(--color-danger)]',
    state === 'success' && 'border-[var(--color-success)]',
    state === 'default' && 'border-[var(--color-border)]',
  )
}

/** Inner control — no extra focus ring (shell handles glow) */
export const fieldControlClasses =
  'bg-transparent outline-none focus:outline-none focus-visible:outline-none focus-visible:shadow-none'
