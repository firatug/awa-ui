import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'
import { appConfig } from '@/config/app.config'
import { theme } from '@/theme/theme'

describe('utils & config', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('exposes AWA brand from config', () => {
    expect(appConfig.name).toBe('AWA UI')
    expect(appConfig.shortName).toBe('AWA')
  })

  it('defines light and dark color tokens', () => {
    expect(theme.colors.light.primary).toBeTruthy()
    expect(theme.colors.dark.canvas).toBeTruthy()
  })
})
