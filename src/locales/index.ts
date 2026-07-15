import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { appConfig } from '@/config/app.config'
import type { SupportedLocale } from '@/config/app.config'
import enCommon from './en/common.json'
import trCommon from './tr/common.json'

export const defaultNS = 'common' as const
export const supportedLocales = appConfig.supportedLocales

const resources = {
  en: { common: enCommon },
  tr: { common: trCommon },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: appConfig.defaultLocale,
  fallbackLng: 'en',
  defaultNS,
  ns: [defaultNS],
  interpolation: {
    escapeValue: false,
    defaultVariables: {
      appName: appConfig.name,
      version: appConfig.version,
      authorName: appConfig.author.name,
    },
  },
  react: {
    useSuspense: false,
  },
})

export { i18n }

export async function changeLanguage(locale: SupportedLocale): Promise<void> {
  await i18n.changeLanguage(locale)
  document.documentElement.lang = locale
}

/**
 * Initialize i18n from persisted preferences (call once at app bootstrap).
 * ThemeProvider or App should also call `subscribeLocaleSync()` to keep
 * i18n in sync when the user changes locale in settings.
 */
export async function initLocaleFromPreferences(
  locale: SupportedLocale = appConfig.defaultLocale,
): Promise<void> {
  await changeLanguage(locale)
}

export default i18n
