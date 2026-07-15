import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { FileText, Search } from 'lucide-react'
import { getAllNavItems } from '@/config/menu.config'
import { useLayoutStore } from '@/features/layout/layout-store'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { Modal, ModalContent } from '@/components/ui'

export function CommandPalette() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const open = useLayoutStore((s) => s.commandPaletteOpen)
  const setOpen = useLayoutStore((s) => s.setCommandPaletteOpen)
  const [query, setQuery] = useState('')

  const navEntries = useMemo(() => getAllNavItems(), [])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return navEntries
    return navEntries.filter(({ item, ancestors }) => {
      const label = t(item.labelKey).toLowerCase()
      const path = item.href?.toLowerCase() ?? ''
      const breadcrumb = ancestors.map((a) => t(a.labelKey).toLowerCase()).join(' ')
      return (
        label.includes(normalized) ||
        path.includes(normalized) ||
        item.id.toLowerCase().includes(normalized) ||
        breadcrumb.includes(normalized)
      )
    })
  }, [navEntries, query, t])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(!open)
      }
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const handleSelect = (href: string) => {
    setOpen(false)
    navigate(href)
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalContent
        className="overflow-hidden p-0 sm:max-w-xl"
        showClose={false}
      >
        <Command
          className="flex flex-col"
          shouldFilter={false}
        >
          <div className="flex items-center gap-3 border-b border-[var(--color-border-subtle)] px-4">
            <Search className="size-[var(--icon-md)] shrink-0 text-[var(--color-text-muted)]" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder={t('header.searchPlaceholder')}
              className="h-14 w-full bg-transparent text-[var(--text-body)] outline-none placeholder:text-[var(--color-text-muted)]"
            />
            <kbd className="hidden rounded border border-[var(--color-border)] bg-[var(--color-surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)] sm:inline">
              Esc
            </kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-4 py-8 text-center text-[var(--text-body-sm)] text-[var(--color-text-muted)]">
              {t('sidebar.noResults')}
            </Command.Empty>

            <Command.Group heading={t('sidebar.mainNavigation')}>
              {filtered.map(({ item, ancestors }) => {
                if (!item.href) return null
                const Icon = getIcon(item.icon)
                const parentLabel = ancestors
                  .slice(0, -1)
                  .map((a) => t(a.labelKey))
                  .join(' / ')

                return (
                  <Command.Item
                    key={item.id}
                    value={`${item.id}-${item.href}`}
                    onSelect={() => handleSelect(item.href!)}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-[var(--text-body-sm)] text-[var(--color-text-primary)] aria-selected:bg-[var(--color-primary-soft)] aria-selected:text-[var(--color-primary)]',
                    )}
                  >
                    <Icon className="size-[var(--icon-md)] shrink-0 text-[var(--color-text-muted)]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{t(item.labelKey)}</p>
                      {parentLabel ? (
                        <p className="truncate text-[var(--text-caption)] text-[var(--color-text-muted)]">
                          {parentLabel}
                        </p>
                      ) : null}
                    </div>
                    <span className="shrink-0 text-[var(--text-caption)] text-[var(--color-text-muted)]">
                      {item.href}
                    </span>
                  </Command.Item>
                )
              })}
            </Command.Group>

            <Command.Group heading={t('table.actions')}>
              <Command.Item
                value="docs-getting-started"
                onSelect={() => handleSelect('/docs/getting-started')}
                className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-[var(--text-body-sm)] aria-selected:bg-[var(--color-primary-soft)] aria-selected:text-[var(--color-primary)]"
              >
                <FileText className="size-[var(--icon-md)] text-[var(--color-text-muted)]" />
                <span>{t('nav.docs.gettingStarted')}</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </ModalContent>
    </Modal>
  )
}
