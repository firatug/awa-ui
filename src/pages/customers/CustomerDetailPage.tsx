import { Link, useLocation, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  UserRound,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  formatMrr,
  getCustomerById,
  type Customer,
} from '@/data/customers'

const statusVariant: Record<
  Customer['status'],
  'success' | 'default' | 'warning' | 'danger' | 'info'
> = {
  active: 'success',
  inactive: 'default',
  lead: 'info',
  churned: 'danger',
}

export function CustomerDetailPage() {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const location = useLocation()
  const draft = (location.state as { draft?: Customer } | null)?.draft
  const customer = draft?.id === id ? draft : getCustomerById(id)

  if (!customer) {
    return (
      <div>
        <PageHeader
          title={t('pages.customers.notFoundTitle')}
          description={t('pages.customers.notFoundDescription')}
          actions={
            <Button asChild variant="outline" size="sm">
              <Link to="/pages/customers" className="inline-flex items-center gap-2">
                <ArrowLeft className="size-4" />
                {t('pages.customers.backToList')}
              </Link>
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={customer.name}
        description={customer.company}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link to="/pages/customers" className="inline-flex items-center gap-2">
                <ArrowLeft className="size-4" />
                {t('pages.customers.backToList')}
              </Link>
            </Button>
            <Button size="sm" leftIcon={<Pencil className="size-4" />} disabled>
              {t('actions.edit')}
            </Button>
          </>
        }
      />

      <div className="grid gap-[var(--density-gap)] lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <Avatar name={customer.name} size="xl" />
            <h2 className="mt-4 text-[var(--text-h4)] font-semibold">{customer.name}</h2>
            <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
              {customer.company}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Badge variant={statusVariant[customer.status]}>
                {t(`pages.customers.status.${customer.status}`)}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {customer.plan}
              </Badge>
            </div>

            <Separator className="my-6" />

            <div className="w-full space-y-3 text-start text-[var(--text-body-sm)]">
              <p className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Mail className="size-4 shrink-0" />
                <span className="truncate">{customer.email || '—'}</span>
              </p>
              <p className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Phone className="size-4 shrink-0" />
                <span>{customer.phone || '—'}</span>
              </p>
              <p className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <MapPin className="size-4 shrink-0" />
                <span>
                  {[customer.city, customer.country].filter(Boolean).join(', ') || '—'}
                </span>
              </p>
              <p className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Building2 className="size-4 shrink-0" />
                <span>{customer.industry || '—'}</span>
              </p>
              <p className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <UserRound className="size-4 shrink-0" />
                <span>{customer.owner || '—'}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader title={t('pages.customers.sections.overview')} />
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-[12px] text-[var(--color-text-muted)]">
                  {t('pages.customers.fields.mrr')}
                </p>
                <p className="mt-1 text-[var(--text-h4)] font-semibold">
                  {formatMrr(customer.mrr)}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[var(--color-text-muted)]">
                  {t('pages.customers.fields.createdAt')}
                </p>
                <p className="mt-1 text-[var(--text-body)] font-medium">{customer.createdAt}</p>
              </div>
              <div>
                <p className="text-[12px] text-[var(--color-text-muted)]">
                  {t('pages.customers.fields.lastContact')}
                </p>
                <p className="mt-1 text-[var(--text-body)] font-medium">{customer.lastContact}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title={t('pages.customers.fields.notes')} />
            <CardContent>
              <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)] whitespace-pre-wrap">
                {customer.notes?.trim() || t('pages.customers.noNotes')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetailPage
