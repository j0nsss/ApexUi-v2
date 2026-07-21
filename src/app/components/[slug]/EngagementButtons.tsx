'use client'

import { LikeButton } from '@/components/engagement/LikeButton'
import { BookmarkButton } from '@/components/engagement/BookmarkButton'

interface EngagementButtonsProps {
  componentId: string
}

export function EngagementButtons({ componentId }: EngagementButtonsProps) {
  return (
    <>
      <LikeButton componentId={componentId} initialLiked={false} initialCount={0} />
      <BookmarkButton componentId={componentId} initialBookmarked={false} />
    </>
  )
}
