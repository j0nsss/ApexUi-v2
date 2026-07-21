'use client'

import { Bookmark } from 'lucide-react'
import { useBookmark } from '@/hooks/useBookmark'

interface BookmarkButtonProps {
  componentId: string
  initialBookmarked: boolean
}

export function BookmarkButton({ componentId, initialBookmarked }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmark(componentId, initialBookmarked)

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      className={`flex items-center gap-1 text-small transition-colors ${
        isBookmarked ? 'text-accent-violet' : 'text-text-muted hover:text-text-secondary'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this component'}
      aria-pressed={isBookmarked}
    >
      <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-accent-violet' : ''}`} />
    </button>
  )
}
