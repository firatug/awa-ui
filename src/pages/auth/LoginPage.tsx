import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Code2, Eye, EyeOff, Mail } from 'lucide-react'
import { appConfig } from '@/config/app.config'
import { AuthCard } from './auth-shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboards/overview')
    }, 800)
  }

  const fillDemo = () => {
    setEmail(appConfig.demo.email)
    setPassword(appConfig.demo.password)
  }

  return (
    <AuthCard
      title={t('auth.signInTitle')}
      description={t('auth.signInDescription')}
      footer={
        <p className="text-[var(--color-text-secondary)]">
          {t('auth.noAccount')}{' '}
          <Link to="/auth/register" className="font-medium text-[var(--color-primary)] hover:underline">
            {t('auth.signUp')}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t('auth.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          leftAddon={<Mail className="size-4" />}
        />
        <Input
          label={t('auth.password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightAddon={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[var(--color-text-muted)]">
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
        />
        <div className="flex items-center justify-between">
          <Checkbox
            label={t('auth.rememberMe')}
            checked={remember}
            onCheckedChange={(v) => setRemember(!!v)}
          />
          <Link to="/auth/forgot-password" className="text-[var(--text-body-sm)] text-[var(--color-primary)] hover:underline">
            {t('auth.forgotPassword')}
          </Link>
        </div>
        <Button type="submit" fullWidth loading={loading}>
          {t('auth.signIn')}
        </Button>
      </form>

      <Alert variant="info" title={t('auth.demoCredentials')} className="mt-4">
        <p>
          {appConfig.demo.email} / {appConfig.demo.password}
        </p>
        <Button variant="link" size="sm" onClick={fillDemo} className="mt-1 px-0">
          Use demo credentials
        </Button>
      </Alert>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-surface)] px-3 text-[var(--text-caption)] text-[var(--color-text-muted)]">
          {t('auth.orContinueWith')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" leftIcon={<Code2 className="size-4" />}>
          GitHub
        </Button>
        <Button variant="outline">Google</Button>
      </div>

      <p className="mt-6 text-center text-[var(--text-caption)] text-[var(--color-text-muted)]">
        {t('auth.termsAgreement')}
      </p>
    </AuthCard>
  )
}

export default LoginPage
