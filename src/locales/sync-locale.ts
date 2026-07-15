import { appConfig } from '@/config/app.config'
import type { SupportedLocale } from '@/config/app.config'
import { usePreferencesStore } from '@/theme/preferences-store'
import { changeLanguage } from './index'

/**
 * Sync i18next with the Zustand preferences store.
 *
 * Usage in ThemeProvider or App root:
 *
 * ```tsx
 * useEffect(() => {
 *   const unsubscribe = subscribeLocaleSync()
 *   return unsubscribe
 * }, [])
 * ```
 *
 * When the user changes locale via setPreference('locale', 'tr'), i18n updates
 * automatically. Call `syncLocaleWithPreferences()` once on bootstrap to apply
 * the persisted locale before first render if needed.
 */
export function syncLocaleWithPreferences(): Promise<void> {
  const locale = usePreferencesStore.getState().locale
  return changeLanguage(locale)
}

export function subscribeLocaleSync(): () => void {
  let previousLocale: SupportedLocale = usePreferencesStore.getState().locale

  void syncLocaleWithPreferences()

  return usePreferencesStore.subscribe((state) => {
    const nextLocale = state.locale
    if (nextLocale === previousLocale) return
    previousLocale = nextLocale
    void changeLanguage(nextLocale)
  })
}

export function setLocalePreference(locale: SupportedLocale): void {
  usePreferencesStore.getState().setPreference('locale', locale)
}

export function getCurrentLocale(): SupportedLocale {
  return usePreferencesStore.getState().locale
}

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (appConfig.supportedLocales as readonly string[]).includes(value)
}
