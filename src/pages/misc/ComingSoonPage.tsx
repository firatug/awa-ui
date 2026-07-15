import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Rocket, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function ComingSoonPage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-[var(--radius-2xl)] bg-[var(--color-primary-soft)] p-6 text-[var(--color-primary)]">
        <Rocket className="size-16" />
      </div>
      <h1 className="text-[var(--text-h2)] font-semibold text-[var(--color-text-primary)]">
        {t('nav.errors.comingSoon')}
      </h1>
      <p className="mt-3 max-w-md text-[var(--text-body)] text-[var(--color-text-secondary)]">
        {t('common.comingSoon')} — {t('app.description')}
      </p>
      <Card className="mt-8 w-full max-w-md p-6">
        <p className="mb-3 text-[var(--text-body-sm)] font-medium">Get notified when we launch</p>
        <div className="flex gap-2">
          <Input placeholder="your@email.com" type="email" />
          <Button leftIcon={<Bell className="size-4" />}>Notify me</Button>
        </div>
      </Card>
      <Button variant="link" asChild className="mt-6">
        <Link to="/dashboards/overview">{t('sidebar.home')}</Link>
      </Button>
    </div>
  )
}

export default ComingSoonPage
