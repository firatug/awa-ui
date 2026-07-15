import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { roles, permissionModules } from '@/data/users'
import { toast } from '@/components/feedback/toast'

export function RolesPage() {
  const { t } = useTranslation()
  const [matrix, setMatrix] = useState(
    roles.map((r) => ({ ...r, permissions: { ...r.permissions } })),
  )

  const togglePermission = (roleId: string, module: string) => {
    setMatrix((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? { ...r, permissions: { ...r.permissions, [module]: !r.permissions[module] } }
          : r,
      ),
    )
  }

  return (
    <div>
      <PageHeader
        title={t('pages.roles.title')}
        description={t('pages.roles.description')}
        actions={<Button onClick={() => toast.success(t('form.savedSuccessfully'))}>{t('actions.save')}</Button>}
      />

      <div className="grid gap-[var(--density-gap)] lg:grid-cols-4">
        {matrix.map((role) => (
          <Card key={role.id}>
            <CardHeader
              title={role.name}
              description={role.description}
              action={<Badge>{role.users} users</Badge>}
            />
          </Card>
        ))}
      </div>

      <Card className="mt-[var(--density-gap)]">
        <CardHeader title="Permission Matrix" description="Toggle permissions per role" />
        <CardContent className="overflow-x-auto">
          <table className="w-full text-[var(--text-body-sm)]">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)]">
                <th className="pb-3 text-start font-medium text-[var(--color-text-secondary)]">Module</th>
                {matrix.map((role) => (
                  <th key={role.id} className="px-4 pb-3 text-center font-medium text-[var(--color-text-secondary)]">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionModules.map((mod) => (
                <tr key={mod} className="border-b border-[var(--color-border-subtle)] last:border-0">
                  <td className="py-3 capitalize font-medium text-[var(--color-text-primary)]">{mod}</td>
                  {matrix.map((role) => (
                    <td key={role.id} className="px-4 py-3 text-center">
                      <Checkbox
                        checked={role.permissions[mod]}
                        onCheckedChange={() => togglePermission(role.id, mod)}
                        aria-label={`${role.name} ${mod}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default RolesPage
