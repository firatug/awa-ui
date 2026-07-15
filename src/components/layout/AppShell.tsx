import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { navigationConfig } from '@/config/navigation.config'
import { ChatOverlay } from '@/features/chat-overlay/ChatOverlay'
import { CommandPalette } from '@/features/command-palette/CommandPalette'
import { useLayoutStore } from '@/features/layout/layout-store'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { usePreferencesStore } from '@/theme/preferences-store'
import { Drawer, DrawerContent } from '@/components/ui'
import { ContentContainer } from './ContentContainer'
import { Header } from './Header'
import { NavMenuButton } from './NavMenuButton'
import { Sidebar } from './Sidebar'

const MENU_SQUARE = 48
const EASE_WIPE = [0.42, 0, 0.58, 1] as const

type SidebarPhase = 'open' | 'closing' | 'hidden' | 'opening'

export function AppShell() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const sidebarMode = usePreferencesStore((s) => s.sidebarMode)
  const sidebarHidden = usePreferencesStore((s) => s.sidebarHidden)
  const setPreference = usePreferencesStore((s) => s.setPreference)
  const sidebarCollapsed = useLayoutStore((s) => s.sidebarCollapsed)
  const mobileSidebarOpen = useLayoutStore((s) => s.mobileSidebarOpen)
  const setMobileSidebarOpen = useLayoutStore((s) => s.setMobileSidebarOpen)
  const chatOverlayOpen = useLayoutStore((s) => s.chatOverlayOpen)

  const [phase, setPhase] = useState<SidebarPhase>(() =>
    sidebarHidden ? 'hidden' : 'open',
  )

  const isIconMode = sidebarMode === 'icon'
  const collapsed = isIconMode || sidebarCollapsed
  const panelVisible = phase === 'open' || phase === 'closing' || phase === 'opening'
  const menuActive = phase === 'open' || phase === 'closing' || phase === 'opening'
  const slotExpanded = panelVisible

  const fullSidebarWidth = collapsed
    ? navigationConfig.sidebarCollapsedWidth
    : sidebarMode === 'compact'
      ? 220
      : navigationConfig.sidebarWidth

  const contentSidebarWidth =
    phase === 'hidden' || phase === 'closing' ? MENU_SQUARE : fullSidebarWidth

  const inset = navigationConfig.shellInset
  const gap = navigationConfig.contentGap
  const headerHeight = navigationConfig.headerHeight

  useEffect(() => {
    if (!isMobile) {
      setMobileSidebarOpen(false)
    }
  }, [isMobile, setMobileSidebarOpen])

  useEffect(() => {
    if (sidebarHidden && phase === 'open') setPhase('hidden')
    if (!sidebarHidden && phase === 'hidden') setPhase('open')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarHidden])

  const startHide = () => {
    if (phase !== 'open') return
    setPhase('closing')
    window.setTimeout(() => {
      setPreference('sidebarHidden', true)
      setPhase('hidden')
    }, 850)
  }

  const startShow = () => {
    if (phase !== 'hidden') return
    setPreference('sidebarHidden', false)
    setPhase('opening')
    window.setTimeout(() => setPhase('open'), 520)
  }

  const onMenuClick = () => {
    if (phase === 'closing' || phase === 'opening') return
    if (phase === 'open') startHide()
    else startShow()
  }

  const contentOffsetStart = isMobile ? 0 : inset + contentSidebarWidth + gap
  const contentPadTop = headerHeight + inset

  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <div
        className={cn(
          'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.35,0,0.25,1)]',
          chatOverlayOpen && 'pointer-events-none scale-[0.96] opacity-0',
        )}
      >
        <div className="fixed inset-x-0 top-0 z-[var(--z-sticky)]">
          <Header />
        </div>

        {!isMobile ? (
          <div
            className="pointer-events-none fixed z-[calc(var(--z-sticky)+1)] hidden overflow-visible lg:block"
            style={{
              top: contentPadTop,
              bottom: slotExpanded ? inset : 'auto',
              insetInlineStart: inset,
              width: slotExpanded ? fullSidebarWidth : MENU_SQUARE,
              height: slotExpanded ? undefined : MENU_SQUARE,
            }}
          >
            <div className="pointer-events-auto relative h-full overflow-visible">
              {/* Persistent MCM hamburger — closed: corner square · open: align with search row */}
              <div
                className={cn(
                  'absolute z-40 overflow-visible',
                  menuActive ? 'left-2.5 top-2.5' : 'left-0 top-0',
                )}
              >
                <NavMenuButton
                  id="awa-sidebar-menu-square"
                  active={menuActive}
                  rotating={phase === 'closing'}
                  disabled={phase === 'closing' || phase === 'opening'}
                  onClick={onMenuClick}
                  aria-label={menuActive ? t('sidebar.hide') : t('sidebar.show')}
                />
              </div>

              {panelVisible ? (
                <motion.div
                  className="absolute left-0 top-0 z-10 origin-top-left overflow-hidden rounded-[12px] border border-[rgba(15,23,42,0.06)] bg-[var(--color-surface)] shadow-[0_2px_12px_rgba(15,23,42,0.06)]"
                  initial={
                    phase === 'opening'
                      ? { width: MENU_SQUARE, height: MENU_SQUARE }
                      : false
                  }
                  animate={
                    phase === 'closing'
                      ? { width: MENU_SQUARE, height: MENU_SQUARE }
                      : { width: fullSidebarWidth, height: '100%' }
                  }
                  transition={{
                    duration: 0.5,
                    delay: phase === 'closing' ? 0.2 : 0,
                    ease: EASE_WIPE,
                  }}
                  style={{
                    pointerEvents: phase === 'closing' ? 'none' : 'auto',
                  }}
                >
                  <Sidebar floating bare closing={phase === 'closing'} />
                </motion.div>
              ) : null}
            </div>
          </div>
        ) : null}

        <Drawer open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <DrawerContent
            side="left"
            showClose={false}
            className="max-w-none w-[min(100%,18rem)] border-0 bg-transparent p-3 shadow-none"
          >
            <Sidebar
              mobile
              floating
              onNavigate={() => setMobileSidebarOpen(false)}
              className="h-full max-h-[calc(100dvh-1.5rem)]"
            />
          </DrawerContent>
        </Drawer>

        <div
          className="flex min-h-screen flex-col transition-[padding] duration-500 ease-[cubic-bezier(0.42,0,0.58,1)]"
          style={{
            paddingTop: contentPadTop,
            paddingBottom: inset,
            paddingInlineStart: contentOffsetStart,
            paddingInlineEnd: inset,
            transitionDelay: phase === 'closing' ? '200ms' : '0ms',
          }}
        >
          <main className="flex-1 min-h-0">
            <ContentContainer>
              <Outlet />
            </ContentContainer>
          </main>
        </div>
      </div>

      <CommandPalette />
      <ChatOverlay />
    </div>
  )
}
