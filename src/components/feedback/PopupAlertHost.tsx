import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  usePopupAlertStore,
  type PopupAlertVariant,
} from './popup-alert'

const ICONS: Record<PopupAlertVariant, typeof Info> = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const TONE: Record<
  PopupAlertVariant,
  { icon: string; soft: string; ring: string }
> = {
  success: {
    icon: 'text-[var(--color-success)]',
    soft: 'bg-[var(--color-success-soft)]',
    ring: 'ring-[var(--color-success)]/20',
  },
  error: {
    icon: 'text-[var(--color-danger)]',
    soft: 'bg-[var(--color-danger-soft)]',
    ring: 'ring-[var(--color-danger)]/20',
  },
  warning: {
    icon: 'text-[var(--color-warning)]',
    soft: 'bg-[var(--color-warning-soft)]',
    ring: 'ring-[var(--color-warning)]/20',
  },
  info: {
    icon: 'text-[var(--color-info)]',
    soft: 'bg-[var(--color-info-soft)]',
    ring: 'ring-[var(--color-info)]/20',
  },
}

export function PopupAlertHost() {
  const { t } = useTranslation()
  const open = usePopupAlertStore((s) => s.open)
  const options = usePopupAlertStore((s) => s.options)
  const dismiss = usePopupAlertStore((s) => s.dismiss)

  useEffect(() => {
    if (!open || !options?.duration) return
    const id = window.setTimeout(() => dismiss(), options.duration)
    return () => window.clearTimeout(id)
  }, [open, options?.duration, dismiss])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  if (typeof document === 'undefined') return null

  const variant = options?.variant ?? 'info'
  const Icon = ICONS[variant]
  const tone = TONE[variant]

  return createPortal(
    <AnimatePresence>
      {open && options ? (
        <div className="fixed inset-0 z-[var(--z-toast)] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label={t('actions.close')}
            className="absolute inset-0 bg-[rgba(15,23,42,0.45)] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => {
              options.onCancel?.()
              dismiss()
            }}
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="awa-popup-alert-title"
            className={cn(
              'relative z-10 w-full max-w-[400px] overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_24px_64px_rgba(15,23,42,0.22)]',
              'ring-1',
              tone.ring,
            )}
            initial={{ opacity: 0, scale: 0.72, y: 18 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 420,
                damping: 28,
                mass: 0.85,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.88,
              y: 10,
              transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
            }}
          >
            <button
              type="button"
              onClick={() => {
                options.onCancel?.()
                dismiss()
              }}
              className="absolute end-3 top-3 flex size-8 items-center justify-center rounded-[10px] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]"
              aria-label={t('actions.close')}
            >
              <X className="size-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <motion.div
                className={cn(
                  'mb-4 flex size-14 items-center justify-center rounded-full',
                  tone.soft,
                  tone.icon,
                )}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.08,
                    type: 'spring',
                    stiffness: 500,
                    damping: 22,
                  },
                }}
              >
                <Icon className="size-7" strokeWidth={2} />
              </motion.div>

              <h2
                id="awa-popup-alert-title"
                className="text-[var(--text-h4)] font-semibold text-[var(--color-text-primary)]"
              >
                {options.title}
              </h2>

              {options.description ? (
                <p className="mt-2 text-[var(--text-body-sm)] leading-relaxed text-[var(--color-text-secondary)]">
                  {options.description}
                </p>
              ) : null}

              <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
                {options.cancelLabel ? (
                  <Button
                    variant="outline"
                    className="sm:min-w-[120px]"
                    onClick={() => {
                      options.onCancel?.()
                      dismiss()
                    }}
                  >
                    {options.cancelLabel}
                  </Button>
                ) : null}
                <Button
                  className="sm:min-w-[120px]"
                  variant={variant === 'error' ? 'danger' : 'primary'}
                  onClick={() => {
                    options.onConfirm?.()
                    dismiss()
                  }}
                >
                  {options.confirmLabel ?? t('actions.ok')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
