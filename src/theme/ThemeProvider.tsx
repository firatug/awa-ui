import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultPreferences,
  usePreferencesStore,
  type FontFamilyOption,
} from './preferences-store'
import type { ColorMode, ThemeMode } from './theme'

interface ThemeContextValue {
  themeMode: ThemeMode
  resolvedMode: ColorMode
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const FONT_MAP: Record<FontFamilyOption, string> = {
  manrope: '"Manrope", "Segoe UI", system-ui, sans-serif',
  inter: '"Inter", "Segoe UI", system-ui, sans-serif',
  geist: '"Geist", "Segoe UI", system-ui, sans-serif',
}

function getSystemMode(): ColorMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function adjustPrimary(hex: string, amount: number): string {
  const raw = hex.replace('#', '')
  const num = Number.parseInt(raw, 16)
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

function hexToRgba(hex: string, alpha: number): string {
  const raw = hex.replace('#', '')
  const num = Number.parseInt(raw, 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeMode = usePreferencesStore((s) => s.themeMode)
  const primaryColor = usePreferencesStore((s) => s.primaryColor)
  const radius = usePreferencesStore((s) => s.radius)
  const density = usePreferencesStore((s) => s.density)
  const fontFamily = usePreferencesStore((s) => s.fontFamily)
  const rtl = usePreferencesStore((s) => s.rtl)
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion)
  const setPreference = usePreferencesStore((s) => s.setPreference)

  const [resolvedMode, setResolvedMode] = useState<ColorMode>(() =>
    themeMode === 'system' ? getSystemMode() : themeMode,
  )

  useEffect(() => {
    if (themeMode !== 'system') {
      setResolvedMode(themeMode)
      return
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setResolvedMode(media.matches ? 'dark' : 'light')
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [themeMode])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = resolvedMode
    root.dataset.radius = radius
    root.dataset.density = density
    root.dataset.reducedMotion = String(reducedMotion)
    root.dir = rtl ? 'rtl' : 'ltr'
    root.style.setProperty('--font-sans', FONT_MAP[fontFamily])
    root.style.setProperty('--color-primary', primaryColor)
    // Dark accents lighten on hover; light accents darken
    const luminance =
      (Number.parseInt(primaryColor.slice(1, 3), 16) * 299 +
        Number.parseInt(primaryColor.slice(3, 5), 16) * 587 +
        Number.parseInt(primaryColor.slice(5, 7), 16) * 114) /
      1000
    const delta = luminance < 80 ? 22 : -18
    root.style.setProperty('--color-primary-hover', adjustPrimary(primaryColor, delta))
    root.style.setProperty(
      '--color-primary-active',
      adjustPrimary(primaryColor, luminance < 80 ? 12 : -32),
    )
    root.style.setProperty(
      '--color-primary-foreground',
      luminance < 160 ? '#ffffff' : '#111118',
    )
    root.style.setProperty('--color-focus-ring', hexToRgba(primaryColor, 0.2))
    root.style.setProperty(
      '--color-primary-soft',
      luminance < 80 ? '#f0f0f3' : hexToRgba(primaryColor, 0.12),
    )
  }, [resolvedMode, radius, density, reducedMotion, rtl, fontFamily, primaryColor])

  const setThemeMode = useCallback(
    (mode: ThemeMode) => setPreference('themeMode', mode),
    [setPreference],
  )

  const toggleTheme = useCallback(() => {
    const next: ThemeMode =
      resolvedMode === 'dark' ? 'light' : 'dark'
    setPreference('themeMode', next)
  }, [resolvedMode, setPreference])

  const value = useMemo(
    () => ({
      themeMode,
      resolvedMode,
      setThemeMode,
      toggleTheme,
    }),
    [themeMode, resolvedMode, setThemeMode, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}

export { defaultPreferences }
