'use client'

import { useEffect, useRef } from 'react'
import { useSearchStore } from '@/store/searchStore'

export function useSearch() {
  const {
    query,
    results,
    isLoading,
    setQuery,
    setResults,
    setLoading,
    addRecentSearch,
    recentSearches,
  } = useSearchStore()

  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const json = await res.json()
        setResults(json.data ?? [])
        addRecentSearch(query.trim())
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, setResults, setLoading, addRecentSearch])

  return {
    query,
    results,
    isLoading,
    recentSearches,
    setQuery,
  }
}
