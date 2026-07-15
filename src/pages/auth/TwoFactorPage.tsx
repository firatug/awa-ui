import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Shield } from 'lucide-react'
import { AuthCard, OtpInput } from './auth-shared'
import { Button } from '@/components/ui/button'

export function TwoFactorPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length < 6) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboards/overview')
    }, 800)
  }

  return (
    <AuthCard
      title={t('auth.twoFactor')}
      description={t('auth.twoFactorDescription')}
      footer={
        <Link to="/auth/login" className="font-medium text-[var(--color-primary)] hover:underline">
          {t('auth.backToLogin')}
        </Link>
      }
    >
      <div className="mb-6 flex justify-center">
        <div className="rounded-[var(--radius-xl)] bg-[var(--color-primary-soft)] p-4 text-[var(--color-primary)]">
          <Shield className="size-8" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="mb-4 text-center text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
            {t('auth.verificationCode')}
          </p>
          <OtpInput value={code} onChange={setCode} length={6} />
        </div>
        <Button type="submit" fullWidth loading={loading} disabled={code.length < 6}>
          {t('actions.confirm')}
        </Button>
        <p className="text-center text-[var(--text-caption)] text-[var(--color-text-muted)]">
          Did not receive a code?{' '}
          <button type="button" className="text-[var(--color-primary)] hover:underline">
            Resend
          </button>
        </p>
      </form>
    </AuthCard>
  )
}

export default TwoFactorPage
