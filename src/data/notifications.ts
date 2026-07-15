export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'message'

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  timestamp: string
  source?: string
  actionUrl?: string
}

export const notifications: Notification[] = [
  {
    id: 'ntf_001',
    title: 'Deployment successful',
    message: 'Northline Labs staging environment updated to v2.14.',
    type: 'success',
    read: false,
    timestamp: '2026-07-15T09:05:00Z',
    source: 'Northline Labs',
  },
  {
    id: 'ntf_002',
    title: 'Payment received',
    message: 'Cobalt Retail paid invoice CR-77304 ($1,840).',
    type: 'success',
    read: false,
    timestamp: '2026-07-15T08:30:00Z',
    source: 'Billing',
  },
  {
    id: 'ntf_003',
    title: 'API usage at 85%',
    message: 'Harbor CMS is approaching monthly API quota.',
    type: 'warning',
    read: false,
    timestamp: '2026-07-14T21:00:00Z',
    source: 'Harbor CMS',
  },
  {
    id: 'ntf_004',
    title: 'New support ticket',
    message: 'Vertex Analytics submitted a priority support request.',
    type: 'message',
    read: true,
    timestamp: '2026-07-14T17:45:00Z',
    source: 'Support',
  },
  {
    id: 'ntf_005',
    title: 'Scheduled maintenance',
    message: 'Database maintenance window on Jul 18, 02:00–04:00 UTC.',
    type: 'info',
    read: true,
    timestamp: '2026-07-14T12:00:00Z',
    source: 'Platform',
  },
  {
    id: 'ntf_006',
    title: 'Payment failed',
    message: 'Prairie Wave Networks transaction PW-22109 could not be processed.',
    type: 'error',
    read: false,
    timestamp: '2026-07-12T18:42:00Z',
    source: 'Billing',
  },
  {
    id: 'ntf_007',
    title: 'New integration available',
    message: 'Summit Forge can now connect to the Cobalt Retail catalog sync.',
    type: 'info',
    read: true,
    timestamp: '2026-07-11T10:15:00Z',
    source: 'Integrations',
  },
  {
    id: 'ntf_008',
    title: 'User invitation expired',
    message: 'Clearbrook Health invite for Finley Marsh has expired.',
    type: 'warning',
    read: true,
    timestamp: '2026-07-10T08:00:00Z',
    source: 'Access',
  },
]

export function getUnreadNotifications(): Notification[] {
  return notifications.filter((n) => !n.read)
}

export function getUnreadCount(): number {
  return getUnreadNotifications().length
}
