/**
 * AWA UI Design Tokens — TypeScript theme object
 * Keep in sync with design-tokens.json and theme.css
 */

export const colors = {
  light: {
    canvas: '#F5F7FA',
    surface: '#FFFFFF',
    surfaceRaised: '#FFFFFF',
    surfaceSunken: '#EEF1F6',
    ink: '#111118',
    textPrimary: '#111118',
    textSecondary: '#5C5C66',
    textMuted: '#8A8A96',
    textInverse: '#F8FAFC',
    border: '#E6E6EA',
    borderStrong: '#D0D0D6',
    borderSubtle: '#F0F0F3',
    primary: '#1D1D26',
    primaryHover: '#2A2A36',
    primaryActive: '#111118',
    primarySoft: '#F0F0F3',
    primaryForeground: '#FFFFFF',
    secondary: '#3D8B7A',
    secondaryHover: '#327566',
    secondarySoft: '#E8F5F2',
    secondaryForeground: '#FFFFFF',
    success: '#16A34A',
    successSoft: '#E8F8EE',
    warning: '#D97706',
    warningSoft: '#FEF3E2',
    danger: '#DC2626',
    dangerSoft: '#FEECEC',
    info: '#2563EB',
    infoSoft: '#EFF4FF',
    neutral: '#6B6B76',
    neutralSoft: '#F3F3F5',
    focusRing: 'rgba(29, 29, 38, 0.22)',
    overlay: 'rgba(17, 17, 24, 0.45)',
    shadowColor: 'rgba(17, 17, 24, 0.07)',
  },
  dark: {
    canvas: '#12151C',
    surface: '#1A1E28',
    surfaceRaised: '#222733',
    surfaceSunken: '#0E1117',
    ink: '#E8EDF5',
    textPrimary: '#E8EDF5',
    textSecondary: '#9AA8BA',
    textMuted: '#6B7A8D',
    textInverse: '#12151C',
    border: '#2C3342',
    borderStrong: '#3D4658',
    borderSubtle: '#232937',
    primary: '#7B7FF5',
    primaryHover: '#8E91F7',
    primaryActive: '#6A6EE8',
    primarySoft: '#252A4A',
    primaryForeground: '#FFFFFF',
    secondary: '#2DD4BF',
    secondaryHover: '#5EEAD4',
    secondarySoft: '#16332F',
    secondaryForeground: '#042F2E',
    success: '#22C55E',
    successSoft: '#14301F',
    warning: '#F59E0B',
    warningSoft: '#33250F',
    danger: '#F87171',
    dangerSoft: '#331A1A',
    info: '#38BDF8',
    infoSoft: '#0F2838',
    neutral: '#94A3B8',
    neutralSoft: '#1E2430',
    focusRing: 'rgba(123, 127, 245, 0.45)',
    overlay: 'rgba(0, 0, 0, 0.55)',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
  },
} as const

export const typography = {
  fontFamily: {
    sans: '"Manrope", "Segoe UI", system-ui, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Consolas, monospace',
  },
  fontSize: {
    display: '2.75rem',
    h1: '2.25rem',
    h2: '1.875rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1.125rem',
    h6: '1rem',
    subtitle: '1.125rem',
    bodyLarge: '1.0625rem',
    body: '0.9375rem',
    bodySmall: '0.8125rem',
    caption: '0.75rem',
    label: '0.8125rem',
    code: '0.8125rem',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
} as const

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const

export const radii = {
  none: '0',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  full: '9999px',
} as const

export const shadows = {
  xs: '0 1px 2px var(--color-shadow)',
  sm: '0 1px 3px var(--color-shadow), 0 1px 2px rgba(26, 35, 50, 0.04)',
  md: '0 4px 12px var(--color-shadow), 0 2px 4px rgba(26, 35, 50, 0.04)',
  lg: '0 12px 32px var(--color-shadow), 0 4px 8px rgba(26, 35, 50, 0.06)',
  xl: '0 24px 48px var(--color-shadow)',
  focus: '0 0 0 3px var(--color-focus-ring)',
} as const

export const zIndex = {
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
  command: 1700,
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const transitions = {
  fast: '120ms',
  base: '180ms',
  slow: '220ms',
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

export const componentSizes = {
  control: {
    sm: '2rem',
    md: '2.5rem',
    lg: '2.75rem',
  },
  icon: {
    xs: '0.875rem',
    sm: '1rem',
    md: '1.125rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  sidebar: {
    default: '17.5rem',
    compact: '14rem',
    icon: '4.5rem',
  },
  header: {
    height: '4rem',
  },
} as const

export const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  zIndex,
  breakpoints,
  transitions,
  componentSizes,
} as const

export type Theme = typeof theme
export type ColorMode = 'light' | 'dark'
export type ThemeMode = 'light' | 'dark' | 'system'

export default theme
