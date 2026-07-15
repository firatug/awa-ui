import type { NavGroup, NavItem } from '@/types/navigation'

/**
 * Sidebar IA mirrors Metronic DEMO1:
 * Dashboard → Custom → Layout → CRUD → Components
 */
export const menuGroups: NavGroup[] = [
  {
    id: 'dashboards',
    items: [
      {
        id: 'dashboards',
        labelKey: 'nav.groups.dashboards',
        icon: 'LayoutDashboard',
        children: [
          {
            id: 'dashboard-overview',
            labelKey: 'nav.dashboards.overview',
            href: '/dashboards/overview',
            icon: 'LayoutDashboard',
            favorite: true,
          },
          {
            id: 'dashboard-analytics',
            labelKey: 'nav.dashboards.analytics',
            href: '/dashboards/analytics',
            icon: 'BarChart3',
          },
          {
            id: 'dashboard-saas',
            labelKey: 'nav.dashboards.saas',
            href: '/dashboards/saas',
            icon: 'Gauge',
          },
          {
            id: 'dashboard-crm',
            labelKey: 'nav.dashboards.crm',
            href: '/dashboards/crm',
            icon: 'Briefcase',
          },
          {
            id: 'dashboard-projects',
            labelKey: 'nav.dashboards.projects',
            href: '/dashboards/projects',
            icon: 'FolderOpen',
          },
          {
            id: 'dashboard-finance',
            labelKey: 'nav.dashboards.finance',
            href: '/dashboards/finance',
            icon: 'DollarSign',
          },
        ],
      },
    ],
  },
  {
    id: 'custom',
    labelKey: 'nav.groups.custom',
    items: [
      {
        id: 'applications',
        labelKey: 'nav.groups.applications',
        icon: 'AppWindow',
        children: [
          {
            id: 'app-calendar',
            labelKey: 'nav.apps.calendar',
            href: '/apps/calendar',
            icon: 'Calendar',
            favorite: true,
          },
          {
            id: 'app-kanban',
            labelKey: 'nav.apps.kanban',
            href: '/apps/kanban',
            icon: 'Grid2x2',
          },
          {
            id: 'app-inbox',
            labelKey: 'nav.apps.inbox',
            href: '/apps/inbox',
            icon: 'Inbox',
            badge: 12,
            badgeVariant: 'danger',
          },
          {
            id: 'app-file-manager',
            labelKey: 'nav.apps.fileManager',
            href: '/apps/file-manager',
            icon: 'FolderOpen',
          },
          {
            id: 'app-tasks',
            labelKey: 'nav.apps.tasks',
            href: '/apps/tasks',
            icon: 'CheckSquare',
          },
        ],
      },
      {
        id: 'pages',
        labelKey: 'nav.groups.pages',
        icon: 'FileText',
        children: [
          {
            id: 'pages-auth',
            labelKey: 'nav.pages.auth',
            icon: 'LogIn',
            children: [
              {
                id: 'auth-login',
                labelKey: 'nav.pages.authLogin',
                href: '/pages/auth/login',
              },
              {
                id: 'auth-register',
                labelKey: 'nav.pages.authRegister',
                href: '/pages/auth/register',
              },
              {
                id: 'auth-forgot',
                labelKey: 'nav.pages.authForgot',
                href: '/pages/auth/forgot-password',
              },
              {
                id: 'auth-reset',
                labelKey: 'nav.pages.authReset',
                href: '/pages/auth/reset-password',
              },
              {
                id: 'auth-verify',
                labelKey: 'nav.pages.authVerify',
                href: '/pages/auth/verify-email',
              },
            ],
          },
          {
            id: 'pages-users',
            labelKey: 'nav.pages.users',
            href: '/pages/users',
            icon: 'Users',
          },
          {
            id: 'pages-roles',
            labelKey: 'nav.pages.roles',
            href: '/pages/roles',
            icon: 'Shield',
          },
          {
            id: 'pages-settings',
            labelKey: 'nav.pages.settings',
            icon: 'Settings',
            children: [
              {
                id: 'settings-general',
                labelKey: 'nav.pages.settingsGeneral',
                href: '/pages/settings/general',
              },
              {
                id: 'settings-account',
                labelKey: 'nav.pages.settingsAccount',
                href: '/pages/settings/account',
              },
              {
                id: 'settings-security',
                labelKey: 'nav.pages.settingsSecurity',
                href: '/pages/settings/security',
              },
              {
                id: 'settings-notifications',
                labelKey: 'nav.pages.settingsNotifications',
                href: '/pages/settings/notifications',
              },
              {
                id: 'settings-appearance',
                labelKey: 'nav.pages.settingsAppearance',
                href: '/pages/settings/appearance',
              },
            ],
          },
          {
            id: 'pages-profile',
            labelKey: 'nav.pages.profile',
            href: '/pages/profile',
            icon: 'User',
          },
          {
            id: 'pages-billing',
            labelKey: 'nav.pages.billing',
            href: '/pages/billing',
            icon: 'CreditCard',
          },
          {
            id: 'pages-pricing',
            labelKey: 'nav.pages.pricing',
            href: '/pages/pricing',
            icon: 'Coins',
          },
          {
            id: 'pages-invoice',
            labelKey: 'nav.pages.invoice',
            href: '/pages/invoice',
            icon: 'Receipt',
          },
          {
            id: 'pages-errors',
            labelKey: 'nav.groups.errors',
            icon: 'AlertCircle',
            children: [
              {
                id: 'error-404',
                labelKey: 'nav.errors.404',
                href: '/errors/404',
              },
              {
                id: 'error-401',
                labelKey: 'nav.errors.401',
                href: '/errors/401',
              },
              {
                id: 'error-403',
                labelKey: 'nav.errors.403',
                href: '/errors/403',
              },
              {
                id: 'error-500',
                labelKey: 'nav.errors.500',
                href: '/errors/500',
              },
            ],
          },
        ],
      },
      {
        id: 'design-system',
        labelKey: 'nav.groups.designSystem',
        icon: 'Palette',
        children: [
          {
            id: 'design-system-root',
            labelKey: 'nav.designSystem.root',
            href: '/design-system',
            icon: 'Palette',
          },
          {
            id: 'design-typography',
            labelKey: 'nav.designSystem.typography',
            href: '/design-system/typography',
            icon: 'Type',
          },
          {
            id: 'design-colors',
            labelKey: 'nav.designSystem.colors',
            href: '/design-system/colors',
            icon: 'Sparkles',
          },
          {
            id: 'design-playground',
            labelKey: 'nav.designSystem.playground',
            href: '/design-system/playground',
            icon: 'Code2',
          },
        ],
      },
      {
        id: 'documentation',
        labelKey: 'nav.groups.documentation',
        icon: 'BookOpen',
        children: [
          {
            id: 'docs-getting-started',
            labelKey: 'nav.docs.gettingStarted',
            href: '/docs/getting-started',
            icon: 'BookOpen',
          },
          {
            id: 'docs-theming',
            labelKey: 'nav.docs.theming',
            href: '/docs/theming',
            icon: 'Palette',
          },
          {
            id: 'docs-tokens',
            labelKey: 'nav.docs.tokens',
            href: '/docs/tokens',
            icon: 'Layers',
          },
          {
            id: 'docs-i18n',
            labelKey: 'nav.docs.i18n',
            href: '/docs/i18n',
            icon: 'Globe',
          },
          {
            id: 'docs-changelog',
            labelKey: 'nav.docs.changelog',
            href: '/docs/changelog',
            icon: 'FileText',
          },
        ],
      },
    ],
  },
  {
    id: 'crud',
    labelKey: 'nav.groups.crud',
    items: [
      {
        id: 'tables-basic',
        labelKey: 'nav.tables.basic',
        href: '/tables/basic',
        icon: 'Table2',
      },
      {
        id: 'tables-advanced',
        labelKey: 'nav.tables.advanced',
        href: '/tables/advanced',
        icon: 'ListTree',
      },
    ],
  },
  {
    id: 'components',
    labelKey: 'nav.groups.components',
    items: [
      {
        id: 'components-buttons',
        labelKey: 'nav.components.buttons',
        href: '/components/buttons',
        icon: 'MousePointerClick',
      },
      {
        id: 'components-forms',
        labelKey: 'nav.components.forms',
        href: '/components/forms',
        icon: 'FormInput',
      },
      {
        id: 'components-inputs',
        labelKey: 'nav.components.inputs',
        href: '/components/inputs',
        icon: 'ClipboardList',
      },
      {
        id: 'components-selection',
        labelKey: 'nav.components.selection',
        href: '/components/selection',
        icon: 'ToggleLeft',
      },
      {
        id: 'components-feedback',
        labelKey: 'nav.components.feedback',
        href: '/components/feedback',
        icon: 'Bell',
      },
      {
        id: 'components-navigation',
        labelKey: 'nav.components.navigation',
        href: '/components/navigation',
        icon: 'Navigation',
      },
      {
        id: 'components-data-display',
        labelKey: 'nav.components.dataDisplay',
        href: '/components/data-display',
        icon: 'Table2',
      },
      {
        id: 'components-charts',
        labelKey: 'nav.components.charts',
        href: '/components/charts',
        icon: 'PieChart',
      },
    ],
  },
]

export function flattenNavItems(
  items: NavItem[],
  ancestors: NavItem[] = [],
): Array<{ item: NavItem; ancestors: NavItem[] }> {
  return items.flatMap((item) => {
    const chain = [...ancestors, item]
    const children = item.children
      ? flattenNavItems(item.children, chain)
      : []
    if (item.href) {
      return [{ item, ancestors }, ...children]
    }
    return children
  })
}

export function getAllNavItems(): Array<{ item: NavItem; ancestors: NavItem[] }> {
  return menuGroups.flatMap((group) => flattenNavItems(group.items, []))
}

export function findNavItemByHref(href: string): NavItem | undefined {
  const all = getAllNavItems()
  return all.find(({ item }) => item.href === href)?.item
}

export function getFavoriteItems(): NavItem[] {
  return getAllNavItems()
    .map(({ item }) => item)
    .filter((item) => item.favorite && item.href)
}

export function filterNavItems(
  items: NavItem[],
  query: string,
  getLabel: (item: NavItem) => string = (item) => item.labelKey,
): NavItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return items

  return items.reduce<NavItem[]>((acc, item) => {
    const label = getLabel(item).toLowerCase()
    const matchesSelf =
      label.includes(normalized) ||
      item.id.toLowerCase().includes(normalized) ||
      item.href?.toLowerCase().includes(normalized)

    const filteredChildren = item.children
      ? filterNavItems(item.children, query, getLabel)
      : undefined

    if (matchesSelf || (filteredChildren && filteredChildren.length > 0)) {
      acc.push({
        ...item,
        children: filteredChildren,
      })
    }
    return acc
  }, [])
}
