import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { appConfig } from '@/config/app.config'
import type { ThemeMode } from '@/theme/theme'
import type { SidebarMode } from '@/config/navigation.config'

export type ContentWidth = 'default' | 'full' | 'narrow' | 'boxed'
export type Density = 'compact' | 'default' | 'comfortable'
export type RadiusLevel = 'sharp' | 'default' | 'rounded'
export type FontFamilyOption = 'manrope' | 'inter' | 'geist'
export type HeaderStyle = 'fixed' | 'static'

export interface ThemePreferences {
  themeMode: ThemeMode
  primaryColor: string
  sidebarMode: SidebarMode
  sidebarFixed: boolean
  /** When true, sidebar panel is fully hidden — only corner menu square remains */
  sidebarHidden: boolean
  headerStyle: HeaderStyle
  contentWidth: ContentWidth
  radius: RadiusLevel
  density: Density
  fontFamily: FontFamilyOption
  rtl: boolean
  reducedMotion: boolean
  locale: 'en' | 'tr'
}

interface PreferencesState extends ThemePreferences {
  setPreference: <K extends keyof ThemePreferences>(
    key: K,
    value: ThemePreferences[K],
  ) => void
  resetPreferences: () => void
}

export const defaultPreferences: ThemePreferences = {
  /** Locked default for now — light open surfaces + black-weighted chrome */
  themeMode: 'light',
  primaryColor: '#1D1D26',
  sidebarMode: 'default',
  sidebarFixed: true,
  sidebarHidden: false,
  headerStyle: 'fixed',
  contentWidth: 'default',
  radius: 'default',
  density: 'default',
  fontFamily: 'manrope',
  rtl: false,
  reducedMotion: false,
  locale: appConfig.defaultLocale,
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setPreference: (key, value) => set({ [key]: value }),
      resetPreferences: () => set({ ...defaultPreferences }),
    }),
    {
      name: `${appConfig.storageKeys.preferences}-v2`,
    },
  ),
)
