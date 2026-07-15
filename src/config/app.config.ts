/**
 * AWA UI — central brand & product configuration.
 * Change product name, logo, description, version, and author here only.
 * Do not hardcode brand strings elsewhere in the codebase.
 */
export const appConfig = {
  name: 'AWA UI',
  shortName: 'AWA',
  tagline: 'Universal Admin Design System',
  productLabel: 'Admin Management',
  description:
    'A modern, minimal, premium admin design system and UI kit for SaaS, CRM, ERP, and multi-tenant products.',
  version: '1.0.0',
  author: {
    name: 'AWA Studio',
    url: 'https://awa-ui.dev',
    email: 'hello@awa-ui.dev',
  },
  copyright: `© ${new Date().getFullYear()} AWA Studio. All rights reserved.`,
  demo: {
    email: 'admin@awa-ui.dev',
    password: 'demo1234',
  },
  defaultLocale: 'en' as const,
  supportedLocales: ['en', 'tr'] as const,
  assets: {
    logo: '/awa-logo-white.png',
    logoMark: '/awa-logo-white.png',
    logoOnDark: '/awa-logo-white.png',
    favicon: '/favicon.svg',
  },
  storageKeys: {
    preferences: 'awa-ui-preferences',
    locale: 'awa-ui-locale',
  },
} as const

export type AppConfig = typeof appConfig
export type SupportedLocale = (typeof appConfig.supportedLocales)[number]
