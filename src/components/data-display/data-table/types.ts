import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
  VisibilityState,
} from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type DataTableDensity = 'compact' | 'standard' | 'comfortable'

export interface DataTableState {
  sorting: SortingState
  columnFilters: ColumnFiltersState
  columnVisibility: VisibilityState
  rowSelection: RowSelectionState
  pagination: PaginationState
  globalFilter: string
}

export interface DataTablePaginationConfig {
  pageSize?: number
  pageSizeOptions?: number[]
  showPageSize?: boolean
  showRowCount?: boolean
}

export interface DataTableSearchConfig {
  enabled?: boolean
  placeholder?: string
  debounceMs?: number
  columnKey?: string
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  title?: ReactNode
  description?: ReactNode
  /** Controlled global search value */
  searchValue?: string
  onSearchChange?: (value: string) => void
  search?: DataTableSearchConfig
  /** Enable row selection with checkboxes */
  enableRowSelection?: boolean
  /** Bulk actions rendered in selection bar */
  bulkActions?: ReactNode
  /** Slot for filter controls in toolbar */
  filtersSlot?: ReactNode
  /** Slot for export button(s) in toolbar */
  exportSlot?: ReactNode
  /** Custom mobile card renderer; when provided, cards are shown on mobile */
  mobileCardRender?: (row: Row<TData>) => ReactNode
  /** Breakpoint for mobile card view (default: 1023px via useIsMobile) */
  forceMobileCards?: boolean
  density?: DataTableDensity
  pagination?: DataTablePaginationConfig | false
  loading?: boolean
  error?: string | null
  onRetry?: () => void
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: ReactNode
  /** Skeleton row count while loading */
  skeletonRows?: number
  /** Sticky table header */
  stickyHeader?: boolean
  /** Initial table state */
  initialState?: Partial<DataTableState>
  /** Controlled sorting */
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  /** Controlled column visibility */
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>
  /** Controlled row selection */
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  /** Controlled pagination */
  paginationState?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>
  /** Manual pagination (server-side) */
  manualPagination?: boolean
  pageCount?: number
  /** Manual sorting (server-side) */
  manualSorting?: boolean
  /** Manual filtering (server-side) */
  manualFiltering?: boolean
  totalRowCount?: number
  getRowId?: (row: TData) => string
  onRowClick?: (row: Row<TData>) => void
  className?: string
  toolbarClassName?: string
  tableClassName?: string
  /** Hide column visibility toggle */
  hideColumnToggle?: boolean
  /** Hide toolbar entirely */
  hideToolbar?: boolean
}

export interface DataTableToolbarProps<TData> {
  table: TanStackTable<TData>
  title?: ReactNode
  description?: ReactNode
  searchValue: string
  onSearchChange: (value: string) => void
  search?: DataTableSearchConfig
  filtersSlot?: ReactNode
  exportSlot?: ReactNode
  hideColumnToggle?: boolean
  className?: string
}

export interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>
  pageSizeOptions?: number[]
  showPageSize?: boolean
  showRowCount?: boolean
  totalRowCount?: number
  className?: string
}

export interface DataTableColumnHeaderProps<TData, TValue> {
  column: import('@tanstack/react-table').Column<TData, TValue>
  title: ReactNode
  className?: string
}
