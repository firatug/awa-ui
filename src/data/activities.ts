import type { ActivityItem } from '@/components/data-display/activity-feed'
import {
  FileText,
  MessageSquare,
  Settings,
  Shield,
  Upload,
  UserPlus,
} from 'lucide-react'

export const activities: ActivityItem[] = [
  {
    id: 'act_001',
    title: 'New workspace member invited',
    description: 'Jordan Blake joined Cobalt Retail workspace',
    timestamp: '2026-07-15T09:10:00Z',
    user: { name: 'Jordan Blake' },
    icon: UserPlus,
    badge: { label: 'Team', variant: 'primary' },
  },
  {
    id: 'act_002',
    title: 'Report exported',
    description: 'Q2 revenue summary for Northline Labs',
    timestamp: '2026-07-15T08:42:00Z',
    user: { name: 'Avery Chen' },
    icon: FileText,
    badge: { label: 'Export', variant: 'info' },
  },
  {
    id: 'act_003',
    title: 'Security policy updated',
    description: 'MFA requirement enabled for admin roles',
    timestamp: '2026-07-14T22:15:00Z',
    user: { name: 'Quinn Harper' },
    icon: Shield,
    badge: { label: 'Security', variant: 'warning' },
  },
  {
    id: 'act_004',
    title: 'New comment on deal pipeline',
    description: 'Summit Forge — Enterprise expansion noted',
    timestamp: '2026-07-14T18:30:00Z',
    user: { name: 'Casey Nguyen' },
    icon: MessageSquare,
    badge: { label: 'CRM', variant: 'info' },
  },
  {
    id: 'act_005',
    title: 'Bulk upload completed',
    description: '248 product records imported for Harbor CMS',
    timestamp: '2026-07-14T14:05:00Z',
    user: { name: 'Morgan Ellis' },
    icon: Upload,
    badge: { label: 'Import', variant: 'success' },
  },
  {
    id: 'act_006',
    title: 'Integration settings changed',
    description: 'Vertex Analytics webhook endpoint rotated',
    timestamp: '2026-07-14T11:20:00Z',
    user: { name: 'Riley Santos' },
    icon: Settings,
    badge: { label: 'Config', variant: 'default' },
  },
  {
    id: 'act_007',
    title: 'Invoice generated',
    description: 'Ironhaven Tools — July billing cycle',
    timestamp: '2026-07-13T16:00:00Z',
    user: { name: 'Rowan Pierce' },
    icon: FileText,
    badge: { label: 'Finance', variant: 'primary' },
  },
  {
    id: 'act_008',
    title: 'Role permissions updated',
    description: 'Editor role scoped to content modules only',
    timestamp: '2026-07-13T09:45:00Z',
    user: { name: 'Harper Vale' },
    icon: Shield,
    badge: { label: 'Access', variant: 'warning' },
  },
  {
    id: 'act_009',
    title: 'Support thread resolved',
    description: 'Atlas Quill Media — API rate limit inquiry',
    timestamp: '2026-07-12T20:10:00Z',
    user: { name: 'Sage Whitmore' },
    icon: MessageSquare,
    badge: { label: 'Support', variant: 'success' },
  },
  {
    id: 'act_010',
    title: 'Dashboard shared',
    description: 'Finance overview shared with Lumenpath Co.',
    timestamp: '2026-07-12T13:30:00Z',
    user: { name: 'Quinn Harper' },
    icon: FileText,
    badge: { label: 'Share', variant: 'info' },
  },
]

export function getRecentActivities(limit = 5): ActivityItem[] {
  return [...activities]
    .sort((a, b) => {
      const aTime = typeof a.timestamp === 'string' ? new Date(a.timestamp) : a.timestamp
      const bTime = typeof b.timestamp === 'string' ? new Date(b.timestamp) : b.timestamp
      return bTime.getTime() - aTime.getTime()
    })
    .slice(0, limit)
}
