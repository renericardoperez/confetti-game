import { create } from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";

export const usePersistStore = create((
    persist(
        set => ({
            wins: 0,
            saveWin: () => set((state) => ({ wins: state.wins + 1 })),
            }),
        {
            name: 'demo-poc-store',
            storage: createJSONStorage(() => localStorage),
            }
        )
    ))


export const useStore = create((set) => ({
    count: 0,
    inc: () => set((state) => ({ count: state.count + 1 })),
    reset: () => set({ count: 0 }),
}))
