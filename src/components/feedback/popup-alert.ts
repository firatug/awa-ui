import { create } from 'zustand'

export type PopupAlertVariant = 'success' | 'error' | 'warning' | 'info'

export interface PopupAlertOptions {
  title: string
  description?: string
  variant?: PopupAlertVariant
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  /** Auto-dismiss in ms; omit for manual close */
  duration?: number
}

interface PopupAlertState {
  open: boolean
  options: PopupAlertOptions | null
  show: (options: PopupAlertOptions) => void
  dismiss: () => void
}

export const usePopupAlertStore = create<PopupAlertState>((set) => ({
  open: false,
  options: null,
  show: (options) => set({ open: true, options }),
  dismiss: () => set({ open: false, options: null }),
}))

/** Imperative API — centered animated popup alerts */
export const popupAlert = {
  show: (options: PopupAlertOptions) => usePopupAlertStore.getState().show(options),
  success: (title: string, description?: string) =>
    usePopupAlertStore.getState().show({ title, description, variant: 'success' }),
  error: (title: string, description?: string) =>
    usePopupAlertStore.getState().show({ title, description, variant: 'error' }),
  warning: (title: string, description?: string) =>
    usePopupAlertStore.getState().show({ title, description, variant: 'warning' }),
  info: (title: string, description?: string) =>
    usePopupAlertStore.getState().show({ title, description, variant: 'info' }),
  dismiss: () => usePopupAlertStore.getState().dismiss(),
}
