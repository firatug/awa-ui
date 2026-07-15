import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { ActivityItem, GoalItem } from '@/data/dashboard'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export function ActivityFeed({
  items,
  title,
  className,
}: {
  items: ActivityItem[]
  title?: string
  className?: string
}) {
  return (
    <Card className={className}>
      {title ? <CardHeader title={title} /> : null}
      <CardContent>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <Avatar name={item.user} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-[var(--text-body-sm)] text-[var(--color-text-primary)]">
                  <span className="font-medium">{item.user}</span>{' '}
                  <span className="text-[var(--color-text-secondary)]">{item.action}</span>{' '}
                  <span className="font-medium">{item.target}</span>
                </p>
                <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                  {item.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export function GoalsPanel({
  goals,
  title,
  className,
}: {
  goals: GoalItem[]
  title?: string
  className?: string
}) {
  return (
    <Card className={className}>
      {title ? <CardHeader title={title} /> : null}
      <CardContent className="space-y-5">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.current / goal.target) * 100))
          return (
            <div key={goal.id}>
              <div className="mb-2 flex items-center justify-between text-[var(--text-body-sm)]">
                <span className="font-medium text-[var(--color-text-primary)]">{goal.title}</span>
                <span className="text-[var(--color-text-secondary)]">
                  {goal.unit === '$' ? `$${goal.current.toLocaleString()}` : goal.current}
                  {' / '}
                  {goal.unit === '$' ? `$${goal.target.toLocaleString()}` : goal.target}
                  {goal.unit === '%' ? '%' : ''}
                </span>
              </div>
              <Progress value={pct} className="h-2" />
              <p className="mt-1 text-[var(--text-caption)] text-[var(--color-text-muted)]">
                {pct}% complete
              </p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export function MiniTable({
  headers,
  rows,
  className,
}: {
  headers: string[]
  rows: (string | number)[][]
  className?: string
}) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-[var(--text-body-sm)]">
        <thead>
          <tr className="border-b border-[var(--color-border-subtle)]">
            {headers.map((h) => (
              <th
                key={h}
                className="pb-3 text-start font-medium text-[var(--color-text-secondary)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--color-border-subtle)] last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="py-3 text-[var(--color-text-primary)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
