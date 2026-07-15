import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock } from 'lucide-react'
import { appConfig } from '@/config/app.config'
import { AuthCard } from './auth-shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'

export function LockScreenPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboards/overview')
    }, 600)
  }

  return (
    <AuthCard title="Session locked" description={t('auth.sessionExpired')}>
      <div className="mb-6 flex flex-col items-center gap-3">
        <Avatar name="Admin User" size="xl" />
        <div className="text-center">
          <p className="font-medium text-[var(--color-text-primary)]">Admin User</p>
          <p className="text-[var(--text-body-sm)] text-[var(--color-text-muted)]">
            {appConfig.demo.email}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t('auth.password')}
          type="password"
          name="password"
          required
          rightAddon={<Lock className="size-4" />}
        />
        <Button type="submit" fullWidth loading={loading}>
          {t('auth.signIn')}
        </Button>
      </form>
    </AuthCard>
  )
}

export default LockScreenPage
