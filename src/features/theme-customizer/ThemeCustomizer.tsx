import { useTranslation } from 'react-i18next'
import {
  Check,
  Monitor,
  Moon,
  RotateCcw,
  Sun,
} from 'lucide-react'
import { useLayoutStore } from '@/features/layout/layout-store'
import { cn } from '@/lib/utils'
import { useTheme } from '@/theme'
import {
  usePreferencesStore,
  type ContentWidth,
  type Density,
  type FontFamilyOption,
  type HeaderStyle,
  type RadiusLevel,
} from '@/theme/preferences-store'
import type { SidebarMode } from '@/config/navigation.config'
import type { ThemeMode } from '@/theme/theme'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Label,
  Switch,
} from '@/components/ui'

const primaryPresets = [
  { name: 'Indigo', value: '#5B5FEF' },
  { name: 'Violet', value: '#7C3AED' },
  { name: 'Blue', value: '#2563EB' },
  { name: 'Teal', value: '#0D9488' },
  { name: 'Rose', value: '#E11D48' },
  { name: 'Amber', value: '#D97706' },
]

const sidebarModes: SidebarMode[] = ['default', 'compact', 'icon', 'hover']
const contentWidths: ContentWidth[] = ['default', 'full', 'narrow', 'boxed']
const radiusLevels: RadiusLevel[] = ['sharp', 'default', 'rounded']
const densities: Density[] = ['compact', 'default', 'comfortable']
const fontFamilies: FontFamilyOption[] = ['manrope', 'inter', 'geist']

function OptionPills<T extends string>({
  value,
  options,
  onChange,
  labels,
}: {
  value: T
  options: readonly T[]
  onChange: (value: T) => void
  labels?: Partial<Record<T, string>>
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            'rounded-[var(--radius-md)] border px-3 py-1.5 text-[var(--text-body-sm)] capitalize transition-colors',
            value === option
              ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
              : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)]',
          )}
        >
          {labels?.[option] ?? option}
        </button>
      ))}
    </div>
  )
}

export function ThemeCustomizer() {
  const { t } = useTranslation()
  const open = useLayoutStore((s) => s.customizerOpen)
  const setOpen = useLayoutStore((s) => s.setCustomizerOpen)
  const { themeMode, setThemeMode } = useTheme()
  const preferences = usePreferencesStore()
  const { setPreference, resetPreferences } = preferences

  const themeModes: ThemeMode[] = ['light', 'dark', 'system']
  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent side="right" className="w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>{t('theme.customizerTitle')}</DrawerTitle>
          <DrawerDescription>
            {preferences.primaryColor}
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody className="space-y-6">
          <section className="space-y-3">
            <Label>{t('header.theme')}</Label>
            <div className="grid grid-cols-3 gap-2">
              {themeModes.map((mode) => {
                const Icon = themeIcons[mode]
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setThemeMode(mode)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border p-3 text-[var(--text-body-sm)] transition-colors',
                      themeMode === mode
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)]',
                    )}
                  >
                    <Icon className="size-[var(--icon-md)]" />
                    <span className="capitalize">
                      {mode === 'light'
                        ? t('theme.light')
                        : mode === 'dark'
                          ? t('theme.dark')
                          : t('theme.system')}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="space-y-3">
            <Label>{t('theme.primaryColor')}</Label>
            <div className="grid grid-cols-6 gap-2">
              {primaryPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setPreference('primaryColor', preset.value)}
                  className={cn(
                    'relative flex size-10 items-center justify-center rounded-[var(--radius-md)] border-2 transition-transform hover:scale-105',
                    preferences.primaryColor === preset.value
                      ? 'border-[var(--color-text-primary)]'
                      : 'border-transparent',
                  )}
                  style={{ backgroundColor: preset.value }}
                  aria-label={preset.name}
                >
                  {preferences.primaryColor === preset.value ? (
                    <Check className="size-4 text-white" />
                  ) : null}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="custom-color" className="shrink-0">
                {t('theme.customColor')}
              </Label>
              <input
                id="custom-color"
                type="color"
                value={preferences.primaryColor}
                onChange={(e) => setPreference('primaryColor', e.target.value)}
                className="h-10 w-full cursor-pointer rounded-[var(--radius-md)] border border-[var(--color-border)] bg-transparent"
              />
            </div>
          </section>

          <section className="space-y-3">
            <Label>{t('theme.sidebarMode')}</Label>
            <OptionPills
              value={preferences.sidebarMode}
              options={sidebarModes}
              onChange={(value) => setPreference('sidebarMode', value)}
            />
          </section>

          <section className="space-y-3">
            <Label>{t('theme.contentWidth')}</Label>
            <OptionPills
              value={preferences.contentWidth}
              options={contentWidths}
              onChange={(value) => setPreference('contentWidth', value)}
            />
          </section>

          <section className="space-y-3">
            <Label>{t('theme.radius')}</Label>
            <OptionPills
              value={preferences.radius}
              options={radiusLevels}
              onChange={(value) => setPreference('radius', value)}
            />
          </section>

          <section className="space-y-3">
            <Label>{t('theme.density')}</Label>
            <OptionPills
              value={preferences.density}
              options={densities}
              onChange={(value) => setPreference('density', value)}
            />
          </section>

          <section className="space-y-3">
            <Label>{t('theme.font')}</Label>
            <OptionPills
              value={preferences.fontFamily}
              options={fontFamilies}
              onChange={(value) => setPreference('fontFamily', value)}
            />
          </section>

          <section className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label>{t('theme.rtl')}</Label>
              </div>
              <Switch
                checked={preferences.rtl}
                onCheckedChange={(checked) => setPreference('rtl', checked)}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label>{t('theme.reducedMotion')}</Label>
              </div>
              <Switch
                checked={preferences.reducedMotion}
                onCheckedChange={(checked) =>
                  setPreference('reducedMotion', checked)
                }
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label>{t('theme.fixedHeader')}</Label>
              </div>
              <Switch
                checked={preferences.headerStyle === 'fixed'}
                onCheckedChange={(checked) =>
                  setPreference('headerStyle', (checked ? 'fixed' : 'static') as HeaderStyle)
                }
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label>{t('theme.sidebarFixed')}</Label>
              </div>
              <Switch
                checked={preferences.sidebarFixed}
                onCheckedChange={(checked) =>
                  setPreference('sidebarFixed', checked)
                }
              />
            </div>
          </section>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            onClick={() => resetPreferences()}
            leftIcon={<RotateCcw className="size-[var(--icon-sm)]" />}
          >
            {t('theme.reset')}
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            {t('actions.save')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
