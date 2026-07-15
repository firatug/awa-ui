import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { DataTable, SelectColumn } from '@/components/data/DataTable'
import { tableData } from '@/data/tables'
import type { TableRow } from '@/data/tables'
import { formatCurrency } from '@/lib/format'

const statusVariant = {
  active: 'success' as const,
  inactive: 'default' as const,
  pending: 'warning' as const,
}

export function AdvancedTablePage() {
  const { t } = useTranslation()
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredData = useMemo(
    () => (statusFilter === 'all' ? tableData : tableData.filter((r) => r.status === statusFilter)),
    [statusFilter],
  )

  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      SelectColumn<TableRow>(),
      { accessorKey: 'name', header: t('common.name'), enableSorting: true },
      { accessorKey: 'email', header: t('common.email') },
      { accessorKey: 'role', header: t('common.role'), enableSorting: true },
      {
        accessorKey: 'status',
        header: t('common.status'),
        cell: ({ row }) => (
          <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
        ),
      },
      { accessorKey: 'department', header: 'Department' },
      {
        accessorKey: 'revenue',
        header: 'Revenue',
        enableSorting: true,
        cell: ({ row }) => formatCurrency(row.original.revenue),
      },
      {
        id: 'actions',
        header: t('table.actions'),
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Actions">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>{t('actions.edit')}</DropdownMenuItem>
              <DropdownMenuItem>{t('actions.duplicate')}</DropdownMenuItem>
              <DropdownMenuItem className="text-[var(--color-danger)]">{t('actions.delete')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [t],
  )

  return (
    <div>
      <PageHeader
        title={t('nav.tables.advanced')}
        description={t('pages.tables.description')}
        actions={
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36"><SelectValue placeholder={t('common.status')} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="active">{t('status.active')}</SelectItem>
                <SelectItem value="inactive">{t('status.inactive')}</SelectItem>
                <SelectItem value="pending">{t('status.pending')}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">{t('table.exportCsv')}</Button>
          </div>
        }
      />
      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={filteredData}
            columns={columns}
            searchable
            selectable
            searchPlaceholder={t('actions.search')}
            pageSize={8}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default AdvancedTablePage
