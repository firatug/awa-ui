import type { TodoItem, TodosByDay } from './types'
import { getNext7Days, toDayKey } from './types'

function todo(
  id: string,
  title: string,
  dayOffset: number,
  list: TodoItem['list'],
  extras: Partial<TodoItem> = {},
): TodoItem {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + dayOffset)
  return {
    id,
    title,
    list,
    dayKey: toDayKey(date),
    done: false,
    createdAt: Date.now() - Math.random() * 1e7,
    ...extras,
  }
}

/** Seed tasks relative to “today”, like Any.do Next 7 Days. */
export function createInitialTodos(): TodosByDay {
  const days = getNext7Days()
  const board: TodosByDay = Object.fromEntries(days.map((d) => [d.key, []]))

  const items: TodoItem[] = [
    todo('t1', 'JOKER Planları', 0, 'personal', { reminder: true }),
    todo('t2', 'Dükkan kapısı', 0, 'personal'),
    todo('t3', 'Eskişehirden topla', 0, 'personal'),
    todo('t4', 'Mutfak tezgahı', 0, 'personal'),
    todo('t5', 'Ürün yolu görüşmesi', 0, 'work', { reminder: true }),
    todo('t6', 'Gömlekler', 0, 'personal'),
    todo('t7', 'Araba yıkatma', 1, 'personal'),
    todo('t8', 'Tasarım token gözden geçirme', 1, 'work'),
    todo('t9', 'Fatura hatırlatması', 2, 'work', { reminder: true }),
    todo('t10', 'Haftalık rapor', 2, 'work', { recurring: true }),
    todo('t11', 'Market listesi', 3, 'personal'),
    todo('t12', 'Müşteri takibi', 4, 'work'),
  ]

  for (const item of items) {
    if (!board[item.dayKey]) board[item.dayKey] = []
    board[item.dayKey].push(item)
  }
  return board
}

export function findContainer(
  todos: TodosByDay,
  id: string,
): string | undefined {
  if (id in todos) return id
  return Object.keys(todos).find((day) =>
    todos[day]?.some((item) => item.id === id),
  )
}
