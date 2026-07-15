export type CustomerStatus = 'active' | 'inactive' | 'lead' | 'churned'
export type CustomerPlan = 'free' | 'starter' | 'growth' | 'enterprise'

export interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: CustomerStatus
  plan: CustomerPlan
  country: string
  city: string
  industry: string
  mrr: number
  owner: string
  notes: string
  createdAt: string
  lastContact: string
}

export const customers: Customer[] = [
  {
    id: 'cus_001',
    name: 'Elena Vargas',
    company: 'Northline Labs',
    email: 'elena@northlinelabs.io',
    phone: '+1 415 555 0142',
    status: 'active',
    plan: 'enterprise',
    country: 'United States',
    city: 'San Francisco',
    industry: 'SaaS',
    mrr: 4200,
    owner: 'Avery Chen',
    notes: 'Expansion discussion scheduled for Q3.',
    createdAt: '2024-02-12',
    lastContact: '2026-07-14',
  },
  {
    id: 'cus_002',
    name: 'Marcus Holm',
    company: 'Harbor CMS',
    email: 'marcus@harborcms.co',
    phone: '+46 8 555 0190',
    status: 'active',
    plan: 'growth',
    country: 'Sweden',
    city: 'Stockholm',
    industry: 'Media',
    mrr: 1800,
    owner: 'Jordan Blake',
    notes: 'Requested white-label branding kit.',
    createdAt: '2024-06-03',
    lastContact: '2026-07-10',
  },
  {
    id: 'cus_003',
    name: 'Priya Nair',
    company: 'Cobalt Retail',
    email: 'priya@cobaltretail.com',
    phone: '+91 22 5550 2211',
    status: 'lead',
    plan: 'starter',
    country: 'India',
    city: 'Mumbai',
    industry: 'E-commerce',
    mrr: 0,
    owner: 'Casey Nguyen',
    notes: 'Trial ends next week — follow up Tuesday.',
    createdAt: '2026-06-20',
    lastContact: '2026-07-12',
  },
  {
    id: 'cus_004',
    name: 'Tomás Rivera',
    company: 'Vertex Analytics',
    email: 'tomas@vertexanalytics.app',
    phone: '+34 91 555 0888',
    status: 'active',
    plan: 'growth',
    country: 'Spain',
    city: 'Madrid',
    industry: 'Analytics',
    mrr: 2400,
    owner: 'Morgan Ellis',
    notes: 'Interested in custom ETL connectors.',
    createdAt: '2025-01-08',
    lastContact: '2026-07-08',
  },
  {
    id: 'cus_005',
    name: 'Hannah Lee',
    company: 'Summit Forge',
    email: 'hannah@summitforge.dev',
    phone: '+1 646 555 0177',
    status: 'inactive',
    plan: 'starter',
    country: 'United States',
    city: 'New York',
    industry: 'Product Design',
    mrr: 490,
    owner: 'Avery Chen',
    notes: 'Paused billing due to budget freeze.',
    createdAt: '2025-09-14',
    lastContact: '2026-05-22',
  },
  {
    id: 'cus_006',
    name: 'Omar Farouk',
    company: 'Emberfield Systems',
    email: 'omar@emberfield.io',
    phone: '+971 4 555 3344',
    status: 'churned',
    plan: 'free',
    country: 'UAE',
    city: 'Dubai',
    industry: 'Logistics',
    mrr: 0,
    owner: 'Jordan Blake',
    notes: 'Churned after competitor switch — win-back later.',
    createdAt: '2023-11-02',
    lastContact: '2026-03-18',
  },
  {
    id: 'cus_007',
    name: 'Sofia Berg',
    company: 'Pixelcraft Studio',
    email: 'sofia@pixelcraft.studio',
    phone: '+47 21 555 4422',
    status: 'active',
    plan: 'enterprise',
    country: 'Norway',
    city: 'Oslo',
    industry: 'Creative',
    mrr: 5100,
    owner: 'Casey Nguyen',
    notes: 'VIP account — quarterly business review.',
    createdAt: '2024-08-19',
    lastContact: '2026-07-15',
  },
  {
    id: 'cus_008',
    name: 'Kenji Sato',
    company: 'Orbit Mobility',
    email: 'kenji@orbitmobility.jp',
    phone: '+81 3 5550 7788',
    status: 'lead',
    plan: 'free',
    country: 'Japan',
    city: 'Tokyo',
    industry: 'Mobility',
    mrr: 0,
    owner: 'Morgan Ellis',
    notes: 'Demo completed; waiting on legal review.',
    createdAt: '2026-07-01',
    lastContact: '2026-07-13',
  },
]

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((customer) => customer.id === id)
}

export function formatMrr(value: number): string {
  if (value <= 0) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
