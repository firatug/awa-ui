export type TransactionType = 'payment' | 'refund' | 'subscription' | 'payout' | 'fee'
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'cancelled'

export interface Transaction {
  id: string
  reference: string
  customer: string
  company: string
  type: TransactionType
  status: TransactionStatus
  amount: number
  currency: string
  method: string
  date: string
  description: string
}

export const transactions: Transaction[] = [
  {
    id: 'txn_1001',
    reference: 'NL-48291',
    customer: 'Northline Labs',
    company: 'Northline Labs',
    type: 'subscription',
    status: 'completed',
    amount: 2499,
    currency: 'USD',
    method: 'Wire transfer',
    date: '2026-07-15T08:00:00Z',
    description: 'Enterprise plan — Q3 renewal',
  },
  {
    id: 'txn_1002',
    reference: 'CR-77304',
    customer: 'Cobalt Retail',
    company: 'Cobalt Retail',
    type: 'payment',
    status: 'completed',
    amount: 1840,
    currency: 'USD',
    method: 'Card',
    date: '2026-07-14T19:22:00Z',
    description: 'POS integration add-on',
  },
  {
    id: 'txn_1003',
    reference: 'HC-11982',
    customer: 'Harbor CMS',
    company: 'Harbor CMS',
    type: 'refund',
    status: 'completed',
    amount: -320,
    currency: 'USD',
    method: 'Card',
    date: '2026-07-14T14:05:00Z',
    description: 'Unused seat credit',
  },
  {
    id: 'txn_1004',
    reference: 'VA-55017',
    customer: 'Vertex Analytics',
    company: 'Vertex Analytics',
    type: 'subscription',
    status: 'pending',
    amount: 890,
    currency: 'USD',
    method: 'ACH',
    date: '2026-07-14T11:30:00Z',
    description: 'Growth plan — monthly',
  },
  {
    id: 'txn_1005',
    reference: 'SF-33840',
    customer: 'Summit Forge',
    company: 'Summit Forge',
    type: 'payment',
    status: 'completed',
    amount: 4200,
    currency: 'USD',
    method: 'Wire transfer',
    date: '2026-07-13T16:48:00Z',
    description: 'Custom workflow package',
  },
  {
    id: 'txn_1006',
    reference: 'EF-90211',
    customer: 'Emberfield Systems',
    company: 'Emberfield Systems',
    type: 'fee',
    status: 'completed',
    amount: 45,
    currency: 'USD',
    method: 'Card',
    date: '2026-07-13T09:15:00Z',
    description: 'International processing fee',
  },
  {
    id: 'txn_1007',
    reference: 'LP-66423',
    customer: 'Lumenpath Co.',
    company: 'Lumenpath Co.',
    type: 'payout',
    status: 'pending',
    amount: -12500,
    currency: 'USD',
    method: 'Wire transfer',
    date: '2026-07-12T22:00:00Z',
    description: 'Partner revenue share — June',
  },
  {
    id: 'txn_1008',
    reference: 'PW-22109',
    customer: 'Prairie Wave Networks',
    company: 'Prairie Wave Networks',
    type: 'payment',
    status: 'failed',
    amount: 1560,
    currency: 'USD',
    method: 'Card',
    date: '2026-07-12T18:40:00Z',
    description: 'Infrastructure monitoring tier',
  },
  {
    id: 'txn_1009',
    reference: 'AQ-44756',
    customer: 'Atlas Quill Media',
    company: 'Atlas Quill Media',
    type: 'subscription',
    status: 'completed',
    amount: 620,
    currency: 'USD',
    method: 'Card',
    date: '2026-07-11T12:10:00Z',
    description: 'Content API — starter',
  },
  {
    id: 'txn_1010',
    reference: 'IH-88034',
    customer: 'Ironhaven Tools',
    company: 'Ironhaven Tools',
    type: 'payment',
    status: 'completed',
    amount: 3100,
    currency: 'USD',
    method: 'ACH',
    date: '2026-07-10T15:55:00Z',
    description: 'CRM seats — 25 users',
  },
  {
    id: 'txn_1011',
    reference: 'CB-55290',
    customer: 'Clearbrook Health',
    company: 'Clearbrook Health',
    type: 'subscription',
    status: 'cancelled',
    amount: 0,
    currency: 'USD',
    method: 'ACH',
    date: '2026-07-09T10:00:00Z',
    description: 'Trial conversion cancelled',
  },
  {
    id: 'txn_1012',
    reference: 'NL-48292',
    customer: 'Northline Labs',
    company: 'Northline Labs',
    type: 'payment',
    status: 'completed',
    amount: 980,
    currency: 'USD',
    method: 'Card',
    date: '2026-07-08T07:22:00Z',
    description: 'Additional API quota',
  },
]

export function getTransactionsByStatus(status: TransactionStatus): Transaction[] {
  return transactions.filter((t) => t.status === status)
}

export function getTotalRevenue(completedOnly = true): number {
  return transactions
    .filter((t) => !completedOnly || t.status === 'completed')
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)
}
