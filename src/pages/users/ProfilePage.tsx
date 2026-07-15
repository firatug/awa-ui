import { Mail, MapPin, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { recentActivity } from '@/data/dashboard'
import { ActivityFeed } from '@/components/dashboard/DashboardWidgets'

export function ProfilePage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('pages.profile.title')} description={t('pages.profile.description')} />

      <div className="grid gap-[var(--density-gap)] lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <Avatar name="Sarah Chen" size="xl" />
            <h2 className="mt-4 text-[var(--text-h4)] font-semibold">Sarah Chen</h2>
            <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">Senior Product Designer</p>
            <Badge variant="primary" className="mt-2">Admin</Badge>
            <div className="mt-6 w-full space-y-3 text-start text-[var(--text-body-sm)]">
              <p className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Mail className="size-4" /> sarah.chen@example.com
              </p>
              <p className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <MapPin className="size-4" /> San Francisco, CA
              </p>
              <p className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Calendar className="size-4" /> Joined Jan 2024
              </p>
            </div>
            <Button className="mt-6 w-full">{t('actions.edit')}</Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="mt-4">
              <ActivityFeed items={recentActivity} title="Recent Activity" />
            </TabsContent>
            <TabsContent value="projects" className="mt-4">
              <Card>
                <CardHeader title="Active Projects" />
                <CardContent>
                  <ul className="space-y-3">
                    {['Admin Panel v2', 'Design System', 'Mobile App'].map((p) => (
                      <li key={p} className="flex items-center justify-between text-[var(--text-body-sm)]">
                        <span className="font-medium">{p}</span>
                        <Badge variant="info">{t('status.inProgress')}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader title="Quick settings" />
                <CardContent className="space-y-2 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                  <p>Timezone: UTC-8 (Pacific)</p>
                  <p>Language: English</p>
                  <p>Notifications: Enabled</p>
                  <Button variant="outline" size="sm" className="mt-4">{t('header.settings')}</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
