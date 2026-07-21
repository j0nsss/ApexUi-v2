import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'

interface AuthStore {
  user: User | null
  session: Session | null
  isLoading: boolean
  authModalOpen: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setLoading: (v: boolean) => void
  openAuthModal: () => void
  closeAuthModal: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  session: null,
  isLoading: true,
  authModalOpen: false,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (v) => set({ isLoading: v }),
  openAuthModal: () => set({ authModalOpen: true }),
  closeAuthModal: () => set({ authModalOpen: false }),
}))
