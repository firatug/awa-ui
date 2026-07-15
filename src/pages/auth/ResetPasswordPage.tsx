import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthCard } from './auth-shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/alert'

export function ResetPasswordPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      setTimeout(() => navigate('/auth/login'), 2000)
    }, 800)
  }

  return (
    <AuthCard
      title={t('auth.resetPassword')}
      description="Enter your new password below."
      footer={
        <Link to="/auth/login" className="font-medium text-[var(--color-primary)] hover:underline">
          {t('auth.backToLogin')}
        </Link>
      }
    >
      {done ? (
        <Alert variant="success" title={t('auth.passwordUpdated')}>
          Redirecting to sign in…
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label={t('auth.newPassword')} type="password" name="password" required helperText="Min. 8 characters" />
          <Input label={t('auth.confirmPassword')} type="password" name="confirmPassword" required />
          <Button type="submit" fullWidth loading={loading}>
            {t('auth.resetPassword')}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}

export default ResetPasswordPage
