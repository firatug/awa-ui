/**
 * AWA chart theme — reads design tokens from CSS custom properties.
 */

const CSS_VAR_PREFIX = '--'

export function readComputedStyle(
  property: string,
  element?: Element | null,
): string {
  if (typeof window === 'undefined') return ''
  const el = element ?? document.documentElement
  return getComputedStyle(el).getPropertyValue(property).trim()
}

export function getCssVar(name: string, fallback = ''): string {
  const key = name.startsWith(CSS_VAR_PREFIX) ? name : `${CSS_VAR_PREFIX}${name}`
  const value = readComputedStyle(key)
  return value || fallback
}

export interface ChartThemeColors {
  primary: string
  secondary: string
  success: string
  warning: string
  danger: string
  info: string
  neutral: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  border: string
  borderSubtle: string
  surface: string
  surfaceSunken: string
  series: string[]
}

export function getChartColors(): ChartThemeColors {
  const primary = getCssVar('color-primary', '#5b5fef')
  const secondary = getCssVar('color-secondary', '#14b8a6')

  return {
    primary,
    secondary,
    success: getCssVar('color-success', '#16a34a'),
    warning: getCssVar('color-warning', '#d97706'),
    danger: getCssVar('color-danger', '#dc2626'),
    info: getCssVar('color-info', '#0284c7'),
    neutral: getCssVar('color-neutral', '#64748b'),
    textPrimary: getCssVar('color-text-primary', '#1a2332'),
    textSecondary: getCssVar('color-text-secondary', '#5b6b7c'),
    textMuted: getCssVar('color-text-muted', '#8a97a8'),
    border: getCssVar('color-border', '#e2e8f0'),
    borderSubtle: getCssVar('color-border-subtle', '#eef2f7'),
    surface: getCssVar('color-surface', '#ffffff'),
    surfaceSunken: getCssVar('color-surface-sunken', '#eef1f6'),
    series: [
      primary,
      secondary,
      getCssVar('color-info', '#0284c7'),
      getCssVar('color-warning', '#d97706'),
      getCssVar('color-success', '#16a34a'),
      getCssVar('color-danger', '#dc2626'),
      getCssVar('color-neutral', '#64748b'),
    ],
  }
}

export function getChartGridStyle() {
  const colors = getChartColors()
  return {
    stroke: colors.borderSubtle,
    strokeDasharray: '4 4',
    vertical: false,
  }
}

export function getChartAxisStyle() {
  const colors = getChartColors()
  return {
    axisLine: false as const,
    tickLine: false as const,
    tick: {
      fill: colors.textMuted,
      fontSize: 12,
      fontFamily: getCssVar('font-sans', 'Manrope, sans-serif'),
    },
  }
}

export function getChartTooltipStyle() {
  const colors = getChartColors()
  return {
    contentStyle: {
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: getCssVar('radius-lg', '0.75rem'),
      boxShadow: 'var(--shadow-md)',
      fontSize: '0.8125rem',
      fontFamily: getCssVar('font-sans', 'Manrope, sans-serif'),
      color: colors.textPrimary,
      padding: '0.5rem 0.75rem',
    },
    labelStyle: {
      color: colors.textSecondary,
      fontWeight: 500,
      marginBottom: 4,
    },
    itemStyle: {
      color: colors.textPrimary,
      padding: '2px 0',
    },
    cursor: {
      fill: getCssVar('color-primary-soft', 'rgba(91, 95, 239, 0.08)'),
      stroke: colors.borderSubtle,
    },
  }
}

export function getChartMargin(defaultMargin = { top: 8, right: 8, left: 0, bottom: 0 }) {
  return defaultMargin
}

export const CHART_DEFAULT_HEIGHT = 280

/** @deprecated Prefer getChartColors() at render time for theme-aware colors */
export const chartColors = new Proxy({} as ChartThemeColors, {
  get: (_, prop) => getChartColors()[prop as keyof ChartThemeColors],
})

/** @deprecated Prefer getChartGridStyle() at render time */
export const chartGridStyle = new Proxy({} as ReturnType<typeof getChartGridStyle>, {
  get: (_, prop) => getChartGridStyle()[prop as keyof ReturnType<typeof getChartGridStyle>],
})

/** @deprecated Prefer getChartAxisStyle() at render time */
export const chartAxisStyle = new Proxy(
  {} as ReturnType<typeof getChartAxisStyle>['tick'],
  {
    get: (_, prop) => getChartAxisStyle().tick[prop as keyof ReturnType<typeof getChartAxisStyle>['tick']],
  },
)

/** @deprecated Prefer getChartTooltipStyle() at render time */
export const chartTooltipStyle = new Proxy(
  {} as ReturnType<typeof getChartTooltipStyle>['contentStyle'],
  {
    get: (_, prop) =>
      getChartTooltipStyle().contentStyle[
        prop as keyof ReturnType<typeof getChartTooltipStyle>['contentStyle']
      ],
  },
)
