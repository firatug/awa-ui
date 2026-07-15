import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { findNavItemByHref, menuGroups } from '@/config/menu.config'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}

function buildBreadcrumbsFromPath(pathname: string, t: (key: string) => string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs: BreadcrumbItem[] = []
  let currentPath = ''

  for (const segment of segments) {
    currentPath += `/${segment}`
    const navItem = findNavItemByHref(currentPath)
    crumbs.push({
      label: navItem ? t(navItem.labelKey) : segment.replace(/-/g, ' '),
      href: currentPath,
    })
  }

  return crumbs
}

export function Breadcrumbs({ items, className, showHome = true }: BreadcrumbsProps) {
  const { t } = useTranslation()
  const location = useLocation()

  const crumbs =
    items ??
    (location.pathname === '/'
      ? []
      : buildBreadcrumbsFromPath(location.pathname, t))

  if (crumbs.length === 0 && !showHome) return null

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 min-w-0', className)}>
      <ol className="flex items-center gap-1 min-w-0 flex-wrap">
        {showHome ? (
          <li className="flex items-center">
            <Link
              to="/dashboards/overview"
              className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-1.5 py-0.5 text-[var(--text-body-sm)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-sunken)]"
            >
              <Home className="size-[var(--icon-sm)]" aria-hidden />
              <span className="sr-only">{t('sidebar.home')}</span>
            </Link>
            {crumbs.length > 0 ? (
              <ChevronRight
                className="mx-1 size-3 text-[var(--color-text-muted)]"
                aria-hidden
              />
            ) : null}
          </li>
        ) : null}
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <Fragment key={`${crumb.href ?? crumb.label}-${index}`}>
              <li className="flex items-center min-w-0">
                {isLast || !crumb.href ? (
                  <span
                    className="truncate text-[var(--text-body-sm)] font-medium text-[var(--color-text-primary)]"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.href}
                    className="truncate text-[var(--text-body-sm)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="size-3 text-[var(--color-text-muted)]" />
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export function getGroupLabelForPath(pathname: string, t: (key: string) => string): string | undefined {
  for (const group of menuGroups) {
    const hasMatch = group.items.some((item) => {
      const check = (navItem: typeof item): boolean => {
        if (navItem.href === pathname) return true
        return navItem.children?.some(check) ?? false
      }
      return check(item)
    })
    if (hasMatch && group.labelKey) return t(group.labelKey)
  }
  return undefined
}
