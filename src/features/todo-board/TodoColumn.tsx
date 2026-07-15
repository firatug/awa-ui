import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { useMemo, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { TodoCard } from './TodoCard'
import type { TodoDayColumn, TodoItem } from './types'

interface TodoColumnProps {
  column: TodoDayColumn
  items: TodoItem[]
  onAdd: (dayKey: string, title: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onOpen: (item: TodoItem) => void
}

export function TodoColumn({
  column,
  items,
  onAdd,
  onToggle,
  onDelete,
  onOpen,
}: TodoColumnProps) {
  const { t, i18n } = useTranslation()
  const [draft, setDraft] = useState('')
  const [adding, setAdding] = useState(false)
  const { setNodeRef, isOver } = useDroppable({ id: column.key })

  const title = useMemo(() => {
    const locale = i18n.language?.startsWith('tr') ? 'tr-TR' : 'en-US'
    const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(
      column.date,
    )
    const dayName = weekday.charAt(0).toUpperCase() + weekday.slice(1)

    if (column.index === 0) return t('pages.todo.todayLabel', { day: dayName })
    if (column.index === 1) return t('pages.todo.tomorrowLabel', { day: dayName })
    return dayName
  }, [column.date, column.index, i18n.language, t])

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    const value = draft.trim()
    if (!value) return
    onAdd(column.key, value)
    setDraft('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setDraft('')
      setAdding(false)
    }
  }

  return (
    <section className={cn('awa-todo-column', isOver && 'is-over')}>
      <h3
        className={cn(
          'awa-todo-column-title',
          column.index === 0 && 'is-today',
        )}
      >
        {title}
      </h3>

      <div ref={setNodeRef} className="awa-todo-column-body">
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <TodoCard
              key={item.id}
              item={item}
              onToggle={onToggle}
              onDelete={onDelete}
              onOpen={onOpen}
            />
          ))}
        </SortableContext>

        {adding ? (
          <form className="awa-todo-add-form" onSubmit={submit}>
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              onBlur={() => {
                if (!draft.trim()) setAdding(false)
              }}
              placeholder={t('pages.todo.addPlaceholder')}
              aria-label={t('pages.todo.addPlaceholder')}
            />
            <div className="awa-todo-add-actions">
              <button
                type="button"
                className="cancel"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setDraft('')
                  setAdding(false)
                }}
              >
                {t('actions.cancel')}
              </button>
              <button type="submit" className="submit">
                {t('pages.todo.add')}
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            className="awa-todo-add"
            onClick={() => setAdding(true)}
          >
            <Plus className="size-3.5" />
            {t('pages.todo.addTask')}
          </button>
        )}
      </div>
    </section>
  )
}
