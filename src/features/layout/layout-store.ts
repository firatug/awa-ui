import { create } from 'zustand'

interface LayoutState {
  mobileSidebarOpen: boolean
  sidebarCollapsed: boolean
  customizerOpen: boolean
  commandPaletteOpen: boolean
  chatOverlayOpen: boolean
  setMobileSidebarOpen: (open: boolean) => void
  toggleMobileSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebarCollapsed: () => void
  setCustomizerOpen: (open: boolean) => void
  toggleCustomizer: () => void
  setCommandPaletteOpen: (open: boolean) => void
  toggleCommandPalette: () => void
  setChatOverlayOpen: (open: boolean) => void
  toggleChatOverlay: () => void
}

export const useLayoutStore = create<LayoutState>((set) => ({
  mobileSidebarOpen: false,
  sidebarCollapsed: false,
  customizerOpen: false,
  commandPaletteOpen: false,
  chatOverlayOpen: false,
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  toggleMobileSidebar: () =>
    set((s) => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebarCollapsed: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setCustomizerOpen: (open) => set({ customizerOpen: open }),
  toggleCustomizer: () => set((s) => ({ customizerOpen: !s.customizerOpen })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () =>
    set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  setChatOverlayOpen: (open) => set({ chatOverlayOpen: open }),
  toggleChatOverlay: () =>
    set((s) => ({ chatOverlayOpen: !s.chatOverlayOpen })),
}))
