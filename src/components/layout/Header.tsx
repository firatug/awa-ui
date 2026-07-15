import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  CreditCard,
  Globe,
  LogOut,
  Mail,
  Maximize,
  Menu,
  Minimize,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  User,
} from 'lucide-react'
import { appConfig } from '@/config/app.config'
import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuUserCard,
  DropdownMenuFooter,
} from '@/components/ui'
import { useLayoutStore } from '@/features/layout/layout-store'
import { useFullscreen } from '@/hooks/useFullscreen'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { useTheme } from '@/theme'
import { setLocalePreference } from '@/locales/sync-locale'
import { usePreferencesStore } from '@/theme/preferences-store'

const mockNotifications = [
  {
    id: '1',
    title: 'New user registered',
    description: 'Sarah Chen joined your workspace',
    time: '2m ago',
    unread: true,
  },
  {
    id: '2',
    title: 'Invoice paid',
    description: 'Invoice #INV-2048 was paid',
    time: '1h ago',
    unread: true,
  },
  {
    id: '3',
    title: 'System update',
    description: `${appConfig.name} v${appConfig.version} is available`,
    time: '3h ago',
    unread: false,
  },
]

const mockMessages = [
  {
    id: '1',
    name: 'Alex Morgan',
    preview: 'Can you review the dashboard mockups?',
    time: '5m ago',
    unread: true,
  },
  {
    id: '2',
    name: 'Design Team',
    preview: 'Updated component tokens are ready',
    time: '20m ago',
    unread: true,
  },
]

const tenants = [
  { id: 'awa', name: `${appConfig.shortName} Global`, region: 'EU' },
  { id: 'acme', name: 'Harbor CMS', region: 'US' },
  { id: 'nova', name: 'Northline Labs', region: 'APAC' },
]

const headerGhostBtn =
  'text-[var(--color-header-bar-text)] hover:bg-[var(--color-header-bar-hover)] hover:text-[var(--color-header-bar-text)]'

export interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const toggleMobileSidebar = useLayoutStore((s) => s.toggleMobileSidebar)
  const setCommandPaletteOpen = useLayoutStore((s) => s.setCommandPaletteOpen)
  const toggleChatOverlay = useLayoutStore((s) => s.toggleChatOverlay)
  const chatOverlayOpen = useLayoutStore((s) => s.chatOverlayOpen)
  const { resolvedMode, toggleTheme } = useTheme()
  const { isFullscreen, toggleFullscreen } = useFullscreen()
  const locale = usePreferencesStore((s) => s.locale)

  const unreadNotifications = mockNotifications.filter((n) => n.unread).length
  const unreadMessages = mockMessages.filter((m) => m.unread).length

  const changeLocale = (next: 'en' | 'tr') => {
    setLocalePreference(next)
  }

  return (
    <header
      className={cn(
        'flex h-[var(--header-height)] w-full shrink-0 items-center gap-3 border-b border-[var(--color-header-bar-border)] bg-[var(--color-header-bar)] px-4 text-[var(--color-header-bar-text)]',
        className,
      )}
    >
      {isMobile ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          aria-label={t('header.openMenu')}
          className={headerGhostBtn}
        >
          <Menu className="size-[var(--icon-md)]" />
        </Button>
      ) : null}

      <Link
        to="/dashboards/overview"
        className="flex min-w-0 shrink-0 items-center gap-3 no-underline hover:opacity-90"
        aria-label={appConfig.name}
      >
        <img
          src={appConfig.assets.logoOnDark}
          alt={appConfig.name}
          className="h-7 w-auto object-contain sm:h-8"
        />
        <span
          className="hidden h-4 w-px shrink-0 bg-white/25 sm:block"
          aria-hidden
        />
        <span
          className="hidden truncate text-[11px] uppercase text-white/70 sm:inline md:text-[12px]"
          style={{
            fontFamily: '"Inter", "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
            fontWeight: 200,
            letterSpacing: '0.28em',
          }}
        >
          {appConfig.productLabel}
        </span>
      </Link>

      <div className="ms-auto flex items-center gap-0.5">
        <Button
          variant="ghost"
          size={isMobile ? 'icon' : 'sm'}
          onClick={() => setCommandPaletteOpen(true)}
          className={cn(
            headerGhostBtn,
            !isMobile &&
              'min-w-48 justify-start border border-[var(--color-header-bar-border)] bg-[var(--color-header-bar-soft)] text-[var(--color-header-bar-muted)] hover:bg-[var(--color-header-bar-hover)] hover:text-[var(--color-header-bar-text)]',
          )}
          aria-label={t('header.commandPalette')}
        >
          <Search className="size-[var(--icon-sm)]" />
          {!isMobile ? (
            <>
              <span className="flex-1 text-start">{t('header.search')}</span>
              <kbd className="hidden rounded border border-[var(--color-header-bar-border)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-header-bar-muted)] lg:inline">
                ⌘K
              </kbd>
            </>
          ) : null}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('header.notifications')}
              className={headerGhostBtn}
            >
              <span className="relative">
                <Bell className="size-[var(--icon-md)]" />
                {unreadNotifications > 0 ? (
                  <span className="absolute -end-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--color-danger)] text-[10px] font-semibold text-white">
                    {unreadNotifications}
                  </span>
                ) : null}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              {t('header.notifications')}
              <Badge variant="primary">{unreadNotifications}</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockNotifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex-col items-start gap-1 py-3">
                <div className="flex w-full items-start justify-between gap-2">
                  <span className="text-[var(--text-body-sm)] font-medium">
                    {notification.title}
                  </span>
                  {notification.unread ? (
                    <span className="size-2 shrink-0 rounded-full bg-[var(--color-primary)]" />
                  ) : null}
                </div>
                <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                  {notification.description}
                </span>
                <span className="text-[var(--text-caption)] text-[var(--color-text-muted)]">
                  {notification.time}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t('header.markAllRead')}</DropdownMenuItem>
            <DropdownMenuItem>{t('actions.viewAll')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          aria-label={t('header.messages')}
          aria-expanded={chatOverlayOpen}
          className={headerGhostBtn}
          onClick={() => toggleChatOverlay()}
        >
          <span className="relative">
            <Mail className="size-[var(--icon-md)]" />
            {unreadMessages > 0 ? (
              <span className="absolute -end-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-semibold text-white">
                {unreadMessages}
              </span>
            ) : null}
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('header.quickCreate')}
              className={cn(headerGhostBtn, 'bg-[var(--color-header-bar-soft)]')}
            >
              <Plus className="size-[var(--icon-md)]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('header.quickCreate')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t('header.newProject')}</DropdownMenuItem>
            <DropdownMenuItem>{t('header.newTask')}</DropdownMenuItem>
            <DropdownMenuItem>{t('header.newUser')}</DropdownMenuItem>
            <DropdownMenuItem>{t('header.newInvoice')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={t('header.theme')}
          className={headerGhostBtn}
        >
          {resolvedMode === 'dark' ? (
            <Sun className="size-[var(--icon-md)]" />
          ) : (
            <Moon className="size-[var(--icon-md)]" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('header.language')}
              className={headerGhostBtn}
            >
              <Globe className="size-[var(--icon-md)]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('header.language')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {appConfig.supportedLocales.map((lang) => (
              <DropdownMenuItem key={lang} onClick={() => changeLocale(lang)}>
                <span className="uppercase">{lang}</span>
                {locale === lang ? (
                  <Check className="ms-auto size-[var(--icon-sm)] text-[var(--color-primary)]" />
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          aria-label={
            isFullscreen ? t('header.exitFullscreen') : t('header.fullscreen')
          }
          className={cn(headerGhostBtn, 'hidden sm:inline-flex')}
        >
          {isFullscreen ? (
            <Minimize className="size-[var(--icon-md)]" />
          ) : (
            <Maximize className="size-[var(--icon-md)]" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? 'icon' : 'sm'}
              className={cn(headerGhostBtn, !isMobile && 'gap-2')}
            >
              <Building2 className="size-[var(--icon-sm)]" />
              {!isMobile ? (
                <>
                  <span className="max-w-28 truncate text-[13px]">
                    {tenants[0]!.name}
                  </span>
                  <ChevronDown className="size-3 opacity-60" />
                </>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('header.tenant')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {tenants.map((tenant) => (
              <DropdownMenuItem key={tenant.id} className="justify-between">
                <span>{tenant.name}</span>
                <Badge variant="outline" size="sm">
                  {tenant.region}
                </Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(headerGhostBtn, 'gap-2 ps-1')}
              aria-label={t('header.userMenu')}
            >
              <Avatar
                name="Admin User"
                size="sm"
                src="https://api.dicebear.com/9.x/initials/svg?seed=AWA"
              />
              {!isMobile ? (
                <ChevronDown className="size-3 opacity-60" />
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px] p-0">
            <DropdownMenuUserCard
              avatar={
                <Avatar
                  name="Admin User"
                  size="lg"
                  src="https://api.dicebear.com/9.x/initials/svg?seed=AWA"
                />
              }
              title="Admin User"
              subtitle={appConfig.demo.email}
            />
            <div className="py-1.5">
              <DropdownMenuItem
                icon={<User />}
                description={t('header.profileDescription')}
                onClick={() => navigate('/pages/profile')}
              >
                {t('header.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={<Settings />}
                description={t('header.settingsDescription')}
                onClick={() => navigate('/pages/settings/general')}
              >
                {t('header.settings')}
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={<CreditCard />}
                description={t('header.billingDescription')}
                onClick={() => navigate('/pages/billing')}
              >
                {t('nav.pages.billing')}
              </DropdownMenuItem>
            </div>
            <DropdownMenuFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] hover:text-[var(--color-danger)]"
              >
                <LogOut className="size-3.5" />
                {t('actions.signOut')}
              </Button>
            </DropdownMenuFooter>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
