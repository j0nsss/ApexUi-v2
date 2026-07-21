import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SearchStore {
  isOpen: boolean
  query: string
  results: Record<string, unknown>[]
  isLoading: boolean
  recentSearches: string[]
  openPalette: () => void
  closePalette: () => void
  togglePalette: () => void
  setQuery: (q: string) => void
  setResults: (r: Record<string, unknown>[]) => void
  setLoading: (v: boolean) => void
  addRecentSearch: (q: string) => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      isOpen: false,
      query: '',
      results: [],
      isLoading: false,
      recentSearches: [],

      openPalette: () => set({ isOpen: true, query: '', results: [] }),
      closePalette: () => set({ isOpen: false, query: '', results: [], isLoading: false }),
      togglePalette: () => set((s) => ({ isOpen: !s.isOpen, query: '', results: [] })),
      setQuery: (q) => set({ query: q }),
      setResults: (r) => set({ results: r }),
      setLoading: (v) => set({ isLoading: v }),
      addRecentSearch: (q) =>
        set((s) => {
          const filtered = s.recentSearches.filter((r) => r !== q)
          return { recentSearches: [q, ...filtered].slice(0, 8) }
        }),
    }),
    {
      name: 'apexui-search',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : (undefined as never)
      ),
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
)
