import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'

export function BlankPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader title="Blank Page" description="A minimal starter page for custom content." />
      <Card>
        <CardContent>
          <EmptyState
            title="Your content goes here"
            description="Use this page as a starting point for new features or custom layouts."
            action={<Button size="sm">{t('actions.create')}</Button>}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default BlankPage
