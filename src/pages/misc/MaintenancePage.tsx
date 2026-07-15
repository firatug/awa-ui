import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wrench, Clock } from 'lucide-react'
import { appConfig } from '@/config/app.config'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export function MaintenancePage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-[var(--radius-2xl)] bg-[var(--color-warning-soft)] p-6 text-[var(--color-warning)]">
        <Wrench className="size-16" />
      </div>
      <h1 className="text-[var(--text-h2)] font-semibold text-[var(--color-text-primary)]">
        {t('pages.maintenance.title')}
      </h1>
      <p className="mt-3 max-w-md text-[var(--text-body)] text-[var(--color-text-secondary)]">
        {t('pages.maintenance.description')}
      </p>
      <div className="mt-8 w-full max-w-sm space-y-3">
        <div className="flex items-center justify-center gap-2 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
          <Clock className="size-4" />
          Estimated completion: 2 hours
        </div>
        <Progress value={65} label="Maintenance progress" showValue />
      </div>
      <p className="mt-8 text-[var(--text-caption)] text-[var(--color-text-muted)]">
        {appConfig.author.email}
      </p>
      <Button variant="outline" asChild className="mt-4">
        <Link to="/dashboards/overview">{t('actions.retry')}</Link>
      </Button>
    </div>
  )
}

export default MaintenancePage
