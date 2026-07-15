import { Plus, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { KpiGrid } from '@/components/dashboard/KpiCard'
import { RevenueAreaChart, StackedBarChart } from '@/components/charts/ChartCards'
import { GoalsPanel } from '@/components/dashboard/DashboardWidgets'
import { saasKpis, mrrGrowthData, quarterlyGoals } from '@/data/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { chartColors } from '@/components/charts/chart-theme'

const planDistribution = [
  { plan: 'Starter', users: 420, color: chartColors.info },
  { plan: 'Pro', users: 680, color: chartColors.primary },
  { plan: 'Enterprise', users: 124, color: chartColors.secondary },
]

export function SaasDashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader
        title={t('pages.saas.title')}
        description={t('pages.saas.description')}
        actions={
          <Button size="sm" leftIcon={<Plus className="size-4" />}>
            {t('actions.create')}
          </Button>
        }
      />

      <div className="space-y-[var(--density-gap)]">
        <KpiGrid metrics={saasKpis} />

        <div className="grid gap-[var(--density-gap)] xl:grid-cols-3">
          <StackedBarChart
            data={mrrGrowthData}
            xKey="month"
            title="MRR Growth"
            keys={[
              { key: 'newMrr', color: chartColors.success, name: 'New MRR' },
              { key: 'churn', color: chartColors.danger, name: 'Churn' },
            ]}
            className="xl:col-span-2"
          />
          <GoalsPanel goals={quarterlyGoals.slice(0, 3)} title="Growth Targets" />
        </div>

        <RevenueAreaChart data={mrrGrowthData.map((d) => ({ month: d.month, revenue: d.mrr, expenses: d.churn * 10 }))} title="MRR Trend" />

        <div className="grid gap-[var(--density-gap)] md:grid-cols-3">
          {planDistribution.map((plan) => (
            <Card key={plan.plan} interactive>
              <CardHeader
                title={plan.plan}
                action={<Badge variant="primary">{plan.users} users</Badge>}
              />
              <CardContent>
                <Progress value={(plan.users / 1224) * 100} showValue />
                <p className="mt-2 flex items-center gap-1 text-[var(--text-caption)] text-[var(--color-success)]">
                  <TrendingUp className="size-3" />
                  +{(plan.users / 100).toFixed(1)}% this month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SaasDashboard
