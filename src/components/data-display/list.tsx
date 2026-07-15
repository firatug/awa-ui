import type { HTMLAttributes, ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

export interface ListItemData {
  id: string
  title: string
  subtitle?: string
  description?: string
  avatar?: string
  badge?: {
    label: string
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }
  meta?: ReactNode
  disabled?: boolean
}

export interface DataListProps extends HTMLAttributes<HTMLUListElement> {
  items: ListItemData[]
  variant?: 'default' | 'avatar' | 'contact' | 'selectable'
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  onItemClick?: (item: ListItemData) => void
  showDivider?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: { item: 'px-3 py-2', title: 'text-[var(--text-body-sm)]', subtitle: 'text-[var(--text-caption)]' },
  md: { item: 'px-4 py-3', title: 'text-[var(--text-body)]', subtitle: 'text-[var(--text-body-sm)]' },
  lg: { item: 'px-5 py-4', title: 'text-[var(--text-body-lg)]', subtitle: 'text-[var(--text-body-sm)]' },
}

export function DataList({
  className,
  items,
  variant = 'default',
  selectedIds = [],
  onSelectionChange,
  onItemClick,
  showDivider = true,
  size = 'md',
  ...props
}: DataListProps) {
  const styles = sizeClasses[size]
  const isSelectable = variant === 'selectable'

  const toggleSelection = (id: string) => {
    if (!onSelectionChange) return
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id]
    onSelectionChange(next)
  }

  return (
    <ul
      className={cn(
        'rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)] overflow-hidden',
        className,
      )}
      role={isSelectable ? 'listbox' : 'list'}
      {...props}
    >
      {items.map((item, index) => {
        const isSelected = selectedIds.includes(item.id)
        const showAvatar = variant === 'avatar' || variant === 'contact' || variant === 'selectable'

        return (
          <li
            key={item.id}
            role={isSelectable ? 'option' : undefined}
            aria-selected={isSelectable ? isSelected : undefined}
            className={cn(
              styles.item,
              'flex items-center gap-3 transition-colors duration-[var(--duration-fast)]',
              showDivider && index > 0 && 'border-t border-[var(--color-border-subtle)]',
              !item.disabled && 'hover:bg-[var(--color-surface-sunken)]/60 cursor-pointer',
              isSelected && 'bg-[var(--color-primary-soft)]/50',
              item.disabled && 'opacity-50 cursor-not-allowed',
            )}
            onClick={() => {
              if (item.disabled) return
              if (isSelectable) toggleSelection(item.id)
              onItemClick?.(item)
            }}
          >
            {isSelectable ? (
              <Checkbox
                checked={isSelected}
                disabled={item.disabled}
                onCheckedChange={() => toggleSelection(item.id)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : null}

            {showAvatar ? (
              <Avatar name={item.title} src={item.avatar} size={size === 'sm' ? 'sm' : 'md'} />
            ) : null}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className={cn('truncate font-medium text-[var(--color-text-primary)]', styles.title)}>
                  {item.title}
                </p>
                {item.badge ? (
                  <Badge variant={item.badge.variant ?? 'default'} size="sm">
                    {item.badge.label}
                  </Badge>
                ) : null}
              </div>
              {item.subtitle ? (
                <p className={cn('truncate text-[var(--color-text-secondary)]', styles.subtitle)}>
                  {item.subtitle}
                </p>
              ) : null}
              {item.description ? (
                <p className="mt-0.5 truncate text-[var(--text-caption)] text-[var(--color-text-muted)]">
                  {item.description}
                </p>
              ) : null}
            </div>

            {item.meta ? (
              <div className="shrink-0 text-[var(--text-caption)] text-[var(--color-text-muted)]">
                {item.meta}
              </div>
            ) : null}

            {variant === 'contact' && !item.meta ? (
              <span className="shrink-0 text-[var(--color-text-muted)]">
                <Check className="size-4 opacity-0" aria-hidden />
              </span>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
