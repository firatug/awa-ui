import { Download, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { KpiGrid } from '@/components/dashboard/KpiCard'
import { RevenueAreaChart } from '@/components/charts/ChartCards'
import { MiniTable } from '@/components/dashboard/DashboardWidgets'
import { financeKpis, cashFlowData } from '@/data/dashboard'
import { billingHistory } from '@/data/billing'
import { formatCurrency } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const expenses = [
  { category: 'Payroll', amount: '$42,800', pct: '45%' },
  { category: 'Infrastructure', amount: '$18,400', pct: '20%' },
  { category: 'Marketing', amount: '$14,200', pct: '15%' },
  { category: 'Operations', amount: '$18,880', pct: '20%' },
]

export function FinanceDashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader
        title={t('pages.finance.title')}
        description={t('pages.finance.description')}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<FileText className="size-4" />}>
              Reports
            </Button>
            <Button size="sm" leftIcon={<Download className="size-4" />}>
              {t('actions.export')}
            </Button>
          </>
        }
      />

      <div className="space-y-[var(--density-gap)]">
        <KpiGrid metrics={financeKpis} />

        <RevenueAreaChart data={cashFlowData.map((d) => ({ month: d.month, revenue: d.income, expenses: d.expenses }))} title="Cash Flow" />

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <Card>
            <CardHeader title="Expense Breakdown" />
            <CardContent>
              <MiniTable
                headers={['Category', 'Amount', 'Share']}
                rows={expenses.map((e) => [e.category, e.amount, e.pct])}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Recent Transactions" />
            <CardContent>
              <ul className="space-y-3">
                {billingHistory.map((item) => (
                  <li key={item.id} className="flex items-center justify-between text-[var(--text-body-sm)]">
                    <div>
                      <p className="font-medium">{item.invoice}</p>
                      <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{item.date}</p>
                    </div>
                    <div className="text-end">
                      <p className="font-medium">{formatCurrency(item.amount)}</p>
                      <Badge variant={item.status === 'paid' ? 'success' : 'warning'} size="sm">
                        {item.status}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FinanceDashboard
