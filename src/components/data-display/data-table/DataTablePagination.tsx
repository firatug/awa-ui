import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { DataTablePaginationProps } from './types'

const DEFAULT_PAGE_SIZES = [10, 20, 30, 50, 100]

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  showPageSize = true,
  showRowCount = true,
  totalRowCount,
  className,
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation()
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const pageCount = table.getPageCount()
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const filteredCount = totalRowCount ?? table.getFilteredRowModel().rows.length

  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-t border-[var(--color-border-subtle)] pt-[var(--density-pad)] sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
        {selectedCount > 0 ? (
          <span>
            {t('table.selected', { count: selectedCount })} ·{' '}
          </span>
        ) : null}
        {showRowCount ? (
          <span>{t('table.totalRows', { count: filteredCount })}</span>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {showPageSize ? (
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)] whitespace-nowrap">
              {t('table.rowsPerPage')}
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[4.5rem]" aria-label={t('table.rowsPerPage')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        <div className="flex items-center gap-1 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
          <span className="whitespace-nowrap">
            {t('table.page')} {pageCount === 0 ? 0 : pageIndex + 1} {t('table.of')}{' '}
            {pageCount}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label={t('actions.previous')}
          >
            <ChevronsLeft className="size-[var(--icon-sm)]" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={t('actions.previous')}
          >
            <ChevronLeft className="size-[var(--icon-sm)]" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label={t('actions.next')}
          >
            <ChevronRight className="size-[var(--icon-sm)]" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            aria-label={t('actions.next')}
          >
            <ChevronsRight className="size-[var(--icon-sm)]" />
          </Button>
        </div>
      </div>
    </div>
  )
}
