export interface NavItem {
  id: string
  labelKey: string // i18n key
  href?: string
  icon?: string // lucide icon name as string
  badge?: string | number
  badgeVariant?: 'primary' | 'danger' | 'success' | 'warning' | 'info'
  children?: NavItem[]
  favorite?: boolean
}

export interface NavGroup {
  id: string
  labelKey?: string
  items: NavItem[]
}
