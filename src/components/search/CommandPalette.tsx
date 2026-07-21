'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Loader2, Clock, Heart } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useSearchStore } from '@/store/searchStore'
import { useSearch } from '@/hooks/useSearch'

export function CommandPalette() {
  const router = useRouter()
  const { isOpen, closePalette } = useSearchStore()
  const { query, results, isLoading, recentSearches, setQuery } = useSearch()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Global keyboard listener for Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        useSearchStore.getState().togglePalette()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const navigate = useCallback(
    (slug: string) => {
      closePalette()
      router.push(`/components/${slug}`)
    },
    [closePalette, router]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = query.trim() ? results : []
    let newIndex = selectedIndex

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        newIndex = Math.min(selectedIndex + 1, items.length - 1)
        setSelectedIndex(Math.max(0, newIndex))
        break
      case 'ArrowUp':
        e.preventDefault()
        newIndex = Math.max(0, selectedIndex - 1)
        setSelectedIndex(Math.max(0, newIndex))
        break
      case 'Enter':
        e.preventDefault()
        if (items[selectedIndex]) {
          const slug = (items[selectedIndex] as Record<string, unknown>).slug as string
          navigate(slug)
        }
        break
    }
  }

  const displayResults = query.trim() ? results : []
  const showRecent = !query.trim() && recentSearches.length > 0

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closePalette()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="glass-surface fixed left-1/2 top-[15vh] z-50 w-[90vw] max-w-[560px] -translate-x-1/2 outline-none data-[state=open]:animate-scale-in"
          onKeyDown={handleKeyDown}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border-default px-4 py-3">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-text-muted" />
            ) : (
              <Search className="h-4 w-4 text-text-muted" />
            )}
            <input
              ref={inputRef}
              type="text"
              placeholder="Search components..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-body text-text-primary outline-none placeholder:text-text-disabled"
              aria-label="Search components"
            />
            <kbd className="hidden rounded border border-border-default bg-bg-elevated px-1.5 py-0.5 text-xs text-text-disabled sm:inline">
              Esc
            </kbd>
          </div>

          {/* Results / Recent searches */}
          <div className="max-h-[360px] overflow-y-auto p-2">
            {/* Recent searches */}
            {showRecent && (
              <div>
                <p className="px-2 py-1.5 text-xs font-medium text-text-muted">Recent</p>
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-small text-text-secondary transition-colors hover:bg-bg-elevated"
                  >
                    <Clock className="h-3.5 w-3.5 text-text-disabled" />
                    {term}
                  </button>
                ))}
              </div>
            )}

            {/* Search results */}
            {displayResults.length > 0 && (
              <div>
                {displayResults.map((item, idx) => {
                  const row = item as Record<string, unknown>
                  const name = row.name as string
                  const slug = row.slug as string
                  const category = row.category as { name: string; slug: string; icon: string | null } | null
                  const creator = row.creator as { username: string; display_name: string } | null
                  const likeCount = row.like_count as number
                  const isSelected = idx === selectedIndex

                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => navigate(slug)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                        isSelected ? 'bg-accent-violet/10' : 'hover:bg-bg-elevated'
                      }`}
                    >
                      {/* Category icon placeholder */}
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-bg-base text-xs text-text-muted">
                        {category?.name?.charAt(0) ?? '?'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="truncate text-label text-text-primary">{name}</p>
                        <p className="truncate text-xs text-text-muted">
                          {category?.name ?? 'Unknown'}
                          {creator ? ` · ${creator.display_name}` : ''}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 text-xs text-text-muted">
                        <Heart className="h-3 w-3" />
                        {likeCount}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* No results */}
            {query.trim() && !isLoading && displayResults.length === 0 && (
              <div className="flex flex-col items-center py-10 text-center">
                <p className="text-body text-text-muted">No results for &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-small text-text-disabled">Try a different search term</p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
