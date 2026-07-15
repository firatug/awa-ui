import { Filter } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { KpiGrid } from '@/components/dashboard/KpiCard'
import { TrafficLineChart, CategoryPieChart, SimpleBarChart } from '@/components/charts/ChartCards'
import { ActivityFeed } from '@/components/dashboard/DashboardWidgets'
import {
  overviewKpis,
  trafficChartData,
  categoryBreakdown,
  recentActivity,
} from '@/data/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { chartColors } from '@/components/charts/chart-theme'

const conversionFunnel = [
  { stage: 'Visit', count: 12400 },
  { stage: 'Signup', count: 3200 },
  { stage: 'Trial', count: 1800 },
  { stage: 'Paid', count: 640 },
]

export function AnalyticsDashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader
        title={t('pages.analytics.title')}
        description={t('pages.analytics.description')}
        actions={
          <Button variant="outline" size="sm" leftIcon={<Filter className="size-4" />}>
            {t('actions.filter')}
          </Button>
        }
      />

      <div className="space-y-[var(--density-gap)]">
        <KpiGrid metrics={overviewKpis} />

        <Tabs defaultValue="traffic">
          <TabsList>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="traffic" className="mt-4">
            <TrafficLineChart data={trafficChartData} title="Weekly Traffic" />
          </TabsContent>
          <TabsContent value="conversion" className="mt-4">
            <SimpleBarChart
              data={conversionFunnel}
              dataKey="count"
              xKey="stage"
              title="Conversion Funnel"
              color={chartColors.secondary}
            />
          </TabsContent>
          <TabsContent value="sources" className="mt-4">
            <CategoryPieChart data={categoryBreakdown} title="Traffic Sources" />
          </TabsContent>
        </Tabs>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <Card>
            <CardHeader title="Top Pages" description="Most visited pages this week" />
            <CardContent>
              <ul className="space-y-3">
                {['/dashboard', '/analytics', '/users', '/settings', '/docs'].map((path, i) => (
                  <li key={path} className="flex items-center justify-between text-[var(--text-body-sm)]">
                    <span className="font-mono text-[var(--color-text-primary)]">{path}</span>
                    <span className="text-[var(--color-text-secondary)]">
                      {(4.2 - i * 0.6).toFixed(1)}k views
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <ActivityFeed items={recentActivity} title="User Events" />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
