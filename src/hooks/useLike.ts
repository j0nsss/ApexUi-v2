'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'

export function useLike(componentId: string, initialLiked: boolean, initialCount: number) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const { user, openAuthModal } = useAuth()

  const toggleLike = useCallback(async () => {
    if (!user) {
      openAuthModal()
      return
    }

    const previousLiked = isLiked
    const previousCount = count
    setIsLiked((prev) => !prev)
    setCount((prev) => (previousLiked ? prev - 1 : prev + 1))

    const res = await fetch('/api/likes', {
      method: previousLiked ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ component_id: componentId }),
    })

    if (!res.ok) {
      setIsLiked(previousLiked)
      setCount(previousCount)
    }
  }, [componentId, isLiked, count, user, openAuthModal])

  return { isLiked, count, toggleLike }
}
