import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePreferencesStore } from '@/theme/preferences-store'
import type { SidebarMode } from '@/config/navigation.config'
import type { ContentWidth } from '@/theme/preferences-store'
import { appConfig } from '@/config/app.config'
import { cn } from '@/lib/utils'

const layoutVariants = [
  {
    id: 'default',
    titleKey: 'nav.layouts.default',
    description: 'Standard sidebar with full navigation labels and fixed header.',
    sidebarMode: 'default' as SidebarMode,
    contentWidth: 'default' as ContentWidth,
  },
  {
    id: 'compact',
    titleKey: 'nav.layouts.compact',
    description: 'Narrower sidebar for more content space on smaller screens.',
    sidebarMode: 'compact' as SidebarMode,
    contentWidth: 'default' as ContentWidth,
  },
  {
    id: 'icon',
    titleKey: 'nav.layouts.icon',
    description: 'Icon-only sidebar that expands on hover.',
    sidebarMode: 'icon' as SidebarMode,
    contentWidth: 'default' as ContentWidth,
  },
  {
    id: 'boxed',
    titleKey: 'nav.layouts.boxed',
    description: 'Centered content with max-width constraint.',
    sidebarMode: 'default' as SidebarMode,
    contentWidth: 'boxed' as ContentWidth,
  },
  {
    id: 'fullWidth',
    titleKey: 'nav.layouts.fullWidth',
    description: 'Edge-to-edge content area for data-heavy dashboards.',
    sidebarMode: 'default' as SidebarMode,
    contentWidth: 'full' as ContentWidth,
  },
  {
    id: 'rtl',
    titleKey: 'nav.layouts.rtlDemo',
    description: 'Right-to-left layout for Arabic, Hebrew, and other RTL locales.',
    sidebarMode: 'default' as SidebarMode,
    contentWidth: 'default' as ContentWidth,
    rtl: true,
  },
]

export function LayoutsPage() {
  const { t } = useTranslation()
  const { sidebarMode, contentWidth, rtl, setPreference } = usePreferencesStore()

  const applyLayout = (variant: (typeof layoutVariants)[number]) => {
    setPreference('sidebarMode', variant.sidebarMode)
    setPreference('contentWidth', variant.contentWidth)
    if ('rtl' in variant && variant.rtl) {
      setPreference('rtl', true)
    } else {
      setPreference('rtl', false)
    }
  }

  return (
    <div>
      <PageHeader
        title={t('docs.layouts')}
        description={t('docs.layoutsDescription')}
      />

      <Card className="mb-[var(--density-gap)]">
        <CardHeader title="Current preferences" />
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="primary">Sidebar: {sidebarMode}</Badge>
          <Badge variant="secondary">Width: {contentWidth}</Badge>
          <Badge variant={rtl ? 'warning' : 'outline'}>RTL: {rtl ? 'on' : 'off'}</Badge>
        </CardContent>
      </Card>

      <div className="grid gap-[var(--density-gap)] md:grid-cols-2 xl:grid-cols-3">
        {layoutVariants.map((variant) => {
          const isActive =
            sidebarMode === variant.sidebarMode &&
            contentWidth === variant.contentWidth &&
            (variant.rtl ? rtl : !rtl)

          return (
            <Card
              key={variant.id}
              interactive
              selected={isActive}
              onClick={() => applyLayout(variant)}
            >
              <CardHeader title={t(variant.titleKey)} />
              <CardContent>
                <LayoutPreview variant={variant.id} />
                <p className="mt-4 text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                  {variant.description}
                </p>
                <Button
                  size="sm"
                  variant={isActive ? 'primary' : 'outline'}
                  className="mt-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    applyLayout(variant)
                  }}
                >
                  {isActive ? 'Active' : 'Apply layout'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="mt-6 text-center text-[var(--text-caption)] text-[var(--color-text-muted)]">
        Layout preferences persist across sessions via {appConfig.storageKeys.preferences}
      </p>
    </div>
  )
}

function LayoutPreview({ variant }: { variant: string }) {
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas)]">
      <div className={cn('flex h-full', variant === 'rtl' && 'flex-row-reverse')}>
        <div
          className={cn(
            'shrink-0 bg-[var(--color-surface)] border-[var(--color-border)]',
            variant === 'icon' ? 'w-8 border-e' : variant === 'compact' ? 'w-12 border-e' : 'w-16 border-e',
          )}
        >
          <div className="m-2 h-2 rounded bg-[var(--color-primary-soft)]" />
          {variant !== 'icon' && (
            <div className="space-y-1 px-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-1.5 rounded bg-[var(--color-surface-sunken)]" />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="h-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]" />
          <div
            className={cn(
              'flex-1 p-2',
              variant === 'boxed' && 'flex justify-center',
            )}
          >
            <div
              className={cn(
                'h-full rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)]',
                variant === 'boxed' ? 'w-3/4' : 'w-full',
              )}
            >
              <div className="m-2 grid grid-cols-2 gap-1">
                <div className="h-4 rounded bg-[var(--color-primary-soft)]" />
                <div className="h-4 rounded bg-[var(--color-primary-soft)]" />
                <div className="col-span-2 h-6 rounded bg-[var(--color-surface-sunken)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutsPage
