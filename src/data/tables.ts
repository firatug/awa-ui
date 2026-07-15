export interface TableRow {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  department: string
  joined: string
  revenue: number
}

export const tableData: TableRow[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Admin', status: 'active', department: 'Engineering', joined: 'Jan 2024', revenue: 48200 },
  { id: '2', name: 'Marcus Webb', email: 'marcus.webb@example.com', role: 'Manager', status: 'active', department: 'Sales', joined: 'Mar 2024', revenue: 62400 },
  { id: '3', name: 'Elena Rossi', email: 'elena.rossi@example.com', role: 'Editor', status: 'active', department: 'Design', joined: 'Feb 2024', revenue: 31800 },
  { id: '4', name: 'James Park', email: 'james.park@example.com', role: 'Viewer', status: 'inactive', department: 'Marketing', joined: 'Jun 2023', revenue: 12400 },
  { id: '5', name: 'Ava Martinez', email: 'ava.martinez@example.com', role: 'Editor', status: 'active', department: 'Product', joined: 'Aug 2024', revenue: 28900 },
  { id: '6', name: 'Oliver Grant', email: 'oliver.grant@example.com', role: 'Viewer', status: 'pending', department: 'Support', joined: 'Jul 2026', revenue: 0 },
  { id: '7', name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Manager', status: 'active', department: 'Finance', joined: 'Nov 2023', revenue: 55600 },
  { id: '8', name: 'Lucas Berg', email: 'lucas.berg@example.com', role: 'Admin', status: 'active', department: 'Engineering', joined: 'Apr 2024', revenue: 41200 },
  { id: '9', name: 'Nina Kowalski', email: 'nina.kowalski@example.com', role: 'Editor', status: 'active', department: 'Design', joined: 'Sep 2024', revenue: 22100 },
  { id: '10', name: 'Tom Hughes', email: 'tom.hughes@example.com', role: 'Viewer', status: 'inactive', department: 'Sales', joined: 'Dec 2023', revenue: 8900 },
  { id: '11', name: 'Yuki Tanaka', email: 'yuki.tanaka@example.com', role: 'Manager', status: 'active', department: 'Product', joined: 'May 2024', revenue: 37800 },
  { id: '12', name: 'Rachel Kim', email: 'rachel.kim@example.com', role: 'Editor', status: 'active', department: 'Marketing', joined: 'Oct 2024', revenue: 19500 },
]
