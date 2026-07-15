import { useState } from 'react'
import { Plus, CheckCircle2, Circle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { tasks } from '@/data/apps'
import { cn } from '@/lib/utils'

const priorityVariant = {
  low: 'default' as const,
  medium: 'warning' as const,
  high: 'danger' as const,
}

const statusVariant = {
  todo: 'default' as const,
  'in-progress': 'info' as const,
  done: 'success' as const,
}

export function TasksPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [taskList, setTaskList] = useState(tasks)

  const filtered = filter === 'all' ? taskList : taskList.filter((t) => t.status === filter)

  const toggleDone = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t)),
    )
  }

  return (
    <div>
      <PageHeader
        title={t('pages.tasks.title')}
        description={t('pages.tasks.description')}
        actions={<Button size="sm" leftIcon={<Plus className="size-4" />}>New task</Button>}
      />

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-wrap gap-3">
            <Input placeholder={t('actions.search')} className="max-w-sm" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="todo">To do</SelectItem>
                <SelectItem value="in-progress">{t('status.inProgress')}</SelectItem>
                <SelectItem value="done">{t('status.completed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filtered.map((task) => (
              <div key={task.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <button type="button" onClick={() => toggleDone(task.id)} className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                  {task.status === 'done' ? (
                    <CheckCircle2 className="size-5 text-[var(--color-success)]" />
                  ) : (
                    <Circle className="size-5" />
                  )}
                </button>
                <div className={cn('min-w-0 flex-1', task.status === 'done' && 'opacity-60')}>
                  <p className={cn('text-[var(--text-body-sm)] font-medium', task.status === 'done' && 'line-through')}>
                    {task.title}
                  </p>
                  <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                    {task.project} · {task.assignee} · Due {task.dueDate}
                  </p>
                </div>
                <Badge variant={priorityVariant[task.priority]} size="sm">{task.priority}</Badge>
                <Badge variant={statusVariant[task.status]} size="sm">{task.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TasksPage
