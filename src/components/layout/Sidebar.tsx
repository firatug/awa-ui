import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronRight, MessageSquare, Search } from 'lucide-react'
import { appConfig } from '@/config/app.config'
import {
  filterNavItems,
  getFavoriteItems,
  menuGroups,
} from '@/config/menu.config'
import { navigationConfig } from '@/config/navigation.config'
import { useLayoutStore } from '@/features/layout/layout-store'
import { useDebounce } from '@/hooks/useDebounce'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types/navigation'
import {
  Avatar,
  Badge,
  Input,
  ScrollArea,
  Tooltip,
  TooltipProvider,
} from '@/components/ui'
import { usePreferencesStore } from '@/theme/preferences-store'
import './sidebar-hide.css'
import './sidebar-menu.css'

export interface SidebarProps {
  mobile?: boolean
  floating?: boolean
  bare?: boolean
  closing?: boolean
  onNavigate?: () => void
  className?: string
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`))) {
    return true
  }
  return item.children?.some((child) => isItemActive(child, pathname)) ?? false
}

function MenuSectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="awa-menu-section">
      <span className="awa-menu-section-label">{children}</span>
    </div>
  )
}

function MenuBullet({ depth }: { depth: number }) {
  return (
    <span
      className={cn(
        'awa-menu-bullet',
        depth === 1 ? 'is-line' : 'is-dot',
      )}
      aria-hidden
    />
  )
}

function NavLinkItem({
  item,
  collapsed,
  depth = 0,
  onNavigate,
}: {
  item: NavItem
  collapsed: boolean
  depth?: number
  onNavigate?: () => void
}) {
  const { t } = useTranslation()
  const location = useLocation()
  const [open, setOpen] = useState(() => isItemActive(item, location.pathname))
  const Icon = getIcon(item.icon)
  const hasChildren = Boolean(item.children?.length)
  const here = isItemActive(item, location.pathname)
  const isRoot = depth === 0

  useEffect(() => {
    if (hasChildren && isItemActive(item, location.pathname)) {
      setOpen(true)
    }
  }, [hasChildren, item, location.pathname])

  const label = t(item.labelKey)

  const badge = item.badge ? (
    <Badge
      variant={item.badgeVariant ?? 'primary'}
      size="sm"
      className="awa-menu-badge"
    >
      {item.badge}
    </Badge>
  ) : null

  const leading =
    isRoot && item.icon ? (
      <span className="awa-menu-icon">
        <Icon aria-hidden />
      </span>
    ) : isRoot ? (
      <span className="awa-menu-icon" aria-hidden />
    ) : (
      <MenuBullet depth={depth} />
    )

  const rowClass = ({
    active = false,
    asChild = false,
  }: {
    active?: boolean
    asChild?: boolean
  } = {}) =>
    cn(
      'awa-menu-item',
      isRoot ? 'is-root' : 'is-child',
      !isRoot && `is-depth-${Math.min(depth, 3)}`,
      asChild && open && 'is-open',
      here && !active && 'is-here',
      active && 'is-active',
      collapsed && 'is-collapsed',
    )

  if (hasChildren) {
    const trigger = (
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={rowClass({ asChild: true })}
        aria-expanded={open}
      >
        {leading}
        {!collapsed ? (
          <>
            <span className="awa-menu-label">{label}</span>
            {badge}
            <ChevronRight
              className={cn('awa-menu-arrow', open && 'is-open')}
              strokeWidth={2.25}
              aria-hidden
            />
          </>
        ) : null}
      </button>
    )

    return (
      <div>
        {collapsed ? (
          <Tooltip content={label} side="right">
            {trigger}
          </Tooltip>
        ) : (
          trigger
        )}
        {open && !collapsed ? (
          <div className="awa-menu-sub">
            {item.children!.map((child) => (
              <NavLinkItem
                key={child.id}
                item={child}
                collapsed={collapsed}
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  if (!item.href) return null

  const link = (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      className={({ isActive }) => rowClass({ active: isActive })}
    >
      {leading}
      {!collapsed ? (
        <>
          <span className="awa-menu-label">{label}</span>
          {badge}
        </>
      ) : null}
    </NavLink>
  )

  if (collapsed) {
    return (
      <Tooltip content={label} side="right">
        {link}
      </Tooltip>
    )
  }

  return link
}

export function Sidebar({
  mobile = false,
  floating = false,
  bare = false,
  closing = false,
  onNavigate,
  className,
}: SidebarProps) {
  const { t } = useTranslation()
  const sidebarMode = usePreferencesStore((s) => s.sidebarMode)
  const sidebarCollapsed = useLayoutStore((s) => s.sidebarCollapsed)
  const chatOverlayOpen = useLayoutStore((s) => s.chatOverlayOpen)
  const toggleChatOverlay = useLayoutStore((s) => s.toggleChatOverlay)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 200)
  const [hoverExpanded, setHoverExpanded] = useState(false)

  const isIconMode = sidebarMode === 'icon'
  const isHoverMode = sidebarMode === 'hover'
  const isCompactMode = sidebarMode === 'compact'
  const collapsed =
    isIconMode || (isHoverMode && !hoverExpanded) || sidebarCollapsed

  const filteredGroups = useMemo(() => {
    if (!debouncedSearch.trim()) return menuGroups
    return menuGroups
      .map((group) => ({
        ...group,
        items: filterNavItems(group.items, debouncedSearch, (item) =>
          t(item.labelKey),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [debouncedSearch, t])

  const favorites = getFavoriteItems()

  const sidebarWidth = collapsed
    ? navigationConfig.sidebarCollapsedWidth
    : isCompactMode
      ? 224
      : navigationConfig.sidebarWidth

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'flex h-full flex-col bg-[var(--color-surface)]',
          floating && !bare
            ? 'overflow-hidden rounded-[12px] border border-[rgba(15,23,42,0.06)] shadow-[0_2px_12px_rgba(15,23,42,0.06)]'
            : !floating
              ? 'border-e border-[var(--color-border)]'
              : 'overflow-hidden',
          isHoverMode && 'group/sidebar',
          className,
        )}
        style={{ width: mobile || floating || bare ? '100%' : sidebarWidth }}
        onMouseEnter={isHoverMode ? () => setHoverExpanded(true) : undefined}
        onMouseLeave={isHoverMode ? () => setHoverExpanded(false) : undefined}
        data-collapsed={collapsed || undefined}
      >
        <div className="relative z-10 shrink-0 border-b border-[var(--color-border-subtle)] px-2.5 py-2.5">
          <div
            className={cn(
              'flex items-center gap-1.5',
              !mobile && bare && 'ps-8',
            )}
          >
            {!collapsed ? (
              <div
                className={cn(
                  'min-w-0 flex-1 transition-opacity duration-200',
                  closing && 'opacity-0',
                )}
              >
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('sidebar.searchMenu')}
                  leftAddon={<Search className="size-[var(--icon-sm)]" />}
                  clearable
                  onClear={() => setSearch('')}
                  inputSize="sm"
                  aria-label={t('sidebar.searchMenu')}
                />
              </div>
            ) : (
              <div className="flex flex-1 justify-center">
                <Search className="size-[17px] text-[var(--color-text-muted)]" />
              </div>
            )}
          </div>
        </div>

        <div className={cn('awa-sidebar-body', closing && 'is-closing')}>
          <ScrollArea className="flex-1">
            <div className="awa-menu">
              {!debouncedSearch && favorites.length > 0 ? (
                <section>
                  {!collapsed ? (
                    <MenuSectionHeading>
                      {t('sidebar.favorites')}
                    </MenuSectionHeading>
                  ) : null}
                  <div className="awa-menu-list">
                    {favorites.map((item) => (
                      <NavLinkItem
                        key={`fav-${item.id}`}
                        item={item}
                        collapsed={collapsed}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              {filteredGroups.map((group) => (
                <section key={group.id}>
                  {!collapsed && group.labelKey ? (
                    <MenuSectionHeading>
                      {t(group.labelKey)}
                    </MenuSectionHeading>
                  ) : null}
                  <div className="awa-menu-list">
                    {group.items.map((item) => (
                      <NavLinkItem
                        key={item.id}
                        item={item}
                        collapsed={collapsed}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </div>
                </section>
              ))}

              {filteredGroups.length === 0 ? (
                <p className="px-3 py-6 text-center text-[var(--text-body-sm)] text-[var(--color-text-muted)]">
                  {t('sidebar.noResults')}
                </p>
              ) : null}
            </div>
          </ScrollArea>

          <div className="shrink-0 border-t border-[var(--color-border-subtle)] p-2.5">
            <button
              id="awa-chat-trigger"
              type="button"
              onClick={() => {
                toggleChatOverlay()
                onNavigate?.()
              }}
              className={cn(
                'group relative flex w-full items-center gap-2.5 rounded-[12px] px-2 py-2 transition-colors hover:bg-[var(--color-surface-sunken)]',
                collapsed && 'justify-center px-0',
                chatOverlayOpen && 'bg-[var(--color-primary-soft)]',
              )}
              aria-label={t('nav.apps.chat')}
              aria-expanded={chatOverlayOpen}
            >
              <span className="relative shrink-0 size-8">
                <span
                  className={cn(
                    'absolute inset-0 flex items-center justify-center transition-all duration-300',
                    chatOverlayOpen
                      ? 'scale-0 rotate-90 opacity-0'
                      : 'scale-100 rotate-0 opacity-100',
                  )}
                >
                  <Avatar
                    name={appConfig.demo.email}
                    size="sm"
                    src="https://api.dicebear.com/9.x/initials/svg?seed=AWA"
                  />
                  <span className="absolute -bottom-0.5 -end-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-sm">
                    <MessageSquare className="size-2.5" strokeWidth={2.5} />
                  </span>
                </span>
                <span
                  className={cn(
                    'absolute inset-0 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white transition-all duration-300',
                    chatOverlayOpen
                      ? 'scale-100 rotate-0 opacity-100'
                      : 'scale-0 -rotate-90 opacity-0',
                  )}
                >
                  <span className="relative block size-3.5">
                    <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rotate-45 rounded-full bg-white" />
                    <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 -rotate-45 rounded-full bg-white" />
                  </span>
                </span>
              </span>
              {!collapsed ? (
                <span className="min-w-0 flex-1 text-start">
                  <span className="block truncate text-[13px] font-medium text-[var(--color-text-primary)]">
                    {chatOverlayOpen ? t('actions.close') : t('nav.apps.chat')}
                  </span>
                  <span className="block truncate text-[11px] text-[var(--color-text-muted)]">
                    {t('header.messages')}
                  </span>
                </span>
              ) : null}
              {!chatOverlayOpen ? (
                <span className="absolute end-2 top-2 flex size-4 items-center justify-center rounded-full bg-[var(--color-danger)] text-[9px] font-semibold text-white">
                  3
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}

export function SidebarSection({
  title,
  children,
}: {
  title?: ReactNode
  children: ReactNode
}) {
  return (
    <section>
      {title ? <MenuSectionHeading>{title}</MenuSectionHeading> : null}
      <div className="awa-menu-list">{children}</div>
    </section>
  )
}
