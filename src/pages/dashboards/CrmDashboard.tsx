import { Phone, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { KpiGrid } from '@/components/dashboard/KpiCard'
import { SimpleBarChart } from '@/components/charts/ChartCards'
import { ActivityFeed, MiniTable } from '@/components/dashboard/DashboardWidgets'
import { crmKpis, pipelineStages, recentActivity } from '@/data/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { chartColors } from '@/components/charts/chart-theme'

const deals = [
  { company: 'Acme Corp', value: '$48,000', stage: 'Negotiation', owner: 'Marcus Webb' },
  { company: 'Globex Inc', value: '$32,400', stage: 'Proposal', owner: 'Priya Sharma' },
  { company: 'Initech', value: '$24,800', stage: 'Qualified', owner: 'Marcus Webb' },
  { company: 'Umbrella Co', value: '$18,200', stage: 'Lead', owner: 'Tom Hughes' },
]

export function CrmDashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader
        title={t('pages.crm.title')}
        description={t('pages.crm.description')}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Mail className="size-4" />}>
              {t('header.messages')}
            </Button>
            <Button size="sm" leftIcon={<Phone className="size-4" />}>
              Schedule call
            </Button>
          </>
        }
      />

      <div className="space-y-[var(--density-gap)]">
        <KpiGrid metrics={crmKpis} />

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <SimpleBarChart
            data={pipelineStages}
            dataKey="value"
            xKey="stage"
            title="Pipeline by Stage"
            color={chartColors.primary}
          />
          <Card>
            <CardHeader title="Sales Team" description="Active reps this quarter" />
            <CardContent className="space-y-4">
              {['Marcus Webb', 'Priya Sharma', 'Tom Hughes'].map((name, i) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={name} size="sm" />
                    <div>
                      <p className="text-[var(--text-body-sm)] font-medium">{name}</p>
                      <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                        {12 - i * 3} deals closed
                      </p>
                    </div>
                  </div>
                  <Badge variant={i === 0 ? 'success' : 'default'}>
                    ${(48 - i * 12)}k
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <Card>
            <CardHeader title="Hot Deals" action={<Badge variant="warning">4 active</Badge>} />
            <CardContent>
              <MiniTable
                headers={['Company', 'Value', 'Stage', 'Owner']}
                rows={deals.map((d) => [d.company, d.value, d.stage, d.owner])}
              />
            </CardContent>
          </Card>
          <ActivityFeed items={recentActivity} title="Sales Activity" />
        </div>
      </div>
    </div>
  )
}

export default CrmDashboard
