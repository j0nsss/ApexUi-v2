'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import type { Database } from '@/types/database.types'

type Category = Database['public']['Tables']['categories']['Row']

export function CategoryFilterStrip({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  const onSelect = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (slug) {
        params.set('category', slug)
      } else {
        params.delete('category')
      }
      params.delete('page')
      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div
      className="flex gap-2 overflow-x-auto py-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`.category-strip::-webkit-scrollbar { display: none; }`}</style>

      {/* All chip */}
      <button
        type="button"
        className={`category-chip whitespace-nowrap ${!activeCategory ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>

      {/* Category chips */}
      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          className={`category-chip whitespace-nowrap ${activeCategory === cat.slug ? 'active' : ''}`}
          onClick={() => onSelect(cat.slug)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
