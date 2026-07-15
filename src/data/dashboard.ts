export interface KpiStat {
  id: string
  title: string
  value: number | string
  change: number
  format?: 'currency' | 'number' | 'percent' | 'text'
  sparkline?: { value: number }[]
}

export interface ChartDataPoint {
  label: string
  [key: string]: string | number
}

export interface DashboardSection {
  kpis: KpiStat[]
  revenueChart: ChartDataPoint[]
  trafficChart?: ChartDataPoint[]
  distribution?: { name: string; value: number }[]
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function generateMonthlySeries(
  base: number,
  variance: number,
  keys: string[],
): ChartDataPoint[] {
  return months.slice(0, 7).map((label, i) => {
    const point: ChartDataPoint = { label }
    keys.forEach((key, ki) => {
      const trend = base + i * (variance * 0.15) + ki * variance * 0.3
      const noise = Math.sin(i + ki) * variance * 0.2
      point[key] = Math.round(trend + noise)
    })
    return point
  })
}

function sparklineFrom(base: number, variance: number): { value: number }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    value: Math.round(base + i * (variance * 0.08) + Math.sin(i) * variance * 0.15),
  }))
}

export const overviewDashboard: DashboardSection = {
  kpis: [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: 284500,
      change: 12.4,
      format: 'currency',
      sparkline: sparklineFrom(22000, 1800),
    },
    {
      id: 'users',
      title: 'Active Users',
      value: 18420,
      change: 8.2,
      format: 'number',
      sparkline: sparklineFrom(15200, 420),
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: 3.8,
      change: -1.2,
      format: 'percent',
      sparkline: sparklineFrom(3.2, 0.3),
    },
    {
      id: 'mrr',
      title: 'MRR',
      value: 47200,
      change: 5.6,
      format: 'currency',
      sparkline: sparklineFrom(41000, 1200),
    },
  ],
  revenueChart: generateMonthlySeries(32000, 4000, ['revenue', 'expenses']),
  trafficChart: generateMonthlySeries(12000, 2000, ['visitors', 'signups']),
  distribution: [
    { name: 'Northline Labs', value: 34 },
    { name: 'Cobalt Retail', value: 22 },
    { name: 'Harbor CMS', value: 18 },
    { name: 'Summit Forge', value: 14 },
    { name: 'Other', value: 12 },
  ],
}

export const analyticsDashboard: DashboardSection = {
  kpis: [
    {
      id: 'sessions',
      title: 'Sessions',
      value: 94200,
      change: 15.3,
      format: 'number',
      sparkline: sparklineFrom(78000, 3200),
    },
    {
      id: 'bounce',
      title: 'Bounce Rate',
      value: 42.1,
      change: -3.8,
      format: 'percent',
      sparkline: sparklineFrom(46, 2),
    },
    {
      id: 'duration',
      title: 'Avg. Duration',
      value: '4m 32s',
      change: 6.1,
      format: 'text',
      sparkline: sparklineFrom(220, 18),
    },
    {
      id: 'pageviews',
      title: 'Page Views',
      value: 312800,
      change: 11.7,
      format: 'number',
      sparkline: sparklineFrom(260000, 12000),
    },
  ],
  revenueChart: generateMonthlySeries(45000, 6000, ['organic', 'paid', 'referral']),
  distribution: [
    { name: 'Organic', value: 48 },
    { name: 'Paid', value: 28 },
    { name: 'Referral', value: 14 },
    { name: 'Direct', value: 10 },
  ],
}

export const saasDashboard: DashboardSection = {
  kpis: [
    {
      id: 'arr',
      title: 'ARR',
      value: 566400,
      change: 18.9,
      format: 'currency',
      sparkline: sparklineFrom(480000, 15000),
    },
    {
      id: 'churn',
      title: 'Churn Rate',
      value: 2.1,
      change: -0.4,
      format: 'percent',
      sparkline: sparklineFrom(2.8, 0.2),
    },
    {
      id: 'ltv',
      title: 'Customer LTV',
      value: 8420,
      change: 7.3,
      format: 'currency',
      sparkline: sparklineFrom(7200, 280),
    },
    {
      id: 'nps',
      title: 'NPS Score',
      value: 62,
      change: 4.0,
      format: 'number',
      sparkline: sparklineFrom(54, 3),
    },
  ],
  revenueChart: generateMonthlySeries(38000, 5000, ['newMrr', 'expansion', 'churn']),
  distribution: [
    { name: 'Enterprise', value: 42 },
    { name: 'Growth', value: 31 },
    { name: 'Starter', value: 19 },
    { name: 'Trial', value: 8 },
  ],
}

export const crmDashboard: DashboardSection = {
  kpis: [
    {
      id: 'deals',
      title: 'Open Deals',
      value: 148,
      change: 9.5,
      format: 'number',
      sparkline: sparklineFrom(120, 8),
    },
    {
      id: 'pipeline',
      title: 'Pipeline Value',
      value: 1240000,
      change: 14.2,
      format: 'currency',
      sparkline: sparklineFrom(980000, 42000),
    },
    {
      id: 'winRate',
      title: 'Win Rate',
      value: 28.6,
      change: 2.1,
      format: 'percent',
      sparkline: sparklineFrom(24, 1.5),
    },
    {
      id: 'contacts',
      title: 'New Contacts',
      value: 384,
      change: -2.3,
      format: 'number',
      sparkline: sparklineFrom(340, 22),
    },
  ],
  revenueChart: generateMonthlySeries(180000, 28000, ['won', 'lost', 'pending']),
  distribution: [
    { name: 'Northline Labs', value: 28 },
    { name: 'Ironhaven Tools', value: 24 },
    { name: 'Cobalt Retail', value: 20 },
    { name: 'Lumenpath Co.', value: 16 },
    { name: 'Other', value: 12 },
  ],
}

export const projectsDashboard: DashboardSection = {
  kpis: [
    {
      id: 'active',
      title: 'Active Projects',
      value: 36,
      change: 5.0,
      format: 'number',
      sparkline: sparklineFrom(30, 2),
    },
    {
      id: 'completed',
      title: 'Completed',
      value: 12,
      change: 20.0,
      format: 'number',
      sparkline: sparklineFrom(8, 1),
    },
    {
      id: 'overdue',
      title: 'Overdue Tasks',
      value: 7,
      change: -12.5,
      format: 'number',
      sparkline: sparklineFrom(10, 1),
    },
    {
      id: 'velocity',
      title: 'Team Velocity',
      value: 84,
      change: 3.2,
      format: 'number',
      sparkline: sparklineFrom(72, 4),
    },
  ],
  revenueChart: generateMonthlySeries(24, 6, ['planned', 'inProgress', 'done']),
  distribution: [
    { name: 'On Track', value: 58 },
    { name: 'At Risk', value: 24 },
    { name: 'Blocked', value: 12 },
    { name: 'Completed', value: 6 },
  ],
}

export const financeDashboard: DashboardSection = {
  kpis: [
    {
      id: 'income',
      title: 'Net Income',
      value: 186400,
      change: 11.8,
      format: 'currency',
      sparkline: sparklineFrom(148000, 8200),
    },
    {
      id: 'expenses',
      title: 'Operating Expenses',
      value: 98400,
      change: 4.2,
      format: 'currency',
      sparkline: sparklineFrom(88000, 3200),
    },
    {
      id: 'margin',
      title: 'Profit Margin',
      value: 34.2,
      change: 1.8,
      format: 'percent',
      sparkline: sparklineFrom(30, 1.2),
    },
    {
      id: 'cashflow',
      title: 'Cash Flow',
      value: 142800,
      change: -3.1,
      format: 'currency',
      sparkline: sparklineFrom(128000, 6800),
    },
  ],
  revenueChart: generateMonthlySeries(52000, 8000, ['income', 'expenses', 'profit']),
  distribution: [
    { name: 'Subscriptions', value: 52 },
    { name: 'Services', value: 24 },
    { name: 'Licenses', value: 14 },
    { name: 'Other', value: 10 },
  ],
}

export const dashboardData = {
  overview: overviewDashboard,
  analytics: analyticsDashboard,
  saas: saasDashboard,
  crm: crmDashboard,
  projects: projectsDashboard,
  finance: financeDashboard,
} as const

export type DashboardKey = keyof typeof dashboardData

export function getDashboard(key: DashboardKey): DashboardSection {
  return dashboardData[key]
}

// --- Compatibility exports for dashboard pages ---

export interface KpiMetric {
  id: string
  label: string
  value: string
  change: number
  changeLabel: string
  trend: 'up' | 'down' | 'neutral'
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  target: string
  time: string
}

export interface GoalItem {
  id: string
  title: string
  current: number
  target: number
  unit: string
}

function formatKpiValue(stat: KpiStat): string {
  if (stat.format === 'currency') {
    return `$${Number(stat.value).toLocaleString()}`
  }
  if (stat.format === 'percent') {
    return `${stat.value}%`
  }
  if (stat.format === 'number') {
    return Number(stat.value).toLocaleString()
  }
  return String(stat.value)
}

function kpiStatToMetric(stat: KpiStat): KpiMetric {
  const trend: KpiMetric['trend'] =
    stat.change > 0 ? 'up' : stat.change < 0 ? 'down' : 'neutral'
  return {
    id: stat.id,
    label: stat.title,
    value: formatKpiValue(stat),
    change: stat.change,
    changeLabel: 'vs last month',
    trend,
  }
}

function kpisFromSection(section: DashboardSection): KpiMetric[] {
  return section.kpis.map(kpiStatToMetric)
}

const chartPalette = [
  '#5b5fef',
  '#14b8a6',
  '#0284c7',
  '#d97706',
  '#16a34a',
  '#dc2626',
  '#64748b',
] as const

function chartColorAt(index: number): string {
  return chartPalette[index % chartPalette.length]!
}

export const overviewKpis = kpisFromSection(overviewDashboard)
export const saasKpis = kpisFromSection(saasDashboard)
export const crmKpis = kpisFromSection(crmDashboard)
export const projectKpis = kpisFromSection(projectsDashboard)
export const financeKpis = kpisFromSection(financeDashboard)

export const revenueChartData = overviewDashboard.revenueChart.map((point) => ({
  month: point.label,
  revenue: Number(point.revenue),
  expenses: Number(point.expenses),
}))

export const trafficChartData = (overviewDashboard.trafficChart ?? []).map((point) => ({
  day: point.label,
  visitors: Number(point.visitors),
  pageViews: Number(point.signups) * 3,
}))

export const categoryBreakdown: { name: string; value: number; color: string }[] = (
  overviewDashboard.distribution ?? []
).map((item, i) => ({
  name: item.name,
  value: item.value,
  color: chartColorAt(i),
}))

export const mrrGrowthData = saasDashboard.revenueChart.map((point) => ({
  month: point.label,
  newMrr: Number(point.newMrr),
  churn: Number(point.churn),
  mrr: Number(point.newMrr) + Number(point.expansion) - Number(point.churn),
}))

export const pipelineStages = [
  { stage: 'Lead', count: 84, value: 420000 },
  { stage: 'Qualified', count: 52, value: 680000 },
  { stage: 'Proposal', count: 28, value: 540000 },
  { stage: 'Negotiation', count: 14, value: 380000 },
  { stage: 'Closed Won', count: 8, value: 240000 },
]

export const cashFlowData = financeDashboard.revenueChart.map((point) => ({
  month: point.label,
  income: Number(point.income),
  expenses: Number(point.expenses),
}))

export const recentActivity: ActivityItem[] = [
  { id: 'ra_1', user: 'Avery Chen', action: 'updated', target: 'Q3 revenue forecast', time: '2 min ago' },
  { id: 'ra_2', user: 'Jordan Blake', action: 'closed deal with', target: 'Cobalt Retail', time: '18 min ago' },
  { id: 'ra_3', user: 'Morgan Ellis', action: 'published', target: 'Product launch blog', time: '1 hr ago' },
  { id: 'ra_4', user: 'Casey Nguyen', action: 'assigned task to', target: 'Design review', time: '2 hr ago' },
  { id: 'ra_5', user: 'Quinn Harper', action: 'enabled MFA for', target: 'Admin roles', time: '3 hr ago' },
  { id: 'ra_6', user: 'Rowan Pierce', action: 'sent proposal to', target: 'Ironhaven Tools', time: '5 hr ago' },
]

export const quarterlyGoals: GoalItem[] = [
  { id: 'g_1', title: 'Revenue Target', current: 284500, target: 350000, unit: '$' },
  { id: 'g_2', title: 'New Customers', current: 142, target: 200, unit: '' },
  { id: 'g_3', title: 'Churn Reduction', current: 2.1, target: 1.8, unit: '%' },
  { id: 'g_4', title: 'NPS Score', current: 62, target: 70, unit: '' },
]
