import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Avatar } from '@/components/ui/avatar'
import { toast } from '@/components/feedback/toast'

export function AccountSettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('nav.pages.settingsAccount')} description={t('pages.settings.description')} />

      <div className="mx-auto max-w-2xl space-y-[var(--density-gap)]">
        <Card>
          <CardHeader title="Profile photo" />
          <CardContent className="flex items-center gap-4">
            <Avatar name="Admin User" size="xl" />
            <div className="space-y-2">
              <Button size="sm">{t('actions.upload')}</Button>
              <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">JPG, PNG. Max 2MB.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Personal information" />
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input label="First name" defaultValue="Admin" />
            <Input label="Last name" defaultValue="User" />
            <Input label={t('common.email')} type="email" defaultValue="admin@example.com" className="md:col-span-2" />
            <Input label={t('common.phone')} defaultValue="+1 555 0100" />
            <Select defaultValue="en">
              <SelectTrigger><SelectValue placeholder={t('common.language')} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="tr">Türkçe</SelectItem>
              </SelectContent>
            </Select>
            <Textarea label="Bio" className="md:col-span-2" rows={3} placeholder="Tell us about yourself…" />
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast.success(t('form.savedSuccessfully'))}>{t('actions.save')}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default AccountSettingsPage
