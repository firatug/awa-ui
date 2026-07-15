import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthCard } from './auth-shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/alert'

export function ForgotPasswordPage() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 800)
  }

  return (
    <AuthCard
      title={t('auth.resetPassword')}
      description={t('auth.resetPasswordDescription')}
      footer={
        <Link to="/auth/login" className="font-medium text-[var(--color-primary)] hover:underline">
          {t('auth.backToLogin')}
        </Link>
      }
    >
      {sent ? (
        <Alert variant="success" title="Check your inbox">
          We sent a password reset link to your email address. The link expires in 24 hours.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label={t('auth.email')} type="email" name="email" required placeholder="you@company.com" />
          <Button type="submit" fullWidth loading={loading}>
            {t('auth.sendResetLink')}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}

export default ForgotPasswordPage
