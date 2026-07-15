import type { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: React.ReactNode
  className?: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation()

  if (!column.getCanSort()) {
    return (
      <div className={cn('text-[var(--text-label)] font-medium', className)}>
        {title}
      </div>
    )
  }

  const sorted = column.getIsSorted()

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ms-2 h-8 gap-1 px-2 text-[var(--text-label)] font-medium hover:text-[var(--color-text-primary)] data-[state=open]:bg-[var(--color-surface-sunken)]"
          >
            <span>{title}</span>
            {sorted === 'desc' ? (
              <ArrowDown className="size-[var(--icon-sm)]" aria-hidden />
            ) : sorted === 'asc' ? (
              <ArrowUp className="size-[var(--icon-sm)]" aria-hidden />
            ) : (
              <ChevronsUpDown className="size-[var(--icon-sm)] text-[var(--color-text-muted)]" aria-hidden />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="size-[var(--icon-sm)]" aria-hidden />
            {t('table.sortAsc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="size-[var(--icon-sm)]" aria-hidden />
            {t('table.sortDesc')}
          </DropdownMenuItem>
          {column.getCanHide() ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="size-[var(--icon-sm)]" aria-hidden />
                {t('table.hideColumn')}
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
