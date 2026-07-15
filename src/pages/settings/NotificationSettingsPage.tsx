import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/feedback/toast'

const notificationGroups = [
  {
    title: 'Email notifications',
    items: [
      { id: 'product', label: 'Product updates', description: 'New features and improvements', default: true },
      { id: 'security', label: 'Security alerts', description: 'Login attempts and password changes', default: true },
      { id: 'billing', label: 'Billing reminders', description: 'Invoices and payment confirmations', default: true },
    ],
  },
  {
    title: 'Push notifications',
    items: [
      { id: 'mentions', label: 'Mentions', description: 'When someone mentions you', default: true },
      { id: 'tasks', label: 'Task assignments', description: 'New tasks assigned to you', default: false },
      { id: 'comments', label: 'Comments', description: 'Replies on your threads', default: true },
    ],
  },
]

export function NotificationSettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('nav.pages.settingsNotifications')} description={t('pages.settings.description')} />

      <div className="mx-auto max-w-2xl space-y-[var(--density-gap)]">
        {notificationGroups.map((group, gi) => (
          <Card key={group.title}>
            <CardHeader title={group.title} />
            <CardContent className="space-y-4">
              {group.items.map((item, ii) => (
                <div key={item.id}>
                  <Switch label={item.label} description={item.description} defaultChecked={item.default} />
                  {ii < group.items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
            {gi === notificationGroups.length - 1 && (
              <CardFooter>
                <Button onClick={() => toast.success(t('form.savedSuccessfully'))}>{t('actions.save')}</Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default NotificationSettingsPage
