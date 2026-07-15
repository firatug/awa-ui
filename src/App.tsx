import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '@/app/router'
import { PopupAlertHost } from '@/components/feedback/PopupAlertHost'
import { Toaster } from '@/components/feedback/toast'
import { TooltipProvider } from '@/components/ui'
import { subscribeLocaleSync } from '@/locales/sync-locale'
import { ThemeProvider } from '@/theme'
import { appConfig } from '@/config/app.config'

export function App() {
  useEffect(() => {
    document.title = `${appConfig.name} — ${appConfig.tagline}`
    return subscribeLocaleSync()
  }, [])

  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <BrowserRouter>
          <AppRouter />
          <Toaster />
          <PopupAlertHost />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
