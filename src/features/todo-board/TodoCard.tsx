import { useEffect, useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Bell, Check, RefreshCw, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { TodoItem } from './types'

interface TodoCardProps {
  item: TodoItem
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onOpen: (item: TodoItem) => void
  overlay?: boolean
}

export function TodoCard({
  item,
  onToggle,
  onDelete,
  onOpen,
  overlay,
}: TodoCardProps) {
  const { t } = useTranslation()
  const draggedRef = useRef(false)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { type: 'todo', dayKey: item.dayKey },
    disabled: overlay,
  })

  useEffect(() => {
    if (isDragging) draggedRef.current = true
  }, [isDragging])

  const style = overlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      }

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      role={overlay ? undefined : 'button'}
      tabIndex={overlay ? undefined : 0}
      className={cn(
        'awa-todo-card',
        item.done && 'is-done',
        isDragging && !overlay && 'is-dragging',
        overlay && 'is-overlay',
      )}
      {...(overlay ? {} : { ...attributes, ...listeners })}
      onClick={() => {
        if (overlay) return
        if (draggedRef.current) {
          draggedRef.current = false
          return
        }
        onOpen(item)
      }}
      onKeyDown={(e) => {
        if (overlay) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(item)
        }
      }}
    >
      <button
        type="button"
        className={cn('awa-todo-check', item.done && 'is-checked')}
        onClick={(e) => {
          e.stopPropagation()
          onToggle(item.id)
        }}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={item.done ? 'Mark incomplete' : 'Mark complete'}
        aria-pressed={item.done}
      >
        <Check className="size-3" strokeWidth={3} />
      </button>

      <div className="awa-todo-card-main">
        <p className="awa-todo-card-title">{item.title}</p>
        <div className="awa-todo-card-meta">
          <span>{t(`pages.todo.lists.${item.list}`)}</span>
          {item.reminder ? <Bell aria-hidden /> : null}
          {item.recurring ? <RefreshCw aria-hidden /> : null}
        </div>
      </div>

      <button
        type="button"
        className="awa-todo-card-delete"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(item.id)
        }}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label="Delete"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  )
}
