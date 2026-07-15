import { useState } from 'react'
import { Star, Archive, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { inboxItems } from '@/data/apps'
import { cn } from '@/lib/utils'

export function InboxPage() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(inboxItems[0]?.id ?? '')
  const [items] = useState(inboxItems)
  const active = items.find((i) => i.id === selected)

  return (
    <div>
      <PageHeader title={t('pages.inbox.title')} description={t('pages.inbox.description')} />

      <Card padding="none" className="flex h-[calc(100vh-12rem)] overflow-hidden">
        <div className="w-96 shrink-0 border-e border-[var(--color-border)]">
          <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] p-3">
            <Checkbox aria-label={t('actions.selectAll')} />
            <Input placeholder={t('actions.search')} inputSize="sm" className="flex-1" />
          </div>
          <ScrollArea className="h-full">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                className={cn(
                  'flex w-full gap-3 border-b border-[var(--color-border-subtle)] p-4 text-start transition-colors hover:bg-[var(--color-surface-sunken)]',
                  selected === item.id && 'bg-[var(--color-primary-soft)]',
                  !item.read && 'font-medium',
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[var(--text-body-sm)]">{item.from}</span>
                    <span className="shrink-0 text-[var(--text-caption)] text-[var(--color-text-muted)]">{item.time}</span>
                  </div>
                  <p className="truncate text-[var(--text-body-sm)]">{item.subject}</p>
                  <p className="truncate text-[var(--text-caption)] text-[var(--color-text-muted)]">{item.preview}</p>
                </div>
                {item.starred && <Star className="size-4 shrink-0 fill-[var(--color-warning)] text-[var(--color-warning)]" />}
              </button>
            ))}
          </ScrollArea>
        </div>

        <div className="flex flex-1 flex-col">
          {active ? (
            <>
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] p-4">
                <div>
                  <h2 className="text-[var(--text-h5)] font-semibold">{active.subject}</h2>
                  <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">From: {active.from}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-sm"><Star className="size-4" /></Button>
                  <Button variant="ghost" size="icon-sm"><Archive className="size-4" /></Button>
                  <Button variant="ghost" size="icon-sm"><Trash2 className="size-4" /></Button>
                </div>
              </div>
              <div className="flex-1 p-6">
                {active.label && <Badge variant="outline" className="mb-4">{active.label}</Badge>}
                <p className="text-[var(--text-body)] text-[var(--color-text-primary)]">{active.preview}</p>
                <p className="mt-4 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Full message content would appear here with rich formatting support.
                </p>
              </div>
              <div className="border-t border-[var(--color-border-subtle)] p-4">
                <Button>Reply</Button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-[var(--color-text-muted)]">
              {t('empty.noMessages')}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default InboxPage
