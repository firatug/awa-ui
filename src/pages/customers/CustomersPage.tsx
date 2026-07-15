import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { Eye, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/data/DataTable'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { customers, formatMrr, type Customer } from '@/data/customers'

const statusVariant: Record<
  Customer['status'],
  'success' | 'default' | 'warning' | 'danger' | 'info'
> = {
  active: 'success',
  inactive: 'default',
  lead: 'info',
  churned: 'danger',
}

export function CustomersPage() {
  const { t } = useTranslation()
  const [data] = useState(customers)

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('pages.customers.columns.customer'),
        cell: ({ row }) => (
          <Link
            to={`/pages/customers/${row.original.id}`}
            className="flex items-center gap-3 no-underline hover:opacity-80"
          >
            <Avatar name={row.original.name} size="sm" />
            <span className="min-w-0">
              <span className="block font-medium text-[var(--color-text-primary)]">
                {row.original.name}
              </span>
              <span className="block text-[12px] text-[var(--color-text-muted)]">
                {row.original.company}
              </span>
            </span>
          </Link>
        ),
      },
      { accessorKey: 'email', header: t('common.email') },
      {
        accessorKey: 'status',
        header: t('common.status'),
        cell: ({ row }) => (
          <Badge variant={statusVariant[row.original.status]}>
            {t(`pages.customers.status.${row.original.status}`)}
          </Badge>
        ),
      },
      {
        accessorKey: 'plan',
        header: t('pages.customers.columns.plan'),
        cell: ({ row }) => (
          <span className="capitalize">{row.original.plan}</span>
        ),
      },
      {
        accessorKey: 'mrr',
        header: t('pages.customers.columns.mrr'),
        cell: ({ row }) => formatMrr(row.original.mrr),
      },
      {
        accessorKey: 'owner',
        header: t('pages.customers.columns.owner'),
      },
      {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row }) => (
          <Button asChild variant="ghost" size="icon-sm" aria-label={t('actions.view')}>
            <Link to={`/pages/customers/${row.original.id}`}>
              <Eye className="size-4" />
            </Link>
          </Button>
        ),
      },
    ],
    [t],
  )

  return (
    <div>
      <PageHeader
        title={t('pages.customers.title')}
        description={t('pages.customers.description')}
        actions={
          <Button asChild size="sm">
            <Link to="/pages/customers/new" className="inline-flex items-center gap-2">
              <Plus className="size-4" />
              {t('pages.customers.addCustomer')}
            </Link>
          </Button>
        }
      />
      <Card>
        <CardContent className="pt-5">
          <DataTable data={data} columns={columns} searchable pageSize={8} />
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomersPage
