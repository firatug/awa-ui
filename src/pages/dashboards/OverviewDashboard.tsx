import { Download, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { KpiGrid } from '@/components/dashboard/KpiCard'
import { ActivityFeed, GoalsPanel, MiniTable } from '@/components/dashboard/DashboardWidgets'
import { RevenueAreaChart, TrafficLineChart, CategoryPieChart } from '@/components/charts/ChartCards'
import {
  overviewKpis,
  revenueChartData,
  trafficChartData,
  categoryBreakdown,
  recentActivity,
  quarterlyGoals,
} from '@/data/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { users } from '@/data/users'

export function OverviewDashboard() {
  const { t } = useTranslation()

  const topUsers = users.slice(0, 5).map((u) => [u.name, u.role, u.department])

  return (
    <div>
      <PageHeader
        title={t('pages.overview.title')}
        description={t('pages.overview.description')}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<RefreshCw className="size-4" />}>
              {t('actions.refresh')}
            </Button>
            <Button size="sm" leftIcon={<Download className="size-4" />}>
              {t('actions.export')}
            </Button>
          </>
        }
      />

      <div className="space-y-[var(--density-gap)]">
        <KpiGrid metrics={overviewKpis} />

        <div className="grid gap-[var(--density-gap)] xl:grid-cols-3">
          <RevenueAreaChart data={revenueChartData} className="xl:col-span-2" />
          <CategoryPieChart data={categoryBreakdown} />
        </div>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <TrafficLineChart data={trafficChartData} />
          <GoalsPanel goals={quarterlyGoals} title="Quarterly Goals" />
        </div>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <ActivityFeed items={recentActivity} title="Recent Activity" />
          <Card>
            <CardHeader title="Top Contributors" action={<Badge variant="primary">This month</Badge>} />
            <CardContent>
              <MiniTable headers={['Name', 'Role', 'Department']} rows={topUsers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OverviewDashboard
