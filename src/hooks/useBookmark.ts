'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'

export function useBookmark(componentId: string, initialBookmarked: boolean) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)
  const { user, openAuthModal } = useAuth()

  const toggleBookmark = useCallback(async () => {
    if (!user) {
      openAuthModal()
      return
    }

    const previous = isBookmarked
    setIsBookmarked((prev) => !prev)

    const res = await fetch('/api/bookmarks', {
      method: previous ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ component_id: componentId }),
    })

    if (!res.ok) {
      setIsBookmarked(previous)
    }
  }, [componentId, isBookmarked, user, openAuthModal])

  return { isBookmarked, toggleBookmark }
}
