import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/data/DataTable'
import { tableData } from '@/data/tables'
import type { TableRow } from '@/data/tables'
const statusVariant = {
  active: 'success' as const,
  inactive: 'default' as const,
  pending: 'warning' as const,
}

export function BasicTablePage() {
  const { t } = useTranslation()

  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      { accessorKey: 'name', header: t('common.name') },
      { accessorKey: 'email', header: t('common.email') },
      { accessorKey: 'role', header: t('common.role') },
      {
        accessorKey: 'status',
        header: t('common.status'),
        cell: ({ row }) => (
          <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
        ),
      },
      { accessorKey: 'department', header: 'Department' },
    ],
    [t],
  )

  return (
    <div>
      <PageHeader title={t('nav.tables.basic')} description={t('pages.tables.description')} />
      <Card>
        <CardContent className="pt-5">
          <DataTable data={tableData.slice(0, 8)} columns={columns} searchable pageSize={5} />
        </CardContent>
      </Card>
    </div>
  )
}

export default BasicTablePage
