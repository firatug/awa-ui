export type UserRole = 'admin' | 'manager' | 'editor' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  company: string
  department: string
  lastActive: string
  createdAt: string
  avatar?: string
}

export const users: User[] = [
  {
    id: 'usr_001',
    name: 'Avery Chen',
    email: 'avery.chen@northlinelabs.io',
    role: 'admin',
    status: 'active',
    company: 'Northline Labs',
    department: 'Platform Engineering',
    lastActive: '2026-07-14T16:42:00Z',
    createdAt: '2024-03-12T09:00:00Z',
  },
  {
    id: 'usr_002',
    name: 'Jordan Blake',
    email: 'jordan.blake@cobaltretail.com',
    role: 'manager',
    status: 'active',
    company: 'Cobalt Retail',
    department: 'Operations',
    lastActive: '2026-07-15T08:15:00Z',
    createdAt: '2024-06-01T11:30:00Z',
  },
  {
    id: 'usr_003',
    name: 'Morgan Ellis',
    email: 'morgan.ellis@harborcms.co',
    role: 'editor',
    status: 'active',
    company: 'Harbor CMS',
    department: 'Content Strategy',
    lastActive: '2026-07-13T22:10:00Z',
    createdAt: '2025-01-18T14:20:00Z',
  },
  {
    id: 'usr_004',
    name: 'Riley Santos',
    email: 'riley.santos@vertexanalytics.app',
    role: 'viewer',
    status: 'pending',
    company: 'Vertex Analytics',
    department: 'Business Intelligence',
    lastActive: '2026-07-10T10:05:00Z',
    createdAt: '2026-06-28T08:45:00Z',
  },
  {
    id: 'usr_005',
    name: 'Casey Nguyen',
    email: 'casey.nguyen@summitforge.dev',
    role: 'manager',
    status: 'active',
    company: 'Summit Forge',
    department: 'Product Design',
    lastActive: '2026-07-15T07:30:00Z',
    createdAt: '2023-11-05T16:00:00Z',
  },
  {
    id: 'usr_006',
    name: 'Taylor Brooks',
    email: 'taylor.brooks@emberfield.io',
    role: 'editor',
    status: 'inactive',
    company: 'Emberfield Systems',
    department: 'Customer Success',
    lastActive: '2026-05-22T13:18:00Z',
    createdAt: '2024-09-14T10:10:00Z',
  },
  {
    id: 'usr_007',
    name: 'Quinn Harper',
    email: 'quinn.harper@lumenpath.co',
    role: 'admin',
    status: 'active',
    company: 'Lumenpath Co.',
    department: 'Security & Compliance',
    lastActive: '2026-07-14T19:55:00Z',
    createdAt: '2023-04-22T12:00:00Z',
  },
  {
    id: 'usr_008',
    name: 'Dakota Reed',
    email: 'dakota.reed@prairiewave.net',
    role: 'viewer',
    status: 'suspended',
    company: 'Prairie Wave Networks',
    department: 'Finance',
    lastActive: '2026-04-01T09:22:00Z',
    createdAt: '2025-02-10T15:40:00Z',
  },
  {
    id: 'usr_009',
    name: 'Sage Whitmore',
    email: 'sage.whitmore@atlasquill.media',
    role: 'editor',
    status: 'active',
    company: 'Atlas Quill Media',
    department: 'Editorial',
    lastActive: '2026-07-15T06:48:00Z',
    createdAt: '2025-08-03T07:15:00Z',
  },
  {
    id: 'usr_010',
    name: 'Rowan Pierce',
    email: 'rowan.pierce@ironhaven.tools',
    role: 'manager',
    status: 'active',
    company: 'Ironhaven Tools',
    department: 'Sales',
    lastActive: '2026-07-14T11:33:00Z',
    createdAt: '2024-12-19T09:50:00Z',
  },
  {
    id: 'usr_011',
    name: 'Finley Marsh',
    email: 'finley.marsh@clearbrook.health',
    role: 'viewer',
    status: 'pending',
    company: 'Clearbrook Health',
    department: 'Clinical Ops',
    lastActive: '2026-07-12T17:20:00Z',
    createdAt: '2026-07-01T13:00:00Z',
  },
  {
    id: 'usr_012',
    name: 'Harper Vale',
    email: 'harper.vale@northlinelabs.io',
    role: 'editor',
    status: 'active',
    company: 'Northline Labs',
    department: 'Research',
    lastActive: '2026-07-15T09:02:00Z',
    createdAt: '2025-03-27T11:11:00Z',
  },
]

export type UserRecord = User

export interface RoleDefinition {
  id: string
  name: string
  description: string
  users: number
  permissions: Record<string, boolean>
}

export const permissionModules = [
  'dashboard',
  'users',
  'billing',
  'settings',
  'reports',
  'integrations',
] as const

export type PermissionModule = (typeof permissionModules)[number]

export const roles: RoleDefinition[] = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full access to all modules and settings',
    users: 2,
    permissions: Object.fromEntries(permissionModules.map((m) => [m, true])),
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Manage teams, reports, and billing',
    users: 3,
    permissions: {
      dashboard: true,
      users: true,
      billing: true,
      settings: false,
      reports: true,
      integrations: true,
    },
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Create and edit content across modules',
    users: 4,
    permissions: {
      dashboard: true,
      users: false,
      billing: false,
      settings: false,
      reports: true,
      integrations: false,
    },
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to dashboards and reports',
    users: 3,
    permissions: {
      dashboard: true,
      users: false,
      billing: false,
      settings: false,
      reports: true,
      integrations: false,
    },
  },
]

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export function getUsersByCompany(company: string): User[] {
  return users.filter((u) => u.company === company)
}
