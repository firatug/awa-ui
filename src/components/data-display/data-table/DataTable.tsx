import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type Row,
} from '@tanstack/react-table'
import { AlertCircle } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { useDebounce } from '@/hooks/useDebounce'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { DataTablePagination } from './DataTablePagination'
import { DataTableBulkActionsBar, DataTableToolbar } from './DataTableToolbar'
import type { DataTableDensity, DataTableProps } from './types'

const densityCellClasses: Record<DataTableDensity, string> = {
  compact: 'py-2 px-3',
  standard: 'py-3 px-4',
  comfortable: 'py-4 px-5',
}

function createSelectionColumn<TData>(): ColumnDef<TData, unknown> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? 'indeterminate'
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  }
}

function DataTableSkeleton({
  columns,
  rows,
  density,
}: {
  columns: number
  rows: number
  density: DataTableDensity
}) {
  const cellClass = densityCellClasses[density]

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-[var(--color-border-subtle)]">
          {Array.from({ length: columns }).map((__, colIndex) => (
            <td key={colIndex} className={cellClass}>
              <Skeleton variant="text" className="h-4 max-w-[12rem]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export function DataTable<TData>({
  columns,
  data,
  title,
  description,
  searchValue: controlledSearch,
  onSearchChange,
  search,
  enableRowSelection = false,
  bulkActions,
  filtersSlot,
  exportSlot,
  mobileCardRender,
  forceMobileCards = false,
  density = 'standard',
  pagination: paginationConfig,
  loading = false,
  error = null,
  onRetry,
  emptyTitle,
  emptyDescription,
  emptyAction,
  skeletonRows = 5,
  stickyHeader = true,
  initialState,
  sorting: controlledSorting,
  onSortingChange,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  paginationState: controlledPagination,
  onPaginationChange,
  manualPagination = false,
  pageCount,
  manualSorting = false,
  manualFiltering = false,
  totalRowCount,
  getRowId,
  onRowClick,
  className,
  toolbarClassName,
  tableClassName,
  hideColumnToggle = false,
  hideToolbar = false,
}: DataTableProps<TData>) {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const showMobileCards = forceMobileCards || (isMobile && Boolean(mobileCardRender))

  const [internalSearch, setInternalSearch] = useState(initialState?.globalFilter ?? '')
  const searchValue = controlledSearch ?? internalSearch
  const handleSearchChange = useCallback(
    (value: string) => {
      if (onSearchChange) onSearchChange(value)
      else setInternalSearch(value)
    },
    [onSearchChange],
  )

  const debouncedSearch = useDebounce(searchValue, search?.debounceMs ?? 300)

  const [internalSorting, setInternalSorting] = useState(initialState?.sorting ?? [])
  const [internalColumnVisibility, setInternalColumnVisibility] = useState(
    initialState?.columnVisibility ?? {},
  )
  const [internalRowSelection, setInternalRowSelection] = useState(
    initialState?.rowSelection ?? {},
  )
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize:
      initialState?.pagination?.pageSize ??
      (paginationConfig !== false ? paginationConfig?.pageSize : undefined) ??
      10,
  })

  const sorting = controlledSorting ?? internalSorting
  const columnVisibility = controlledColumnVisibility ?? internalColumnVisibility
  const rowSelection = controlledRowSelection ?? internalRowSelection
  const pagination = controlledPagination ?? internalPagination

  const tableColumns = useMemo(() => {
    if (!enableRowSelection) return columns
    return [createSelectionColumn<TData>(), ...columns]
  }, [columns, enableRowSelection])

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter: debouncedSearch,
    },
    enableRowSelection,
    onSortingChange: onSortingChange ?? setInternalSorting,
    onColumnVisibilityChange: onColumnVisibilityChange ?? setInternalColumnVisibility,
    onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,
    onPaginationChange: onPaginationChange ?? setInternalPagination,
    onGlobalFilterChange: handleSearchChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getPaginationRowModel:
      paginationConfig === false ? undefined : getPaginationRowModel(),
    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount: manualPagination ? pageCount : undefined,
    getRowId,
    globalFilterFn: 'includesString',
  })

  const cellClass = densityCellClasses[density]
  const visibleColumnCount = table.getVisibleLeafColumns().length
  const selectedCount = table.getFilteredSelectedRowModel().rows.length

  const renderMobileCards = () => {
    const rows = table.getRowModel().rows

    if (loading) {
      return (
        <div className="flex flex-col gap-3 p-[var(--density-pad)]">
          {Array.from({ length: skeletonRows }).map((_, i) => (
            <Card key={i} padding="md" className="space-y-3">
              <Skeleton variant="text" className="h-5 w-1/3" />
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      )
    }

    if (error) return null

    if (rows.length === 0) {
      return (
        <EmptyState
          title={emptyTitle ?? (searchValue ? t('table.noResults') : t('table.noData'))}
          description={emptyDescription}
          action={emptyAction}
          size="sm"
        />
      )
    }

    return (
      <div className="flex flex-col gap-3 p-[var(--density-pad)]">
        {rows.map((row) => (
          <Card
            key={row.id}
            padding="md"
            interactive={Boolean(onRowClick)}
            selected={row.getIsSelected()}
            onClick={() => onRowClick?.(row)}
            className={cn(onRowClick && 'cursor-pointer')}
          >
            {enableRowSelection ? (
              <div className="mb-3 flex items-center justify-between">
                <Checkbox
                  checked={row.getIsSelected()}
                  onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ) : null}
            {mobileCardRender?.(row)}
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)]',
        className,
      )}
    >
      {!hideToolbar ? (
        <div className="px-[var(--density-pad)] pt-[var(--density-pad)]">
          <DataTableToolbar
            table={table}
            title={title}
            description={description}
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            search={search}
            filtersSlot={filtersSlot}
            exportSlot={exportSlot}
            hideColumnToggle={hideColumnToggle}
            className={toolbarClassName}
          />
        </div>
      ) : null}

      {enableRowSelection && bulkActions ? (
        <div className="px-[var(--density-pad)] pb-[var(--density-pad)]">
          <DataTableBulkActionsBar
            selectedCount={selectedCount}
            onClearSelection={() => table.resetRowSelection()}
          >
            {bulkActions}
          </DataTableBulkActionsBar>
        </div>
      ) : null}

      {error ? (
        <div className="px-[var(--density-pad)] pb-[var(--density-pad)]">
          <Alert variant="danger" title={t('status.error')}>
            {error}
            {onRetry ? (
              <div className="mt-3">
                <Button variant="outline" size="sm" onClick={onRetry}>
                  {t('actions.retry')}
                </Button>
              </div>
            ) : null}
          </Alert>
        </div>
      ) : null}

      {showMobileCards ? (
        renderMobileCards()
      ) : (
        <div className="relative w-full overflow-auto">
          <table className={cn('w-full caption-bottom text-[var(--text-body-sm)]', tableClassName)}>
            <thead
              className={cn(
                'border-b border-[var(--color-border)] bg-[var(--color-surface-sunken)]/60',
                stickyHeader && 'sticky top-0 z-[var(--z-sticky)] backdrop-blur-sm',
              )}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        cellClass,
                        'text-start text-[var(--text-label)] font-medium text-[var(--color-text-secondary)]',
                        header.column.getCanSort() && 'select-none',
                      )}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                <DataTableSkeleton
                  columns={visibleColumnCount}
                  rows={skeletonRows}
                  density={density}
                />
              ) : error ? (
                <tr>
                  <td colSpan={visibleColumnCount} className="p-0">
                    <EmptyState
                      icon={<AlertCircle className="size-8" />}
                      title={t('status.error')}
                      description={error}
                      action={
                        onRetry ? (
                          <Button variant="outline" size="sm" onClick={onRetry}>
                            {t('actions.retry')}
                          </Button>
                        ) : undefined
                      }
                      size="sm"
                    />
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumnCount} className="p-0">
                    <EmptyState
                      title={emptyTitle ?? (searchValue ? t('table.noResults') : t('table.noData'))}
                      description={emptyDescription}
                      action={emptyAction}
                      size="sm"
                    />
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    className={cn(
                      'border-b border-[var(--color-border-subtle)] transition-colors duration-[var(--duration-fast)]',
                      'hover:bg-[var(--color-surface-sunken)]/50',
                      row.getIsSelected() && 'bg-[var(--color-primary-soft)]/40',
                      onRowClick && 'cursor-pointer',
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cn(cellClass, 'text-[var(--color-text-primary)]')}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {paginationConfig !== false && !showMobileCards ? (
        <div className="px-[var(--density-pad)] pb-[var(--density-pad)]">
          <DataTablePagination
            table={table}
            pageSizeOptions={paginationConfig?.pageSizeOptions}
            showPageSize={paginationConfig?.showPageSize}
            showRowCount={paginationConfig?.showRowCount}
            totalRowCount={totalRowCount}
          />
        </div>
      ) : null}
    </div>
  )
}

// Re-export Row type for mobileCardRender consumers
export type { Row }
