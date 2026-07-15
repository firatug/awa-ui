import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  RevenueAreaChart,
  TrafficLineChart,
  CategoryPieChart,
  SimpleBarChart,
  StackedBarChart,
} from '@/components/charts/ChartCards'
import {
  revenueChartData,
  trafficChartData,
  categoryBreakdown,
  mrrGrowthData,
  pipelineStages,
} from '@/data/dashboard'
import { chartColors } from '@/components/charts/chart-theme'

export function ChartsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('pages.charts.title')} description={t('pages.charts.description')} />

      <div className="grid gap-[var(--density-gap)]">
        <div className="grid gap-[var(--density-gap)] xl:grid-cols-2">
          <RevenueAreaChart data={revenueChartData} />
          <TrafficLineChart data={trafficChartData} />
        </div>
        <div className="grid gap-[var(--density-gap)] xl:grid-cols-3">
          <CategoryPieChart data={categoryBreakdown} />
          <SimpleBarChart
            data={pipelineStages}
            dataKey="count"
            xKey="stage"
            title="Pipeline Count"
            color={chartColors.info}
            className="xl:col-span-2"
          />
        </div>
        <StackedBarChart
          data={mrrGrowthData}
          xKey="month"
          title="MRR Components"
          keys={[
            { key: 'newMrr', color: chartColors.success, name: 'New MRR' },
            { key: 'churn', color: chartColors.danger, name: 'Churn' },
          ]}
        />
      </div>
    </div>
  )
}

export default ChartsPage
