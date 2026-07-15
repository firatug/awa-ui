import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import {
  CalendarDays,
  Filter,
  ListFilter,
  RotateCcw,
  Trash2,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { TodoCard } from './TodoCard'
import { TodoColumn } from './TodoColumn'
import { TodoDetailDrawer } from './TodoDetailDrawer'
import { createInitialTodos, findContainer } from './seed'
import type { TodoItem, TodosByDay } from './types'
import { getNext7Days } from './types'
import './todo-board.css'

function createId() {
  return `todo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

function ensureDays(todos: TodosByDay, dayKeys: string[]): TodosByDay {
  const next = { ...todos }
  for (const key of dayKeys) {
    if (!next[key]) next[key] = []
  }
  return next
}

export function TodoBoard() {
  const { t } = useTranslation()
  const columns = useMemo(() => getNext7Days(), [])
  const dayKeys = useMemo(() => columns.map((c) => c.key), [columns])
  const initialTodos = useMemo(() => createInitialTodos(), [])

  const [todos, setTodos] = useLocalStorage<TodosByDay>(
    'awa-ui.todo-board-v2',
    initialTodos,
  )
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [listFilter, setListFilter] = useState<'all' | 'mine' | 'family'>('all')
  const [detailId, setDetailId] = useState<string | null>(null)

  const board = useMemo(
    () => ensureDays(todos, dayKeys),
    [todos, dayKeys],
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  )

  const filteredBoard = useMemo(() => {
    if (listFilter === 'all') return board
    const next: TodosByDay = {}
    for (const key of dayKeys) {
      next[key] = (board[key] ?? []).filter((item) => {
        if (listFilter === 'mine') return item.list === 'personal'
        return item.list === 'family'
      })
    }
    return next
  }, [board, dayKeys, listFilter])

  const activeItem = useMemo(() => {
    if (!activeId) return null
    for (const key of Object.keys(board)) {
      const found = board[key]?.find((item) => item.id === activeId)
      if (found) return found
    }
    return null
  }, [activeId, board])

  const detailItem = useMemo(() => {
    if (!detailId) return null
    for (const key of Object.keys(board)) {
      const found = board[key]?.find((item) => item.id === detailId)
      if (found) return found
    }
    return null
  }, [board, detailId])

  const onAdd = (dayKey: string, title: string) => {
    const item: TodoItem = {
      id: createId(),
      title,
      dayKey,
      list: 'personal',
      done: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => ({
      ...ensureDays(prev, dayKeys),
      [dayKey]: [...(prev[dayKey] ?? []), item],
    }))
  }

  const onToggle = (id: string) => {
    setTodos((prev) => {
      const next = ensureDays(prev, dayKeys)
      for (const key of Object.keys(next)) {
        next[key] = next[key].map((item) =>
          item.id === id ? { ...item, done: !item.done } : item,
        )
      }
      return next
    })
  }

  const onDelete = (id: string) => {
    setTodos((prev) => {
      const next = ensureDays(prev, dayKeys)
      for (const key of Object.keys(next)) {
        next[key] = next[key].filter((item) => item.id !== id)
      }
      return next
    })
    if (detailId === id) setDetailId(null)
  }

  const onSave = (item: TodoItem) => {
    setTodos((prev) => {
      const next = ensureDays(prev, dayKeys)
      for (const key of Object.keys(next)) {
        next[key] = next[key].map((row) => (row.id === item.id ? item : row))
      }
      return next
    })
  }

  const clearCompleted = () => {
    setTodos((prev) => {
      const next = ensureDays(prev, dayKeys)
      for (const key of Object.keys(next)) {
        next[key] = next[key].filter((item) => !item.done)
      }
      return next
    })
  }

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    setTodos((prev) => {
      const current = ensureDays(prev, dayKeys)
      const activeContainer = findContainer(current, String(active.id))
      const overContainer = findContainer(current, String(over.id))
      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      ) {
        return prev
      }

      const activeItems = current[activeContainer]
      const overItems = current[overContainer]
      const activeIndex = activeItems.findIndex((item) => item.id === active.id)
      if (activeIndex < 0) return prev

      const isOverColumn = dayKeys.includes(String(over.id))
      const overIndex = isOverColumn
        ? overItems.length + 1
        : overItems.findIndex((item) => item.id === over.id)

      const moving = {
        ...activeItems[activeIndex],
        dayKey: overContainer,
      }

      let newIndex: number
      if (isOverColumn) {
        newIndex = overItems.length + 1
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      return {
        ...current,
        [activeContainer]: activeItems.filter((item) => item.id !== active.id),
        [overContainer]: [
          ...overItems.slice(0, newIndex),
          moving,
          ...overItems.slice(newIndex),
        ],
      }
    })
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    setTodos((prev) => {
      const current = ensureDays(prev, dayKeys)
      const activeContainer = findContainer(current, String(active.id))
      const overContainer = findContainer(current, String(over.id))
      if (!activeContainer || !overContainer) return prev
      if (activeContainer !== overContainer) return prev

      const items = current[activeContainer]
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = dayKeys.includes(String(over.id))
        ? items.length - 1
        : items.findIndex((item) => item.id === over.id)

      if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return prev

      return {
        ...current,
        [activeContainer]: arrayMove(items, oldIndex, newIndex),
      }
    })
  }

  return (
    <div className="awa-todo-board">
      <div className="awa-todo-toolbar">
        <div className="awa-todo-toolbar-title">
          <CalendarDays className="size-[18px]" />
          <span>{t('pages.todo.next7Days')}</span>
        </div>

        <button
          type="button"
          className={`awa-todo-chip ${listFilter === 'mine' ? 'is-active' : ''}`}
          onClick={() => setListFilter((v) => (v === 'mine' ? 'all' : 'mine'))}
        >
          <ListFilter className="size-3.5" />
          {t('pages.todo.myLists')}
        </button>
        <button
          type="button"
          className={`awa-todo-chip ${listFilter === 'family' ? 'is-active' : ''}`}
          onClick={() =>
            setListFilter((v) => (v === 'family' ? 'all' : 'family'))
          }
        >
          <Users className="size-3.5" />
          {t('pages.todo.family')}
        </button>
        <button type="button" className="awa-todo-chip">
          <Filter className="size-3.5" />
          {t('pages.todo.filter')}
        </button>

        <button
          type="button"
          className="awa-todo-chip awa-todo-chip-ghost"
          onClick={clearCompleted}
        >
          <Trash2 className="size-3.5" />
          {t('pages.todo.clearCompleted')}
        </button>

        <div className="awa-todo-toolbar-spacer" />

        <button
          type="button"
          className="awa-todo-chip"
          onClick={() => setTodos(createInitialTodos())}
          aria-label={t('pages.todo.reset')}
          title={t('pages.todo.reset')}
        >
          <RotateCcw className="size-3.5" />
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="awa-todo-columns">
          {columns.map((column) => (
            <TodoColumn
              key={column.key}
              column={column}
              items={filteredBoard[column.key] ?? []}
              onAdd={onAdd}
              onToggle={onToggle}
              onDelete={onDelete}
              onOpen={(item) => setDetailId(item.id)}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeItem ? (
            <TodoCard
              item={activeItem}
              onToggle={() => undefined}
              onDelete={() => undefined}
              onOpen={() => undefined}
              overlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <TodoDetailDrawer
        item={detailItem}
        open={Boolean(detailItem)}
        onOpenChange={(open) => {
          if (!open) setDetailId(null)
        }}
        onSave={onSave}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </div>
  )
}
