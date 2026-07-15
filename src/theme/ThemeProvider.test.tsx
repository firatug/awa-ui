import { describe, expect, it, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider'
import { defaultPreferences, usePreferencesStore } from '@/theme/preferences-store'
import type { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

describe('Theme switcher', () => {
  beforeEach(() => {
    usePreferencesStore.setState({ ...defaultPreferences })
  })

  it('toggles between light and dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => {
      result.current.setThemeMode('light')
    })
    expect(result.current.resolvedMode).toBe('light')
    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.resolvedMode).toBe('dark')
  })
})
