import { create } from 'zustand'

interface State {
    isSideMenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;

    shouldFocusInput: boolean;
    triggerFocusInput: () => void;
    resetFocusInput: () => void;
}

export const useUIStore = create<State>((set) => ({
    isSideMenuOpen: false,
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),

    shouldFocusInput: false,
    triggerFocusInput: () => set({ shouldFocusInput: true }),
    resetFocusInput: () => set({ shouldFocusInput: false }),
}))