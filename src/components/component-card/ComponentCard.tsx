'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Copy, Check } from 'lucide-react'
import type { ComponentWithMeta } from '@/types/component.types'
import { ComponentPreview } from '@/components/preview/ComponentPreview'
import { LikeButton } from '@/components/engagement/LikeButton'
import { BookmarkButton } from '@/components/engagement/BookmarkButton'

interface ComponentCardProps {
  component: ComponentWithMeta
}

export function ComponentCard({ component }: ComponentCardProps) {
  const [copied, setCopied] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const codeToCopy = component.code_html ?? component.code_tailwind ?? component.code_react ?? ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = codeToCopy
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <article ref={cardRef} aria-label={`Component: ${component.name}`} className="component-card group overflow-hidden">
      {/* Preview area */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[#0D0D10] sm:h-48">
        <ComponentPreview
          previewHtml={component.preview_html}
          title={component.name}
          minHeight={160}
        />

        {/* Category badge (bottom-left) */}
        <span className="category-chip pointer-events-none absolute bottom-2 left-2 text-xs">
          {component.category.name}
        </span>

        {/* Like count (bottom-right) */}
        <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-text-secondary">
          <LikeButton
            componentId={component.id}
            initialLiked={component.is_liked ?? false}
            initialCount={component.like_count}
          />
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="truncate text-h3 text-text-primary">{component.name}</h3>
        <p className="mt-1 line-clamp-2 text-small text-text-secondary">
          {component.description_short}
        </p>

        {/* Creator row */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-violet/20 text-xs font-semibold text-accent-violet">
            {component.creator?.display_name?.charAt(0) ?? '?'}
          </div>
          <Link
            href={`/creators/${component.creator?.username ?? 'unknown'}`}
            className="text-small text-text-muted transition-colors hover:text-text-secondary"
          >
            {component.creator?.display_name ?? 'Anonymous'}
          </Link>
        </div>

        {/* Hover actions */}
        <div className="hover-actions mt-3 flex items-center justify-between border-t border-border-default pt-3">
          <LikeButton
            componentId={component.id}
            initialLiked={component.is_liked ?? false}
            initialCount={component.like_count}
          />

          <BookmarkButton
            componentId={component.id}
            initialBookmarked={component.is_bookmarked ?? false}
          />

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-small text-text-muted transition-colors hover:text-accent-emerald"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-accent-emerald" />
                <span className="text-accent-emerald">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
