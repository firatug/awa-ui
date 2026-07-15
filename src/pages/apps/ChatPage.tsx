import { useState } from 'react'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { chatThreads } from '@/data/apps'
import { cn } from '@/lib/utils'

export function ChatPage() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState(chatThreads[0]?.id ?? '')
  const [message, setMessage] = useState('')
  const active = chatThreads.find((t) => t.id === activeId) ?? chatThreads[0]

  return (
    <div>
      <PageHeader title={t('pages.chat.title')} description={t('pages.chat.description')} />

      <Card padding="none" className="flex h-[calc(100vh-12rem)] overflow-hidden">
        <div className="w-72 shrink-0 border-e border-[var(--color-border)]">
          <div className="border-b border-[var(--color-border-subtle)] p-4">
            <Input placeholder={t('actions.search')} inputSize="sm" />
          </div>
          <ScrollArea className="h-full">
            {chatThreads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveId(thread.id)}
                className={cn(
                  'flex w-full items-center gap-3 border-b border-[var(--color-border-subtle)] p-4 text-start transition-colors hover:bg-[var(--color-surface-sunken)]',
                  activeId === thread.id && 'bg-[var(--color-primary-soft)]',
                )}
              >
                <Avatar name={thread.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-[var(--text-body-sm)] font-medium">{thread.name}</span>
                    {thread.unread > 0 && <Badge variant="primary" size="sm">{thread.unread}</Badge>}
                  </div>
                  <p className="truncate text-[var(--text-caption)] text-[var(--color-text-muted)]">{thread.lastMessage}</p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-[var(--color-border-subtle)] p-4">
            <Avatar name={active?.name ?? ''} size="sm" />
            <div>
              <p className="font-medium">{active?.name}</p>
              {active?.online && <p className="text-[var(--text-caption)] text-[var(--color-success)]">{t('status.online')}</p>}
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {active?.messages.map((msg) => (
                <div key={msg.id} className={cn('flex', msg.isOwn && 'justify-end')}>
                  <div
                    className={cn(
                      'max-w-[70%] rounded-[var(--radius-lg)] px-4 py-2 text-[var(--text-body-sm)]',
                      msg.isOwn
                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                        : 'bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)]',
                    )}
                  >
                    {!msg.isOwn && <p className="mb-1 text-[var(--text-caption)] font-medium opacity-70">{msg.sender}</p>}
                    {msg.content}
                    <p className={cn('mt-1 text-[10px] opacity-60', msg.isOwn ? 'text-end' : '')}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2 border-t border-[var(--color-border-subtle)] p-4">
            <Input
              placeholder="Type a message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" aria-label="Send"><Send className="size-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ChatPage
