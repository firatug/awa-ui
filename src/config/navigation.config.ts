export const navigationConfig = {
  defaultSidebarCollapsed: false,
  defaultSidebarMode: 'default' as const,
  sidebarWidth: 240,
  sidebarCollapsedWidth: 72,
  headerHeight: 70,
  /** Gap between header / viewport edges and floating sidebar */
  shellInset: 14,
  contentGap: 14,
  contentMaxWidth: 1400,
} as const

export type SidebarMode = 'default' | 'compact' | 'icon' | 'hover'
