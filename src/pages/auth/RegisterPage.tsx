import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthCard } from './auth-shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

export function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/auth/two-factor')
    }, 800)
  }

  return (
    <AuthCard
      title={t('auth.signUpTitle')}
      description={t('auth.signUpDescription')}
      footer={
        <p className="text-[var(--color-text-secondary)]">
          {t('auth.hasAccount')}{' '}
          <Link to="/auth/login" className="font-medium text-[var(--color-primary)] hover:underline">
            {t('auth.signIn')}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" name="firstName" required />
          <Input label="Last name" name="lastName" required />
        </div>
        <Input label={t('auth.email')} type="email" name="email" required />
        <Input label={t('auth.password')} type="password" name="password" required helperText="Min. 8 characters" />
        <Input label={t('auth.confirmPassword')} type="password" name="confirmPassword" required />
        <Checkbox label="I agree to the Terms of Service and Privacy Policy" required />
        <Button type="submit" fullWidth loading={loading}>
          {t('auth.signUp')}
        </Button>
      </form>
    </AuthCard>
  )
}

export default RegisterPage
