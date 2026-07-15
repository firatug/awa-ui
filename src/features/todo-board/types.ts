export interface TodoItem {
  id: string
  title: string
  done: boolean
  /** YYYY-MM-DD */
  dayKey: string
  list: 'personal' | 'work' | 'family'
  reminder?: boolean
  recurring?: boolean
  notes?: string
  createdAt: number
}

export type TodosByDay = Record<string, TodoItem[]>

export interface TodoDayColumn {
  key: string
  date: Date
  index: number
}

export function toDayKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getNext7Days(from = new Date()): TodoDayColumn[] {
  const start = new Date(from)
  start.setHours(0, 0, 0, 0)
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return { key: toDayKey(date), date, index }
  })
}
