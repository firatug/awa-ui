import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { kanbanBoard } from '@/data/apps'

const priorityVariant = {
  low: 'default' as const,
  medium: 'warning' as const,
  high: 'danger' as const,
}

export function KanbanPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHeader
        title={t('pages.kanban.title')}
        description={t('pages.kanban.description')}
        actions={<Button size="sm" leftIcon={<Plus className="size-4" />}>Add card</Button>}
      />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {kanbanBoard.map((col) => (
          <div key={col.id} className="w-72 shrink-0">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[var(--text-body-sm)] font-semibold">{col.title}</h3>
              <Badge variant="outline">{col.cards.length}</Badge>
            </div>
            <div className="space-y-3">
              {col.cards.map((card) => (
                <Card key={card.id} interactive padding="sm">
                  <CardContent>
                    <p className="text-[var(--text-body-sm)] font-medium">{card.title}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <Avatar name={card.assignee} size="sm" />
                      <Badge variant={priorityVariant[card.priority]} size="sm">{card.priority}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {card.tags.map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" size="sm" className="w-full" leftIcon={<Plus className="size-3" />}>
                Add card
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KanbanPage
