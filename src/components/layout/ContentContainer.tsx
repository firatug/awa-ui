import type { ReactNode } from 'react'
import { usePreferencesStore } from '@/theme/preferences-store'
import { cn } from '@/lib/utils'

export interface ContentContainerProps {
  children: ReactNode
  className?: string
  flush?: boolean
}

const widthClasses = {
  default: 'max-w-[var(--content-max-width)]',
  full: 'max-w-none',
  narrow: 'max-w-4xl',
  boxed: 'max-w-5xl',
} as const

export function ContentContainer({
  children,
  className,
  flush = false,
}: ContentContainerProps) {
  const contentWidth = usePreferencesStore((s) => s.contentWidth)

  return (
    <div
      className={cn(
        'mx-auto w-full',
        widthClasses[contentWidth],
        contentWidth === 'boxed' && 'rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]',
        !flush && 'px-[var(--density-pad)] py-[var(--density-gap)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
