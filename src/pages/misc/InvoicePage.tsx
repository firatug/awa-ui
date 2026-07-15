import { Download, Printer } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { sampleInvoice } from '@/data/billing'
import { appConfig } from '@/config/app.config'
import { formatCurrency } from '@/lib/format'

export function InvoicePage() {
  const { t } = useTranslation()
  const inv = sampleInvoice
  const subtotal = inv.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
  const tax = subtotal * (inv.taxRate / 100)
  const total = subtotal + tax

  return (
    <div>
      <PageHeader
        title={t('pages.invoice.title')}
        description={t('pages.invoice.description')}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Printer className="size-4" />}>Print</Button>
            <Button size="sm" leftIcon={<Download className="size-4" />}>{t('actions.download')}</Button>
          </>
        }
      />

      <Card className="mx-auto max-w-3xl">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h2 className="text-[var(--text-h3)] font-bold">{inv.number}</h2>
              <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                Date: {inv.date} · Due: {inv.dueDate}
              </p>
              <Badge variant={inv.status === 'paid' ? 'success' : 'warning'} className="mt-2">{inv.status}</Badge>
            </div>
            <div className="text-end">
              <p className="font-semibold">{appConfig.name}</p>
              <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">{inv.from.email}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[var(--text-caption)] font-medium uppercase text-[var(--color-text-muted)]">Bill to</p>
              <p className="mt-1 font-medium">{inv.billTo.name}</p>
              <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">{inv.billTo.email}</p>
              <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">{inv.billTo.address}</p>
            </div>
          </div>

          <table className="mt-8 w-full text-[var(--text-body-sm)]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="pb-3 text-start font-medium">{t('common.description')}</th>
                <th className="pb-3 text-end font-medium">{t('common.quantity')}</th>
                <th className="pb-3 text-end font-medium">{t('common.price')}</th>
                <th className="pb-3 text-end font-medium">{t('common.amount')}</th>
              </tr>
            </thead>
            <tbody>
              {inv.items.map((item) => (
                <tr key={item.description} className="border-b border-[var(--color-border-subtle)]">
                  <td className="py-3">{item.description}</td>
                  <td className="py-3 text-end">{item.quantity}</td>
                  <td className="py-3 text-end">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-3 text-end font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2 text-[var(--text-body-sm)]">
              <div className="flex justify-between"><span>{t('common.subtotal')}</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between"><span>{t('common.tax')} ({inv.taxRate}%)</span><span>{formatCurrency(tax)}</span></div>
              <Separator />
              <div className="flex justify-between text-[var(--text-h5)] font-semibold">
                <span>{t('common.total')}</span><span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InvoicePage
