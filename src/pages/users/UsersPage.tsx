import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Plus, UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { DataTable } from '@/components/data/DataTable'
import { users } from '@/data/users'
import type { UserRecord } from '@/data/users'

const statusVariant: Record<UserRecord['status'], 'success' | 'default' | 'warning'> = {
  active: 'success',
  inactive: 'default',
  pending: 'warning',
  suspended: 'default',
}

export function UsersPage() {
  const { t } = useTranslation()
  const [data] = useState(users)

  const columns = useMemo<ColumnDef<UserRecord>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('common.name'),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.original.name} size="sm" />
            <span className="font-medium">{row.original.name}</span>
          </div>
        ),
      },
      { accessorKey: 'email', header: t('common.email') },
      { accessorKey: 'role', header: t('common.role') },
      { accessorKey: 'department', header: 'Department' },
      {
        accessorKey: 'status',
        header: t('common.status'),
        cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>,
      },
      { accessorKey: 'lastActive', header: 'Last active' },
    ],
    [t],
  )

  return (
    <div>
      <PageHeader
        title={t('pages.users.title')}
        description={t('pages.users.description')}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<UserPlus className="size-4" />}>Invite</Button>
            <Button size="sm" leftIcon={<Plus className="size-4" />}>{t('actions.create')}</Button>
          </>
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

export default UsersPage
