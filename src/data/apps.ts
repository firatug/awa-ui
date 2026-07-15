export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: 'meeting' | 'deadline' | 'reminder'
  attendees?: number
}

export const calendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Product sync', date: '2026-07-15', time: '10:00', type: 'meeting', attendees: 6 },
  { id: '2', title: 'Design review', date: '2026-07-15', time: '14:30', type: 'meeting', attendees: 4 },
  { id: '3', title: 'Sprint deadline', date: '2026-07-18', time: '17:00', type: 'deadline' },
  { id: '4', title: 'Client demo', date: '2026-07-16', time: '11:00', type: 'meeting', attendees: 3 },
  { id: '5', title: 'Renew SSL certificate', date: '2026-07-22', time: '09:00', type: 'reminder' },
]

export interface KanbanCard {
  id: string
  title: string
  assignee: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export const kanbanBoard: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      { id: 'k1', title: 'Update onboarding flow', assignee: 'Sarah', priority: 'medium', tags: ['UX'] },
      { id: 'k2', title: 'API rate limiting', assignee: 'Lucas', priority: 'high', tags: ['Backend'] },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      { id: 'k3', title: 'Dashboard widgets', assignee: 'Elena', priority: 'high', tags: ['Frontend'] },
      { id: 'k4', title: 'Email templates', assignee: 'Ava', priority: 'low', tags: ['Marketing'] },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      { id: 'k5', title: 'Role permissions UI', assignee: 'Marcus', priority: 'medium', tags: ['Admin'] },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'k6', title: 'Theme customizer', assignee: 'James', priority: 'medium', tags: ['Design'] },
      { id: 'k7', title: 'i18n setup', assignee: 'Priya', priority: 'high', tags: ['Infra'] },
    ],
  },
]

export type { ChatThread as AppsChatThread } from './chat'
export { legacyChatThreads as chatThreads } from './chat'

export interface ChatMessage {
  id: string
  sender: string
  content: string
  time: string
  isOwn?: boolean
}

export interface InboxItem {
  id: string
  from: string
  subject: string
  preview: string
  time: string
  read: boolean
  starred: boolean
  label?: string
}

export const inboxItems: InboxItem[] = [
  { id: '1', from: 'Billing', subject: 'Invoice #INV-2026-0842', preview: 'Your monthly invoice is ready for review.', time: '2 hrs ago', read: false, starred: true, label: 'Billing' },
  { id: '2', from: 'Sarah Chen', subject: 'Q3 planning doc', preview: 'I added comments on the roadmap section.', time: '4 hrs ago', read: false, starred: false },
  { id: '3', from: 'System', subject: 'Security alert', preview: 'New login from Chrome on Windows.', time: 'Yesterday', read: true, starred: false, label: 'Security' },
  { id: '4', from: 'Support', subject: 'Ticket #4821 resolved', preview: 'Your support request has been closed.', time: 'Yesterday', read: true, starred: false },
]

export interface FileItem {
  id: string
  name: string
  type: 'folder' | 'pdf' | 'image' | 'doc' | 'sheet'
  size?: string
  modified: string
}

export const fileItems: FileItem[] = [
  { id: '1', name: 'Projects', type: 'folder', modified: 'Jul 14, 2026' },
  { id: '2', name: 'Brand Assets', type: 'folder', modified: 'Jul 12, 2026' },
  { id: '3', name: 'Q3-Report.pdf', type: 'pdf', size: '2.4 MB', modified: 'Jul 10, 2026' },
  { id: '4', name: 'hero-banner.png', type: 'image', size: '840 KB', modified: 'Jul 8, 2026' },
  { id: '5', name: 'roadmap-2026.docx', type: 'doc', size: '128 KB', modified: 'Jul 5, 2026' },
  { id: '6', name: 'budget-tracker.xlsx', type: 'sheet', size: '56 KB', modified: 'Jul 1, 2026' },
]

export interface TaskItem {
  id: string
  title: string
  assignee: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
  project: string
}

export const tasks: TaskItem[] = [
  { id: '1', title: 'Finalize dashboard KPIs', assignee: 'Sarah', dueDate: 'Jul 16', priority: 'high', status: 'in-progress', project: 'Admin Panel' },
  { id: '2', title: 'Write API documentation', assignee: 'Lucas', dueDate: 'Jul 18', priority: 'medium', status: 'todo', project: 'Platform' },
  { id: '3', title: 'Review accessibility audit', assignee: 'Elena', dueDate: 'Jul 15', priority: 'high', status: 'in-progress', project: 'Design System' },
  { id: '4', title: 'Update pricing page copy', assignee: 'Ava', dueDate: 'Jul 20', priority: 'low', status: 'todo', project: 'Marketing' },
  { id: '5', title: 'Deploy staging environment', assignee: 'James', dueDate: 'Jul 14', priority: 'medium', status: 'done', project: 'Infra' },
]
