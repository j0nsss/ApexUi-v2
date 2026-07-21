import { create } from 'zustand'

export type SortField = 'trending' | 'latest' | 'liked' | 'bookmarked'

interface FilterStore {
  activeCategory: string | null
  activeSortField: SortField
  setCategory: (slug: string | null) => void
  setSort: (field: SortField) => void
}

export const useFilterStore = create<FilterStore>()((set) => ({
  activeCategory: null,
  activeSortField: 'trending',
  setCategory: (slug) => set({ activeCategory: slug }),
  setSort: (field) => set({ activeSortField: field }),
}))
