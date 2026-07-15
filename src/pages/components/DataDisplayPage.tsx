import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarGroup } from '@/components/ui/avatar'
import { Progress, CircularProgress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip'
import { users } from '@/data/users'

export function DataDisplayPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title={t('nav.components.dataDisplay')} description={t('pages.components.description')} />

      <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
        <Card>
          <CardHeader title="Avatars" />
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar name="Sarah Chen" size="sm" />
              <Avatar name="Marcus Webb" size="md" />
              <Avatar name="Elena Rossi" size="lg" />
              <Avatar name="James Park" size="xl" />
            </div>
            <AvatarGroup max={4}>
              {users.slice(0, 6).map((u) => (
                <Avatar key={u.id} name={u.name} size="sm" />
              ))}
            </AvatarGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Badges" />
          <CardContent className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary" dot>Primary</Badge>
            <Badge variant="success">{t('status.active')}</Badge>
            <Badge variant="warning">{t('status.pending')}</Badge>
            <Badge variant="danger">{t('status.overdue')}</Badge>
            <Badge variant="outline">{t('status.beta')}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Progress" />
          <CardContent className="space-y-4">
            <Progress value={65} label="Project completion" showValue />
            <Progress value={40} size="sm" />
            <div className="flex justify-center gap-6">
              <CircularProgress value={75} showValue label="Storage" />
              <CircularProgress value={42} showValue label="Bandwidth" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Accordion" />
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is included?</AccordionTrigger>
                <AccordionContent>Components, layouts, themes, and documentation.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I customize themes?</AccordionTrigger>
                <AccordionContent>Yes — use the theme customizer or CSS variables.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is i18n supported?</AccordionTrigger>
                <AccordionContent>Built-in support for multiple locales via react-i18next.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Tooltip & Separator" />
          <CardContent className="space-y-4">
            <TooltipProvider>
              <Tooltip content="Helpful contextual information">
                <button type="button" className="rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 py-2 text-[var(--text-body-sm)]">
                  Hover for tooltip
                </button>
              </Tooltip>
            </TooltipProvider>
            <Separator />
            <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">Content below separator</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DataDisplayPage
