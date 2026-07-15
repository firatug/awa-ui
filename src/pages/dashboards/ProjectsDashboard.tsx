import { Calendar, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { KpiGrid } from '@/components/dashboard/KpiCard'
import { GoalsPanel } from '@/components/dashboard/DashboardWidgets'
import { projectKpis, quarterlyGoals } from '@/data/dashboard'
import { tasks } from '@/data/apps'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarGroup } from '@/components/ui/avatar'

const projects = [
  { name: 'Admin Panel v2', progress: 78, status: 'in-progress', team: ['Sarah', 'Elena', 'Lucas'] },
  { name: 'Mobile App', progress: 45, status: 'in-progress', team: ['James', 'Ava'] },
  { name: 'API Gateway', progress: 92, status: 'review', team: ['Lucas', 'Priya'] },
  { name: 'Marketing Site', progress: 100, status: 'completed', team: ['Ava', 'James'] },
]

const statusVariant = {
  'in-progress': 'info' as const,
  review: 'warning' as const,
  completed: 'success' as const,
  todo: 'default' as const,
  done: 'success' as const,
}

export function ProjectsDashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader
        title={t('pages.projects.title')}
        description={t('pages.projects.description')}
        actions={
          <Button size="sm" leftIcon={<Calendar className="size-4" />}>
            Timeline view
          </Button>
        }
      />

      <div className="space-y-[var(--density-gap)]">
        <KpiGrid metrics={projectKpis} />

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <Card>
            <CardHeader title="Active Projects" action={<Badge>{projects.length} total</Badge>} />
            <CardContent className="space-y-5">
              {projects.map((project) => (
                <div key={project.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[var(--text-body-sm)] font-medium">{project.name}</span>
                    <Badge variant={statusVariant[project.status as keyof typeof statusVariant]}>
                      {project.status}
                    </Badge>
                  </div>
                  <Progress value={project.progress} />
                  <div className="mt-2 flex items-center justify-between">
                    <AvatarGroup max={3} size="sm">
                      {project.team.map((m) => (
                        <Avatar key={m} name={m} size="sm" />
                      ))}
                    </AvatarGroup>
                    <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <GoalsPanel goals={quarterlyGoals} title="Project Milestones" />
        </div>

        <Card>
          <CardHeader
            title="Upcoming Tasks"
            action={
              <Button variant="ghost" size="sm" leftIcon={<Users className="size-4" />}>
                Assign
              </Button>
            }
          />
          <CardContent>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {tasks.slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-[var(--text-body-sm)] font-medium">{task.title}</p>
                    <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                      {task.project} · Due {task.dueDate}
                    </p>
                  </div>
                  <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectsDashboard
