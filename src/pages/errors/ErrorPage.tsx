import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FileQuestion } from 'lucide-react'
import { appConfig } from '@/config/app.config'
import { Button } from '@/components/ui/button'

/** Single error template — covers 404 and unknown routes */
export function ErrorPage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-[20px] bg-[var(--color-info-soft)] p-6 text-[var(--color-info)]">
        <FileQuestion className="size-14" strokeWidth={1.5} />
      </div>
      <p className="text-[clamp(3rem,8vw,4.5rem)] font-bold leading-none tracking-tight text-[var(--color-text-muted)]">
        404
      </p>
      <h1 className="mt-3 text-[var(--text-h2)] font-semibold text-[var(--color-text-primary)]">
        {t('pages.notFound.title')}
      </h1>
      <p className="mt-3 max-w-md text-[var(--text-body)] text-[var(--color-text-secondary)]">
        {t('pages.notFound.description')}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/dashboards/overview">{t('sidebar.home')}</Link>
        </Button>
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          {t('actions.back')}
        </Button>
      </div>
      <p className="mt-12 text-[var(--text-caption)] text-[var(--color-text-muted)]">
        {appConfig.name} · {appConfig.version}
      </p>
    </div>
  )
}

export default ErrorPage
