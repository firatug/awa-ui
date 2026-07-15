import { Bell, CalendarDays, Check, RefreshCw, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { TodoItem } from './types'

interface TodoDetailDrawerProps {
  item: TodoItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (item: TodoItem) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoDetailDrawer({
  item,
  open,
  onOpenChange,
  onSave,
  onToggle,
  onDelete,
}: TodoDetailDrawerProps) {
  const { t, i18n } = useTranslation()
  const [draft, setDraft] = useState<TodoItem | null>(null)

  useEffect(() => {
    if (item) setDraft({ ...item, notes: item.notes ?? '' })
  }, [item])

  if (!draft) return null

  const dateLabel = (() => {
    const locale = i18n.language?.startsWith('tr') ? 'tr-TR' : 'en-US'
    const [y, m, d] = draft.dayKey.split('-').map(Number)
    const date = new Date(y, m - 1, d)
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  })()

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent side="right" className="max-w-md">
        <DrawerHeader>
          <DrawerTitle>{t('pages.todo.detailTitle')}</DrawerTitle>
          <DrawerDescription>{t('pages.todo.detailDescription')}</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <div className="flex items-start gap-3">
            <button
              type="button"
              className={cn(
                'mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors',
                draft.done
                  ? 'border-[var(--color-success)] bg-[var(--color-success)] text-white'
                  : 'border-[#c5cad3] text-transparent hover:border-[#3b5bfd]',
              )}
              onClick={() => {
                onToggle(draft.id)
                setDraft((prev) => (prev ? { ...prev, done: !prev.done } : prev))
              }}
              aria-pressed={draft.done}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </button>
            <Input
              value={draft.title}
              onChange={(e) =>
                setDraft((prev) => (prev ? { ...prev, title: e.target.value } : prev))
              }
              className="text-[16px] font-semibold"
              aria-label={t('pages.todo.fields.title')}
            />
          </div>

          <div className="flex items-center gap-2 rounded-[12px] bg-[var(--color-surface-sunken)] px-3 py-2.5 text-[13px] text-[var(--color-text-secondary)]">
            <CalendarDays className="size-4 shrink-0" />
            <span>{dateLabel}</span>
          </div>

          <div className="space-y-1.5">
            <Label>{t('pages.todo.fields.list')}</Label>
            <Select
              value={draft.list}
              onValueChange={(value) =>
                setDraft((prev) =>
                  prev ? { ...prev, list: value as TodoItem['list'] } : prev,
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(['personal', 'work', 'family'] as const).map((list) => (
                  <SelectItem key={list} value={list}>
                    {t(`pages.todo.lists.${list}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-[12px] border border-[var(--color-border-subtle)] px-3 py-2.5">
            <div className="flex items-center gap-2 text-[13px]">
              <Bell className="size-4 text-[var(--color-text-muted)]" />
              {t('pages.todo.fields.reminder')}
            </div>
            <Switch
              checked={Boolean(draft.reminder)}
              onCheckedChange={(checked) =>
                setDraft((prev) => (prev ? { ...prev, reminder: checked } : prev))
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-[12px] border border-[var(--color-border-subtle)] px-3 py-2.5">
            <div className="flex items-center gap-2 text-[13px]">
              <RefreshCw className="size-4 text-[var(--color-text-muted)]" />
              {t('pages.todo.fields.recurring')}
            </div>
            <Switch
              checked={Boolean(draft.recurring)}
              onCheckedChange={(checked) =>
                setDraft((prev) => (prev ? { ...prev, recurring: checked } : prev))
              }
            />
          </div>

          <Textarea
            label={t('pages.todo.fields.notes')}
            value={draft.notes ?? ''}
            onChange={(e) =>
              setDraft((prev) => (prev ? { ...prev, notes: e.target.value } : prev))
            }
            placeholder={t('pages.todo.fields.notesPlaceholder')}
            rows={5}
          />
        </div>

        <DrawerFooter>
          <Button
            variant="outline"
            className="text-[var(--color-danger)]"
            leftIcon={<Trash2 className="size-4" />}
            onClick={() => {
              onDelete(draft.id)
              onOpenChange(false)
            }}
          >
            {t('actions.delete')}
          </Button>
          <Button
            onClick={() => {
              const title = draft.title.trim()
              if (!title) return
              onSave({ ...draft, title, notes: draft.notes?.trim() ?? '' })
              onOpenChange(false)
            }}
          >
            {t('actions.save')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
