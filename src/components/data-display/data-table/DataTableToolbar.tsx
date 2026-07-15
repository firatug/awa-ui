import { Columns3, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { DataTableToolbarProps } from './types'

export function DataTableToolbar<TData>({
  table,
  title,
  description,
  searchValue,
  onSearchChange,
  search,
  filtersSlot,
  exportSlot,
  hideColumnToggle = false,
  className,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation()
  const searchEnabled = search?.enabled !== false
  const placeholder = search?.placeholder ?? t('header.search')

  return (
    <div
      className={cn(
        'flex flex-col gap-[var(--density-gap)] border-b border-[var(--color-border-subtle)] pb-[var(--density-pad)]',
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        {(title || description) ? (
          <div className="min-w-0 space-y-0.5">
            {title ? (
              <h3 className="text-[var(--text-h5)] font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                {description}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex flex-wrap items-center gap-2">
          {searchEnabled ? (
            <div className="w-full sm:w-56">
              <Input
                inputSize="sm"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
                leftAddon={<Search className="size-[var(--icon-sm)]" aria-hidden />}
                clearable={Boolean(searchValue)}
                onClear={() => onSearchChange('')}
                aria-label={t('actions.search')}
              />
            </div>
          ) : null}

          {filtersSlot}

          {!hideColumnToggle ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" leftIcon={<Columns3 className="size-[var(--icon-sm)]" />}>
                  {t('table.columns')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{t('table.showColumns')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
                    >
                      {typeof column.columnDef.header === 'string'
                        ? column.columnDef.header
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}

          {exportSlot}
        </div>
      </div>
    </div>
  )
}

export function DataTableBulkActionsBar({
  selectedCount,
  onClearSelection,
  children,
  className,
}: {
  selectedCount: number
  onClearSelection: () => void
  children?: React.ReactNode
  className?: string
}) {
  const { t } = useTranslation()

  if (selectedCount === 0) return null

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-[var(--color-primary)]/25 bg-[var(--color-primary-soft)] px-4 py-2.5',
        className,
      )}
    >
      <div className="flex items-center gap-2 text-[var(--text-body-sm)] font-medium text-[var(--color-primary)]">
        <span>{t('table.selected', { count: selectedCount })}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          leftIcon={<X className="size-[var(--icon-sm)]" />}
          className="h-7 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
        >
          {t('actions.clear')}
        </Button>
      </div>
      {children ? (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      ) : null}
    </div>
  )
}
