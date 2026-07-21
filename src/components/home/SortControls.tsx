'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type SortField = 'trending' | 'latest' | 'liked' | 'bookmarked'

const SORT_OPTIONS: { label: string; value: SortField }[] = [
  { label: 'Trending', value: 'trending' },
  { label: 'Latest', value: 'latest' },
  { label: 'Most Liked', value: 'liked' },
  { label: 'Most Bookmarked', value: 'bookmarked' },
]

export function SortControls() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeSort = (searchParams.get('sort') as SortField) ?? 'trending'

  const onSort = useCallback(
    (field: SortField) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', field)
      params.delete('page')
      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border-default bg-bg-surface p-1">
      {SORT_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSort(opt.value)}
          className={`rounded-md px-3 py-1.5 text-small font-medium transition-colors ${
            activeSort === opt.value
              ? 'bg-accent-violet/10 text-accent-violet shadow-sm'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
