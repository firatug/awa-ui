import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { toast } from '@/components/feedback/toast'

const sessions = [
  { device: 'Chrome on Windows', location: 'New York, US', current: true, lastActive: 'Now' },
  { device: 'Safari on macOS', location: 'San Francisco, US', current: false, lastActive: '2 days ago' },
  { device: 'Mobile App on iOS', location: 'London, UK', current: false, lastActive: '1 week ago' },
]

export function SecuritySettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('nav.pages.settingsSecurity')} description={t('pages.settings.description')} />

      <div className="mx-auto max-w-2xl space-y-[var(--density-gap)]">
        <Card>
          <CardHeader title="Change password" />
          <CardContent className="space-y-4">
            <Input label={t('auth.currentPassword')} type="password" />
            <Input label={t('auth.newPassword')} type="password" />
            <Input label={t('auth.confirmPassword')} type="password" />
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast.success(t('auth.passwordUpdated'))}>{t('auth.resetPassword')}</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader title={t('auth.twoFactor')} action={<Badge variant="success">Enabled</Badge>} />
          <CardContent className="space-y-4">
            <Switch label="Require 2FA for all team members" defaultChecked />
            <Alert variant="info">{t('auth.twoFactorDescription')}</Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Active sessions" />
          <CardContent className="divide-y divide-[var(--color-border-subtle)]">
            {sessions.map((s) => (
              <div key={s.device} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-[var(--text-body-sm)] font-medium">{s.device}</p>
                  <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{s.location} · {s.lastActive}</p>
                </div>
                {s.current ? (
                  <Badge variant="primary">Current</Badge>
                ) : (
                  <Button variant="ghost" size="sm">Revoke</Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SecuritySettingsPage
