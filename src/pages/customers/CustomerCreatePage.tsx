import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/feedback/toast'
import type { CustomerPlan, CustomerStatus } from '@/data/customers'

export function CustomerCreatePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [status, setStatus] = useState<CustomerStatus>('lead')
  const [plan, setPlan] = useState<CustomerPlan>('starter')
  const [saving, setSaving] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    if (!name) {
      toast.error(t('pages.customers.validation.nameRequired'))
      return
    }

    setSaving(true)
    window.setTimeout(() => {
      const id = `cus_${Date.now().toString(36)}`
      toast.success(t('pages.customers.createSuccess', { name }))
      setSaving(false)
      navigate(`/pages/customers/${id}`, {
        replace: true,
        state: {
          draft: {
            id,
            name,
            company: String(form.get('company') ?? ''),
            email: String(form.get('email') ?? ''),
            phone: String(form.get('phone') ?? ''),
            status,
            plan,
            country: String(form.get('country') ?? ''),
            city: String(form.get('city') ?? ''),
            industry: String(form.get('industry') ?? ''),
            mrr: Number(form.get('mrr') ?? 0) || 0,
            owner: String(form.get('owner') ?? ''),
            notes: String(form.get('notes') ?? ''),
            createdAt: new Date().toISOString().slice(0, 10),
            lastContact: new Date().toISOString().slice(0, 10),
          },
        },
      })
    }, 450)
  }

  return (
    <div>
      <PageHeader
        title={t('pages.customers.createTitle')}
        description={t('pages.customers.createDescription')}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to="/pages/customers" className="inline-flex items-center gap-2">
              <ArrowLeft className="size-4" />
              {t('pages.customers.backToList')}
            </Link>
          </Button>
        }
      />

      <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-4">
        <Card>
          <CardHeader title={t('pages.customers.sections.profile')} />
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Input
              name="name"
              label={t('pages.customers.fields.name')}
              placeholder="Elena Vargas"
              required
            />
            <Input
              name="company"
              label={t('pages.customers.fields.company')}
              placeholder="Northline Labs"
            />
            <Input
              name="email"
              type="email"
              label={t('common.email')}
              placeholder="elena@company.com"
            />
            <Input
              name="phone"
              label={t('pages.customers.fields.phone')}
              placeholder="+1 415 555 0100"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={t('pages.customers.sections.account')} />
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>{t('common.status')}</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as CustomerStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['lead', 'active', 'inactive', 'churned'] as const).map((value) => (
                    <SelectItem key={value} value={value}>
                      {t(`pages.customers.status.${value}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{t('pages.customers.fields.plan')}</Label>
              <Select value={plan} onValueChange={(v) => setPlan(v as CustomerPlan)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['free', 'starter', 'growth', 'enterprise'] as const).map((value) => (
                    <SelectItem key={value} value={value}>
                      <span className="capitalize">{value}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              name="owner"
              label={t('pages.customers.fields.owner')}
              placeholder="Avery Chen"
            />
            <Input
              name="mrr"
              type="number"
              min={0}
              label={t('pages.customers.fields.mrr')}
              placeholder="1200"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={t('pages.customers.sections.location')} />
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <Input name="city" label={t('pages.customers.fields.city')} placeholder="San Francisco" />
            <Input
              name="country"
              label={t('pages.customers.fields.country')}
              placeholder="United States"
            />
            <Input
              name="industry"
              label={t('pages.customers.fields.industry')}
              placeholder="SaaS"
            />
            <div className="sm:col-span-3">
              <Textarea
                name="notes"
                label={t('pages.customers.fields.notes')}
                placeholder={t('pages.customers.fields.notesPlaceholder')}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap justify-end gap-2">
          <Button asChild variant="outline">
            <Link to="/pages/customers">{t('actions.cancel')}</Link>
          </Button>
          <Button type="submit" loading={saving} leftIcon={<Save className="size-4" />}>
            {t('pages.customers.saveCustomer')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CustomerCreatePage
