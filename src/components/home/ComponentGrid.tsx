'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ComponentCard } from '@/components/component-card/ComponentCard'
import { ComponentCardSkeleton } from '@/components/component-card/ComponentCardSkeleton'
import type { ComponentWithMeta } from '@/types/component.types'

interface ComponentGridProps {
  initialComponents: ComponentWithMeta[]
}

const LIMIT = 12

export function ComponentGrid({ initialComponents }: ComponentGridProps) {
  const searchParams = useSearchParams()
  const [components, setComponents] = useState<ComponentWithMeta[]>(initialComponents)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialComponents.length >= LIMIT)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const category = searchParams.get('category')
  const sort = searchParams.get('sort') ?? 'trending'

  // Reset when category or sort changes
  useEffect(() => {
    setComponents(initialComponents)
    setPage(1)
    setHasMore(initialComponents.length >= LIMIT)
  }, [category, sort, initialComponents])

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const nextPage = page + 1
    const params = new URLSearchParams({ page: String(nextPage), limit: String(LIMIT), sort })
    if (category) params.set('category', category)

    try {
      const res = await fetch(`/api/components?${params.toString()}`)
      const json = await res.json()
      const newComponents: ComponentWithMeta[] = json.data ?? []

      setComponents((prev) => [...prev, ...newComponents])
      setPage(nextPage)
      setHasMore(newComponents.length >= LIMIT)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page, category, sort])

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchMore()
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [fetchMore])

  return (
    <section id="components" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {components.map((comp) => (
          <ComponentCard key={comp.id} component={comp} />
        ))}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ComponentCardSkeleton key={`skel-${i}`} />
          ))}
        </div>
      )}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-4" />

      {/* Empty state */}
      {!loading && components.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-body text-text-muted">No components found.</p>
          <p className="mt-1 text-small text-text-disabled">Try a different category or sort.</p>
        </div>
      )}
    </section>
  )
}
