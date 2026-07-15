import { CreditCard, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { paymentMethods, billingHistory } from '@/data/billing'
import { formatCurrency } from '@/lib/format'

export function BillingSettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader
        title={t('nav.pages.billing')}
        description={t('pages.billing.description')}
        actions={<Button asChild><Link to="/pages/pricing">Upgrade plan</Link></Button>}
      />

      <div className="space-y-[var(--density-gap)]">
        <Card>
          <CardHeader title="Current plan" action={<Badge variant="primary">Pro</Badge>} />
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text-h4)] font-semibold">$79/month</p>
              <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">25 users · 100 GB storage</p>
            </div>
            <Button variant="outline">Change plan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Payment methods" />
          <CardContent className="space-y-3">
            {paymentMethods.map((pm) => (
              <div key={pm.id} className="flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-5 text-[var(--color-text-muted)]" />
                  <div>
                    <p className="text-[var(--text-body-sm)] font-medium capitalize">{pm.type} ···· {pm.last4}</p>
                    <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">Expires {pm.expiry}</p>
                  </div>
                </div>
                {pm.default ? <Badge variant="success">Default</Badge> : <Button variant="ghost" size="sm">Set default</Button>}
              </div>
            ))}
            <Button variant="outline" size="sm">Add payment method</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Billing history" />
          <CardContent>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {billingHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-[var(--text-body-sm)] font-medium">{item.invoice}</p>
                    <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{formatCurrency(item.amount)}</span>
                    <Badge variant={item.status === 'paid' ? 'success' : 'warning'} size="sm">{item.status}</Badge>
                    <Button variant="ghost" size="icon-sm" aria-label={t('actions.download')}>
                      <Download className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BillingSettingsPage
