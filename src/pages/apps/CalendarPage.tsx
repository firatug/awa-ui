import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { calendarEvents } from '@/data/apps'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthDays = Array.from({ length: 35 }, (_, i) => i + 1)

const typeVariant = {
  meeting: 'primary' as const,
  deadline: 'danger' as const,
  reminder: 'warning' as const,
}

export function CalendarPage() {
  const { t } = useTranslation()
  const [month] = useState('July 2026')

  return (
    <div>
      <PageHeader
        title={t('pages.calendar.title')}
        description={t('pages.calendar.description')}
        actions={<Button size="sm" leftIcon={<Plus className="size-4" />}>New event</Button>}
      />

      <div className="grid gap-[var(--density-gap)] lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title={month}
            action={
              <div className="flex gap-1">
                <Button variant="ghost" size="icon-sm"><ChevronLeft className="size-4" /></Button>
                <Button variant="ghost" size="icon-sm"><ChevronRight className="size-4" /></Button>
              </div>
            }
          />
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center">
              {days.map((d) => (
                <div key={d} className="py-2 text-[var(--text-caption)] font-medium text-[var(--color-text-muted)]">{d}</div>
              ))}
              {monthDays.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`rounded-[var(--radius-control)] py-3 text-[var(--text-body-sm)] transition-colors hover:bg-[var(--color-surface-sunken)] ${
                    d === 15 ? 'bg-[var(--color-primary)] font-semibold text-[var(--color-primary-foreground)]' : ''
                  }`}
                >
                  {d <= 31 ? d : ''}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upcoming events" />
          <CardContent className="space-y-3">
            {calendarEvents.map((e) => (
              <div key={e.id} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[var(--text-body-sm)] font-medium">{e.title}</p>
                  <Badge variant={typeVariant[e.type]} size="sm">{e.type}</Badge>
                </div>
                <p className="mt-1 text-[var(--text-caption)] text-[var(--color-text-muted)]">
                  {e.date} at {e.time}
                  {e.attendees ? ` · ${e.attendees} attendees` : ''}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CalendarPage
