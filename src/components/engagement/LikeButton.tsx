'use client'

import { Heart } from 'lucide-react'
import { useLike } from '@/hooks/useLike'

interface LikeButtonProps {
  componentId: string
  initialLiked: boolean
  initialCount: number
}

export function LikeButton({ componentId, initialLiked, initialCount }: LikeButtonProps) {
  const { isLiked, count, toggleLike } = useLike(componentId, initialLiked, initialCount)

  return (
    <button
      type="button"
      onClick={toggleLike}
      className={`flex items-center gap-1 text-small transition-colors ${
        isLiked ? 'text-accent-red' : 'text-text-muted hover:text-text-secondary'
      }`}
      aria-label={isLiked ? 'Unlike this component' : 'Like this component'}
      aria-pressed={isLiked}
    >
      <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-accent-red' : ''}`} />
      <span>{count}</span>
    </button>
  )
}
